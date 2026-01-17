# Poster Development Guide

Comprehensive guide for creating social media posters using kahitsan-posters. This document covers component structure, design patterns, branding, and automated screenshot generation.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Structure](#project-structure)
3. [Creating a New Poster](#creating-a-new-poster)
4. [Component Architecture](#component-architecture)
5. [Branding Guidelines](#branding-guidelines)
6. [Design Patterns](#design-patterns)
7. [Playwright Screenshot Generation](#playwright-screenshot-generation)
8. [Best Practices](#best-practices)


## Quick Start

```bash
# Start dev server
npm run dev

# Preview poster in browser
# Light mode: http://localhost:5174/announcement/your-poster-name
# Dark mode:  http://localhost:5174/announcement/your-poster-name?dark

# Generate screenshots (from host, not workspace)
npx tsx scripts/screenshot-your-poster.ts
```


## Project Structure

```
kahitsan-posters/
├── assets/                          # Static assets
│   ├── logo.png                     # Dark mode logo
│   ├── Kahitsan-light-nobg.png      # Light mode logo (transparent bg)
│   ├── LOGO-kahitsan.v4.svg         # SVG logo (alternative)
│   └── images/                      # Other images
├── scripts/                         # Playwright screenshot scripts
│   └── screenshot-*.ts
├── screenshots/                     # Generated screenshots (gitignored)
│   └── announcements/
├── src/
│   ├── pages/
│   │   ├── announcements/           # Announcement posters
│   │   ├── monthly-updates/         # Monthly update posters
│   │   └── pricing/                 # Pricing posters
│   └── App.tsx                      # Router configuration
└── docs/
    └── POSTER_DEVELOPMENT_GUIDE.md  # This file
```


## Creating a New Poster

### Step 1: Create the Component

Create a new file in `src/pages/announcements/` (or appropriate folder):

```typescript
// src/pages/announcements/YourAnnouncementPage.tsx
import { createMemo } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoPng from '@assets/logo.png'
import logoLightPng from '@assets/Kahitsan-light-nobg.png'

export default function YourAnnouncementPage() {
  const [searchParams] = useSearchParams()
  const isDark = createMemo(() => searchParams.dark !== undefined)
  const logo = createMemo(() => isDark() ? logoPng : logoLightPng)

  return (
    <>
      <style>{`
        /* Your styles here - use isDark() for conditional styling */
      `}</style>
      
      {/* CRITICAL: This container must be 1080x1080 with id="poster" */}
      <div class="poster-container" id="poster">
        {/* Your poster content */}
      </div>
    </>
  )
}
```

### Step 2: Add Route

Update `src/App.tsx`:

```typescript
import YourAnnouncement from './pages/announcements/YourAnnouncementPage'

// Inside Router:
<Route path="/announcement/your-announcement" component={YourAnnouncement} />
```

Also add to the home page route list for easy navigation.

### Step 3: Create Screenshot Script

Create `scripts/screenshot-your-announcement.ts`:

```typescript
import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'
import { join } from 'path'

const BASE_URL = process.env.POSTER_URL || 'http://10.200.227.2:5174'
const SCREENSHOT_DIR = 'screenshots/announcements/your-announcement'

async function generateScreenshots() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1200, height: 1200 },
    deviceScaleFactor: 2,
  })

  try {
    await mkdir(SCREENSHOT_DIR, { recursive: true })
    const page = await context.newPage()

    // Light mode
    console.log('Generating light mode screenshot...')
    await page.goto(`${BASE_URL}/announcement/your-announcement`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    const poster = page.locator('#poster')
    await poster.screenshot({ path: join(SCREENSHOT_DIR, 'light.png') })
    console.log(`Saved to ${SCREENSHOT_DIR}/light.png`)

    // Dark mode
    console.log('Generating dark mode screenshot...')
    await page.goto(`${BASE_URL}/announcement/your-announcement?dark`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    await poster.screenshot({ path: join(SCREENSHOT_DIR, 'dark.png') })
    console.log(`Saved to ${SCREENSHOT_DIR}/dark.png`)

    console.log('All screenshots generated successfully!')
  } catch (error) {
    console.error('Error:', error)
    throw error
  } finally {
    await browser.close()
  }
}

generateScreenshots()
```

### Step 4: Add npm Script

Update `package.json`:

```json
{
  "scripts": {
    "screenshot:your-announcement": "tsx scripts/screenshot-your-announcement.ts"
  }
}
```


## Component Architecture

### Fixed 1080x1080 Container

Every poster MUST have a fixed-size container with `id="poster"`:

```css
.poster-container {
  width: 1080px;
  height: 1080px;
  position: relative;
  overflow: hidden;
}
```

This container is what Playwright captures. The `id="poster"` is required for the screenshot script.

### Dark/Light Mode Support

Use the `?dark` query parameter:

```typescript
const [searchParams] = useSearchParams()
const isDark = createMemo(() => searchParams.dark !== undefined)

// Use in styles
background: ${isDark() ? '#0a0a0a' : '#ffffff'};
```

### Logo Selection

Different logos for different modes:

```typescript
import logoPng from '@assets/logo.png'                    // Dark mode
import logoLightPng from '@assets/Kahitsan-light-nobg.png' // Light mode

const logo = createMemo(() => isDark() ? logoPng : logoLightPng)
```

### Inline Styles with Template Literals

Use inline `<style>` blocks with template literals for dynamic styling:

```typescript
<style>{`
  .element {
    background: ${isDark() ? 'dark-value' : 'light-value'};
  }
`}</style>
```


## Branding Guidelines

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Gold | `#C9A961` | Primary brand color, headlines, accents |
| Light Gold | `#E5D4A1` | Gradient highlights |
| Dark Gold | `#B8860B` | Deep accents, dark mode elements |
| Tan | `#D2B48C` | Subtle backgrounds |

### Gradient Patterns

```css
/* Gold gradient for text */
background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 50%, #C9A961 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Background gradient orbs */
background: radial-gradient(circle, #C9A961 0%, transparent 70%);
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headline**: 52px, font-weight 800
- **Subheadline**: 18px, font-weight 600
- **Body**: 16-18px, font-weight 400
- **Labels**: 13-15px, font-weight 600-700, uppercase, letter-spacing

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
font-family: 'Inter', sans-serif;
```

### Logo Usage

| Mode | File | Description |
|------|------|-------------|
| Dark | `logo.png` | Standard logo with light text |
| Light | `Kahitsan-light-nobg.png` | Dark logo with transparent background |

### Colors to Avoid

- Purple (`#8b5cf6`) - Not part of brand palette
- Bright red - Use sparingly for alerts only


## Design Patterns

### Glassmorphism Cards

```css
.glass-card {
  background: linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.05) 100%);
  border: 2px solid rgba(201, 169, 97, 0.5);
  border-radius: 24px;
  padding: 32px 64px;
  backdrop-filter: blur(20px);
}
```

### Gradient Orbs (Background Effects)

```css
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 8s ease-in-out infinite;
}

.orb-gold {
  background: radial-gradient(circle, #C9A961 0%, transparent 70%);
}
```

### Grid Pattern Overlay

```css
.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(201, 169, 97, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201, 169, 97, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}
```

### Corner Accents

```css
.corner {
  position: absolute;
  width: 120px;
  height: 120px;
  border: 2px solid rgba(201, 169, 97, 0.2);
}

.corner-tl {
  top: 40px;
  left: 40px;
  border-right: none;
  border-bottom: none;
  border-top-left-radius: 24px;
}
```

### Alert Badges

```css
.alert-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(239, 68, 68, 0.15);
  border: 1.5px solid rgba(239, 68, 68, 0.4);
  padding: 10px 20px;
  border-radius: 100px;
  backdrop-filter: blur(10px);
}
```

### Date/Info Badges

```css
.date-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(201, 169, 97, 0.2), rgba(201, 169, 97, 0.1));
  border: 1.5px solid rgba(201, 169, 97, 0.4);
  padding: 12px 28px;
  border-radius: 100px;
  backdrop-filter: blur(10px);
}
```


## Playwright Screenshot Generation

### Prerequisites

- Dev server running (inside workspace or accessible via IP)
- Playwright installed (`npx playwright install chromium`)
- Running from host machine (not workspace) for best results

### Output Specifications

| Property | Value |
|----------|-------|
| Format | PNG |
| Dimensions | 2160 x 2160 px (at 2x DPI) |
| Actual content | 1080 x 1080 px |
| Aspect Ratio | 1:1 |

### Running Screenshots

```bash
# From host machine (recommended)
cd /home/engr_luis/Projects/alpha/kahitsan-posters
npx tsx scripts/screenshot-your-poster.ts

# Using npm script
npm run screenshot:your-poster
```

### Environment Variables

```bash
# Override the dev server URL
POSTER_URL=http://localhost:5174 npx tsx scripts/screenshot.ts
```

### Troubleshooting

**"Cannot find module" errors**: These are IDE-only issues. The build works fine.

**Playwright not launching in workspace**: Run from host machine instead. The workspace containers may lack required system libraries.

**Fonts not loading**: Increase `waitForTimeout` to 3000ms to allow Google Fonts to load.


## Best Practices

### Content Guidelines

1. **Keep it simple** - One main message per poster
2. **Clear hierarchy** - Headline > Time/Date > Details > Footer
3. **Readable text** - Minimum 14px font size
4. **Breathing room** - Use padding generously (60px from edges)

### Technical Guidelines

1. **Always use path aliases** - `@assets/`, `@components/`, `@/`
2. **Test both modes** - Light and dark before generating screenshots
3. **Use `id="poster"`** - Required for Playwright to capture correctly
4. **Fixed 1080x1080** - Never use dynamic sizing for the poster container
5. **No external API calls** - All data should be self-contained in the component

### Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Component file | PascalCase + Page suffix | `EarlyClosingJan17AnnouncementPage.tsx` |
| Route path | kebab-case | `/announcement/early-closing-jan-17` |
| Screenshot script | kebab-case with prefix | `screenshot-early-closing-jan-17.ts` |
| Screenshot folder | kebab-case with date | `early-closing-jan-17-2026/` |

### Commit Messages

```
feat: add early closing announcement for Jan 17
fix: correct logo for light mode
docs: add poster development guide
```


## Reference: Complete Poster Template

See `src/pages/announcements/EarlyClosingJan17AnnouncementPage.tsx` for a complete, production-ready example that includes:

- Dark/light mode support
- Correct logo handling
- Glassmorphism time card
- Gradient orbs
- Grid pattern
- Corner accents
- Alert badge
- Date badge
- Proper typography
- Fixed 1080x1080 container with `id="poster"`
