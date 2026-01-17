import { createMemo } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoPng from '@assets/logo.png'
import logoLightPng from '@assets/Kahitsan-light-nobg.png'

export default function EarlyClosingJan17AnnouncementPage() {
  const [searchParams] = useSearchParams()
  const isDark = createMemo(() => searchParams.dark !== undefined)

  // Use light PNG for light mode, regular PNG for dark mode
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
          padding: 60px;
          text-align: center;
        }

        /* Late announcement alert */
        .alert-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${isDark()
          ? 'rgba(239, 68, 68, 0.15)'
          : 'rgba(239, 68, 68, 0.1)'};
          border: 1.5px solid ${isDark() ? 'rgba(239, 68, 68, 0.4)' : 'rgba(239, 68, 68, 0.3)'};
          padding: 10px 20px;
          border-radius: 100px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }

        .alert-dot {
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .alert-text {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: ${isDark() ? '#fca5a5' : '#dc2626'};
          text-transform: uppercase;
        }

        /* Logo */
        .logo-container {
          margin-bottom: 40px;
        }

        .logo {
          height: 80px;
          width: auto;
          filter: ${isDark() ? 'brightness(1)' : 'brightness(0.9)'};
        }

        /* Date badge */
        .date-badge {
          display: inline-block;
          background: ${isDark()
          ? 'linear-gradient(135deg, rgba(201, 169, 97, 0.2), rgba(201, 169, 97, 0.1))'
          : 'linear-gradient(135deg, rgba(184, 134, 11, 0.15), rgba(184, 134, 11, 0.05))'};
          border: 1.5px solid ${isDark() ? 'rgba(201, 169, 97, 0.4)' : 'rgba(184, 134, 11, 0.3)'};
          padding: 12px 28px;
          border-radius: 100px;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
        }

        .date-text {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 2px;
          color: ${isDark() ? '#E5D4A1' : '#8B7355'};
          text-transform: uppercase;
        }

        /* Main headline */
        .headline {
          font-size: 52px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 48px;
          color: ${isDark() ? '#ffffff' : '#1a1a1a'};
        }

        .headline-accent {
          background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 50%, #C9A961 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Time display - the star of the show */
        .time-container {
          position: relative;
          margin-bottom: 48px;
        }

        .time-glow {
          position: absolute;
          inset: -20px;
          background: ${isDark()
          ? 'radial-gradient(ellipse, rgba(201, 169, 97, 0.3) 0%, transparent 70%)'
          : 'radial-gradient(ellipse, rgba(201, 169, 97, 0.2) 0%, transparent 70%)'};
          filter: blur(20px);
        }

        .time-card {
          position: relative;
          background: ${isDark()
          ? 'linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(201, 169, 97, 0.2) 0%, rgba(201, 169, 97, 0.08) 100%)'};
          border: 2px solid ${isDark() ? 'rgba(201, 169, 97, 0.5)' : 'rgba(201, 169, 97, 0.4)'};
          border-radius: 24px;
          padding: 32px 64px;
          backdrop-filter: blur(20px);
        }

        .time-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${isDark() ? 'rgba(201, 169, 97, 0.8)' : 'rgba(180, 140, 50, 0.9)'};
          margin-bottom: 8px;
        }

        .time-value {
          font-size: 72px;
          font-weight: 900;
          letter-spacing: -2px;
          background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 40%, #C9A961 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
        }

        /* Supporting text */
        .description {
          max-width: 600px;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.7;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
          margin-bottom: 48px;
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
          font-size: 16px;
          font-weight: 500;
          font-style: italic;
          color: ${isDark() ? 'rgba(201, 169, 97, 0.6)' : 'rgba(180, 140, 50, 0.7)'};
        }

        .footer-signature {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${isDark() ? '#C9A961' : '#b8860b'};
        }

        /* Decorative corner accents */
        .corner {
          position: absolute;
          width: 120px;
          height: 120px;
          border: 2px solid ${isDark() ? 'rgba(201, 169, 97, 0.2)' : 'rgba(201, 169, 97, 0.15)'};
        }

        .corner-tl {
          top: 40px;
          left: 40px;
          border-right: none;
          border-bottom: none;
          border-top-left-radius: 24px;
        }

        .corner-tr {
          top: 40px;
          right: 40px;
          border-left: none;
          border-bottom: none;
          border-top-right-radius: 24px;
        }

        .corner-bl {
          bottom: 40px;
          left: 40px;
          border-right: none;
          border-top: none;
          border-bottom-left-radius: 24px;
        }

        .corner-br {
          bottom: 40px;
          right: 40px;
          border-left: none;
          border-top: none;
          border-bottom-right-radius: 24px;
        }
      `}</style>

      {/* This is the 1080x1080 container that Playwright will capture */}
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
          {/* Late announcement alert */}
          <div class="alert-badge">
            <div class="alert-dot"></div>
            <span class="alert-text">Apologies for the late announcement</span>
          </div>

          {/* Logo */}
          <div class="logo-container">
            <img src={logo()} alt="KahitSan" class="logo" />
          </div>

          {/* Date badge */}
          <div class="date-badge">
            <span class="date-text">Today - January 17, 2026</span>
          </div>

          {/* Main headline */}
          <h1 class="headline">
            We're Closing<br />
            <span class="headline-accent">Early Today</span>
          </h1>

          {/* Time display */}
          <div class="time-container">
            <div class="time-glow"></div>
            <div class="time-card">
              <div class="time-label">Closing Time</div>
              <div class="time-value">12:00 NN</div>
            </div>
          </div>

          {/* Description */}
          <p class="description">
            Due to <strong>Tropical Storm Ada (Nokaen)</strong>, we will be closing at <strong>12:00 noon</strong> today
            for the safety of our staff and customers. Regular operations will resume <strong>tomorrow</strong>.
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
