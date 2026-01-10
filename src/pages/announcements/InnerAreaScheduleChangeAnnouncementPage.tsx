import { createSignal, createMemo, onMount } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoLight from '../../../assets/LOGO-kahitsan.v2.svg'
import logoDark from '../../../assets/logo.png'

export default function InnerAreaScheduleChangeAnnouncementPage() {
  const [searchParams] = useSearchParams()
  const isDark = createMemo(() => searchParams.dark !== undefined)

  const logo = createMemo(() => isDark() ? logoDark : logoLight)

  const bgColor = createMemo(() => isDark() ? '#0a0a0a' : '#ffffff')
  const textColor = createMemo(() => isDark() ? 'text-white' : 'text-gray-900')
  const mutedColor = createMemo(() => isDark() ? 'text-zinc-300' : 'text-gray-600')

  return (
    <>
      <style>{`
        .network-bg {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 35%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:%23C9A961;stop-opacity:0.1"/><stop offset="50%" style="stop-color:%23D4B76A;stop-opacity:0.15"/><stop offset="100%" style="stop-color:%23C9A961;stop-opacity:0.1"/></linearGradient></defs><path d="M0,150 Q300,100 600,150 T1200,150 L1200,300 L0,300 Z" fill="url(%23grad)"/><circle cx="100" cy="180" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="300" cy="140" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="500" cy="160" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="700" cy="130" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="900" cy="170" r="3" fill="%23C9A961" opacity="0.5"/><circle cx="1100" cy="145" r="3" fill="%23C9A961" opacity="0.5"/><line x1="100" y1="180" x2="300" y2="140" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="300" y1="140" x2="500" y2="160" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="500" y1="160" x2="700" y2="130" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="700" y1="130" x2="900" y2="170" stroke="%23C9A961" stroke-width="1" opacity="0.3"/><line x1="900" y1="170" x2="1100" y2="145" stroke="%23C9A961" stroke-width="1" opacity="0.3"/></svg>') no-repeat center bottom;
          background-size: cover;
          opacity: 0.6;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      <section class="relative w-full min-h-[720px] flex items-center" style={{ background: bgColor() }}>
        <div class="relative z-10 mx-auto px-4 max-w-xl">
          <div class="network-bg"></div>

          <div class="text-center mb-4">
            <div class="mb-1">
              <div class={`tracking-widest font-black ${textColor()} text-2xl`}>
                Schedule Update
              </div>
            </div>
            <div>
              <div class={`font-normal ${mutedColor()} text-sm`}>
                Effective <span class={`font-semibold ${isDark() ? 'text-amber-500' : 'text-amber-600'}`}>Jan 8, 2026</span>
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

          <div class="text-center mb-5">
            <h2 class={`font-bold ${textColor()} text-2xl mb-4`}>
              Inner Area Availability
            </h2>

            <div class={`${isDark() ? 'bg-zinc-800' : 'bg-gray-100'} rounded-lg p-4 mb-4`}>
              <div class="text-center">
                <div class={`${textColor()} text-xl font-bold mb-2`}>Not Available</div>
                <div class={`${isDark() ? 'text-red-400' : 'text-red-700'} text-2xl font-bold`}>7 AM - 4:30 PM</div>
              </div>
            </div>

            <p class={`${textColor()} text-base mb-2`}>
              Weekdays: Available after <span class={`font-bold ${isDark() ? 'text-green-400' : 'text-green-700'}`}>4:30 PM</span>
            </p>
            <p class={`${textColor()} text-base mb-3`}>
              <span class={`font-bold ${isDark() ? 'text-green-400' : 'text-green-700'}`}>All day</span> on weekends
            </p>

            <p class={`${mutedColor()} text-sm mb-4`}>
              Until end of January or until further notice
            </p>

            <div class={`${isDark() ? 'bg-red-900/30' : 'bg-red-50'} rounded-lg p-4 text-left`}>
              <p class={`text-base font-bold ${isDark() ? 'text-red-400' : 'text-red-700'}`}>
                AUTHORIZATION REQUIRED: Do NOT enter Inner Area without proper authorization
              </p>
            </div>
          </div>

          <div class={`text-center pt-6 border-t ${isDark() ? 'border-zinc-700' : 'border-gray-200'}`}>
            <div class={`font-medium tracking-widest ${isDark() ? 'text-amber-500' : 'text-amber-600'} text-base`}>
              Management
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
