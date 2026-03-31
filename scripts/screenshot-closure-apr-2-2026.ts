import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import { join } from 'path'

const BASE_URL = process.env.POSTER_URL || 'http://10.200.227.2:5174'
const SCREENSHOT_DIR = 'screenshots/announcements/closure-apr-2-2026'

async function generateScreenshots() {
    const browser = await chromium.launch()
    const context = await browser.newContext({
        viewport: { width: 1200, height: 1200 },
        deviceScaleFactor: 2,
    })

    try {
        await mkdir(SCREENSHOT_DIR, { recursive: true })

        const page = await context.newPage()

        console.log('Generating light mode screenshot...')
        await page.goto(`${BASE_URL}/announcement/closure-apr-2-2026`)
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(2000)

        const poster = page.locator('#poster')
        await poster.screenshot({
            path: join(SCREENSHOT_DIR, 'light.png'),
        })
        console.log(`Saved to ${SCREENSHOT_DIR}/light.png`)

        console.log('Generating dark mode screenshot...')
        await page.goto(`${BASE_URL}/announcement/closure-apr-2-2026?dark`)
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(2000)

        await poster.screenshot({
            path: join(SCREENSHOT_DIR, 'dark.png'),
        })
        console.log(`Saved to ${SCREENSHOT_DIR}/dark.png`)

        console.log('\\nAll screenshots generated successfully!')
        console.log(`Output: ${SCREENSHOT_DIR}/light.png (1:1 aspect ratio)`)
        console.log(`Output: ${SCREENSHOT_DIR}/dark.png (1:1 aspect ratio)`)
    } catch (error) {
        console.error('Error generating screenshots:', error)
        throw error
    } finally {
        await browser.close()
    }
}

generateScreenshots()
