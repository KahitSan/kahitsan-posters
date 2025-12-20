# KahitSan Posters

Screenshot generation tool for social media graphics, monthly updates, announcement images, and printable materials.

## Purpose

This repository contains print-optimized and screenshot-optimized pages designed to generate high-quality 1:1 images for:
- Social media posts (Instagram, Facebook, Twitter/X)
- Monthly update graphics
- Pricing sheets
- Announcement posters
- Printable materials

## Tech Stack

- **Vite** - Build tool and dev server
- **Solid.js** - UI framework
- **Playwright** - Screenshot generation and testing
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **pillar-ui** - Shared component library (git submodule)

## Setup

### Prerequisites

- Node.js 20+ (LTS recommended)
- Git with SSH access to GitHub
- SSH key configured for KahitSan organization

### Installation

1. Clone the repository with submodules:
   ```bash
   git clone --recurse-submodules git@github.com:KahitSan/kahitsan-posters.git
   cd kahitsan-posters
   ```

   If you already cloned without `--recurse-submodules`:
   ```bash
   git submodule update --init --recursive
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```

## Development

### Run Dev Server

```bash
npm run dev
```

The dev server will start at `http://localhost:5173`

### Available Routes

- `/monthly-update/oct-2025-p1` - October 2025 Monthly Update (Part 1)
- `/monthly-update/oct-2025-p2` - October 2025 Monthly Update (Part 2)
- `/pricing/panganiban` - Panganiban Pricing Sheet
- `/pricing/compact-panganiban` - Compact Panganiban Pricing
- `/announcement/early-closing-dec-21` - Early Closing Dec 21 Announcement

### Preview Light/Dark Modes

Add `?dark` query parameter to any route to see dark mode:
```
http://localhost:5173/announcement/early-closing-dec-21?dark
```

## Generating Screenshots

### Manual Scripts

```bash
# Generate announcement screenshots
npm run screenshot:announcements

# Generate monthly update screenshots
npm run screenshot:monthly

# Generate all screenshots
npm run screenshot:all
```

### Using Playwright Tests

```bash
# Run all screenshot tests
npm run test

# Run with UI
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed
```

## Screenshot Output

Screenshots are saved to `screenshots/` directory (gitignored):
```
screenshots/
├── announcements/
│   └── early-closing-dec-21-2025/
│       ├── light.png
│       └── dark.png
├── monthly-updates/
│   ├── oct-2025-p1/
│   └── oct-2025-p2/
└── pricing/
    └── panganiban/
```

## Directory Structure

```
kahitsan-posters/
├── src/
│   ├── pages/
│   │   ├── announcements/      # Announcement posters
│   │   ├── monthly-updates/    # Monthly update graphics
│   │   └── pricing/            # Pricing sheets
│   ├── App.tsx                 # Router configuration
│   ├── index.tsx               # Entry point
│   └── index.css               # Global styles
├── tests/                      # Playwright screenshot tests
├── scripts/                    # Screenshot generation scripts
├── assets/                     # Images and logos
├── app/
│   └── pillar-ui/             # Shared UI components (submodule)
├── screenshots/                # Generated output (gitignored)
└── playwright.config.ts
```

## Adding New Posters

1. Create page component in appropriate directory
2. Add route to `src/App.tsx`
3. Create screenshot script in `scripts/`
4. Add Playwright test in `tests/` (optional)
5. Run dev server to preview
6. Generate screenshots

## Component Library

This repo uses `pillar-ui` as a git submodule for shared components. To update:

```bash
cd app/pillar-ui
git pull origin master
cd ../..
git add app/pillar-ui
git commit -m "update: pillar-ui submodule"
```

## Notes

- All pages are optimized for 1:1 aspect ratio (square) screenshots
- Pages support light and dark modes via `?dark` query parameter
- Screenshots are 1080x1080 at 2x DPI (2160x2160 actual pixels)
- This is a standalone tool, separate from the main pillar application
