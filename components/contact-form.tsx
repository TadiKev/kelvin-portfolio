"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-3 text-[15px] text-text placeholder:text-muted/70 transition focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.company) return; // Honeypot: real people never see this field.
    if (!data.name?.trim() || !/^\S+@\S+\.\S+$/.test(data.email ?? "") || (data.message ?? "").trim().length < 10) {
      setStatus("error");
      setError("Add your name, a valid email and a message of at least 10 characters.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(site.formspree, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          _replyto: data.email,
          project: data.project,
          budget: data.budget,
          message: data.message,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(`The message didn't send. Email me at ${site.email} or message me on WhatsApp instead.`);
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8" role="status">
        <p className="font-display text-2xl">Message received.</p>
        <p className="mt-2 text-muted">I reply within one working day. For anything urgent, WhatsApp is fastest.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm text-accent underline-offset-4 hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4" aria-describedby={error ? "form-error" : undefined}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted">Name</span>
          <input id="contact-name" name="name" autoComplete="name" required className={fieldClass} />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted">Email</span>
          <input id="contact-email" name="email" type="email" autoComplete="email" required className={fieldClass} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted">What do you need?</span>
          <select id="contact-project" name="project" className={fieldClass} defaultValue="AI feature or assistant">
            <option>AI feature or assistant</option>
            <option>Full web platform</option>
            <option>Dashboard or data product</option>
            <option>Maps or satellite data</option>
            <option>A full-time hire</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-muted">Budget (optional)</span>
          <input id="contact-budget" name="budget" placeholder="e.g. US$2,000–5,000" className={fieldClass} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="text-muted">Tell me about it</span>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="What are you building, who is it for, and when do you need it?"
          className={`${fieldClass} resize-y`}
        />
      </label>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {error && (
        <p id="form-error" role="alert" className="text-sm text-[#e5735f]">
          {error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <span className="text-sm text-muted">Replies within one working day.</span>
      </div>
    </form>
  );
}
