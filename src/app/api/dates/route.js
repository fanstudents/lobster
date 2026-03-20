import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATES_FILE = path.join(DATA_DIR, 'date-config.json');
const REG_FILE = path.join(DATA_DIR, 'registrations.json');

function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATES_FILE)) {
    fs.writeFileSync(DATES_FILE, JSON.stringify({ defaultCapacity: 3, overrides: {} }), 'utf-8');
  }
  if (!fs.existsSync(REG_FILE)) {
    fs.writeFileSync(REG_FILE, '[]', 'utf-8');
  }
}

// GET: return available dates for next 30 days (starting +3 days from now)
export async function GET() {
  try {
    ensureFiles();
    const config = JSON.parse(fs.readFileSync(DATES_FILE, 'utf-8'));
    const registrations = JSON.parse(fs.readFileSync(REG_FILE, 'utf-8'));

    // Count bookings per date for enterprise_consult type
    const bookingCounts = {};
    registrations.forEach((r) => {
      if (r.type === 'enterprise_consult' && r.preferred_date) {
        bookingCounts[r.preferred_date] = (bookingCounts[r.preferred_date] || 0) + 1;
      }
    });

    const defaultCap = config.defaultCapacity || 3;
    const overrides = config.overrides || {};

    // Generate dates: +3 days from today, 30 days out
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + 3);

    const dates = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];

      const capacity = overrides[dateStr] !== undefined ? overrides[dateStr] : defaultCap;
      const booked = bookingCounts[dateStr] || 0;
      const available = capacity - booked;

      dates.push({
        date: dateStr,
        capacity,
        booked,
        available: Math.max(0, available),
        full: available <= 0,
      });
    }

    return NextResponse.json({
      defaultCapacity: defaultCap,
      overrides,
      dates,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: update date config (admin)
export async function POST(request) {
  try {
    ensureFiles();
    const body = await request.json();

    const current = JSON.parse(fs.readFileSync(DATES_FILE, 'utf-8'));

    if (body.defaultCapacity !== undefined) {
      current.defaultCapacity = body.defaultCapacity;
    }
    if (body.overrides !== undefined) {
      current.overrides = { ...current.overrides, ...body.overrides };
    }

    fs.writeFileSync(DATES_FILE, JSON.stringify(current, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
