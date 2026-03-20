import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createCalendarEvent } from '@/lib/google-calendar';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'registrations.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
  }
}

function readRegistrations() {
  ensureDataDir();
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeRegistrations(data) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET: list all registrations
export async function GET() {
  try {
    const data = readRegistrations();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: add a registration + trigger webhook + create Google Calendar event
export async function POST(request) {
  try {
    const body = await request.json();
    const record = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type: body.type || 'unknown',
      name: body.name || '',
      email: body.email || '',
      phone: body.phone || '',
      company: body.company || '',
      team_size: body.team_size || '',
      preferred_date: body.preferred_date || '',
      preferred_slot: body.preferred_slot || '',
      event_date: body.event_date || '',
      created_at: new Date().toISOString(),
    };

    // Persist
    const data = readRegistrations();
    data.push(record);
    writeRegistrations(data);

    // Trigger webhook (fire-and-forget)
    triggerWebhook(record).catch((e) => console.error('Webhook error:', e));

    // Create Google Calendar event for enterprise consultations (fire-and-forget)
    if (record.type === 'enterprise_consult' && record.preferred_date && record.preferred_slot) {
      createCalendarEvent({
        date: record.preferred_date,
        slot: record.preferred_slot,
        name: record.name,
        email: record.email,
        company: record.company,
        phone: record.phone,
        teamSize: record.team_size,
      }).catch((e) => console.error('Calendar event creation error:', e));
    }

    return NextResponse.json({ success: true, id: record.id });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

async function triggerWebhook(record) {
  const CONFIG_FILE = path.join(DATA_DIR, 'webhook-config.json');
  if (!fs.existsSync(CONFIG_FILE)) return;

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  const url = config.webhookUrl;
  if (!url) return;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'new_registration',
      data: record,
      timestamp: new Date().toISOString(),
    }),
  });
}
