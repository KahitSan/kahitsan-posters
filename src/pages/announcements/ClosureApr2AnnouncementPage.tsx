import { createMemo } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoPng from '@assets/logo.png'
import logoLightPng from '@assets/Kahitsan-light-nobg.png'

export default function ClosureApr2AnnouncementPage() {
  const [searchParams] = useSearchParams()
  const isDark = createMemo(() => searchParams.dark !== undefined)

  const logo = createMemo(() => isDark() ? logoPng : logoLightPng)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: ${isDark() ? '#000' : '#f5f5f5'};
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .poster-container {
          width: 1080px;
          height: 1080px;
          position: relative;
          overflow: hidden;
          background: ${isDark()
          ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8f6f0 50%, #ffffff 100%)'};
        }

        /* Animated gradient orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: ${isDark() ? '0.4' : '0.3'};
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: ${isDark()
          ? 'radial-gradient(circle, #C9A961 0%, transparent 70%)'
          : 'radial-gradient(circle, #d4a853 0%, transparent 70%)'};
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: ${isDark()
          ? 'radial-gradient(circle, #B8860B 0%, transparent 70%)'
          : 'radial-gradient(circle, #DAA520 0%, transparent 70%)'};
          bottom: -50px;
          left: -50px;
          animation-delay: -4s;
        }

        .orb-3 {
          width: 200px;
          height: 200px;
          background: ${isDark()
          ? 'radial-gradient(circle, #8B7355 0%, transparent 70%)'
          : 'radial-gradient(circle, #D2B48C 0%, transparent 70%)'};
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -2s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }

        /* Grid pattern overlay */
        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(${isDark() ? 'rgba(201, 169, 97, 0.03)' : 'rgba(0, 0, 0, 0.02)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark() ? 'rgba(201, 169, 97, 0.03)' : 'rgba(0, 0, 0, 0.02)'} 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* Main content */
        .content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 36px 40px;
          text-align: center;
        }

        /* Logo */
        .logo-container {
          margin-bottom: 24px;
        }

        .logo {
          height: 88px;
          width: auto;
          filter: ${isDark() ? 'brightness(1)' : 'brightness(0.9)'};
        }

        /* Notice badge */
        .notice-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${isDark()
          ? 'rgba(251, 191, 36, 0.12)'
          : 'rgba(217, 119, 6, 0.08)'};
          border: 1.5px solid ${isDark() ? 'rgba(251, 191, 36, 0.35)' : 'rgba(217, 119, 6, 0.25)'};
          padding: 12px 28px;
          border-radius: 100px;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
        }

        .notice-dot {
          width: 8px;
          height: 8px;
          background: ${isDark() ? '#fbbf24' : '#d97706'};
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .notice-text {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: ${isDark() ? '#fbbf24' : '#b45309'};
          text-transform: uppercase;
        }

        /* Main headline */
        .headline {
          font-size: 64px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 36px;
          color: ${isDark() ? '#ffffff' : '#1a1a1a'};
        }

        .headline-accent {
          background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 50%, #C9A961 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Calendar dates grid */
        .dates-container {
          position: relative;
          margin-bottom: 36px;
          width: 100%;
          max-width: 780px;
        }

        .dates-glow {
          position: absolute;
          inset: -16px;
          background: ${isDark()
          ? 'radial-gradient(ellipse, rgba(201, 169, 97, 0.2) 0%, transparent 70%)'
          : 'radial-gradient(ellipse, rgba(201, 169, 97, 0.15) 0%, transparent 70%)'};
          filter: blur(20px);
        }

        .dates-grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .date-card {
          background: ${isDark()
          ? 'linear-gradient(135deg, rgba(201, 169, 97, 0.12) 0%, rgba(201, 169, 97, 0.04) 100%)'
          : 'linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.05) 100%)'};
          border: 1.5px solid ${isDark() ? 'rgba(201, 169, 97, 0.35)' : 'rgba(201, 169, 97, 0.3)'};
          border-radius: 20px;
          padding: 28px 20px;
          backdrop-filter: blur(20px);
          text-align: center;
        }

        .date-day {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${isDark() ? 'rgba(201, 169, 97, 0.8)' : 'rgba(180, 140, 50, 0.9)'};
          margin-bottom: 8px;
        }

        .date-number {
          font-size: 72px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -2px;
          background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 40%, #C9A961 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
        }

        .date-month {
          font-size: 16px;
          font-weight: 600;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'};
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Description */
        .description {
          max-width: 700px;
          font-size: 20px;
          font-weight: 400;
          line-height: 1.7;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
          margin-bottom: 32px;
        }

        .description strong {
          color: ${isDark() ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'};
          font-weight: 600;
        }

        /* Footer */
        .footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .footer-thanks {
          font-size: 18px;
          font-weight: 500;
          font-style: italic;
          color: ${isDark() ? 'rgba(201, 169, 97, 0.6)' : 'rgba(180, 140, 50, 0.7)'};
        }

        .footer-signature {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${isDark() ? '#C9A961' : '#b8860b'};
        }

        /* Decorative corner accents */
        .corner {
          position: absolute;
          width: 100px;
          height: 100px;
          border: 2px solid ${isDark() ? 'rgba(201, 169, 97, 0.2)' : 'rgba(201, 169, 97, 0.15)'};
        }

        .corner-tl {
          top: 24px;
          left: 24px;
          border-right: none;
          border-bottom: none;
          border-top-left-radius: 24px;
        }

        .corner-tr {
          top: 24px;
          right: 24px;
          border-left: none;
          border-bottom: none;
          border-top-right-radius: 24px;
        }

        .corner-bl {
          bottom: 24px;
          left: 24px;
          border-right: none;
          border-top: none;
          border-bottom-left-radius: 24px;
        }

        .corner-br {
          bottom: 24px;
          right: 24px;
          border-left: none;
          border-top: none;
          border-bottom-right-radius: 24px;
        }
      `}</style>

      <div class="poster-container" id="poster">
        {/* Background effects */}
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="grid-pattern"></div>

        {/* Corner decorations */}
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        {/* Main content */}
        <div class="content">
          {/* Logo */}
          <div class="logo-container">
            <img src={logo()} alt="KahitSan" class="logo" />
          </div>

          {/* Notice badge */}
          <div class="notice-badge">
            <div class="notice-dot"></div>
            <span class="notice-text">Advance Notice</span>
          </div>

          {/* Main headline */}
          <h1 class="headline">
            Temporarily<br />
            <span class="headline-accent">Closed</span>
          </h1>

          {/* Date cards */}
          <div class="dates-container">
            <div class="dates-glow"></div>
            <div class="dates-grid">
              <div class="date-card">
                <div class="date-day">Thursday</div>
                <div class="date-number">2</div>
                <div class="date-month">April</div>
              </div>
              <div class="date-card">
                <div class="date-day">Friday</div>
                <div class="date-number">3</div>
                <div class="date-month">April</div>
              </div>
              <div class="date-card">
                <div class="date-day">Saturday</div>
                <div class="date-number">4</div>
                <div class="date-month">April</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p class="description">
            We will be <strong>closed from Thursday, April 2 through Saturday, April 4</strong>.
            Regular operations will resume on <strong>Sunday, April 5</strong>.
          </p>

          {/* Footer */}
          <div class="footer">
            <span class="footer-thanks">Thank you for your understanding</span>
            <span class="footer-signature">Management</span>
          </div>
        </div>
      </div>
    </>
  )
}
