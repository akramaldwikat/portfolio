import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
const contactOrigin = process.env.TEST_SITE_ORIGIN || base;
assert.ok(
  ["localhost", "127.0.0.1", "[::1]"].includes(new URL(base).hostname),
  "Smoke checks are local-only and must not submit to a live site.",
);
const paths = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/projects/flowdesk",
  "/contact",
];
const documents = new Map();
const flowdeskImages = [
  "dashboard-desktop",
  "clients-desktop",
  "projects-desktop",
  "project-detail-desktop",
  "task-board-desktop",
  "team-members-desktop",
  "activity-desktop",
  "project-detail-mobile",
].map((name) => `/flowdesk/${name}.jpg`);
let linkCount = 0;
for (const prefix of ["", "/ar"]) {
  for (const path of paths) {
    const route = prefix + (path === "/" && prefix ? "" : path);
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    documents.set(route, html);
    assert.match(
      html,
      new RegExp(`<html[^>]*lang="${prefix ? "ar" : "en"}"`),
      `${route} language`,
    );
    assert.match(
      html,
      new RegExp(`<html[^>]*dir="${prefix ? "rtl" : "ltr"}"`),
      `${route} direction`,
    );
    assert.equal(
      (html.match(/<h1[ >]/g) || []).length,
      1,
      `${route} single h1`,
    );
    for (const marker of [
      'name="description"',
      'rel="canonical"',
      'hrefLang="en"',
      'hrefLang="ar"',
      'property="og:title"',
      'name="twitter:card"',
    ])
      assert.ok(html.includes(marker), `${route} missing ${marker}`);
    assert.ok(!html.toLowerCase().includes("lorem ipsum"));
  }
}
for (const path of ["/contact", "/ar/contact"]) {
  const html = documents.get(path);
  assert.match(
    html,
    /<fieldset[^>]*disabled/,
    `${path} must be an unconfigured local fixture`,
  );
  assert.match(
    html,
    /<button\b(?=[^>]*class="[^"]*form-submit)(?=[^>]*disabled)[^>]*>/,
    `${path} submission must be disabled before HTTP delivery checks`,
  );
  for (const url of [
    "mailto:akram.aldwikat1@gmail.com",
    "https://github.com/akramaldwikat",
    "https://www.linkedin.com/in/akram-aldwikat/",
    "https://wa.me/962779103342",
  ])
    assert.ok(
      html.includes(`href="${url}"`),
      `${path} configured public contact ${url}`,
    );
}
for (const path of [
  "/",
  "/ar",
  "/projects",
  "/ar/projects",
  "/projects/flowdesk",
  "/ar/projects/flowdesk",
]) {
  const html = documents.get(path);
  const arabic = path.startsWith("/ar");
  assert.ok(
    html.includes(
      arabic
        ? "مشروع تجريبي مستقل مكتمل"
        : "Completed Independent Demo Project",
    ),
    path,
  );
  assert.doesNotMatch(
    html,
    /application development in progress|تطوير التطبيق لم يكتمل|flowdesk-concept\.svg/i,
  );
  for (const url of [
    "https://flowdesk-web-8atx.onrender.com/",
    "https://github.com/akramaldwikat/flowDesk",
  ]) {
    const link = [...html.matchAll(/<a\b[^>]*>/g)].find(([tag]) =>
      tag.includes(`href="${url}"`),
    )?.[0];
    assert.ok(link, `${path} external link ${url}`);
    assert.match(link, /target="_blank"/);
    assert.match(link, /rel="noopener noreferrer"/);
  }
  if (!path.endsWith("/flowdesk")) continue;
  for (const id of [
    "overview",
    "problem",
    "features",
    "screenshots",
    "roles",
    "tenancy",
    "workflow",
    "architecture",
    "database",
    "decisions",
    "security",
    "testing",
    "hosted-validation",
    "limitations",
  ])
    assert.ok(html.includes(`id="${id}"`), `${path} section ${id}`);
  for (const image of flowdeskImages)
    assert.ok(html.includes(`href="${image}"`), `${path} screenshot ${image}`);
  assert.match(html, /54/);
  assert.match(html, /Neon PostgreSQL/);
}
for (const [path, html] of documents) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), base + path);
    if (url.origin !== new URL(base).origin) continue;
    if (flowdeskImages.includes(url.pathname)) {
      linkCount++;
      continue;
    }
    const target = documents.get(url.pathname);
    assert.ok(target, `Unknown internal route from ${path}: ${url.pathname}`);
    if (url.hash)
      assert.ok(
        target.includes(`id="${url.hash.slice(1)}"`),
        `Missing anchor: ${url.href}`,
      );
    linkCount++;
  }
}
for (const path of [
  "/does-not-exist",
  "/ar/does-not-exist",
  "/projects/commercekit",
  "/ar/projects/clientpilot",
  "/missing.png",
]) {
  const res = await fetch(base + path);
  assert.equal(res.status, 404, `${path} real 404`);
  assert.match(await res.text(), /noindex/);
}
const sitemap = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemap.status, 200);
assert.equal(((await sitemap.text()).match(/<loc>/g) || []).length, 12);
const robots = await fetch(`${base}/robots.txt`);
assert.equal(robots.status, 200);
assert.match(await robots.text(), /Sitemap:/);
for (const path of [
  "/opengraph-image",
  "/ar/opengraph-image",
  "/icon.svg",
  ...flowdeskImages,
]) {
  const res = await fetch(base + path);
  assert.equal(res.status, 200, path);
  assert.match(res.headers.get("content-type"), /image\//);
}
const post = async (data, origin = contactOrigin) =>
  fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
assert.equal((await post({}, "https://other.example")).status, 403);
assert.equal((await post({})).status, 400);
const unconfigured = await post({
  name: "QA Example",
  email: "qa@example.com",
  type: "0",
  budget: "0",
  description: "A local QA inquiry that must never be delivered.",
  locale: "en",
});
assert.equal(unconfigured.status, 503);
assert.equal((await unconfigured.json()).code, "not-configured");
console.log(
  `PASS: 12 localized pages, ${linkCount} internal links and anchors, FlowDesk sections, screenshots and external CTAs, disabled unconfigured forms, 5 genuine 404s, sitemap, robots, social images and contact HTTP safeguards.`,
);
