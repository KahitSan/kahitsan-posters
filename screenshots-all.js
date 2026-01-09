import { chromium } from 'playwright'

async function generateScreenshots() {
  const browser = await chromium.launch({
    headless: true
  })
  const context = await browser.newContext({
    viewport: { width: 720, height: 720 },
    deviceScaleFactor: 2,
  })

  try {
    const page = await context.newPage()
    await page.setDefaultTimeout(30000)

    console.log('Generating cleaning announcement screenshots...')
    await page.goto('http://localhost:5174/announcement/cleaning-jan-10-2026', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/announcements/cleaning-jan-10-2026/light.png',
      fullPage: false,
    })
    console.log('✓ Saved cleaning/light.png')

    await page.goto('http://localhost:5174/announcement/cleaning-jan-10-2026?dark', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/announcements/cleaning-jan-10-2026/dark.png',
      fullPage: false,
    })
    console.log('✓ Saved cleaning/dark.png')

    console.log('Generating holiday closure screenshots...')
    await page.goto('http://localhost:5174/announcement/holiday-closure-2024-2025', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/announcements/holiday-closure-2024-2025/light.png',
      fullPage: false,
    })
    console.log('✓ Saved holiday/light.png')

    await page.goto('http://localhost:5174/announcement/holiday-closure-2024-2025?dark', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/announcements/holiday-closure-2024-2025/dark.png',
      fullPage: false,
    })
    console.log('✓ Saved holiday/dark.png')

    console.log('Generating early closing screenshots...')
    await page.goto('http://localhost:5174/announcement/early-closing-dec-21', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/announcements/early-closing-dec-21/light.png',
      fullPage: false,
    })
    console.log('✓ Saved early-closing/light.png')

    await page.goto('http://localhost:5174/announcement/early-closing-dec-21?dark', { waitUntil: 'networkidle' })
    await page.waitForTimeout(2000)
    
    await page.screenshot({
      path: 'screenshots/announcements/early-closing-dec-21/dark.png',
      fullPage: false,
    })
    console.log('✓ Saved early-closing/dark.png')

    console.log('\n✓ All announcement screenshots generated successfully!')
  } catch (error) {
    console.error('Error generating screenshots:', error)
    process.exit(1)
  } finally {
    await context.close()
    await browser.close()
  }
}

generateScreenshots()
