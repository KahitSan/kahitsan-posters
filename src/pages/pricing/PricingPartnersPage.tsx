import { createMemo, For } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoPng from '@assets/logo.png'
import logoLightPng from '@assets/Kahitsan-light-nobg.png'
import { communityData } from '../../data/community'

export default function PricingPartnersPage() {
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
          ? 'linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(201, 169, 97, 0.02) 100%)'
          : 'linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.05) 100%)'};
        }

        /* Amber/Gold theme for Partners */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: ${isDark() ? '0.4' : '0.3'};
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, #C9A961 0%, transparent 70%);
          top: -150px;
          right: -150px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, #B8860B 0%, transparent 70%);
          bottom: -100px;
          left: -100px;
          animation-delay: -3s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.05); }
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(${isDark() ? 'rgba(201, 169, 97, 0.05)' : 'rgba(201, 169, 97, 0.03)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark() ? 'rgba(201, 169, 97, 0.05)' : 'rgba(201, 169, 97, 0.03)'} 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 50px; /* Reduced padding */
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between; /* Title Left, Logo Right */
          margin-bottom: 30px;
          text-align: left;
           padding: 0 10px;
        }

        .logo {
          height: 60px;
          width: auto;
          filter: ${isDark() ? 'brightness(1)' : 'brightness(0.9)'};
        }

        .header-title {
          font-size: 42px;
          font-weight: 800;
          color: ${isDark() ? '#ffffff' : '#1a1a1a'};
          line-height: 1.1;
        }

        .header-accent {
          background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Discount Badge */
        .discount-badge {
          align-self: center;
          background: ${isDark() ? 'rgba(201, 169, 97, 0.15)' : 'rgba(201, 169, 97, 0.1)'};
          border: 1px solid ${isDark() ? 'rgba(201, 169, 97, 0.3)' : 'rgba(201, 169, 97, 0.25)'};
          padding: 12px 24px;
          border-radius: 100px;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .discount-percent {
          font-size: 28px;
          font-weight: 800;
          color: ${isDark() ? '#E5D4A1' : '#B8860B'};
        }

        .discount-text {
          font-size: 14px;
          font-weight: 600;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'};
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Partners Grid - "Slide Presentation" Style */
        .partners-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center; /* Centers items horizontally, ensures last item is centered */
          align-content: center;
          gap: 30px; /* Reduced gap significantly to minimize wasted space */
          padding: 0; /* Removed extra padding to allow full width usage */
          flex: 1;
        }

        .partner-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 16px;
          width: 430px; /* Adjusted to safely fit 2 items (430*2 + 30 = 890px < 980px available) */
        }

        .logo-container {
          height: 240px; /* Increased height significantly (was 180px) */
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          /* No background, no border, no shadow as requested */
          transition: transform 0.3s ease;
        }

        .logo-container:hover {
            transform: scale(1.05);
        }

        .partner-logo {
          max-height: 100%;
          max-width: 90%;
          object-fit: contain;
        }

        .partner-name {
          font-size: 14px;
          font-weight: 500;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'}; /* Subtle text */
          line-height: 1.3;
          max-width: 80%;
        }

        .footer {
          margin-top: auto;
          text-align: center;
        }

        .footer-note {
          font-size: 16px;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.5)'};
          font-style: italic;
        }
      `}</style>

      <div class="poster-container" id="poster">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="grid-pattern"></div>

        <div class="content">
          <div class="header">
            <div>
              <h1 class="header-title">
                Our Community<br />
                <span class="header-accent">Partners</span>
              </h1>
            </div>
            <img src={logo()} alt="KahitSan" class="logo" />
          </div>

          <div class="discount-badge">
            <span class="discount-percent">20% OFF</span>
            <span class="discount-text">For all active members</span>
          </div>

          <div class="partners-grid">
            <For each={communityData.partnerships}>
              {(partner) => (
                <div class="partner-item">
                  <div class="logo-container">
                    <img src={partner.icon} alt={partner.name} class="partner-logo" />
                  </div>
                  <div class="partner-name">{partner.name}</div>
                </div>
              )}
            </For>
            {/* Adding duplicate to show grid layout better if needed, or remove if strictly following data */}
            {/* If we want to fill the grid, we could repeat, but for now stick to data */}
          </div>

          <div class="footer">
            <p class="footer-note">*Simply present your valid organization ID to avail the discount</p>
          </div>
        </div>
      </div>
    </>
  )
}
