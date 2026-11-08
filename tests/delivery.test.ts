import { test } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

test("contact endpoint enforces boundaries and confirms provider acceptance", async () => {
  const previous = { ...process.env };
  const originalFetch = globalThis.fetch;
  process.env.NEXT_PUBLIC_SITE_URL = "https://portfolio.example";
  process.env.RESEND_API_KEY = "test-only-key";
  process.env.CONTACT_FROM = "test@example.com";
  process.env.CONTACT_TO = "recipient@example.com";
  process.env.UPSTASH_REDIS_REST_URL = "https://redis.example";
  process.env.UPSTASH_REDIS_REST_TOKEN = "test-only-token";
  const { POST } = await import("../src/app/api/contact/route");
  const data = {
    name: "Test Person",
    email: "test@example.com",
    company: "",
    type: "0",
    budget: "0",
    description: "Test project details for validating the endpoint.",
    website: "",
    locale: "en",
  };
  const origin =
    process.env.NODE_ENV === "production"
      ? "https://portfolio.example"
      : "http://localhost:3000";
  const request = (body: unknown, overrides: Record<string, string> = {}) =>
    new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { origin, "content-type": "application/json", ...overrides },
      body: JSON.stringify(body),
    });
  try {
    globalThis.fetch = async () => {
      throw new Error("Unexpected network access");
    };
    assert.equal(
      (await POST(request(data, { origin: "https://other.example" }))).status,
      403,
    );
    assert.equal(
      (await POST(request(data, { "content-type": "text/plain" }))).status,
      415,
    );
    assert.equal(
      (await POST(request({ ...data, email: "invalid" }))).status,
      400,
    );
    assert.equal(
      (await POST(request({ ...data, website: "spam" }))).status,
      400,
    );
    assert.equal(
      (await POST(request({ ...data, description: "x".repeat(21_000) })))
        .status,
      413,
    );
    delete process.env.RESEND_API_KEY;
    const unconfigured = await POST(request(data));
    assert.equal(unconfigured.status, 503);
    assert.equal((await unconfigured.json()).code, "not-configured");
    process.env.RESEND_API_KEY = "test-only-key";
    let emailCalls = 0;
    globalThis.fetch = async (input, init) => {
      if (String(input).includes("redis.example"))
        return Response.json({ result: 1 });
      assert.equal(String(input), "https://api.resend.com/emails");
      const payload = JSON.parse(String(init?.body));
      assert.equal(payload.reply_to, data.email);
      assert.ok(payload.text.includes(data.description));
      emailCalls++;
      return Response.json({ id: "test-provider-acceptance" });
    };
    const sent = await POST(request(data));
    assert.equal(sent.status, 200);
    assert.equal((await sent.json()).code, "sent");
    assert.equal(emailCalls, 1);
    globalThis.fetch = async (input) =>
      String(input).includes("redis.example")
        ? Response.json({ result: 6 })
        : Promise.reject(new Error("Must not deliver"));
    assert.equal((await POST(request(data))).status, 429);
    globalThis.fetch = async (input) =>
      String(input).includes("redis.example")
        ? Response.json({ result: 1 })
        : Response.json({ error: "rejected" }, { status: 403 });
    assert.equal((await POST(request(data))).status, 502);
    globalThis.fetch = async (input) =>
      String(input).includes("redis.example")
        ? Response.json({ result: 1 })
        : Response.json({});
    assert.equal((await POST(request(data))).status, 502);
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of Object.keys(process.env))
      if (!(key in previous)) delete process.env[key];
    Object.assign(process.env, previous);
  }
});
