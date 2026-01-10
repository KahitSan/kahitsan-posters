import { chromium } from 'playwright'

const BASE_URL = 'http://localhost:5176'

async function generateScreenshot(page, url, path) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(3000)
  await page.screenshot({ path, fullPage: false })
}

async function generateScreenshots() {
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--disable-software-rasterizer']
  })

  try {
    console.log('Generating announcement screenshots...')
    
    // Early Closing December 21, 2025 - Light
    console.log('\nEarly Closing - December 21, 2025 (light)...')
    const page1 = await browser.newContext({ viewport: { width: 720, height: 720 }, deviceScaleFactor: 2 }).then(ctx => ctx.newPage())
    await generateScreenshot(page1, `${BASE_URL}/announcement/early-closing-dec-21`, 'screenshots/announcements/early-closing-dec-21-2025/light.png')
    console.log('✓ Saved early-closing-dec-21-2025/light.png')
    await page1.close()

    // Early Closing - Dark
    console.log('Early Closing - December 21, 2025 (dark)...')
    const page2 = await browser.newContext({ viewport: { width: 720, height: 720 }, deviceScaleFactor: 2 }).then(ctx => ctx.newPage())
    await generateScreenshot(page2, `${BASE_URL}/announcement/early-closing-dec-21?dark`, 'screenshots/announcements/early-closing-dec-21-2025/dark.png')
    console.log('✓ Saved early-closing-dec-21-2025/dark.png')
    await page2.close()

    // Holiday Closure - Light
    console.log('\nHoliday Closure 2024-2025 (light)...')
    const page3 = await browser.newContext({ viewport: { width: 720, height: 720 }, deviceScaleFactor: 2 }).then(ctx => ctx.newPage())
    await generateScreenshot(page3, `${BASE_URL}/announcement/holiday-closure-2024-2025`, 'screenshots/announcements/holiday-closure-2024-2025/light.png')
    console.log('✓ Saved holiday-closure-2024-2025/light.png')
    await page3.close()

    // Holiday Closure - Dark
    console.log('Holiday Closure 2024-2025 (dark)...')
    const page4 = await browser.newContext({ viewport: { width: 720, height: 720 }, deviceScaleFactor: 2 }).then(ctx => ctx.newPage())
    await generateScreenshot(page4, `${BASE_URL}/announcement/holiday-closure-2024-2025?dark`, 'screenshots/announcements/holiday-closure-2024-2025/dark.png')
    console.log('✓ Saved holiday-closure-2024-2025/dark.png')
    await page4.close()

    // Inner Area - Light
    console.log('\nInner Area Schedule - January 2026 (light)...')
    const page5 = await browser.newContext({ viewport: { width: 720, height: 720 }, deviceScaleFactor: 2 }).then(ctx => ctx.newPage())
    await generateScreenshot(page5, `${BASE_URL}/announcement/inner-area-schedule-jan-2026`, 'screenshots/announcements/inner-area-schedule-jan-2026/light.png')
    console.log('✓ Saved inner-area-schedule-jan-2026/light.png')
    await page5.close()

    // Inner Area - Dark
    console.log('Inner Area Schedule - January 2026 (dark)...')
    const page6 = await browser.newContext({ viewport: { width: 720, height: 720 }, deviceScaleFactor: 2 }).then(ctx => ctx.newPage())
    await generateScreenshot(page6, `${BASE_URL}/announcement/inner-area-schedule-jan-2026?dark`, 'screenshots/announcements/inner-area-schedule-jan-2026/dark.png')
    console.log('✓ Saved inner-area-schedule-jan-2026/dark.png')
    await page6.close()

    // Cleaning - Light
    console.log('\nCleaning Announcement - January 10, 2026 (light)...')
    const page7 = await browser.newContext({ viewport: { width: 720, height: 720 }, deviceScaleFactor: 2 }).then(ctx => ctx.newPage())
    await generateScreenshot(page7, `${BASE_URL}/announcement/cleaning-jan-10-2026`, 'screenshots/announcements/cleaning-jan-10-2026/light.png')
    console.log('✓ Saved cleaning-jan-10-2026/light.png')
    await page7.close()

    // Cleaning - Dark
    console.log('Cleaning Announcement - January 10, 2026 (dark)...')
    const page8 = await browser.newContext({ viewport: { width: 720, height: 720 }, deviceScaleFactor: 2 }).then(ctx => ctx.newPage())
    await generateScreenshot(page8, `${BASE_URL}/announcement/cleaning-jan-10-2026?dark`, 'screenshots/announcements/cleaning-jan-10-2026/dark.png')
    console.log('✓ Saved cleaning-jan-10-2026/dark.png')
    await page8.close()

    console.log('\n✓ All announcement screenshots generated successfully!')
  } catch (error) {
    console.error('Error generating screenshots:', error)
    throw error
  } finally {
    await browser.close()
  }
}

generateScreenshots()
