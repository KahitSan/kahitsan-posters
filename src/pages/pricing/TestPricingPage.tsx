import { Clock, Sparkles, Users, Star } from 'lucide-solid'
import { pricingData, additionalPricingData, type PricingOption, formatDuration, PricingType } from '../SpacesPage/Panganiban/pricingData'
import { Show, createMemo } from 'solid-js'
import logoLight from '../../assets/LOGO-kahitsan.v4.svg'
import logoDark from '../../assets/logo.png'
import { communityData } from '../../data/community'
import { useSearchParams } from '@solidjs/router'

// Icon mapping
const iconMap = {
  clock: Clock,
  sparkles: Sparkles,
  users: Users,
  star: Star
}

// Pricing Card Component
function PricingCard(props: { option: PricingOption; isDark: boolean }) {
  const Icon = iconMap[props.option.icon]

  return (
    <div
      class={`backdrop-blur-sm clip-corner overflow-hidden group hover:scale-[1.02] transition-all ${
        props.isDark
          ? 'border border-zinc-800/50 hover:border-zinc-700/50'
          : 'border border-gray-300 hover:border-gray-400'
      }`}
      style={{
        background: props.isDark
          ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'
      }}
    >
      {/* Scan-line effect */}
      <div class={`absolute inset-0 bg-gradient-to-r from-transparent ${props.isDark ? 'via-amber-500/5' : 'via-amber-600/10'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />

      <div class="relative z-10">
        {/* Cover Photo */}
        <Show when={props.option.coverImage}>
          <div class="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={props.option.coverImage}
              alt={props.option.name}
              class="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />

            {/* Fallback colored div */}
            <div class={`hidden absolute inset-0 w-full h-full bg-gradient-to-br flex items-center justify-center ${
              props.isDark ? 'from-zinc-700 to-zinc-800' : 'from-gray-200 to-gray-300'
            }`}>
              <div class={`text-2xl font-semibold ${props.isDark ? 'text-zinc-500' : 'text-gray-600'}`}>
                {props.option.name}
              </div>
            </div>

            {/* Overlay gradient for shadow effect */}
            <div class={`absolute inset-0 bg-gradient-to-t ${props.isDark ? 'from-black/80 via-black/40' : 'from-black/40 via-black/10'} to-transparent pointer-events-none`}></div>

            {/* Additional bottom shadow overlay */}
            <div class={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t ${props.isDark ? 'from-black/90' : 'from-black/50'} to-transparent pointer-events-none`}></div>
          </div>
        </Show>

        <div class="p-3">
          {/* Header */}
          <div class={`flex items-center gap-4 ${props.option.coverImage ? 'px-6' : 'px-6'} mb-8`}>
            <div class={`p-3 rounded-lg ${props.isDark ? 'bg-zinc-800/50' : 'bg-gray-100'}`}>
              <div class={props.isDark ? 'text-zinc-400' : 'text-gray-600'}><Icon size={20} /></div>
            </div>
            <div>
              <h3 class={`text-lg font-bold mb-1 ${props.isDark ? 'text-white' : 'text-gray-900'}`}>
                {props.option.name}
              </h3>
            </div>
          </div>

          {/* Main Pricing - Interlocking Polygons */}
          <div class="mb-8">
            <div class="relative flex items-stretch justify-center">
              {/* Partner Price - Larger Polygon */}
              <div class="relative w-[60%] max-w-[260px]">
                <div
                  class={`relative h-32 transition-all ${
                    props.isDark
                      ? 'bg-zinc-600/20 border border-zinc-700/50 group-hover:border-zinc-600 group-hover:bg-zinc-600/30'
                      : 'bg-amber-100/50 border border-amber-300 group-hover:border-amber-400 group-hover:bg-amber-100'
                  }`}
                  style={{
                    'clip-path': 'polygon(0 15%, 5% 0, 100% 0, 100% 15%, 100% 30%, 105% 50%, 100% 56%, 100% 85%, 100% 100%, 5% 100%, 0 85%)',
                  }}
                >
                  <div class="flex flex-col items-center justify-center h-full pr-2 pb-2">
                    <div class={`text-xs uppercase tracking-wider mb-1 font-bold ${props.isDark ? 'text-zinc-400' : 'text-gray-700'}`}>
                      Org Partner
                    </div>
                    <div class={`text-3xl sm:text-4xl font-bold ${props.isDark ? 'gradient-text' : 'gradient-text-light'}`}>
                      ₱{props.option.mainPricing.partnerPrice.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Walk-in Price - Smaller Polygon */}
              <div class="relative w-[40%] max-w-[180px] -ml-2">
                <div
                  class={`relative h-32 transition-all ${
                    props.isDark
                      ? 'bg-zinc-800/90 border border-zinc-700/50 group-hover:border-zinc-600 group-hover:bg-zinc-800'
                      : 'bg-gray-200 border border-gray-300 group-hover:border-gray-400 group-hover:bg-gray-300'
                  }`}
                  style={{
                    'clip-path': 'polygon(0 40%, 5% 50%, 0 60%, 0 85%, 5% 100%, 95% 100%, 100% 85%, 100% 15%, 95% 0, 5% 0, 0 15%)',
                  }}
                >
                  <div class="flex flex-col items-center justify-center h-full pl-2 pb-2">
                    <div class={`text-xs uppercase tracking-wider mb-1 ${props.isDark ? 'text-zinc-500' : 'text-gray-600'}`}>
                      Walk-in
                    </div>
                    <div class={`text-lg sm:text-xl font-bold ${props.isDark ? 'text-zinc-400' : 'text-gray-700'}`}>
                      ₱{props.option.mainPricing.walkinPrice.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              {props.option.durationPrefix && (
                <div class={`absolute bottom-2 italic ${props.isDark ? 'text-amber-500' : 'text-amber-600'}`}>
                  {props.option.durationPrefix} <b>{formatDuration(props.option.mainPricing.duration)}</b>
                </div>
              )}
            </div>
          </div>

          {/* Additional Pricing */}
          <div class={props.option.additionalPricing.length === 1 ? "space-y-2" : "grid grid-cols-1 sm:grid-cols-2 gap-2"}>
            {props.option.additionalPricing.map((pricing) => {
              const pricingType = pricing.pricingType || PricingType.NONE
              const isSingleItem = props.option.additionalPricing.length === 1

              return (
                <div
                  class={`${isSingleItem ? 'flex items-center justify-between p-4' : 'flex flex-col justify-between p-3'} rounded-lg transition-all ${
                    props.isDark
                      ? `border border-zinc-700/50 hover:bg-zinc-800/60 hover:border-zinc-600/30 ${
                          pricingType === PricingType.EXTENSION ? 'bg-gradient-to-r from-amber-400/20 via-zinc-800/40 to-zinc-800/30' :
                          pricingType === PricingType.LEGACY ? 'bg-gradient-to-r from-zinc-800/30 via-zinc-800/40 to-zinc-500/20' :
                          'bg-zinc-800/30'
                        }`
                      : `border border-gray-300 hover:bg-gray-100 hover:border-gray-400 ${
                          pricingType === PricingType.EXTENSION ? 'bg-gradient-to-r from-amber-100 via-gray-50 to-gray-50' :
                          pricingType === PricingType.LEGACY ? 'bg-gradient-to-r from-gray-50 via-gray-100 to-green-50' :
                          'bg-gray-50'
                        }`
                  }`}
                >
                  {isSingleItem ? (
                    <>
                      <span class={`text-sm ${pricingType !== PricingType.NONE ? 'font-bold' : 'font-medium'} ${
                        pricingType === PricingType.LEGACY
                          ? props.isDark ? 'text-green-300' : 'text-green-700'
                          : props.isDark ? 'text-zinc-300' : 'text-gray-700'
                      }`}>
                        <Show when={pricingType === PricingType.EXTENSION}>+</Show>
                        {formatDuration(pricing.duration)}
                      </span>
                      <div class="flex items-center gap-4">
                        <div class="text-right">
                          <div class={`mb-1 text-xl font-bold ${props.isDark ? 'gradient-text' : 'gradient-text-light'}`}>
                            ₱{pricing.partnerPrice.toLocaleString()}
                          </div>
                          <div class={`text-xs uppercase tracking-wider font-medium ${props.isDark ? 'text-zinc-500' : 'text-gray-600'}`}>
                            {pricing.partnerLabel || 'partner'}
                          </div>
                          {pricing.savings && (
                            <div class={`text-xs mt-1 ${props.isDark ? 'text-green-400' : 'text-green-600'}`}>
                              {pricing.savings}
                            </div>
                          )}
                        </div>
                        <div class={`w-px h-10 ${props.isDark ? 'bg-zinc-700/50' : 'bg-gray-300'}`}></div>
                        <div class="text-right">
                          <div class={`mb-1 text-base font-medium ${props.isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
                            ₱{pricing.walkinPrice.toLocaleString()}
                          </div>
                          <div class={`text-xs uppercase tracking-wider ${props.isDark ? 'text-zinc-500' : 'text-gray-600'}`}>
                            {pricing.walkinLabel || 'walk-in'}
                          </div>
                          {pricing.savings && (
                            <div class={`text-xs mt-1 ${props.isDark ? 'text-green-400' : 'text-green-600'}`}>
                              {pricing.savings}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div class="flex items-center justify-between mb-2">
                        <span class={`text-sm ${pricingType !== PricingType.NONE ? 'font-bold' : 'font-medium'} ${
                          pricingType === PricingType.LEGACY
                            ? props.isDark ? 'text-green-300' : 'text-green-700'
                            : props.isDark ? 'text-zinc-300' : 'text-gray-700'
                        }`}>
                          <Show when={pricingType === PricingType.EXTENSION}>+</Show>
                          {formatDuration(pricing.duration)}
                        </span>
                        {pricing.savings && (
                          <div class={`text-xs font-medium ${props.isDark ? 'text-green-400' : 'text-green-600'}`}>
                            {pricing.savings}
                          </div>
                        )}
                      </div>
                      <div class="flex items-center justify-between gap-2">
                        <div class="text-right flex-1">
                          <div class={`mb-1 text-lg font-bold ${props.isDark ? 'gradient-text' : 'gradient-text-light'}`}>
                            ₱{pricing.partnerPrice.toLocaleString()}
                          </div>
                          <div class={`text-xs uppercase tracking-wider font-medium ${props.isDark ? 'text-zinc-500' : 'text-gray-600'}`}>
                            {pricing.partnerLabel || 'partner'}
                          </div>
                        </div>
                        <div class={`w-px h-8 ${props.isDark ? 'bg-zinc-700/50' : 'bg-gray-300'}`}></div>
                        <div class="text-right flex-1">
                          <div class={`mb-1 text-sm font-medium ${props.isDark ? 'text-zinc-300' : 'text-gray-700'}`}>
                            ₱{pricing.walkinPrice.toLocaleString()}
                          </div>
                          <div class={`text-xs uppercase tracking-wider ${props.isDark ? 'text-zinc-500' : 'text-gray-600'}`}>
                            {pricing.walkinLabel || 'walk-in'}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TestPricingPage() {
  const [searchParams] = useSearchParams()
  const isDark = createMemo(() => searchParams.dark !== undefined)

  const logo = createMemo(() => isDark() ? logoDark : logoLight)
  const bgColor = createMemo(() => isDark() ? '#0a0a0a' : '#ffffff')
  const textColor = createMemo(() => isDark() ? 'text-white' : 'text-gray-900')
  const textTertiary = createMemo(() => isDark() ? 'text-zinc-400' : 'text-gray-600')

  return (
    <div class="min-h-screen" style={{ background: bgColor() }}>
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, #C9A961, #E5D4A1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-text-light {
          background: linear-gradient(135deg, #d97706, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .clip-corner {
          position: relative;
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
        }
      `}</style>

      {/* Choose Your Workspace Section */}
      <section class="relative w-full" style={{ background: bgColor() }}>
        {/* Background patterns - Only for dark mode */}
        <Show when={isDark()}>
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute inset-0 opacity-20" style={{background: "radial-gradient(ellipse at center, rgba(201, 169, 97, 0.6) 0%, rgba(201, 169, 97, 0.1) 40%, transparent 70%)"}}></div>
            <div class="absolute top-1/4 left-1/4 w-64 h-64 opacity-10 rotate-45" style={{background: "linear-gradient(45deg, #C9A961, transparent)", "clip-path": "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"}}></div>
            <div class="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-10 -rotate-12" style={{background: "linear-gradient(135deg, #E5D4A1, transparent)", "clip-path": "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"}}></div>
          </div>
        </Show>

        <div class="relative z-10">
          {/* Header */}
          <div class="max-w-4xl mx-auto text-center mb-16 px-4">
            <div class="flex items-center justify-center gap-4">
              <img
                src={logo()}
                alt="Kahit San Logo"
                class="w-30 object-contain"
              />
              <h2 class={`text-4xl md:text-5xl font-bold mt-12 ${textColor()}`}>
                Choose Your <span class={isDark() ? 'gradient-text' : 'gradient-text-light'}>Workspace</span>
              </h2>
            </div>
              <div class="flex justify-center gap-8 mt-1 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-green-400"></div>
                <span class={textTertiary()}>Starts at 4 hours</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-amber-400"></div>
                <span class={textTertiary()}>Hourly extensions</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                <span class={textTertiary()}>Free unlimited coffee</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-purple-400"></div>
                <span class={textTertiary()}>High-speed internet</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-amber-400"></div>
                <span class={textTertiary()}>Power at each table</span>
              </div>
            </div>

            {/* Last Updated Notice */}
            <div class="text-center mt-6">
              <div class={`text-sm ${textTertiary()}`}>
                Last updated: November 1, 2025
              </div>
            </div>
          </div>

          {/* Main Pricing Cards */}
          <div class="relative z-10 mb-16 px-4">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 items-start">
              {pricingData.map((option) => (
                <PricingCard option={option} isDark={isDark()} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Access Section */}
      <section class="relative w-full" style={{ background: bgColor() }}>
        {/* Background patterns - Only for dark mode */}
        <Show when={isDark()}>
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute inset-0 opacity-15" style={{background: "radial-gradient(ellipse at bottom, rgba(201, 169, 97, 0.2) 0%, transparent 60%)"}}></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-10" style={{background: "linear-gradient(135deg, #C9A961, transparent)", "clip-path": "circle(50%)"}}></div>
          </div>
        </Show>

        <div class="relative z-10">
          {/* Plans Header */}
          <div class="max-w-4xl mx-auto text-center mb-12 px-4">
            <div class={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
              isDark() ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-100 border border-purple-300'
            }`}>
              <div class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
              <span class={`font-medium text-sm ${isDark() ? 'text-purple-400' : 'text-purple-700'}`}>
                Memberships & Private Spaces
              </span>
            </div>
            <div class="flex items-center justify-center gap-4">
              <img
                src={logo()}
                alt="Kahit San Logo"
                class="w-30 object-contain"
              />
              <h3 class={`text-3xl md:text-4xl font-bold ${textColor()}`}>
                Premium <span class={isDark() ? 'gradient-text' : 'gradient-text-light'}>Access</span>
              </h3>
            </div>
              <div class="flex justify-center gap-8 mt-1 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-purple-400"></div>
                <span class={textTertiary()}>24/7 biometric access</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-blue-400"></div>
                <span class={textTertiary()}>Private event space</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-green-400"></div>
                <span class={textTertiary()}>No front desk needed</span>
              </div>
            </div>
          </div>

          {/* Plans Pricing Cards */}
          <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-start px-4">
            {additionalPricingData.map((option) => (
              <PricingCard option={option} isDark={isDark()} />
            ))}
          </div>
        </div>
      </section>

      {/* Partner Organizations Section */}
      <section class="relative w-full mt-12" style={{ background: bgColor() }}>
        {/* Background patterns - Only for dark mode */}
        <Show when={isDark()}>
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 opacity-5" style={{background: "radial-gradient(circle, rgba(201, 169, 97, 0.3) 0%, transparent 70%)"}}></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 opacity-5 rotate-45" style={{background: "linear-gradient(45deg, #C9A961, transparent)", "clip-path": "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"}}></div>
          </div>
        </Show>

        <div class="relative z-10">
          {/* Section Header */}
          <div class="max-w-4xl mx-auto text-center mb-12">
            <div class="flex items-center justify-center gap-4">
              <img
                src={logo()}
                alt="Kahit San Logo"
                class="w-30 object-contain"
              />
              <h3 class={`text-3xl md:text-4xl font-bold ${textColor()}`}>
                Partner <span class={isDark() ? 'gradient-text' : 'gradient-text-light'}>Organizations</span>
              </h3>
            </div>
                <div class="flex justify-center gap-8 mt-1 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-green-400"></div>
                <span class={textTertiary()}>20% discount for members</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-amber-400"></div>
                <span class={textTertiary()}>Valid organization ID required</span>
              </div>
            </div>
          </div>

          <div class="max-w-6xl mx-auto">
            <div class="flex flex-wrap items-center justify-center gap-12 md:gap-20">
              {communityData.partnerships.map((partnership) => (
                <img
                  src={partnership.icon}
                  alt={`${partnership.name} Logo`}
                  class={`w-30 h-auto object-contain transition-opacity duration-300 ${isDark() ? 'opacity-70' : ''}`}
                  title={partnership.name}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
