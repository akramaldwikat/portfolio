"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, inquiryTypeFromQuery } from "@/lib/contact-schema";
import { formCopy } from "@/data/contact-copy";
import type { Locale } from "@/lib/site";

export function ContactForm({
  locale,
  enabled,
  email,
  whatsappUrl,
}: {
  locale: Locale;
  enabled: boolean;
  email?: string;
  whatsappUrl?: string;
}) {
  const t = formCopy[locale];
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState("");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const feedback = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const locked = useRef(false);
  useEffect(() => {
    const service = inquiryTypeFromQuery(
      new URLSearchParams(window.location.search).get("service"),
    );
    const field = formRef.current?.elements.namedItem("type");
    if (service && field instanceof HTMLSelectElement) field.value = service;
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!enabled) {
      setStatus(t.setup);
      return;
    }
    if (locked.current) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = contactSchema.safeParse({ ...data, locale });
    if (!parsed.success) {
      const fields = Object.fromEntries(
        parsed.error.issues.map((issue) => [String(issue.path[0]), true]),
      );
      setErrors(fields);
      setStatus(t.invalid);
      setSent(false);
      const first = parsed.error.issues[0]?.path[0];
      if (first)
        (form.elements.namedItem(String(first)) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setStatus("");
    setSent(false);
    locked.current = true;
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(20_000),
      });
      const result = (await res.json()) as { code: string };
      if (res.ok && result.code === "sent") {
        setStatus(t.success);
        setSent(true);
        form.reset();
      } else
        setStatus(
          result.code === "not-configured"
            ? t.setup
            : res.status === 429
              ? t.rate
              : t.error,
        );
    } catch {
      setStatus(t.offline);
    } finally {
      locked.current = false;
      setPending(false);
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }
  const fieldError = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {t.errors[name as keyof typeof t.errors] || t.fieldError}
      </span>
    ) : null;
  const aria = (name: string) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby":
      [
        errors[name] ? `${name}-error` : "",
        name === "budget" ? "budget-hint" : "",
        name === "description" ? "description-hint" : "",
      ]
        .filter(Boolean)
        .join(" ") || undefined,
  });
  return (
    <form
      className="contact-form"
      id="inquiry"
      ref={formRef}
      noValidate
      onSubmit={submit}
      aria-busy={pending}
    >
      {!enabled && (
        <div className="contact-availability" role="status">
          <AlertCircle size={22} aria-hidden="true" />
          <div>
            <strong>{t.unavailableTitle}</strong>
            <p>{t.setup}</p>
            {email && (
              <a className="text-link" href={`mailto:${email}`}>
                {t.emailAlternative}
              </a>
            )}
            {whatsappUrl && (
              <a
                className="text-link"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.whatsappAlternative}
                <ArrowUpRight
                  size={16}
                  className="directional"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>
        </div>
      )}
      <p className="form-note">{t.required}</p>
      <fieldset className="inquiry-fields" disabled={!enabled || pending}>
        <legend className="sr-only">{t.submit}</legend>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">{t.name} *</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              {...aria("name")}
            />
            {fieldError("name")}
          </div>
          <div className="field">
            <label htmlFor="email">{t.email} *</label>
            <input
              id="email"
              name="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              required
              maxLength={254}
              {...aria("email")}
            />
            {fieldError("email")}
          </div>
          <div className="field full">
            <label htmlFor="company">
              {t.company} <span>({t.optional})</span>
            </label>
            <input
              id="company"
              name="company"
              autoComplete="organization"
              maxLength={150}
              {...aria("company")}
            />
            {fieldError("company")}
          </div>
          <div className="field">
            <label htmlFor="type">{t.type} *</label>
            <select
              id="type"
              name="type"
              required
              defaultValue=""
              {...aria("type")}
            >
              <option value="" disabled>
                {t.choose}
              </option>
              {t.types.map((v, i) => (
                <option key={v} value={i}>
                  {v}
                </option>
              ))}
            </select>
            {fieldError("type")}
          </div>
          <div className="field">
            <label htmlFor="budget">{t.budget} *</label>
            <select
              id="budget"
              name="budget"
              required
              defaultValue="0"
              {...aria("budget")}
            >
              {t.budgets.map((v, i) => (
                <option key={v} value={i}>
                  {v}
                </option>
              ))}
            </select>
            {fieldError("budget")}
            <p id="budget-hint" className="field-hint">
              {t.budgetHint}
            </p>
          </div>
          <div className="field full">
            <label htmlFor="description">{t.description} *</label>
            <textarea
              id="description"
              name="description"
              required
              minLength={20}
              maxLength={5000}
              rows={6}
              placeholder={t.placeholder}
              {...aria("description")}
            />
            {fieldError("description")}
            <p id="description-hint" className="field-hint">
              {t.descriptionHint}
            </p>
          </div>
        </div>
      </fieldset>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        className="button form-submit"
        type="submit"
        disabled={pending || !enabled}
        aria-describedby={!enabled ? "contact-unavailable" : undefined}
      >
        {!enabled ? t.unavailableButton : pending ? t.sending : t.submit}
        <ArrowUpRight size={17} className="directional" />
      </button>
      {!enabled && (
        <p id="contact-unavailable" className="sr-only">
          {t.setup}
        </p>
      )}
      <p className="privacy-note">{t.privacy}</p>
      <div
        className={`form-feedback ${sent ? "success" : ""}`}
        role="status"
        aria-live="polite"
        ref={feedback}
        tabIndex={-1}
      >
        {status && (
          <>
            {sent ? <CheckCircle2 size={19} /> : <AlertCircle size={19} />}
            <span>{status}</span>
          </>
        )}
      </div>
    </form>
  );
}
