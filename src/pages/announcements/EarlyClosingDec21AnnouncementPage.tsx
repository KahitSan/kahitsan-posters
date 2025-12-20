import { createSignal, createMemo, onMount } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoLight from '../../assets/logo.png'
import logoDark from '../../assets/logo.png'

export default function EarlyClosingDec21AnnouncementPage() {
  const [searchParams] = useSearchParams()
  const isDark = createMemo(() => searchParams.dark !== undefined)

  const logo = createMemo(() => isDark() ? logoDark : logoLight)

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
        const calculatedWidth = height + 100
        setContainerWidth(`${calculatedWidth}px`)
      }
    }

    setTimeout(calculateAspectRatio, 200)

    const handleResize = () => {
      setTimeout(calculateAspectRatio, 100)
    }

    window.addEventListener('resize', handleResize)

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

        .announcement-badge {
          display: inline-block;
          background: linear-gradient(135deg, #C9A961, #E5D4A1);
          padding: 10px 32px;
          border-radius: 8px;
          transform: rotate(-2deg);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 169, 97, 0.4);
          transition: all 0.3s ease-out;
        }

        .announcement-badge:hover {
          transform: rotate(-2deg) scale(1.05);
        }

        .highlight-section {
          padding: 48px 36px;
          margin: 48px 0;
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

        .time-badge {
          display: inline-block;
          ${isDark()
            ? 'background: rgba(251, 191, 36, 0.2); border: 2px solid #fbbf24;'
            : 'background: rgba(217, 119, 6, 0.1); border: 2px solid #d97706;'
          };
          padding: 12px 28px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 2rem;
          letter-spacing: 0.05em;
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
                KahitSan Coworking Space
              </div>
            </div>
            <div class="mb-4">
              <div class="announcement-badge">
                <div class="tracking-widest font-black text-black text-2xl">
                  Schedule <span class="italic">Update</span>
                </div>
              </div>
            </div>
            <div class="mb-2">
              <div class={`font-light tracking-wide ${isDark() ? 'text-zinc-300' : 'text-gray-600'} text-base`}>
                Important notice for <span class={`font-semibold ${isDark() ? 'text-amber-400' : 'text-amber-600'}`}>December 21, 2025</span>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div class="flex items-center justify-center mb-8">
            <div class="w-48 h-24">
              <img
                src={logo()}
                alt="KahitSan Logo"
                class="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Main Announcement */}
          <div class="highlight-section" style="max-width: 85%;margin: auto;margin-bottom: 32px;">
            <div class="text-center">
              <h2 class={`font-bold tracking-wide ${textColor()} text-2xl md:text-3xl mb-6 leading-tight`}>
                Early Closing on <span class={isDark() ? 'gradient-text' : 'gradient-text-light'}>December 21</span>
              </h2>

              <div class="mb-8">
                <div class="time-badge">
                  <span class={isDark() ? 'text-amber-400' : 'text-amber-700'}>Closing at 9:00 PM</span>
                </div>
              </div>

              <p class={`${secondaryColor()} text-base md:text-lg leading-relaxed mx-auto font-normal mb-4`}>
                We will be closing early on December 21, 2025. Our facility will be open until 9:00 PM instead of our usual 24/7 schedule.
              </p>

              <p class={`${secondaryColor()} text-base leading-relaxed mx-auto font-normal`}>
                We apologize for any inconvenience and appreciate your understanding. Regular 24/7 operations resume on December 22, 2025.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div class={`text-center mt-16 pt-12 border-t ${isDark() ? 'border-amber-500/20' : 'border-amber-200'}`}>
            <p class={`${isDark() ? 'text-amber-500/60' : 'text-amber-600/60'} italic text-lg mb-6`}>
              Thank you for your understanding and continued support
            </p>

            <div class={`font-medium tracking-widest ${isDark() ? 'text-amber-500' : 'text-amber-600'} text-lg`}>
              Management
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
