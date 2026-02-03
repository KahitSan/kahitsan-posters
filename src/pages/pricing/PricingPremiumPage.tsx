import { createMemo, For } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoPng from '@assets/logo.png'
import logoLightPng from '@assets/Kahitsan-light-nobg.png'
import { additionalPricingData, formatDuration } from '../SpacesPage/Panganiban/pricingData'

export default function PricingPremiumPage() {
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
          ? 'linear-gradient(135deg, #0f0f15 0%, #151520 100%)'
          : 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)'};
        }

        /* Animated gradient orbs - Amber/Gold theme */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: ${isDark() ? '0.4' : '0.3'};
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #C9A961 0%, transparent 70%);
          top: -200px;
          right: -200px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #B8860B 0%, transparent 70%);
          bottom: -150px;
          left: -150px;
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
          background-size: 50px 50px;
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 50px; /* Reduced from 70px */
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between; /* Title Left, Logo Right */
          margin-bottom: 30px; 
          text-align: left; /* Ensure text alignment is left */
          padding: 0 10px; /* Slight padding alignment */
        }

        .logo {
          height: 60px; /* Matched to Daily */
          width: auto;
          filter: ${isDark() ? 'brightness(1)' : 'brightness(0.9)'};
        }

        .header-title {
          font-size: 42px; 
          font-weight: 800;
          line-height: 1;
          color: ${isDark() ? '#ffffff' : '#1a1a1a'};
          text-transform: uppercase;
          letter-spacing: -1px;
        }

        .header-accent {
          background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 50%, #C9A961 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cards-container {
          display: flex;
          flex-direction: column;
          gap: 24px; /* Reduced gap */
          flex: 1;
          justify-content: center;
        }

        .premium-card {
          position: relative;
          background: ${isDark()
          ? 'linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(201, 169, 97, 0.02) 100%)'
          : 'linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.05) 100%)'};
          /* Clip Path for HUD Effect (TL and BR cut) */
          clip-path: polygon(
            40px 0, 100% 0, 
            100% calc(100% - 40px), calc(100% - 40px) 100%, 
            0 100%, 0 40px
          );
          /* Use drop-shadow since box-shadow is clipped */
          filter: drop-shadow(0 10px 20px ${isDark() ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'});
          
          /* Border simulation via inset box-shadow doesn't work well with clip-path on the element itself for the cut edges. 
             We'll rely on the background difference and drop-shadow. 
          */
          border-left: 1px solid ${isDark() ? 'rgba(201, 169, 97, 0.3)' : 'rgba(201, 169, 97, 0.25)'};
          border-top: 1px solid ${isDark() ? 'rgba(201, 169, 97, 0.3)' : 'rgba(201, 169, 97, 0.25)'};
          
          display: flex;
          flex-direction: row; 
          height: 300px; 
        }

        .card-image-container {
          height: 100%; 
          width: 480px; /* Widened to ~2x (was 260px) */
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          align-self: stretch; 
        }

        .card-image {
          width: 100%;
          height: 101%; 
          object-fit: cover;
        }

        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, ${isDark() ? '#0f0f15' : '#ffffff'} 100%); 
          opacity: 0.9;
        }

        .card-content {
          padding: 24px 28px; /* Reduced padding from 30px 40px */
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center; 
          gap: 16px; /* Reduced gap from 20px */
        }

        .card-header {
          display: flex;
          flex-direction: column; /* Stacked layout */
          margin-bottom: 0;
          gap: 8px; /* Reduced gap */
        }

        .card-title {
          font-size: 28px; /* Reduced from 32px */
          font-weight: 800;
          color: ${isDark() ? '#ffffff' : '#1a1a1a'};
          margin-bottom: 2px;
          line-height: 1.1;
        }

        .card-desc {
          font-size: 14px; /* Reduced from 16px */
          color: ${isDark() ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
          max-width: 100%; 
          line-height: 1.4; 
        }

        .card-price {
          text-align: left; /* Aligned left now */
          margin-top: 6px;
        }

        .price-large {
          font-size: 42px; /* Reduced from 48px */
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .price-label {
          font-size: 12px;
          font-weight: 600;
          color: ${isDark() ? '#C9A961' : '#B8860B'};
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 2px; /* Adjusted spacing */
        }

        .premium-details-list {
          margin-top: auto;
          padding-top: 16px; /* Reduced from 20px */
          border-top: 1px dashed ${isDark() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          display: flex;
          flex-direction: column;
          gap: 10px; /* Reduced gap */
        }

        .partner-pill {
           display: inline-flex;
           align-items: baseline;
           gap: 8px;
           padding: 4px 12px; /* Reduced padding */
           background: ${isDark() ? 'rgba(201, 169, 97, 0.15)' : 'rgba(201, 169, 97, 0.1)'};
           border-left: 3px solid #C9A961;
           border-radius: 0 4px 4px 0;
           width: fit-content;
        }

        .pill-label {
           font-size: 10px;
           font-weight: 800;
           text-transform: uppercase;
           letter-spacing: 0.5px;
           color: ${isDark() ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'};
        }

        .pill-val {
           font-size: 15px;
           font-weight: 800;
           color: ${isDark() ? '#E5D4A1' : '#B8860B'};
        }

        .secondary-details-stack {
           display: flex;
           flex-direction: column;
           gap: 6px; /* Reduced gap */
        }

        .secondary-detail-row {
           display: flex;
           align-items: center;
           justify-content: space-between;
           width: 100%;
        }

        .detail-label {
           font-size: 13px; /* Slightly smaller to fit long text */
           font-weight: 600;
           color: ${isDark() ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'};
           white-space: nowrap;
        }

        .detail-separator {
           flex: 1;
           height: 1px;
           border-bottom: 2px dotted ${isDark() ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
           margin: 0 12px;
        }

        .detail-price {
           font-size: 14px;
           font-weight: 700;
           color: ${isDark() ? '#ffffff' : '#1a1a1a'};
        }

        .perks-list {
          display: flex;
          gap: 16px;
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid ${isDark() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
        }

        .perk-item {
          font-size: 13px;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .perk-check {
          color: #C9A961;
          font-weight: bold;
        }
        
        /* Footer */
        .footer {
          margin-top: 16px; /* Reduced */
          text-align: center;
          font-size: 12px;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
          text-transform: uppercase;
          letter-spacing: 2px;
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
                Premium<br />
                <span class="header-accent">Access</span>
              </h1>
            </div>
            <img src={logo()} alt="KahitSan" class="logo" />
          </div>

          <div class="cards-container">
            <For each={additionalPricingData}>
              {(item) => (
                <div class="premium-card">
                  <div class="card-image-container">
                    <img src={item.coverImage} alt={item.name} class="card-image" />
                    <div class="card-image-overlay"></div>
                  </div>

                  <div class="card-content">
                    <div class="card-header">
                      <div class="card-title">{item.name}</div>
                      <div class="card-desc">{item.description}</div>
                    </div>

                    <div class="card-price">
                      <div class="price-large">₱{item.mainPricing.walkinPrice.toLocaleString()}</div>
                      <div class="price-label">
                        {item.durationPrefix} {formatDuration(item.mainPricing.duration)}
                      </div>
                    </div>

                    <div class="premium-details-list">
                      {/* Partner Rate Highlights */}
                      <div class="premium-detail-row partner-row">
                        <div class="partner-pill">
                          <span class="pill-label">PARTNER</span>
                          <span class="pill-val">₱{item.mainPricing.partnerPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Additional Options */}
                      <div class="secondary-details-stack">
                        <For each={item.additionalPricing.slice(0, 2)}>
                          {(extra) => (
                            <div class="secondary-detail-row">
                              <div class="detail-label-container">
                                <span class="detail-label">
                                  {extra.duration.customText
                                    ? extra.duration.customText
                                    : (extra.duration.value === 1 && extra.duration.unit === 'hours'
                                      ? 'Extension /hr'
                                      : formatDuration(extra.duration))
                                  }
                                </span>
                              </div>
                              <div class="detail-separator"></div>
                              <span class="detail-price">₱{extra.walkinPrice.toLocaleString()}</span>
                            </div>
                          )}
                        </For>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>

          <div class="footer">
            Elevate Your Productivity
          </div>
        </div>
      </div>
    </>
  )
}
