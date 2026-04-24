import { chromium } from 'playwright';

async function checkPage() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  console.log("Navigating to https://transformfit-next.vercel.app...");
  await page.goto('https://transformfit-next.vercel.app', { waitUntil: 'networkidle' });
  
  // Take a screenshot
  await page.screenshot({ path: 'landing-page-screenshot.png', fullPage: true });
  
  // Check computed styles on body
  const bodyStyles = await page.evaluate(() => {
    const style = window.getComputedStyle(document.body);
    return {
      backgroundColor: style.backgroundColor,
      color: style.color,
      fontFamily: style.fontFamily
    };
  });
  console.log("Body styles:", bodyStyles);

  // Check if tailwind classes are working by checking a button
  const buttonStyles = await page.evaluate(() => {
    const btn = document.querySelector('a[href="/dashboard"], button');
    if (!btn) return "No button found";
    const style = window.getComputedStyle(btn);
    return {
      backgroundColor: style.backgroundColor,
      padding: style.padding,
      display: style.display
    };
  });
  console.log("Button styles:", buttonStyles);

  await browser.close();
}

checkPage().catch(console.error);