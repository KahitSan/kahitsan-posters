import { createSignal, createMemo, Show, For } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoLight from '../../assets/logo.png'
import logoDark from '../../assets/logo.png'

interface Announcement {
  id: number
  type: string
  title: string
  description: string
  badge?: string
  icon?: string
}

export default function MonthlyUpdatePage() {
  const [searchParams] = useSearchParams()
  const isDark = createMemo(() => searchParams.dark !== undefined)

  const logo = createMemo(() => isDark() ? logoDark : logoLight)

  const [content] = createSignal({
    companyName: 'KahitSan Coworking Space',
    date: 'November 2025',
    subtitle: 'Monthly Update',
    website: 'Management'
  })

  const [announcements] = createSignal<Announcement[]>([
    {
      id: 1,
      type: 'text',
      title: 'Exciting Improvements Ahead',
      description: 'We are working on enhancements to better serve our growing community. Stay tuned for updates as we continue improving the KahitSan experience.',
      icon: 'sparkles'
    },
    {
      id: 2,
      type: 'text',
      title: 'CR Door Finally Fixed',
      description: 'We successfully completed repairs on the CR door that previously caused frustration. Thank you for your patience while we worked to resolve this issue.',
      icon: 'door'
    },
    {
      id: 3,
      type: 'text',
      title: 'Typhoon Uwan Response',
      description: 'We prioritized safety by closing on November 8 to prepare for Typhoon Uwan. Our space reopened on November 10 evening, ensuring a safe environment for our community.',
      icon: 'storm'
    },
    {
      id: 4,
      type: 'text',
      title: 'Broken Entrance Chairs Replaced',
      description: 'We take full accountability for the broken entrance chairs. These have now been replaced with sturdier, more durable seating to ensure client comfort and safety.',
      icon: 'chair'
    },
    {
      id: 5,
      type: 'text',
      title: 'Post-Typhoon Support at Normal Rates',
      description: 'Many homes lacked electricity and internet after Typhoon Uwan. We kept our coworking services at normal rates to help those in need—no price increases, no discrimination, serving everyone equally. We sincerely apologize for not responding to messages during the high volume period (Nov 10-12); they remain buried and unanswered. We are improving our communication system.',
      icon: 'heart'
    }
  ])

  const [feedbackText] = createSignal('We value your feedback! Help us create an even better coworking experience.')

  // SVG icon renderer
  const renderIcon = (iconName: string, className: string = '') => {
    const iconColor = isDark() ? '#C9A961' : '#92400e'

    switch (iconName) {
      case 'storm':
        return (
          <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2">
            <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>
            <polyline points="13 11 9 17 15 17 11 23"/>
          </svg>
        )
      case 'heart':
        return (
          <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
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
      case 'chair':
        return (
          <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2">
            <rect x="6" y="3" width="12" height="12" rx="2"/>
            <path d="M6 15h12M9 19h6M9 15v4M15 15v4"/>
          </svg>
        )
      case 'sparkles':
        return (
          <svg class={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} stroke-width="2">
            <path d="M12 3l2 7h7l-5.5 4.5L17 22l-5-4-5 4 1.5-7.5L3 10h7l2-7z"/>
            <path d="M5 3v4M3 5h4M6 17v4M4 19h4M19 17v4M17 19h4"/>
          </svg>
        )
      default:
        return null
    }
  }

  const bgColor = createMemo(() => isDark() ? '#0a0a0a' : '#ffffff')
  const textColor = createMemo(() => isDark() ? 'text-white' : 'text-gray-900')

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
        }

        .square-container {
          width: 1080px;
          height: 1080px;
          position: relative;
          overflow: hidden;
        }

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
          padding: 8px 28px;
          border-radius: 8px;
          transform: rotate(-2deg);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(201, 169, 97, 0.3);
        }

        .announcement-card {
          ${isDark()
            ? 'background: rgba(39, 39, 42, 0.4); border-left: 3px solid rgba(161, 161, 170, 0.3);'
            : 'background: rgba(249, 250, 251, 0.6); border-left: 3px solid rgba(209, 213, 219, 0.6);'
          };
          backdrop-filter: blur(10px);
          border-radius: 8px;
          padding: 20px 24px;
        }

        .grid-announcements {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }

        .grid-announcements > * {
          flex: 0 1 calc(50% - 8px);
          max-width: calc(50% - 8px);
        }
      `}</style>

      <section class="square-container" style={{ background: bgColor() }}>
        <div class="network-bg"></div>

        <div style={{
          position: 'relative',
          'z-index': '10',
          height: '100%',
          display: 'flex',
          'flex-direction': 'column',
          padding: '48px 60px'
        }}>

          {/* Header */}
          <div style={{ 'text-align': 'center', 'margin-bottom': '32px' }}>
            <div style={{ display: 'flex', 'align-items': 'center', 'justify-content': 'center', gap: '12px', 'margin-bottom': '16px' }}>
              <img
                src={logo()}
                alt="KahitSan Logo"
                style={{ width: '64px', height: '64px', 'object-fit': 'contain' }}
              />
              <div class={`${isDark() ? 'text-amber-500/70' : 'text-amber-600/70'}`} style={{ 'font-size': '16px', 'font-weight': '500', 'letter-spacing': '0.05em' }}>
                {content().companyName}
              </div>
            </div>

            <div style={{ 'margin-bottom': '20px' }}>
              <div class="update-badge">
                <div style={{ 'letter-spacing': '0.1em', 'font-weight': '900', color: '#000', 'font-size': '24px' }}>
                  Monthly <span style={{ 'font-style': 'italic' }}>Update</span>
                </div>
              </div>
            </div>

            <div class={`${isDark() ? 'text-zinc-300' : 'text-gray-600'}`} style={{ 'font-size': '15px', 'font-weight': '300', 'letter-spacing': '0.03em', 'margin-bottom': '12px' }}>
              What happened in <span class={`${isDark() ? 'text-amber-400' : 'text-amber-600'}`} style={{ 'font-weight': '600' }}>{content().date}</span>
            </div>

            <div class={`${isDark() ? 'text-zinc-500' : 'text-gray-400'}`} style={{ 'font-size': '14px', 'letter-spacing': '0.03em' }}>
              A recap of our response, improvements, and community growth
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: '1', 'min-height': 0 }}>
            <h2 class={textColor()} style={{ 'font-size': '28px', 'font-weight': '700', 'text-align': 'center', 'margin-bottom': '24px', 'letter-spacing': '0.02em' }}>
              November <span class={isDark() ? 'gradient-text' : 'gradient-text-light'}>Highlights</span>
            </h2>

            <div class="grid-announcements">
              <For each={announcements()}>
                {(ann) => (
                  <div class="announcement-card">
                    <div style={{ display: 'flex', 'align-items': 'start', gap: '12px' }}>
                      <Show when={ann.icon}>
                        {(icon) => (
                          <div style={{ 'margin-top': '2px', 'flex-shrink': '0' }}>
                            {renderIcon(icon())}
                          </div>
                        )}
                      </Show>
                      <div style={{ flex: '1' }}>
                        <h3 class={`${isDark() ? 'text-zinc-100' : 'text-gray-900'}`} style={{ 'font-weight': '600', 'letter-spacing': '0.02em', 'font-size': '16px', 'margin-bottom': '10px' }}>
                          {ann.title}
                        </h3>
                        <p class={`${isDark() ? 'text-zinc-200' : 'text-gray-700'}`} style={{ 'font-size': '14px', 'line-height': '1.6', 'font-weight': '500' }}>
                          {ann.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>

          {/* Footer */}
          <div style={{ 'text-align': 'center', 'padding-top': '40px', 'border-top': `1px solid ${isDark() ? 'rgba(245, 158, 11, 0.2)' : 'rgba(251, 191, 36, 0.3)'}` }}>
            <p class={`${isDark() ? 'text-amber-500/60' : 'text-amber-600/60'}`} style={{ 'font-style': 'italic', 'font-size': '18px', 'margin-bottom': '20px' }}>
              {feedbackText()}
            </p>

            <div class={`${isDark() ? 'text-amber-500' : 'text-amber-600'}`} style={{ 'font-weight': '500', 'letter-spacing': '0.1em', 'font-size': '16px' }}>
              {content().website}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
