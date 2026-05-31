import { createMemo } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoPng from '@assets/logo.png'
import logoLightPng from '@assets/Kahitsan-light-nobg.png'

export default function BookingHoursAnnouncementPage() {
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

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(${isDark() ? 'rgba(201, 169, 97, 0.03)' : 'rgba(0, 0, 0, 0.02)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark() ? 'rgba(201, 169, 97, 0.03)' : 'rgba(0, 0, 0, 0.02)'} 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

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

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: ${isDark()
            ? 'rgba(201, 169, 97, 0.15)'
            : 'rgba(201, 169, 97, 0.1)'};
          border: 1.5px solid ${isDark() ? 'rgba(201, 169, 97, 0.4)' : 'rgba(201, 169, 97, 0.3)'};
          padding: 10px 20px;
          border-radius: 100px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #C9A961;
          border-radius: 50%;
        }

        .badge-text {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: ${isDark() ? '#E5D4A1' : '#8B7355'};
          text-transform: uppercase;
        }

        .logo-container {
          margin-bottom: 40px;
        }

        .logo {
          height: 80px;
          width: auto;
          filter: ${isDark() ? 'brightness(1)' : 'brightness(0.9)'};
        }

        .headline {
          font-size: 52px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 16px;
          color: ${isDark() ? '#ffffff' : '#1a1a1a'};
        }

        .headline-accent {
          background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 50%, #C9A961 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subheadline {
          font-size: 18px;
          font-weight: 400;
          line-height: 1.6;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'};
          margin-bottom: 40px;
          max-width: 600px;
        }

        .time-container {
          position: relative;
          margin-bottom: 40px;
        }

        .time-glow {
          position: absolute;
          inset: -20px;
          background: ${isDark()
            ? 'radial-gradient(ellipse, rgba(239, 68, 68, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(ellipse, rgba(239, 68, 68, 0.2) 0%, transparent 70%)'};
          filter: blur(20px);
        }

        .time-card {
          position: relative;
          background: ${isDark()
            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.08) 100%)'};
          border: 2px solid ${isDark() ? 'rgba(239, 68, 68, 0.5)' : 'rgba(239, 68, 68, 0.4)'};
          border-radius: 24px;
          padding: 24px 56px;
          backdrop-filter: blur(20px);
        }

        .time-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${isDark() ? 'rgba(239, 68, 68, 0.8)' : 'rgba(200, 50, 50, 0.9)'};
          margin-bottom: 4px;
        }

        .time-value {
          font-size: 64px;
          font-weight: 900;
          letter-spacing: -2px;
          color: ${isDark() ? '#fca5a5' : '#dc2626'};
        }

        .note {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
          margin-bottom: 40px;
          max-width: 560px;
        }

        .note strong {
          color: ${isDark() ? '#ffffff' : '#000000'};
          font-weight: 600;
        }

        .reasons-section {
          max-width: 600px;
          width: 100%;
          margin-bottom: 40px;
        }

        .reasons-title {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${isDark() ? 'rgba(201, 169, 97, 0.7)' : 'rgba(180, 140, 50, 0.8)'};
          margin-bottom: 16px;
        }

        .reason-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 20px;
          margin-bottom: 8px;
          background: ${isDark()
            ? 'rgba(255, 255, 255, 0.03)'
            : 'rgba(0, 0, 0, 0.02)'};
          border-radius: 12px;
          border: 1px solid ${isDark()
            ? 'rgba(255, 255, 255, 0.06)'
            : 'rgba(0, 0, 0, 0.04)'};
        }

        .reason-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          background: linear-gradient(135deg, #C9A961, #E5D4A1);
        }

        .reason-text {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.5;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.6)'};
          text-align: left;
        }

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

      <div class="poster-container" id="poster">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="grid-pattern"></div>

        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        <div class="content">
          <div class="badge">
            <div class="badge-dot"></div>
            <span class="badge-text">Schedule Update</span>
          </div>

          <div class="logo-container">
            <img src={logo()} alt="KahitSan" class="logo" />
          </div>

          <h1 class="headline">
            Booking Hours<br />
            <span class="headline-accent">Update</span>
          </h1>

          <div class="time-container">
            <div class="time-glow"></div>
            <div class="time-card">
              <div class="time-label">Booking Closed</div>
              <div class="time-value">12 AM – 8 AM</div>
            </div>
          </div>

          <p class="note">
            The space stays <strong>24/7</strong> with door lock access.
            If you plan to stay overnight, please <strong>book before 12 AM</strong>.
            You can still message us, but expect responses during office hours.
          </p>

          <div class="reasons-section">
            <div class="reasons-title">Why this change</div>
            <div class="reason-item">
              <div class="reason-bullet"></div>
              <span class="reason-text">Allows us to plan and schedule maintenance without disrupting your work</span>
            </div>
            <div class="reason-item">
              <div class="reason-bullet"></div>
              <span class="reason-text">Keeps front desk focused on security during overnight hours</span>
            </div>
            <div class="reason-item">
              <div class="reason-bullet"></div>
              <span class="reason-text">Ensures we're fully present to respond when you need us</span>
            </div>
          </div>

          <div class="footer">
            <span class="footer-thanks">Thank you for your understanding</span>
            <span class="footer-signature">Management</span>
          </div>
        </div>
      </div>
    </>
  )
}
