import { test } from '@playwright/test'
import sharp from 'sharp'
import fs from 'fs'

async function captureCombinedScreenshot(
  page: any,
  mode: 'light' | 'dark',
  outputPath: string
) {
  const url = mode === 'dark'
    ? '/print/spaces/panganiban/pricing-compact?dark'
    : '/print/spaces/panganiban/pricing-compact'

  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.waitForSelector('img[alt="Kahit San Logo"]')

  // Capture workspace section (first section)
  const workspaceSection = page.locator('section').nth(0)
  const workspaceBuffer = await workspaceSection.screenshot()

  // Capture partner organizations section (third section)
  const partnerSection = page.locator('section').nth(2)
  const partnerBuffer = await partnerSection.screenshot()

  // Combine images with 40px gap and 20px margins
  const workspaceImage = sharp(workspaceBuffer)
  const partnerImage = sharp(partnerBuffer)

  const workspaceMeta = await workspaceImage.metadata()
  const partnerMeta = await partnerImage.metadata()

  const gap = 40
  const sideMargin = 20

  // Calculate content dimensions
  const contentHeight = (workspaceMeta.height || 0) + gap + (partnerMeta.height || 0)
  const contentWidth = Math.max(workspaceMeta.width || 0, partnerMeta.width || 0)

  // Calculate 1:1 aspect ratio (square) canvas size
  const squareSize = Math.max(contentHeight, contentWidth) + (sideMargin * 2)

  // Calculate centering offsets
  const verticalOffset = Math.floor((squareSize - contentHeight) / 2)
  const horizontalOffset = Math.floor((squareSize - contentWidth) / 2)

  // Create 1:1 square image with content centered
  // Dark mode: #0a0a0a (10,10,10), Light mode: #f3f4f6 (243,244,246) to match section backgrounds
  await sharp({
    create: {
      width: squareSize,
      height: squareSize,
      channels: 4,
      background: mode === 'dark' ? { r: 10, g: 10, b: 10, alpha: 1 } : { r: 243, g: 244, b: 246, alpha: 1 }
    }
  })
    .composite([
      {
        input: workspaceBuffer,
        top: verticalOffset,
        left: horizontalOffset
      },
      {
        input: partnerBuffer,
        top: verticalOffset + (workspaceMeta.height || 0) + gap,
        left: horizontalOffset
      }
    ])
    .png()
    .toFile(outputPath)
}

async function capturePremiumCombinedScreenshot(
  page: any,
  mode: 'light' | 'dark',
  outputPath: string
) {
  const url = mode === 'dark'
    ? '/print/spaces/panganiban/pricing-compact?dark'
    : '/print/spaces/panganiban/pricing-compact'

  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.waitForSelector('text=/Premium.*Access/i')

  // Capture premium section (second section)
  const premiumSection = page.locator('section').nth(1)
  const premiumBuffer = await premiumSection.screenshot()

  // Capture partner organizations section (third section)
  const partnerSection = page.locator('section').nth(2)
  const partnerBuffer = await partnerSection.screenshot()

  // Combine images with 40px gap and 20px margins
  const premiumImage = sharp(premiumBuffer)
  const partnerImage = sharp(partnerBuffer)

  const premiumMeta = await premiumImage.metadata()
  const partnerMeta = await partnerImage.metadata()

  const gap = 40
  const sideMargin = 20

  // Calculate content dimensions
  const contentHeight = (premiumMeta.height || 0) + gap + (partnerMeta.height || 0)
  const contentWidth = Math.max(premiumMeta.width || 0, partnerMeta.width || 0)

  // Calculate 1:1 aspect ratio (square) canvas size
  const squareSize = Math.max(contentHeight, contentWidth) + (sideMargin * 2)

  // Calculate centering offsets
  const verticalOffset = Math.floor((squareSize - contentHeight) / 2)
  const horizontalOffset = Math.floor((squareSize - contentWidth) / 2)

  // Create 1:1 square image with content centered
  // Dark mode: #0a0a0a (10,10,10), Light mode: #f3f4f6 (243,244,246) to match section backgrounds
  await sharp({
    create: {
      width: squareSize,
      height: squareSize,
      channels: 4,
      background: mode === 'dark' ? { r: 10, g: 10, b: 10, alpha: 1 } : { r: 243, g: 244, b: 246, alpha: 1 }
    }
  })
    .composite([
      {
        input: premiumBuffer,
        top: verticalOffset,
        left: horizontalOffset
      },
      {
        input: partnerBuffer,
        top: verticalOffset + (premiumMeta.height || 0) + gap,
        left: horizontalOffset
      }
    ])
    .png()
    .toFile(outputPath)
}

test.describe('Pricing Compact Print Page Screenshot', () => {
  test.beforeAll(() => {
    // Create directories if they don't exist
    if (!fs.existsSync('screenshots/pricing-compact/light')) {
      fs.mkdirSync('screenshots/pricing-compact/light', { recursive: true })
    }
    if (!fs.existsSync('screenshots/pricing-compact/dark')) {
      fs.mkdirSync('screenshots/pricing-compact/dark', { recursive: true })
    }
  })

  test('capture Light Mode - Workspace section + Partner Organizations', async ({ page }) => {
    await captureCombinedScreenshot(page, 'light', 'screenshots/pricing-compact/light/pricing-workspace-partner.png')
  })

  test('capture Light Mode - Premium Access + Partner Organizations', async ({ page }) => {
    await capturePremiumCombinedScreenshot(page, 'light', 'screenshots/pricing-compact/light/pricing-premium-partner.png')
  })

  test('capture Dark Mode - Workspace section + Partner Organizations', async ({ page }) => {
    await captureCombinedScreenshot(page, 'dark', 'screenshots/pricing-compact/dark/pricing-workspace-partner.png')
  })

  test('capture Dark Mode - Premium Access + Partner Organizations', async ({ page }) => {
    await capturePremiumCombinedScreenshot(page, 'dark', 'screenshots/pricing-compact/dark/pricing-premium-partner.png')
  })
})
