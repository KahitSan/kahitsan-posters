import { createSignal, createMemo, onMount } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoLight from '@assets/logo.png'
import logoDark from '@assets/logo.png'

export default function CleaningAnnouncementPage() {
  const [searchParams] = useSearchParams()
  const isDark = createMemo(() => searchParams.dark !== undefined)

  const logo = createMemo(() => isDark() ? logoDark : logoLight)

  const bgColor = createMemo(() => isDark() ? '#0a0a0a' : '#ffffff')
  const textColor = createMemo(() => isDark() ? 'text-white' : 'text-gray-900')
  const mutedColor = createMemo(() => isDark() ? 'text-zinc-300' : 'text-gray-600')

  const [containerWidth, setContainerWidth] = createSignal('auto')
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement | undefined>(undefined)

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
          background: linear-gradient(135deg, ${isDark() ? '#C9A961, #E5D4A1' : '#d97706, #fbbf24'});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .network-bg {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 35%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:%23C9A961;stop-opacity:0.1"/><stop offset="50%" style="stop-color:%23D4B76A;stop-opacity:0.15"/><stop offset="100%" style="stop-color:%23C9A961;stop-opacity:0.1"/></linearGradient></defs><path d="M0,150 Q300,100 600,150 T1200,150 L1200,300 L0,300 Z" fill="url(%23grad)"/><circle cx="100" cy="180" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="300" cy="140" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="500" cy="160" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="700" cy="130" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="900" cy="170" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="1100" cy="145" r="3" fill="%23C9A961" opacity="0.5"/><line x1="100" y1="180" x2="300" y2="140" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="300" y1="140" x2="500" y2="160" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="500" y1="160" x2="700" y2="130" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="700" y1="130" x2="900" y2="170" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="900" y1="170" x2="1100" y2="145" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="900" y1="170" x2="1100" y2="145" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="900" y1="170" x2="1100" y2="145" stroke="%23C9A961" stroke-width="1" opacity="0.3"/></svg>') no-repeat center bottom;
          background-size: cover;
          opacity: 0.6;
          pointer-events: none;
          z-index: 0;
        }

        .poster-frame {
          position: fixed;
          top: 12px;
          left: 12px;
          right: 12px;
          bottom: 12px;
          border: 2px solid rgba(201, 169, 97, 0.4);
          border-radius: 12px;
          pointer-events: none;
          z-index: 1;
          box-shadow: 0 0 40px rgba(201, 169, 97, 0.1);
        }

        .poster-corner-accent {
          position: fixed;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(201, 169, 97, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        .poster-corner-accent.top-left {
          top: 24px;
          left: 24px;
        }

        .poster-corner-accent.top-right {
          top: 24px;
          right: 24px;
        }

        .poster-corner-accent.bottom-left {
          bottom: 24px;
          left: 24px;
        }

        .poster-corner-accent.bottom-right {
          bottom: 24px;
          right: 24px;
        }

        .highlight-section {
          position: relative;
          padding-bottom: 8px;
        }

        .highlight-section::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A961, transparent);
          box-shadow: 0 0 12px rgba(201, 169, 97, 0.5);
        }

        .status-box {
          ${isDark()
            ? 'background: rgba(234, 179, 8, 0.15); border: 2px solid rgba(234, 179, 8, 0.3);'
            : 'background: rgba(239, 68, 68, 0.08); border: 2px solid rgba(239, 68, 68, 0.2);'
          };
          padding: 20px 24px;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .time-badge {
          display: inline-block;
          ${isDark()
            ? 'background: rgba(34, 197, 94, 0.25); border: 2px solid #22c55e;'
            : 'background: rgba(34, 197, 94, 0.1); border: 2px solid #22c55e;'
          };
          padding: 14px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 1.6rem;
          letter-spacing: 0.05em;
        }
      `}</style>

      <section class="relative w-full min-h-[720px] flex items-center" style={{ background: bgColor() }}>
        <div class="poster-frame"></div>
        <div class="poster-corner-accent top-left"></div>
        <div class="poster-corner-accent top-right"></div>
        <div class="poster-corner-accent bottom-left"></div>
        <div class="poster-corner-accent bottom-right"></div>

        <div class="relative z-10 mx-auto px-4 max-w-xl">
          <div class="network-bg"></div>

          <div class="text-center mb-4">
            <div class="mb-2">
              <div class="text-gray-500 text-base font-medium">
                Saturday, January 10, 2026
              </div>
            </div>
            <div class="mb-2">
              <div class="tracking-widest font-black text-2xl">
                Notice to All Coworkers
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center mb-4">
            <div class="w-40 h-20">
              <img
                src={logo()}
                alt="KahitSan Logo"
                class="w-full h-full object-contain"
              />
            </div>
          </div>

          <div class="text-center mb-5 highlight-section">
            <h2 class={`${textColor()} text-2xl mb-6 leading-tight`}>
              Cleaning Schedule
            </h2>

            <div class="grid grid-cols-2 gap-4 mb-5">
              <div class="status-box">
                <div class="text-center">
                  <div class="mb-3">
                    <div class="text-gray-500 text-lg">
                      Regular
                    </div>
                  </div>
                  <div class="text-base font-semibold">
                    Coworking
                  </div>
                  <div class="text-sm mt-2">
                    As usual
                  </div>
                </div>
              </div>

              <div class="status-box">
                <div class="text-center">
                  <div class="mb-3">
                    <div class="text-gray-500 text-lg">
                      Saturday
                    </div>
                  </div>
                  <div class="text-base font-semibold">
                    Closed
                  </div>
                  <div class="text-sm mt-2">
                    For cleaning
                  </div>
                </div>
              </div>

              <div class="status-box">
                <div class="text-center">
                  <div class="mb-3">
                    <div class="text-gray-500 text-lg">
                      Saturday
                    </div>
                  </div>
                  <div class="time-badge">
                    8:00 AM - 12:00 PM
                  </div>
                  <div class="text-sm mt-2">
                    Space closed
                  </div>
                </div>
              </div>

              <div class="status-box">
                <div class="text-center">
                  <div class="mb-3">
                    <div class="text-gray-500 text-lg">
                      Saturday
                    </div>
                  </div>
                  <div class="text-base font-semibold">
                    Resume
                  </div>
                  <div class="text-sm mt-2">
                    After 12:00 PM
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <p class={`${mutedColor()} text-base leading-relaxed`}>
                Regular coworking operations resume after the cleaning period.
              </p>
            </div>
          </div>

          <div class={`text-center pt-6 border-t ${isDark() ? 'border-amber-500/15' : 'border-amber-200'}`}>
            <div class={`font-medium tracking-widest ${isDark() ? 'text-amber-500' : 'text-amber-600'} text-base`}>
              Management
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
