import { NextResponse } from 'next/server';
import { getCalendarClient } from '@/lib/google-calendar';

// In-memory cache — 5 min TTL
let cachedResult = null;
let cacheExpiry = 0;
const CACHE_TTL = 5 * 60 * 1000;

// Slot config: weekdays only, 60-min slots
// Morning block: 09:00–17:00  (slots: 09, 10, 11, 12, 13, 14, 15, 16)
// Evening block: 21:00–24:00  (slots: 21, 22, 23)
const SLOT_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 21, 22, 23];
const TIMEZONE = 'Asia/Taipei';

function isWeekday(date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

// Convert a Date to Asia/Taipei local date string YYYY-MM-DD
function toTaipeiDateStr(date) {
  return date.toLocaleDateString('sv-SE', { timeZone: TIMEZONE });
}

// Create a Date in Asia/Taipei timezone for a given date string and hour
function taipeiToUTC(dateStr, hour) {
  // dateStr = "YYYY-MM-DD", hour = 9..23
  // Build an ISO string in +08:00
  const hh = String(hour).padStart(2, '0');
  return new Date(`${dateStr}T${hh}:00:00+08:00`);
}

export async function GET() {
  try {
    // Return cached result if fresh
    if (cachedResult && Date.now() < cacheExpiry) {
      return NextResponse.json(cachedResult);
    }

    const gcal = getCalendarClient();

    // Date range: from tomorrow, 30 weekdays out
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Collect 30 weekdays
    const weekdays = [];
    const cursor = new Date(tomorrow);
    while (weekdays.length < 30) {
      if (isWeekday(cursor)) {
        weekdays.push(toTaipeiDateStr(cursor));
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    const timeMin = taipeiToUTC(weekdays[0], SLOT_HOURS[0]);
    const lastDate = weekdays[weekdays.length - 1];
    const timeMax = taipeiToUTC(lastDate, 24); // end of last day

    // Fetch busy times from Google Calendar(s)
    let busySlots = [];
    if (gcal) {
      try {
        // Build calendar list: primary + extras
        const extraIds = (process.env.GOOGLE_EXTRA_CALENDAR_IDS || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        const allCalendarIds = [gcal.calendarId, ...extraIds];

        const res = await gcal.calendar.freebusy.query({
          requestBody: {
            timeMin: timeMin.toISOString(),
            timeMax: timeMax.toISOString(),
            timeZone: TIMEZONE,
            items: allCalendarIds.map((id) => ({ id })),
          },
        });

        // Merge busy slots from all calendars
        const calendars = res.data.calendars || {};
        for (const calId of allCalendarIds) {
          const calBusy = calendars[calId]?.busy || [];
          busySlots.push(...calBusy);
        }
      } catch (calErr) {
        console.error('Google Calendar freebusy error:', calErr.message);
      }
    }

    // Check if a 60-min slot overlaps any busy period
    function isSlotBusy(slotStart, slotEnd) {
      return busySlots.some((b) => {
        const bStart = new Date(b.start);
        const bEnd = new Date(b.end);
        return slotStart < bEnd && slotEnd > bStart;
      });
    }

    // Build result: per-date array of available time slots
    const result = weekdays.map((dateStr) => {
      const slots = SLOT_HOURS.map((hour) => {
        const start = taipeiToUTC(dateStr, hour);
        const end = new Date(start.getTime() + 60 * 60 * 1000);
        const busy = isSlotBusy(start, end);

        // Also skip slots in the past
        const isPast = start <= now;

        return {
          hour,
          label: `${String(hour).padStart(2, '0')}:00–${String(hour + 1).padStart(2, '0')}:00`,
          available: !busy && !isPast,
          busy,
          past: isPast,
        };
      });

      const availableCount = slots.filter((s) => s.available).length;

      return {
        date: dateStr,
        slots,
        availableCount,
        allBusy: availableCount === 0,
      };
    });

    const response = {
      calendarConnected: !!gcal,
      timezone: TIMEZONE,
      dates: result,
    };

    // Cache the result
    cachedResult = response;
    cacheExpiry = Date.now() + CACHE_TTL;

    return NextResponse.json(response);
  } catch (err) {
    console.error('calendar-availability error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
