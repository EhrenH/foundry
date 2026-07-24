'use client';

/**
 * ============================================================================
 * PORTFOLIO LANDING PAGE — single-file mockup for client pitch
 * ============================================================================
 * Stack target: Next.js (App Router) + Cal.com iframe embed + Supabase later.
 * All content below is DUMMY DATA. Swap it out once the client signs off.
 *
 * Sections (search these tags to find/edit each part):
 *   [HERO]      full-bleed image carousel + floating portfolio filter pills
 *                + vertical "contact sheet" thumbnail rail (signature element)
 *   [BRANDS]    auto-scrolling brand marquee ("as seen with" / ad inventory)
 *   [BOOKING]   Cal.com iframe embed + inquiry-type context (booking / brand
 *                partnership / advertising all funnel through this one form)
 * ============================================================================
 */

import { useState, useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// DUMMY DATA — replace with real client content / Supabase query later
// ---------------------------------------------------------------------------

const CLIENT = {
  name: 'Athena Marais',
  tagline: 'Model & Content Creator',
  location: 'Cape Town · Working Internationally',
};

// [HERO] Portfolio types are intentionally flexible — add/remove as needed.
const PORTFOLIO_TYPES = [
  { id: 'swimwear', label: 'Swimwear' },
  { id: 'formal', label: 'Formal' },
  { id: 'outdoor', label: 'Outdoor' },
  { id: 'editorial', label: 'Editorial' },
];

// [HERO] Dummy image pool, tagged by portfolio type. All sourced from Unsplash
// (free to use under the Unsplash License — no copyright issues, no attribution
// required). In production these get pulled from Instagram (manual upload →
// later Graph API) and tagged in Supabase.
const PORTFOLIO_IMAGES = [
  { id: 1, type: 'swimwear', src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, type: 'formal', src: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, type: 'outdoor', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop' },
  { id: 4, type: 'editorial', src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop' },
  { id: 5, type: 'swimwear', src: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop' },
  { id: 6, type: 'outdoor', src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop' },
];

// [BRANDS] Dummy brand list — flexible, more get added as she works with them.
const BRANDS = [
  'Woolworths', 'Cape Union Mart', 'Superbalist', 'Adidas SA',
  'Kauai', 'Country Road', 'Mr Price', 'Levi\'s',
];

// [BOOKING] Cal.com handle. In a real Next.js project this reads from
// NEXT_PUBLIC_CAL_LINK in .env.local (e.g. NEXT_PUBLIC_CAL_LINK=ehrenh/30min)
// so the calendar can be swapped per-environment without touching code.
// Using Ehren's own calendar here as a stand-in until the client's Cal.com
// account is set up — swap the fallback value below once she has one.
const CAL_LINK =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CAL_LINK) ||
  'ehrenh/30min';

// ---------------------------------------------------------------------------

export default function PortfolioLandingPage() {
  const [activeType, setActiveType] = useState('all');
  const [heroIndex, setHeroIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filteredImages =
    activeType === 'all'
      ? PORTFOLIO_IMAGES
      : PORTFOLIO_IMAGES.filter((img) => img.type === activeType);

  // Auto-advance hero carousel through the currently filtered pool
  useEffect(() => {
    setHeroIndex(0);
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setHeroIndex((i) => (i + 1) % Math.max(filteredImages.length, 1));
    }, 4200);
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [activeType]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentImage = filteredImages[heroIndex] || PORTFOLIO_IMAGES[0];

  return (
    <div style={styles.page}>
      <GlobalStyle />

      {/* =====================================================================
          [HERO] full-bleed carousel + floating portfolio filters + contact sheet
      ===================================================================== */}
      <section style={styles.hero}>
        {filteredImages.map((img, i) => (
          <img
            key={img.id}
            src={img.src}
            alt=""
            style={{
              ...styles.heroImage,
              opacity: i === heroIndex ? 1 : 0,
            }}
          />
        ))}
        <div style={styles.heroScrim} />

        {/* Eyebrow + name block */}
        <div style={styles.heroText}>
          <p style={styles.eyebrow}>{CLIENT.location}</p>
          <h1 style={styles.heroName}>{CLIENT.name}</h1>
          <p style={styles.heroTagline}>{CLIENT.tagline}</p>
        </div>

        {/* Floating portfolio-type filter pills */}
        <div style={styles.pillRow}>
          <button
            onClick={() => setActiveType('all')}
            style={activeType === 'all' ? styles.pillActive : styles.pill}
          >
            All Work
          </button>
          {PORTFOLIO_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveType(t.id)}
              style={activeType === t.id ? styles.pillActive : styles.pill}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Vertical "contact sheet" thumbnail rail — signature element,
            echoes an analogue photo contact sheet. Click to jump the hero. */}
        <div style={styles.contactSheet}>
          {filteredImages.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setHeroIndex(i)}
              style={{
                ...styles.contactThumbBtn,
                borderColor: i === heroIndex ? 'var(--rose)' : 'transparent',
              }}
            >
              <img src={img.src} alt="" style={styles.contactThumbImg} />
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================================
          [BRANDS] auto-scrolling marquee — proof of work + future ad inventory
          (Brands can inquire about paid placement here via the booking form
          below — no separate advertising tab, keeps this a single pager.)
      ===================================================================== */}
      <section style={styles.brandsSection}>
        <p style={styles.eyebrowDark}>As Seen With</p>
        <div style={styles.marqueeMask}>
          <div style={styles.marqueeTrack}>
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span key={i} style={styles.brandItem}>
                {brand}
              </span>
            ))}
          </div>
        </div>
        <div style={styles.rule} />
      </section>

      {/* =====================================================================
          [BOOKING] Cal.com iframe embed — single unified flow.
          Agencies / photographers / brands (incl. advertising inquiries)
          all funnel through this one form; "what's this for" lives inside
          the Cal.com booking questions, not as separate site sections.
      ===================================================================== */}
      <section style={styles.bookingSection}>
        <div style={styles.bookingCopy}>
          <p style={styles.eyebrowDark}>Availability</p>
          <h2 style={styles.bookingHeadline}>
            Booking for shoots,
            <br />
            campaigns &amp; partnerships
          </h2>
          <p style={styles.bookingSub}>
            Agencies, photographers and brands — including advertising
            enquiries — can check availability and get in touch directly
            below.
          </p>
        </div>

        <div style={styles.bookingFrameWrap}>
          {/* Placeholder booking calendar — points at CAL_LINK above.
              Swap NEXT_PUBLIC_CAL_LINK (or the fallback) for the client's
              own Cal.com handle once she's set one up. */}
          <iframe
            src={`https://cal.com/${CAL_LINK}?embed=true`}
            style={styles.bookingIframe}
            title="Book a session"
          />
        </div>
      </section>

      <footer style={styles.footer}>
        <span>{CLIENT.name}</span>
        <span style={{ opacity: 0.5 }}>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Fonts + keyframes (kept in a real <style> tag since arbitrary Tailwind
// values aren't available in this preview environment)
// ---------------------------------------------------------------------------
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Inter:wght@400;500;600&display=swap');

      :root {
        --ink: #17140F;
        --bone: #EEE8DD;
        --rose: #9E4B3F;
        --gold: #AD8A54;
        --sage: #48584F;
      }

      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  );
}

// ---------------------------------------------------------------------------
// Styles (inline, driven by the token system above)
// ---------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Inter', sans-serif",
    background: 'var(--bone)',
    color: 'var(--ink)',
    overflowX: 'hidden',
  },

  // --- HERO ---
  hero: {
    position: 'relative',
    height: '100vh',
    minHeight: 560,
    overflow: 'hidden',
  },
  heroImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 1.1s ease',
  },
  heroScrim: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(180deg, rgba(23,20,15,0.15) 0%, rgba(23,20,15,0.15) 45%, rgba(23,20,15,0.85) 100%)',
  },
  heroText: {
    position: 'absolute',
    left: '5%',
    bottom: '18%',
    color: '#F4F0E8',
    zIndex: 2,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    marginBottom: 10,
    color: '#E7DFCF',
  },
  heroName: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 500,
    fontSize: 'clamp(2.4rem, 7vw, 5rem)',
    lineHeight: 1.02,
    margin: 0,
  },
  heroTagline: {
    fontFamily: "'Fraunces', serif",
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    marginTop: 8,
    color: '#E7DFCF',
  },
  pillRow: {
    position: 'absolute',
    left: '5%',
    bottom: '7%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    zIndex: 2,
    maxWidth: '78%',
  },
  pill: {
    padding: '9px 18px',
    borderRadius: 999,
    border: '1px solid rgba(244,240,232,0.5)',
    background: 'rgba(23,20,15,0.25)',
    backdropFilter: 'blur(6px)',
    color: '#F4F0E8',
    fontSize: 13,
    letterSpacing: '0.04em',
    cursor: 'pointer',
  },
  pillActive: {
    padding: '9px 18px',
    borderRadius: 999,
    border: '1px solid var(--rose)',
    background: 'var(--rose)',
    color: '#F4F0E8',
    fontSize: 13,
    letterSpacing: '0.04em',
    cursor: 'pointer',
  },
  contactSheet: {
    position: 'absolute',
    right: 18,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    zIndex: 2,
  },
  contactThumbBtn: {
    width: 46,
    height: 60,
    padding: 0,
    borderRadius: 3,
    border: '2px solid transparent',
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'none',
  },
  contactThumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    filter: 'saturate(0.85)',
  },

  // --- BRANDS ---
  brandsSection: {
    padding: '64px 0 40px',
    textAlign: 'center',
  },
  eyebrowDark: {
    fontSize: 12,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--sage)',
    marginBottom: 22,
  },
  marqueeMask: {
    overflow: 'hidden',
    width: '100%',
  },
  marqueeTrack: {
    display: 'flex',
    width: 'max-content',
    animation: 'marquee 22s linear infinite',
  },
  brandItem: {
    fontFamily: "'Fraunces', serif",
    fontSize: 'clamp(1.4rem, 3vw, 2.1rem)',
    padding: '0 40px',
    color: 'var(--ink)',
    opacity: 0.75,
    whiteSpace: 'nowrap',
  },
  rule: {
    height: 1,
    background: 'rgba(23,20,15,0.15)',
    margin: '40px 8% 0',
  },

  // --- BOOKING ---
  bookingSection: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 40,
    alignItems: 'stretch',
    padding: '60px 8% 90px',
  },
  bookingCopy: {
    flex: '1 1 320px',
    maxWidth: 440,
    alignSelf: 'center',
  },
  bookingHeadline: {
    fontFamily: "'Fraunces', serif",
    fontWeight: 500,
    fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)',
    lineHeight: 1.15,
    margin: '4px 0 16px',
  },
  bookingSub: {
    fontSize: 15,
    lineHeight: 1.6,
    color: 'rgba(23,20,15,0.7)',
  },
  bookingFrameWrap: {
    flex: '1 1 420px',
    minWidth: 300,
    border: '1px solid rgba(23,20,15,0.15)',
    borderRadius: 6,
    padding: 10,
    background: '#fff',
  },
  bookingIframe: {
    width: '100%',
    height: 480,
    border: 'none',
    borderRadius: 3,
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 8% 30px',
    fontSize: 12,
    letterSpacing: '0.05em',
    color: 'var(--ink)',
  },
};
