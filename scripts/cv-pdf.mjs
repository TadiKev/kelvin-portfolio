// Renders /cv from a running site into public/cv.pdf (A4, print styles).
// Usage: start the site (npm run build && npm start), then: npm run cv:pdf [base-url]
// Needs Playwright with Chromium: npm i -D playwright && npx playwright install chromium
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`${base}/cv`, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
// Scaled slightly so the whole CV fits one A4 page.
await page.pdf({ path: "public/cv.pdf", format: "A4", printBackground: true, preferCSSPageSize: true, scale: 0.88 });
await browser.close();
console.log("Wrote public/cv.pdf");
