import { google } from 'googleapis';

const TIMEZONE = 'Asia/Taipei';

/**
 * Get an authenticated Google Calendar client.
 * Scope includes both read and write so we can query freebusy AND create events.
 */
export function getCalendarClient() {
  const keyFileContent = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!keyFileContent || !calendarId) return null;

  try {
    const credentials = JSON.parse(keyFileContent);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/calendar',       // full read/write
      ],
      // Domain-wide delegation: impersonate the calendar owner
      // so the service account can create events on Workspace calendars
      clientOptions: { subject: calendarId },
    });
    const calendar = google.calendar({ version: 'v3', auth });
    return { calendar, calendarId };
  } catch (err) {
    console.error('Failed to init Google Calendar client:', err.message);
    return null;
  }
}

/**
 * Create a Google Calendar event for a consultation booking.
 *
 * @param {object} opts
 * @param {string} opts.date      – "YYYY-MM-DD"
 * @param {string} opts.slot      – "09:00–10:00"
 * @param {string} opts.name      – attendee name
 * @param {string} opts.email     – attendee email
 * @param {string} opts.company   – company name
 * @param {string} opts.phone     – phone number
 * @param {string} opts.teamSize  – team size label
 * @returns {Promise<string|null>}  Google Calendar event ID, or null on failure
 */
export async function createCalendarEvent({ date, slot, name, email, company, phone, teamSize }) {
  const gcal = getCalendarClient();
  if (!gcal) {
    console.warn('Google Calendar not configured – skipping event creation');
    return null;
  }

  // Parse slot label like "09:00–10:00" → startHour=9, endHour=10
  const match = slot.match(/^(\d{2}):00/);
  if (!match) {
    console.error('Invalid slot format:', slot);
    return null;
  }
  const startHour = parseInt(match[1], 10);
  const endHour = startHour + 1;

  const startTime = `${date}T${String(startHour).padStart(2, '0')}:00:00+08:00`;
  const endTime = `${date}T${String(endHour).padStart(2, '0')}:00:00+08:00`;

  const event = {
    summary: `🦞 企業諮詢 — ${name}（${company}）`,
    description: [
      `📋 企業 AI 導入諮詢`,
      ``,
      `👤 姓名：${name}`,
      `📧 Email：${email}`,
      `📱 電話：${phone}`,
      `🏢 公司：${company}`,
      `👥 團隊人數：${teamSize}`,
    ].join('\n'),
    start: {
      dateTime: startTime,
      timeZone: TIMEZONE,
    },
    end: {
      dateTime: endTime,
      timeZone: TIMEZONE,
    },
    // Color: Tomato (11) to make consultation events stand out
    colorId: '11',
    // Add both parties as attendees → Google sends calendar invite emails
    attendees: [
      { email: gcal.calendarId, responseStatus: 'accepted' },  // 你（日曆擁有者）
      { email, displayName: name },                            // 預約者
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 60 },
        { method: 'popup', minutes: 30 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };

  try {
    const res = await gcal.calendar.events.insert({
      calendarId: gcal.calendarId,
      requestBody: event,
      sendUpdates: 'all',  // 發送 email 通知給所有 attendees
    });
    console.log('Created Google Calendar event:', res.data.id);
    return res.data.id;
  } catch (err) {
    console.error('Failed to create Google Calendar event:', err.message);
    return null;
  }
}

export { TIMEZONE };
