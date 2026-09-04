"use client";

import { useState } from "react";

const SLOTS = ["6:30 pm", "7:30 pm", "8:30 pm", "9:30 pm", "10:30 pm"];

export default function ReservationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState("2");
  const [slot, setSlot] = useState(SLOTS[1]);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  function submit() {
    if (!name.trim()) return setProblem("Add a name so we know who the table is for.");
    if (phone.replace(/\D/g, "").length < 10)
      return setProblem("Add a phone number we can reach you on.");
    setProblem(null);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-ink/20 bg-haze/50 p-8 md:p-10">
        <h2 className="font-display text-3xl tracking-tightest">Request received</h2>
        <p className="mt-4 text-ink/75">
          A table for {people} at {slot} under {name}. We will call {phone} within the
          hour to confirm. If you do not hear from us by then, ring the restaurant
          directly.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="eyebrow mt-8 border-b border-ink pb-1"
        >
          Book another table
        </button>
      </div>
    );
  }

  return (
    <div className="border border-ink/20 p-8 md:p-10">
      <h2 className="font-display text-3xl tracking-tightest md:text-4xl">Book a table</h2>
      <p className="mt-3 text-ink/65">
        Bookings open from 6:30 pm. Anything before that is walk-in only.
      </p>

      <div className="mt-8 space-y-6">
        <label className="block">
          <span className="eyebrow text-ink/50">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 outline-none focus:border-ink"
            placeholder="Ayesha Kamal"
          />
        </label>

        <label className="block">
          <span className="eyebrow text-ink/50">Phone</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 font-mono outline-none focus:border-ink"
            placeholder="0300 1234567"
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="eyebrow text-ink/50">People</span>
            <select
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 outline-none focus:border-ink"
            >
              {["1", "2", "3", "4", "5", "6", "7", "8"].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="eyebrow text-ink/50">Time</span>
            <select
              value={slot}
              onChange={(e) => setSlot(e.target.value)}
              className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 outline-none focus:border-ink"
            >
              {SLOTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="eyebrow text-ink/50">Anything we should know</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="mt-2 w-full resize-none border-b border-ink/25 bg-transparent py-2.5 outline-none focus:border-ink"
            placeholder="Counter seats if possible, one guest avoids beef"
          />
        </label>

        {problem && <p className="text-sm text-rose">{problem}</p>}

        <button
          type="button"
          onClick={submit}
          className="eyebrow w-full bg-ink px-6 py-4 text-bg transition-colors hover:bg-bottle"
        >
          Request this table
        </button>
      </div>
    </div>
  );
}
