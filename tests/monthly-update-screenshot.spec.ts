import { test } from '@playwright/test'
import sharp from 'sharp'
import fs from 'fs'

async function captureMonthlyUpdateScreenshot(
  page: any,
  mode: 'light' | 'dark',
  outputPath: string
) {
  const url = mode === 'dark'
    ? '/print/monthly-update/oct-2025-p1?dark'
    : '/print/monthly-update/oct-2025-p1'

  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.waitForSelector('text=Monthly Update')
  await page.waitForSelector('img[alt="KahitSan Logo"]')
  await page.waitForSelector('img[alt="UAPSA BISCAST Logo"]')

  // Wait for dynamic width calculation to complete
  await page.waitForFunction(() => {
    const container = document.querySelector('.max-w-2xl')
    if (!container) return false

    const style = window.getComputedStyle(container)
    const width = style.getPropertyValue('max-width')

    // Check if max-width has been computed and is reasonable (not 'auto' and has pixel value)
    return width !== 'auto' && width !== '' && width.includes('px') && parseInt(width) > 0
  })

  // Additional wait to ensure layout has settled
  await page.waitForTimeout(1000)

  // Capture the entire monthly update section
  const section = page.locator('section').first()
  const buffer = await section.screenshot()

  // Create a square canvas with proper dimensions (following pricing-screenshot.spec.ts pattern)
  const sectionImage = sharp(buffer)
  const meta = await sectionImage.metadata()

  const gap = 0 // No gap since we're only capturing one section
  const sideMargin = 40

  // Calculate content dimensions
  const contentHeight = meta.height || 0
  const contentWidth = meta.width || 0

  // Calculate 1:1 aspect ratio (square) canvas size
  const squareSize = Math.max(contentHeight, contentWidth) + (sideMargin * 2)

  // Ensure buffer fits within canvas (prevent overflow)
  const maxHeight = squareSize - (sideMargin * 2)
  const maxWidth = squareSize - (sideMargin * 2)

  // If content is larger than available space, scale it down
  const scaleFactor = Math.min(maxHeight / contentHeight, maxWidth / contentWidth, 1)
  const scaledHeight = Math.floor(contentHeight * scaleFactor)
  const scaledWidth = Math.floor(contentWidth * scaleFactor)

  // Calculate centering offsets
  const verticalOffset = Math.floor((squareSize - scaledHeight) / 2)
  const horizontalOffset = Math.floor((squareSize - scaledWidth) / 2)

  // Resize the section screenshot if needed to fit canvas
  const resizedBuffer = scaleFactor < 1
    ? await sectionImage.resize(scaledWidth, scaledHeight).png().toBuffer()
    : buffer

  // Create 1:1 square image with content centered
  await sharp({
    create: {
      width: squareSize,
      height: squareSize,
      channels: 4,
      background: mode === 'dark' ? { r: 10, g: 10, b: 10, alpha: 1 } : { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      {
        input: resizedBuffer,
        top: verticalOffset,
        left: horizontalOffset
      }
    ])
    .png()
    .toFile(outputPath)
}

test.describe('Monthly Update Print Page Screenshot', () => {
  test.beforeAll(() => {
    // Create directories if they don't exist
    if (!fs.existsSync('screenshots/monthly-update/light')) {
      fs.mkdirSync('screenshots/monthly-update/light', { recursive: true })
    }
    if (!fs.existsSync('screenshots/monthly-update/dark')) {
      fs.mkdirSync('screenshots/monthly-update/dark', { recursive: true })
    }
  })

  test('capture Light Mode - Monthly Update', async ({ page }) => {
    await captureMonthlyUpdateScreenshot(page, 'light', 'screenshots/monthly-update/light/monthly-update-oct-2025-p1.png')
  })

  test('capture Dark Mode - Monthly Update', async ({ page }) => {
    await captureMonthlyUpdateScreenshot(page, 'dark', 'screenshots/monthly-update/dark/monthly-update-oct-2025-p1.png')
  })
})