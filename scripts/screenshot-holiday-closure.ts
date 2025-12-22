import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import { join } from 'path'

const BASE_URL = 'http://localhost:5173'
const SCREENSHOT_DIR = 'screenshots/announcements/holiday-closure-2024-2025'

async function generateScreenshots() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 2,
  })

  try {
    await mkdir(SCREENSHOT_DIR, { recursive: true })

    const page = await context.newPage()

    console.log('Generating light mode screenshot...')
    await page.goto(`${BASE_URL}/announcement/holiday-closure-2024-2025`)
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: join(SCREENSHOT_DIR, 'light.png'),
      fullPage: false,
    })
    console.log(`✓ Saved to ${SCREENSHOT_DIR}/light.png`)

    console.log('Generating dark mode screenshot...')
    await page.goto(`${BASE_URL}/announcement/holiday-closure-2024-2025?dark`)
    await page.waitForLoadState('networkidle')
    await page.screenshot({
      path: join(SCREENSHOT_DIR, 'dark.png'),
      fullPage: false,
    })
    console.log(`✓ Saved to ${SCREENSHOT_DIR}/dark.png`)

    console.log('\n✓ All screenshots generated successfully!')
  } catch (error) {
    console.error('Error generating screenshots:', error)
    throw error
  } finally {
    await browser.close()
  }
}

generateScreenshots()
