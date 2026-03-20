import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_FILE = path.join(process.cwd(), 'data', 'webhook-config.json');

function ensureFile() {
  const dir = path.dirname(CONFIG_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ webhookUrl: '' }), 'utf-8');
  }
}

// GET: read webhook config
export async function GET() {
  try {
    ensureFile();
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    return NextResponse.json(config);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: save webhook config
export async function POST(request) {
  try {
    ensureFile();
    const body = await request.json();
    const config = { webhookUrl: body.webhookUrl || '' };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
