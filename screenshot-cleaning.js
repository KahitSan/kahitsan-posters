import { chromium } from 'playwright'

async function generateScreenshots() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 720, height: 720 },
    deviceScaleFactor: 2,
  })

  try {
    const page = await context.newPage()

    console.log('Generating light mode screenshot...')
    await page.goto('http://localhost:5174/announcement/cleaning-jan-10-2026')
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: 'screenshots/announcements/cleaning-jan-10-2026/light.png',
      fullPage: false,
    })
    console.log('✓ Saved to screenshots/announcements/cleaning-jan-10-2026/light.png')

    console.log('Generating dark mode screenshot...')
    await page.goto('http://localhost:5174/announcement/cleaning-jan-10-2026?dark')
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: 'screenshots/announcements/cleaning-jan-10-2026/dark.png',
      fullPage: false,
    })
    console.log('✓ Saved to screenshots/announcements/cleaning-jan-10-2026/dark.png')

    console.log('\n✓ All screenshots generated successfully!')
  } catch (error) {
    console.error('Error generating screenshots:', error)
    throw error
  } finally {
    await browser.close()
  }
}

generateScreenshots()
