import { createSignal, createMemo, Show, For, onMount } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoLight from '../../assets/logo.png'
import logoDark from '../../assets/logo.png'
import uapsaLogo from '../../assets/images/community/UAPSA BISCAST Logo.png'

interface Announcement {
  id: number
  type: string
  title: string
  description: string
  badge?: string
  icon?: string
  isHighlighted: boolean
}

export default function MonthlyUpdatePage() {
  const [searchParams] = useSearchParams()
  const isDark = createMemo(() => searchParams.dark !== undefined)

  const logo = createMemo(() => isDark() ? logoDark : logoLight)

  const [content] = createSignal({
    companyName: 'KahitSan Coworking Space',
    date: 'October 2025',
    subtitle: 'Monthly Update',
    website: 'Management'
  })

  const [announcements] = createSignal<Announcement[]>([
    {
      id: 1,
      type: 'partnership',
      title: 'Partnership with UAPSA',
      description: 'United Architects of the Philippines Students Auxiliary Bicol Chapter - Offering special rates for architecture students since Oct 9, 2025',
      isHighlighted: true
    },
    {
      id: 2,
      type: 'text',
      title: 'Pending Partnerships Await Signing',
      description: 'We have exciting partnerships in the pipeline, currently waiting for contract signing. Stay tuned for more announcements!',
      icon: 'handshake',
      isHighlighted: false
    },
    {
      id: 3,
      type: 'text',
      title: 'Entrance Blinds Installed',
      description: 'Added blinds to the entrance area as received from your feedback. This improvement enhances privacy and light control.',
      icon: 'blinds',
      isHighlighted: false
    },
    {
      id: 4,
      type: 'text',
      title: 'CR Door Improvement Progress',
      description: 'We helped improve the CR door of the first floor of the building. It\'s not fully fixed yet but we are almost there.',
      icon: 'door',
      isHighlighted: false
    },
    {
      id: 5,
      type: 'text',
      title: 'Table Height Adjustment',
      description: 'Adjusted the table height in the inner area to make it easier for clients to tuck the ergonomic chairs comfortably.',
      icon: 'table',
      isHighlighted: false
    },
    {
      id: 6,
      type: 'text',
      title: 'Entrance Chairs Being Upgraded',
      description: 'The chairs for the entrance area are being improved and are currently at our affiliated furniture shop. Thank you for your patience!',
      icon: 'chair',
      isHighlighted: false
    },
    {
      id: 7,
      type: 'text',
      title: 'Network Security Audit Completed',
      description: 'Initial Network Audit was conducted by DecodeProtocol from Ateneo de Naga University. We noted their recommendations on our calendar to implement changes that will improve network reliability and enhance security for all users.',
      icon: 'shield',
      isHighlighted: false
    }
  ])

  const [feedbackText] = createSignal('We value your feedback! Help us create an even better coworking experience.')

  const highlightedAnn = createMemo(() => announcements().find(a => a.isHighlighted))
  const secondaryAnns = createMemo(() => announcements().filter(a => !a.isHighlighted))

  // SVG icon renderer
  const renderIcon = (iconName: string, className: string = '') => {
    const iconColor = isDark() ? '#C9A961' : '#92400e' // amber-600 in dark, amber-800 in light

    switch (iconName) {
      case 'handshake':
        return (
          <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2">
            <path d="M16.5 12.5L12 8l-4.5 4.5M12 8l4.5 4.5M12 8v8M3 12h18M12 3v6"/>
          </svg>
        )
      case 'blinds':
        return (
          <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="3" y1="8" x2="21" y2="8"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="16" x2="21" y2="16"/>
          </svg>
        )
      case 'door':
        return (
          <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18"/>
            <path d="M3 15h18"/>
            <circle cx="17" cy="12" r="1"/>
          </svg>
        )
      case 'table':
        return (
          <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2">
            <rect x="2" y="7" width="20" height="8" rx="1"/>
            <path d="M8 7v8M16 7v8M2 15h20"/>
          </svg>
        )
      case 'chair':
        return (
          <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2">
            <rect x="6" y="3" width="12" height="12" rx="2"/>
            <path d="M6 15h12M9 19h6M9 15v4M15 15v4"/>
          </svg>
        )
      case 'shield':
        return (
          <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        )
      default:
        return null
    }
  }

  const bgColor = createMemo(() => isDark() ? '#0a0a0a' : '#ffffff')
  const textColor = createMemo(() => isDark() ? 'text-white' : 'text-gray-900')
  const secondaryColor = createMemo(() => isDark() ? 'text-zinc-300' : 'text-gray-700')

  const [containerWidth, setContainerWidth] = createSignal('auto')
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement | undefined>(undefined)

  // Calculate container width to match height for 1:1 aspect ratio
  onMount(() => {
    const calculateAspectRatio = () => {
      const ref = containerRef()
      if (ref) {
        const height = ref.offsetHeight
        // Add some padding and set width to match height
        const calculatedWidth = height + 100 // Extra width for padding and balance
        setContainerWidth(`${calculatedWidth}px`)
      }
    }

    // Calculate initially after a short delay to ensure layout is complete
    setTimeout(calculateAspectRatio, 200)

    // Recalculate on window resize
    const handleResize = () => {
      setTimeout(calculateAspectRatio, 100) // Small delay for layout completion
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  return (
    <>
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

        .network-bg {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:%23C9A961;stop-opacity:0.1"/><stop offset="50%" style="stop-color:%23D4B76A;stop-opacity:0.15"/><stop offset="100%" style="stop-color:%23C9A961;stop-opacity:0.1"/></linearGradient></defs><path d="M0,150 Q300,100 600,150 T1200,150 L1200,300 L0,300 Z" fill="url(%23grad)"/><circle cx="100" cy="180" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="300" cy="140" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="500" cy="160" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="700" cy="130" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="900" cy="170" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="1100" cy="145" r="3" fill="%23C9A961" opacity="0.5"/><line x1="100" y1="180" x2="300" y2="140" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="300" y1="140" x2="500" y2="160" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="500" y1="160" x2="700" y2="130" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="700" y1="130" x2="900" y2="170" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="900" y1="170" x2="1100" y2="145" stroke="%23C9A961" stroke-width="1" opacity="0.3"/></svg>') no-repeat center bottom;
          background-size: cover;
          opacity: 0.6;
          pointer-events: none;
          z-index: 0;
        }

        .update-badge {
          display: inline-block;
          background: linear-gradient(135deg, #C9A961, #E5D4A1);
          padding: 10px 32px;
          border-radius: 8px;
          transform: rotate(-2deg);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 169, 97, 0.4);
          transition: all 0.3s ease-out;
        }

        .update-badge:hover {
          transform: rotate(-2deg) scale(1.05);
        }

        .highlight-section {
          padding: 64px 48px;
          margin: 64px 0;
          position: relative;
          overflow: hidden;
        }

        .highlight-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, #C9A961, transparent);
          box-shadow: 0 0 20px rgba(201, 169, 97, 0.6);
        }

        .secondary-card {
          ${isDark()
            ? 'background: rgba(39, 39, 42, 0.4); border-left: 3px solid rgba(161, 161, 170, 0.3);'
            : 'background: rgba(249, 250, 251, 0.6); border-left: 3px solid rgba(209, 213, 219, 0.6);'
          };
          backdrop-filter: blur(10px);
          border-radius: 8px;
          padding: 24px 28px;
          transition: all 0.3s;
          /* Card height determined by content */
        }

        .secondary-card:hover {
          ${isDark()
            ? 'background: rgba(39, 39, 42, 0.6); border-left-color: rgba(201, 169, 97, 0.6);'
            : 'background: rgba(249, 250, 251, 0.8); border-left-color: rgba(217, 119, 6, 0.6);'
          };
          transform: translateX(8px);
        }

        .x-divider {
          font-size: 2rem;
          font-weight: 900;
          background: linear-gradient(135deg, #D4B76A, #C9A961, #D4B76A);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(201, 169, 97, 0.5));
        }

        .grid-announcements {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: start; /* Let cards have their natural height based on content */
        }

        @media (max-width: 768px) {
          .grid-announcements {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1024px) {
          .grid-announcements {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      {/* Main Content */}
      <section class="relative w-full" style={{ background: bgColor() }}>
        <div
        class="relative z-10 mx-auto px-12 py-8 max-w-2xl"
        style={{ "max-width": containerWidth() }}
        ref={setContainerRef}
      >
        <div class="network-bg"></div>
          {/* Header Section */}
          <div class="text-center mb-6">
            <div class="mb-3">
              <div class={`font-medium tracking-wide ${isDark() ? 'text-amber-500/70' : 'text-amber-600/70'} text-base`}>
                {content().companyName}
              </div>
            </div>
            <div class="mb-4">
              <div class="update-badge">
                <div class="tracking-widest font-black text-black text-2xl">
                  Monthly <span class="italic">Update</span>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <div class={`font-light tracking-wide ${isDark() ? 'text-zinc-300' : 'text-gray-600'} text-base`}>
                What happened in <span class={`font-semibold ${isDark() ? 'text-amber-400' : 'text-amber-600'}`}>{content().date}</span>
              </div>
            </div>
            <div class="mb-3">
              <div class={`text-base ${isDark() ? 'text-zinc-500' : 'text-gray-400'} tracking-wide`}>
                A recap of our achievements, partnerships, and improvements
              </div>
            </div>
          </div>

          {/* HIGHLIGHTED ANNOUNCEMENT SECTION */}
          <Show when={highlightedAnn()} keyed>
            {(highlighted) => (
              <div class="highlight-section" style="max-width: 80%;margin: auto;margin-bottom: 24px;">
                <div class="text-center">
                  <h2 class={`font-bold tracking-wide ${textColor()} text-xl md:text-2xl lg:text-3xl mb-3 leading-tight`}>
                    Partnership with UAPSA <span class={isDark() ? 'gradient-text' : 'gradient-text-light'}>BISCAST</span>
                  </h2>

                  {/* Partnership Logos */}
                  <div class="flex items-center justify-center gap-3 mb-6">
                    <div class="flex items-center justify-center w-72 h-36">
                      <img
                        src={logo()}
                        alt="KahitSan Logo"
                        class="w-full h-full object-contain"
                      />
                    </div>

                    <div class="x-divider text-3xl">✕</div>

                    <div class="flex items-center justify-center w-72 h-36">
                      <img
                        src={uapsaLogo}
                        alt="UAPSA BISCAST Logo"
                        class="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* Badge */}
                  <Show when={highlighted.badge}>
                    <div class={`inline-block ${isDark() ? 'bg-amber-500/20' : 'bg-amber-100'} border-2 ${isDark() ? 'border-amber-500' : 'border-amber-600'} rounded-lg px-3 py-1 mb-4`}>
                      <div class={`font-semibold tracking-wide ${isDark() ? 'text-amber-400' : 'text-amber-700'} text-base`}>
                        {highlighted.badge}
                      </div>
                    </div>
                  </Show>

                  <p class={`${secondaryColor()} text-base md:text-lg leading-relaxed mx-auto font-normal`}>
                    {highlighted.description}
                  </p>
                </div>
              </div>
            )}
          </Show>

          {/* OTHER ANNOUNCEMENTS SECTION */}
          <Show when={secondaryAnns().length > 0}>
            <div>
              <h2 class={`${textColor()} text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 tracking-wide`}>
                Additional <span class={isDark() ? 'gradient-text' : 'gradient-text-light'}>Updates</span>
              </h2>

              <div class="grid-announcements">
                <For each={secondaryAnns()}>
                  {(ann) => (
                    <div class="secondary-card">
                      <div class="flex items-start gap-3">
                        <Show when={ann.icon}>
                          {(icon) => (
                            <div class="mt-1 flex-shrink-0">
                              {renderIcon(icon())}
                            </div>
                          )}
                        </Show>
                        <div class="flex-1">
                          <h3 class={`font-semibold tracking-wide ${isDark() ? 'text-zinc-100' : 'text-gray-900'} text-base md:text-lg mb-2`}>
                            {ann.title}
                          </h3>
                          <p class={`${isDark() ? 'text-zinc-200' : 'text-gray-700'} text-sm md:text-base leading-relaxed font-medium`}>
                            {ann.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </Show>

          {/* Footer */}
          <div class={`text-center mt-20 pt-16 border-t ${isDark() ? 'border-amber-500/20' : 'border-amber-200'}`}>
            <p class={`${isDark() ? 'text-amber-500/60' : 'text-amber-600/60'} italic text-xl mb-6`}>
              {feedbackText()}
            </p>

            <div class={`font-medium tracking-widest ${isDark() ? 'text-amber-500' : 'text-amber-600'} text-lg`}>
              {content().website}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}