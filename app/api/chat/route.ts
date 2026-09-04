import { NextResponse } from "next/server";

export const runtime = "nodejs";

const API = process.env.CHAT_API_URL ?? "http://127.0.0.1:8000";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body." }, { status: 400 });
  }

  const { query, session_id, history } = payload as {
    query?: string;
    session_id?: string;
    history?: { role: string; content: string }[];
  };

  if (!query?.trim()) {
    return NextResponse.json({ error: "Ask a question first." }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${API}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, session_id, history: history ?? [] }),
      signal: AbortSignal.timeout(30000),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "The assistant is unavailable right now." },
        { status: 502 }
      );
    }

    return NextResponse.json(await upstream.json());
  } catch {
    return NextResponse.json(
      { error: "Could not reach the assistant. Call 021 3584 9002 instead." },
      { status: 503 }
    );
  }
}
