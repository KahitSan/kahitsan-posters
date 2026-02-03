import { createMemo, For } from 'solid-js'
import { useSearchParams } from '@solidjs/router'
import logoPng from '@assets/logo.png'
import logoLightPng from '@assets/Kahitsan-light-nobg.png'
import { pricingData, formatDuration } from '../SpacesPage/Panganiban/pricingData'

export default function PricingDailyPage() {
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
          width: 500px;
          height: 500px;
          background: ${isDark()
          ? 'radial-gradient(circle, #C9A961 0%, transparent 70%)'
          : 'radial-gradient(circle, #d4a853 0%, transparent 70%)'};
          top: -150px;
          left: -150px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: ${isDark()
          ? 'radial-gradient(circle, #B8860B 0%, transparent 70%)'
          : 'radial-gradient(circle, #DAA520 0%, transparent 70%)'};
          bottom: -100px;
          right: -100px;
          animation-delay: -4s;
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
          padding: 60px;
        }

        /* Header */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
        }

        .header-title {
          font-size: 42px;
          font-weight: 800;
          line-height: 1.1;
          color: ${isDark() ? '#ffffff' : '#1a1a1a'};
        }

        .header-accent {
          background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 50%, #C9A961 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo {
          height: 60px;
          width: auto;
          filter: ${isDark() ? 'brightness(1)' : 'brightness(0.9)'};
        }

        /* Pricing Grid */
        .pricing-grid {
          display: grid;
          gap: 24px;
          flex: 1;
        }

        .pricing-card {
          position: relative;
          background: ${isDark()
          ? 'linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(201, 169, 97, 0.02) 100%)'
          : 'linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.05) 100%)'};
          border-left: 1px solid ${isDark() ? 'rgba(201, 169, 97, 0.3)' : 'rgba(201, 169, 97, 0.25)'};
          border-top: 1px solid ${isDark() ? 'rgba(201, 169, 97, 0.3)' : 'rgba(201, 169, 97, 0.25)'};
          /* HUD Clip Path */
          clip-path: polygon(
            30px 0, 100% 0, 
            100% calc(100% - 30px), calc(100% - 30px) 100%, 
            0 100%, 0 30px
          );
          filter: drop-shadow(0 10px 10px ${isDark() ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'});

          backdrop-filter: blur(10px);
          overflow: hidden;
          display: flex;
          align-items: stretch; 
          height: 200px;
        }

        .pricing-info {
          flex: 1;
        }

        .pricing-name {
          font-size: 28px;
          font-weight: 800;
          /* Gradient Twist */
          background: linear-gradient(135deg, ${isDark() ? '#ffffff' : '#1a1a1a'} 30%, #C9A961 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          
          margin-bottom: 8px;
          text-transform: none; /* Not hostile uppercase */
          letter-spacing: -0.5px;
        }

        .pricing-description {
          font-size: 16px;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
          line-height: 1.4;
        }

        .pricing-divider {
          width: 1px;
          height: 80px;
          background: ${isDark() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }

        .price-section {
          min-width: 260px; /* Increased width needed for table-like layout */
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 12px;
        }

        .price-option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px dashed ${isDark() ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          padding-bottom: 8px;
        }
        
        .price-option:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        /* Secondary Row Layout */
        .secondary-prices-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px dashed ${isDark() ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          gap: 16px;
        }

        .secondary-option {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .secondary-option .option-label {
          font-size: 11px;
          margin-bottom: 2px;
          letter-spacing: 0.5px;
          color: ${isDark() ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'};
        }

        .option-prices-compact {
          display: flex;
          align-items: center; /* Align center to handle height diff */
          gap: 12px; /* Gap between Walkin and Partner Stack */
        }

        .compact-walkin {
           font-size: 20px;
           font-weight: 800;
           color: ${isDark() ? '#ffffff' : '#1a1a1a'};
           line-height: 1;
        }

        .compact-partner-stack {
           display: flex;
           flex-direction: column;
           align-items: flex-end; /* Align Text Right */
           line-height: 1;
        }

        .compact-partner-price {
           font-size: 14px;
           font-weight: 700;
           color: ${isDark() ? '#E5D4A1' : '#B8860B'};
        }
        
        .partner-tag {
           font-size: 8px; /* Very small */
           text-transform: uppercase;
           letter-spacing: 0.5px;
           opacity: 0.8;
           font-weight: 600;
           color: ${isDark() ? '#E5D4A1' : '#B8860B'};
           margin-top: 2px;
        }

        /* Premium Main Option Layout */
        .price-group-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-price {
           font-size: 54px; 
           font-weight: 800;
           background: linear-gradient(135deg, #C9A961 0%, #E5D4A1 50%, #C9A961 100%);
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           background-clip: text;
           letter-spacing: -2px;
           line-height: 0.9;
           margin-bottom: 6px;
        }

        .hero-price .currency {
           font-size: 0.5em;
           vertical-align: super;
           margin-right: 2px;
           -webkit-text-fill-color: initial;
           background: none;
           color: ${isDark() ? '#E5D4A1' : '#B8860B'};
        }

        .partner-pill {
           display: inline-flex;
           align-items: baseline;
           gap: 6px;
           padding: 4px 10px 4px 8px;
           background: ${isDark() ? 'rgba(201, 169, 97, 0.15)' : 'rgba(201, 169, 97, 0.1)'};
           border-left: 3px solid #C9A961;
           border-radius: 0 4px 4px 0;
           margin-right: auto;
        }

        .pill-label {
           font-size: 9px;
           font-weight: 700;
           text-transform: uppercase;
           letter-spacing: 0.5px;
           color: ${isDark() ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'};
        }

        .pill-val {
           font-size: 14px;
           font-weight: 700;
           line-height: 1;
           color: ${isDark() ? '#E5D4A1' : '#B8860B'};
        }

        /* Right Side Duration Stack */
        .duration-group-right {
           display: flex;
           flex-direction: column;
           align-items: flex-end;
           text-align: right;
           justify-content: center;
        }

        .label-prefix {
           font-size: 11px;
           text-transform: uppercase;
           letter-spacing: 2px;
           font-weight: 600;
           color: ${isDark() ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'};
           margin-bottom: -2px;
        }

        .label-duration {
           font-size: 20px;
           font-weight: 800;
           text-transform: uppercase;
           color: ${isDark() ? '#ffffff' : '#1a1a1a'};
           letter-spacing: 0.5px;
        }
        
        /* Cleanup/Helpers */
        .price-walkin .currency {
           font-size: 0.7em;
           opacity: 0.7;
           margin-right: 2px;
        }

        .price-partner {
          font-size: 12px;
          color: ${isDark() ? '#E5D4A1' : '#B8860B'};
          font-weight: 600;
          margin-top: 2px;
        }
        
        .partner-badge {
           opacity: 0.7;
           font-weight: 400;
           font-size: 0.9em;
           margin-left: 2px;
        }

        /* Footer */
        .footer {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .features {
          display: flex;
          gap: 24px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};
        }

        .feature-dot {
          width: 6px;
          height: 6px;
          background: #C9A961;
          border-radius: 50%;
        }

        .address {
          text-align: right;
          font-size: 14px;
          color: ${isDark() ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
        }

        .corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 2px solid ${isDark() ? 'rgba(201, 169, 97, 0.3)' : 'rgba(201, 169, 97, 0.2)'};
        }

        .corner-tl { top: 40px; left: 40px; border-right: none; border-bottom: none; border-top-left-radius: 12px; }
        .corner-tr { top: 40px; right: 40px; border-left: none; border-bottom: none; border-top-right-radius: 12px; }
        .corner-bl { bottom: 40px; left: 40px; border-right: none; border-top: none; border-bottom-left-radius: 12px; }
        .corner-br { bottom: 40px; right: 40px; border-left: none; border-top: none; border-bottom-right-radius: 12px; }

        /* Updated Card Styles with Image */
        .pricing-card {
          position: relative;
          background: ${isDark()
          ? 'linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(201, 169, 97, 0.02) 100%)'
          : 'linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.05) 100%)'};
          border: 1px solid ${isDark() ? 'rgba(201, 169, 97, 0.3)' : 'rgba(201, 169, 97, 0.25)'};
          border-radius: 20px;
          backdrop-filter: blur(10px);
          overflow: hidden;
          display: flex;
          height: 200px; /* Fixed height for consistency */
        }

        .card-image-container {
          width: 240px;
          height: 100%;
          position: relative;
          flex-shrink: 0;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, ${isDark() ? '#0a0a0a' : '#ffffff'} 100%);
          opacity: 0.3;
        }

        .card-content-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 24px 32px 24px 16px;
        }
      `}</style>

      <div class="poster-container" id="poster">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="grid-pattern"></div>

        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>

        <div class="content">
          <div class="header">
            <div>
              <h1 class="header-title">
                Casual<br />
                <span class="header-accent">Coworking</span>
              </h1>
            </div>
            <img src={logo()} alt="KahitSan" class="logo" />
          </div>

          <div class="pricing-grid">
            <For each={pricingData}>
              {(item) => (
                <div class="pricing-card">
                  <div class="card-image-container">
                    <img src={item.coverImage} alt={item.name} class="card-image" />
                    <div class="card-image-overlay"></div>
                  </div>

                  <div class="card-content-wrapper">
                    <div class="pricing-info">
                      <div class="pricing-name">{item.name}</div>
                      <div class="pricing-description">{item.description}</div>
                    </div>

                    <div class="pricing-divider"></div>

                    <div class="price-section">
                      {/* Main Rate (4 Hours) */}
                      {/* Main Rate (4 Hours) - Premium Layout */}
                      <div class="price-option main-option">
                        <div class="price-group-left">
                          <div class="hero-price">
                            <span class="currency">₱</span>{item.mainPricing.walkinPrice}
                          </div>
                          <div class="partner-pill">
                            <span class="pill-label">PARTNER</span>
                            <span class="pill-val">₱{item.mainPricing.partnerPrice}</span>
                          </div>
                        </div>

                        <div class="duration-group-right">
                          <span class="label-prefix">{item.durationPrefix || 'for'}</span>
                          <span class="label-duration">{formatDuration(item.mainPricing.duration)}</span>
                        </div>
                      </div>

                      {/* Secondary Rates Row (8h + Extension) */}
                      <div class="secondary-prices-row">
                        {/* 8 Hours (or other alt) */}
                        <For each={item.additionalPricing.filter(p => !p.pricingType)}>
                          {(alt) => (
                            <div class="secondary-option">
                              <div class="option-label">{formatDuration(alt.duration)}</div>
                              <div class="option-prices-compact">
                                <span class="compact-walkin">₱{alt.walkinPrice}</span>
                                <span class="compact-divider"></span>
                                <div class="compact-partner-stack">
                                  <span class="compact-partner-price">₱{alt.partnerPrice}</span>
                                  <span class="partner-tag">Partner</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </For>

                        {/* Separator line if both exist? Just gap is fine. */}

                        {/* Extension Rate */}
                        <For each={item.additionalPricing.filter(p => p.pricingType === 'extension')}>
                          {(ext) => (
                            <div class="secondary-option extension-option">
                              <div class="option-label">Extension /hr</div>
                              <div class="option-prices-compact">
                                <span class="compact-walkin">₱{ext.walkinPrice}</span>
                                <span class="compact-divider"></span>
                                <div class="compact-partner-stack">
                                  <span class="compact-partner-price">₱{ext.partnerPrice}</span>
                                  <span class="partner-tag">Partner</span>
                                </div>
                              </div>
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
            <div class="features">
              <div class="feature-item">
                <div class="feature-dot"></div>
                <span>Free Coffee</span>
              </div>
              <div class="feature-item">
                <div class="feature-dot"></div>
                <span>High-Speed WiFi</span>
              </div>
              <div class="feature-item">
                <div class="feature-dot"></div>
                <span>Power Outlets</span>
              </div>
            </div>

            <div class="address">
              Panganiban Drive, Naga City
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
