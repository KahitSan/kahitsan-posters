import type { Component } from 'solid-js'
import { Router, Route } from '@solidjs/router'
import MonthlyUpdateOct2025P1 from './pages/monthly-updates/MonthlyUpdatePageOct2025P1'
import MonthlyUpdateOct2025P2 from './pages/monthly-updates/MonthlyUpdatePageOct2025P2'
import MonthlyUpdateNov2025P1 from './pages/monthly-updates/MonthlyUpdatePageNov2025P1'
import TestPricing from './pages/pricing/TestPricingPage'
import PricingCompact from './pages/pricing/PricingCompactPanganiban'
import EarlyClosingDec21 from './pages/announcements/EarlyClosingDec21AnnouncementPage'

const App: Component = () => {
  return (
    <Router>
      {/* Monthly Updates */}
      <Route path="/monthly-update/oct-2025-p1" component={MonthlyUpdateOct2025P1} />
      <Route path="/monthly-update/oct-2025-p2" component={MonthlyUpdateOct2025P2} />
      <Route path="/monthly-update/nov-2025-p1" component={MonthlyUpdateNov2025P1} />

      {/* Pricing */}
      <Route path="/pricing/panganiban" component={TestPricing} />
      <Route path="/pricing/compact-panganiban" component={PricingCompact} />

      {/* Announcements */}
      <Route path="/announcement/early-closing-dec-21" component={EarlyClosingDec21} />

      {/* Default/Home */}
      <Route path="/" component={() => (
        <div class="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">KahitSan Posters</h1>
            <p class="text-zinc-400 mb-8">Screenshot generation for social media and print materials</p>
            <div class="text-left max-w-md mx-auto space-y-2 text-sm">
              <p class="text-zinc-500">Available routes:</p>
              <ul class="list-disc list-inside space-y-1 text-zinc-300">
                <li>/monthly-update/oct-2025-p1</li>
                <li>/monthly-update/oct-2025-p2</li>
                <li>/monthly-update/nov-2025-p1</li>
                <li>/pricing/panganiban</li>
                <li>/pricing/compact-panganiban</li>
                <li>/announcement/early-closing-dec-21</li>
              </ul>
            </div>
          </div>
        </div>
      )} />
    </Router>
  )
}

export default App
