import { test } from "node:test";
import assert from "node:assert/strict";
import { contactSchema, localRateLimit } from "../src/lib/contact";
import { safeUrl } from "../src/lib/site";

const valid = {
  name: "Example Person",
  email: "person@example.com",
  company: "",
  type: "1",
  budget: "0",
  description: "A test inquiry about an internal business application.",
  website: "",
  locale: "en",
};
test("accepts English and Arabic inquiries and flexible budget", () => {
  assert.equal(contactSchema.safeParse(valid).success, true);
  assert.equal(
    contactSchema.safeParse({
      ...valid,
      locale: "ar",
      name: "اسم تجريبي",
      description: "هذا وصف تجريبي لمشروع نظام إدارة أعمال داخلي.",
    }).success,
    true,
  );
});
test("rejects invalid email, short descriptions, unknown options and honeypot", () => {
  for (const patch of [
    { email: "bad" },
    { name: " " },
    { description: "short" },
    { description: "x".repeat(5001) },
    { type: "999" },
    { budget: "999" },
    { website: "spam.example" },
    { locale: "fr" },
  ]) {
    assert.equal(
      contactSchema.safeParse({ ...valid, ...patch }).success,
      false,
    );
  }
});
test("rate limit blocks sixth attempt, isolates keys and resets after window", () => {
  const now = Date.now();
  const key = crypto.randomUUID();
  for (let i = 0; i < 5; i++) assert.equal(localRateLimit(key, now), true);
  assert.equal(localRateLimit(key, now), false);
  assert.equal(localRateLimit(`${key}-other`, now), true);
  assert.equal(localRateLimit(key, now + 600_001), true);
});
test("external link config accepts only absolute HTTPS URLs", () => {
  assert.equal(safeUrl("javascript:alert(1)"), undefined);
  assert.equal(safeUrl("http://unsafe.example"), undefined);
  assert.equal(safeUrl("not a URL"), undefined);
  assert.equal(
    safeUrl("https://github.com/example"),
    "https://github.com/example",
  );
});
