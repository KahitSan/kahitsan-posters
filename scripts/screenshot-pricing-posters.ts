import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import { join } from 'path'

const BASE_URL = process.env.POSTER_URL || 'http://10.200.227.2:5174'
const SCREENSHOT_DIR = 'screenshots/pricing'

const posters = [
    { name: 'daily', path: '/pricing/daily' },
    { name: 'premium', path: '/pricing/premium' },
    { name: 'partners', path: '/pricing/partners' }
]

async function generateScreenshots() {
    const browser = await chromium.launch()
    const context = await browser.newContext({
        viewport: { width: 1200, height: 1200 },
        deviceScaleFactor: 2,
    })

    try {
        await mkdir(SCREENSHOT_DIR, { recursive: true })
        const page = await context.newPage()

        for (const poster of posters) {
            console.log(`Generating screenshots for ${poster.name}...`)

            // Light mode
            console.log(`  - Light mode`)
            await page.goto(`${BASE_URL}${poster.path}`)
            await page.waitForLoadState('networkidle')
            await page.waitForTimeout(2000) // Wait for fonts and animations
            const posterEl = page.locator('#poster')
            await posterEl.screenshot({ path: join(SCREENSHOT_DIR, `${poster.name}-light.png`) })

            // Dark mode
            console.log(`  - Dark mode`)
            await page.goto(`${BASE_URL}${poster.path}?dark`)
            await page.waitForLoadState('networkidle')
            await page.waitForTimeout(2000)
            await posterEl.screenshot({ path: join(SCREENSHOT_DIR, `${poster.name}-dark.png`) })
        }

        console.log('All pricing screenshots generated successfully!')
    } catch (error) {
        console.error('Error generating screenshots:', error)
        process.exit(1)
    } finally {
        await browser.close()
    }
}

generateScreenshots()
