"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, ArrowUp, RotateCcw } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const OPENERS = [
  "What is Sikandari Raan?",
  "Something not too spicy",
  "Are you open on Monday?",
];

const GREETING: Message = {
  role: "assistant",
  content:
    "I know the menu, the hours, and how things are cooked here. Ask me anything and I will keep it short.",
};

function newSession() {
  return `chowk-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("chowk-session");
    const id = stored ?? newSession();
    if (!stored) window.sessionStorage.setItem("chowk-session", id);
    setSessionId(id);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function send(text: string) {
    const question = text.trim();
    if (!question || pending) return;

    const history = [...messages, { role: "user" as const, content: question }];
    setMessages(history);
    setInput("");
    setError(null);
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: question,
          session_id: sessionId,
          history: history.slice(1, -1).slice(-6),
        }),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      const data = await res.json();
      setMessages([...history, { role: "assistant", content: data.answer }]);
    } catch {
      setError("The kitchen assistant is not answering. Try again, or call us on 021 3584 9002.");
      setMessages(history);
    } finally {
      setPending(false);
    }
  }

  function reset() {
    const id = newSession();
    window.sessionStorage.setItem("chowk-session", id);
    setSessionId(id);
    setMessages([GREETING]);
    setError(null);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close kitchen assistant" : "Ask the kitchen"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-bg shadow-lg transition-transform hover:scale-105 md:bottom-8 md:right-8"
      >
        {open ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-3 z-50 flex h-[min(560px,72vh)] w-[calc(100vw-1.5rem)] flex-col border border-ink/15 bg-bg shadow-2xl sm:w-[24rem] md:bottom-28 md:right-8">
          <div className="board flex items-center justify-between px-5 py-4 text-bg">
            <div>
              <p className="font-display text-lg leading-none">Ask the kitchen</p>
              <p className="eyebrow mt-1.5 text-bg/50">Menu, hours, heat levels</p>
            </div>
            <button
              type="button"
              onClick={reset}
              aria-label="Start a new conversation"
              className="p-1.5 text-bg/60 hover:text-marigold"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] bg-ink px-4 py-2.5 text-[0.95rem] text-bg"
                    : "max-w-[92%] border-l-2 border-marigold pl-3.5 text-[0.95rem] leading-relaxed"
                }
              >
                {m.content}
              </div>
            ))}

            {pending && (
              <div className="flex items-center gap-1.5 border-l-2 border-marigold pl-3.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            )}

            {error && <p className="text-sm text-rose">{error}</p>}

            {messages.length === 1 && !pending && (
              <div className="flex flex-wrap gap-2 pt-2">
                {OPENERS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="border border-ink/20 px-3 py-1.5 text-sm text-ink/70 transition-colors hover:border-ink hover:text-ink"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-ink/15 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send(input);
              }}
              placeholder="Type your question"
              aria-label="Your question"
              className="flex-1 bg-transparent px-2 py-2 text-[0.95rem] outline-none placeholder:text-ink/35"
            />
            <button
              type="button"
              onClick={() => send(input)}
              disabled={pending || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 items-center justify-center bg-ink text-bg disabled:opacity-30"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
