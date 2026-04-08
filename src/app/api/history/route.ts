import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = "/tmp/traductor-data";
const HISTORY_FILE = path.join(DATA_DIR, "history.json");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readHistory(): Promise<unknown[]> {
  try {
    const data = await fs.readFile(HISTORY_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeHistory(history: unknown[]) {
  await ensureDir();
  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
}

export async function GET() {
  const history = await readHistory();
  return NextResponse.json(history);
}

export async function POST(req: NextRequest) {
  const entry = await req.json();
  const history = await readHistory();
  history.unshift({ ...entry, ts: new Date().toISOString() });
  // Keep last 500 entries
  if (history.length > 500) history.length = 500;
  await writeHistory(history);
  return NextResponse.json({ ok: true });
}
