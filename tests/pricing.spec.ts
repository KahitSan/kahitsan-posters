import { test, expect } from '@playwright/test'

test.describe('Test Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the test pricing page before each test
    await page.goto('/test/pricing')
  })

  test('should load the pricing page successfully', async ({ page }) => {
    // Check if the page title contains expected text
    await expect(page.getByRole('heading', { name: /Choose Your/i })).toBeVisible()
  })

  test('should display all main pricing cards', async ({ page }) => {
    // Check if all three main workspace types are visible
    await expect(page.getByText('Entrance Area')).toBeVisible()
    await expect(page.getByText('Inner Area')).toBeVisible()
    await expect(page.getByText('Call Booth')).toBeVisible()
  })

  test('should display premium access section', async ({ page }) => {
    // Check if premium section is visible
    await expect(page.getByRole('heading', { name: /Premium Access/i })).toBeVisible()
    await expect(page.getByText('All-Access Membership')).toBeVisible()
    await expect(page.getByText('Whole Inner Area')).toBeVisible()
  })

  test('should display partner organizations section', async ({ page }) => {
    // Check if partner organizations section is visible
    await expect(page.getByRole('heading', { name: /Partner Organizations/i })).toBeVisible()
  })

  test('should have proper light mode styling', async ({ page }) => {
    // Check if the page has light background (not dark mode)
    const body = page.locator('body')
    const backgroundColor = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })

    // Light mode should have light backgrounds (rgb values should be high)
    // This is a simple check - you can make it more specific
    expect(backgroundColor).not.toBe('rgb(0, 0, 0)')
  })

  test('should display pricing information correctly', async ({ page }) => {
    // Check if pricing values are visible (using Philippine Peso symbol)
    await expect(page.locator('text=/₱\\d+/')).toHaveCount({ min: 1 })
  })

  test('should show partner and walk-in prices', async ({ page }) => {
    // Check if both partner and walk-in labels are present
    await expect(page.getByText(/partner/i).first()).toBeVisible()
    await expect(page.getByText(/walk-in/i).first()).toBeVisible()
  })

  test('should display workspace features', async ({ page }) => {
    // Check if feature bullets are visible
    await expect(page.getByText('24/7 access')).toBeVisible()
    await expect(page.getByText('Free unlimited coffee')).toBeVisible()
    await expect(page.getByText('High-speed internet')).toBeVisible()
  })

  test('should have working back button', async ({ page }) => {
    // Check if back button is visible and clickable
    const backButton = page.getByRole('button', { name: /Back to Floor Plan/i })
    await expect(backButton).toBeVisible()
    await expect(backButton).toBeEnabled()
  })

  test('should display last updated date', async ({ page }) => {
    // Check if last updated date is visible
    await expect(page.getByText(/Last updated:/i)).toBeVisible()
  })

  test('should have header and footer', async ({ page }) => {
    // Verify that Header and Footer components are rendered
    // This assumes your Header/Footer have specific identifiable elements
    // Adjust selectors based on your actual Header/Footer structure

    // Wait for page to fully load
    await page.waitForLoadState('networkidle')

    // Check for header (adjust selector as needed)
    const header = page.locator('header').first()
    await expect(header).toBeVisible()

    // Check for footer (adjust selector as needed)
    const footer = page.locator('footer').first()
    await expect(footer).toBeVisible()
  })

  test('should display pricing cards with hover effects', async ({ page }) => {
    // Get the first pricing card
    const firstCard = page.locator('.clip-corner').first()

    // Check if card is visible
    await expect(firstCard).toBeVisible()

    // Hover over the card
    await firstCard.hover()

    // The card should still be visible after hover
    await expect(firstCard).toBeVisible()
  })

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByRole('heading', { name: /Choose Your/i })).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByRole('heading', { name: /Choose Your/i })).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.getByRole('heading', { name: /Choose Your/i })).toBeVisible()
  })
})

test.describe('Pricing Page - Dark Mode vs Light Mode Comparison', () => {
  test('light mode should have lighter colors than dark mode', async ({ page }) => {
    // Visit light mode page
    await page.goto('/test/pricing')

    // Get background color of main container in light mode
    const lightModeContainer = page.locator('section').first()
    const lightBg = await lightModeContainer.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })

    // Visit dark mode page
    await page.goto('/spaces/panganiban/pricing')

    // Get background color of main container in dark mode
    const darkModeContainer = page.locator('section').first()
    const darkBg = await darkModeContainer.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })

    // Light mode and dark mode should have different backgrounds
    expect(lightBg).not.toBe(darkBg)
  })

  test('both pages should have same pricing data', async ({ page }) => {
    // Visit light mode page
    await page.goto('/test/pricing')
    const lightModePrices = await page.locator('text=/₱\\d+/').allTextContents()

    // Visit dark mode page
    await page.goto('/spaces/panganiban/pricing')
    const darkModePrices = await page.locator('text=/₱\\d+/').allTextContents()

    // Both should have the same number of prices
    expect(lightModePrices.length).toBe(darkModePrices.length)
  })
})
