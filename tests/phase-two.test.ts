import { test } from "node:test";
import assert from "node:assert/strict";
import { isContactConfigured } from "../src/lib/contact-config";
import { contactSchema, inquiryTypeFromQuery } from "../src/lib/contact-schema";
import { siteOrigin, normalizePhone } from "../src/lib/site";
import { services } from "../src/data/services";
import { formCopy } from "../src/data/contact-copy";

const configured = {
  NEXT_PUBLIC_SITE_URL: "https://portfolio.example",
  RESEND_API_KEY: "test-only-key",
  CONTACT_FROM: "test@example.com",
  CONTACT_TO: "recipient@example.com",
  UPSTASH_REDIS_REST_URL: "https://redis.example",
  UPSTASH_REDIS_REST_TOKEN: "test-only-token",
};
test("contact availability fails closed for each missing delivery dependency", () => {
  assert.equal(isContactConfigured(configured), true);
  for (const key of Object.keys(configured)) {
    assert.equal(isContactConfigured({ ...configured, [key]: "" }), false, key);
  }
  assert.equal(
    isContactConfigured({
      ...configured,
      NEXT_PUBLIC_SITE_URL: "https://portfolio.example/subpath",
    }),
    false,
  );
  assert.equal(
    isContactConfigured({
      ...configured,
      UPSTASH_REDIS_REST_URL: "http://redis.example",
    }),
    false,
  );
});
test("canonical origins reject paths, credentials, queries and fragments", () => {
  assert.equal(
    siteOrigin("https://portfolio.example/"),
    "https://portfolio.example",
  );
  for (const url of [
    "http://portfolio.example",
    "https://portfolio.example/about",
    "https://portfolio.example?tracking=1",
    "https://portfolio.example/#section",
    "https://user:password@portfolio.example",
  ])
    assert.equal(siteOrigin(url), undefined, url);
});
test("service inquiry query accepts only supported single IDs", () => {
  for (const value of ["0", "1", "2", "3", "4", "5", "6"])
    assert.equal(inquiryTypeFromQuery(value), value);
  for (const value of [null, "", "7", "01", "-1", "0&extra=1", "backend"])
    assert.equal(inquiryTypeFromQuery(value), undefined);
});
test("all service links map to the intended form categories in both languages", () => {
  assert.deepEqual(
    services.en.map((s) => s.inquiryType),
    ["0", "1", "2", "3", "4", "5"],
  );
  assert.deepEqual(
    services.ar.map((s) => s.inquiryType),
    services.en.map((s) => s.inquiryType),
  );
  assert.match(
    formCopy.en.types[Number(services.en[4].inquiryType)],
    /Integration/,
  );
  assert.match(
    formCopy.en.types[Number(services.en[5].inquiryType)],
    /improvement/,
  );
  assert.equal(formCopy.en.types.length, formCopy.ar.types.length);
});
test("expanded form accepts other projects and every flexible budget option", () => {
  for (const locale of ["en", "ar"])
    for (const budget of ["0", "1", "2", "3", "4"]) {
      assert.equal(
        contactSchema.safeParse({
          name: "Test Person",
          email: "test@example.com",
          type: "6",
          budget,
          locale,
          description:
            "A test inquiry with enough detail to explain the project.",
        }).success,
        true,
      );
    }
});
test("WhatsApp numbers normalize international prefixes and reject link injection", () => {
  assert.equal(normalizePhone("00962779103342"), "+962779103342");
  assert.equal(normalizePhone("+962 (77) 910-3342"), "+962779103342");
  for (const invalid of [
    "079",
    "javascript:alert(1)",
    "+962779103342?text=spam",
    "+0123456789",
  ])
    assert.equal(normalizePhone(invalid), undefined);
});
