import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const REG_FILE = path.join(DATA_DIR, 'registrations.json');
const DATE_FILE = path.join(DATA_DIR, 'date-config.json');

function getCalendarClient() {
  const keyFileContent = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!keyFileContent || !calendarId) {
    return null;
  }

  try {
    const credentials = JSON.parse(keyFileContent);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });
    const calendar = google.calendar({ version: 'v3', auth });
    return { calendar, calendarId };
  } catch (err) {
    console.error('Failed to init Google Calendar client:', err.message);
    return null;
  }
}

function getLocalBookingCounts() {
  try {
    if (!fs.existsSync(REG_FILE)) return {};
    const registrations = JSON.parse(fs.readFileSync(REG_FILE, 'utf-8'));
    const counts = {};
    registrations.forEach((r) => {
      if (r.type === 'enterprise_consult' && r.preferred_date) {
        counts[r.preferred_date] = (counts[r.preferred_date] || 0) + 1;
      }
    });
    return counts;
  } catch {
    return {};
  }
}

function getDateConfig() {
  try {
    if (!fs.existsSync(DATE_FILE)) return { defaultCapacity: 3, overrides: {} };
    return JSON.parse(fs.readFileSync(DATE_FILE, 'utf-8'));
  } catch {
    return { defaultCapacity: 3, overrides: {} };
  }
}

// GET: return available consultation time slots
// Merges Google Calendar busy times + local booking capacity
export async function GET() {
  try {
    const bookingCounts = getLocalBookingCounts();
    const dateConfig = getDateConfig();
    const defaultCap = dateConfig.defaultCapacity || 3;
    const overrides = dateConfig.overrides || {};

    // Generate dates: +3 days from today, 30 days out
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + 3);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);

    // Try fetching Google Calendar busy times
    let busyDates = new Set();
    const gcal = getCalendarClient();

    if (gcal) {
      try {
        const freeBusyResponse = await gcal.calendar.freebusy.query({
          requestBody: {
            timeMin: startDate.toISOString(),
            timeMax: endDate.toISOString(),
            items: [{ id: gcal.calendarId }],
          },
        });

        const busySlots = freeBusyResponse.data.calendars?.[gcal.calendarId]?.busy || [];

        // Mark a day as busy if it has events covering most of working hours (9-18)
        busySlots.forEach((slot) => {
          const start = new Date(slot.start);
          const end = new Date(slot.end);

          // If event spans 6+ hours, mark the whole day as busy
          const hours = (end - start) / (1000 * 60 * 60);
          if (hours >= 6) {
            const dateStr = start.toISOString().split('T')[0];
            busyDates.add(dateStr);
          }
        });
      } catch (calErr) {
        console.error('Google Calendar API error:', calErr.message);
        // Fallback to capacity-only mode
      }
    }

    // Build available dates
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];

      const capacity = overrides[dateStr] !== undefined ? overrides[dateStr] : defaultCap;
      const booked = bookingCounts[dateStr] || 0;
      const available = capacity - booked;
      const calendarBusy = busyDates.has(dateStr);

      dates.push({
        date: dateStr,
        capacity,
        booked,
        available: Math.max(0, available),
        full: available <= 0 || calendarBusy,
        calendarBusy,
      });
    }

    return NextResponse.json({
      calendarConnected: !!gcal,
      defaultCapacity: defaultCap,
      overrides,
      dates,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
