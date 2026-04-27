'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const NAV_LINKS = [
  { name: 'Home', href: '#home', icon: '🏠' },
  { name: 'About', href: '#about', icon: '🏢' },
  { name: 'Services', href: '#services', icon: '⚙️' },
  { name: 'Portfolio', href: '#portfolio', icon: '📁' },
  { name: 'Gallery', href: '#gallery', icon: '🖼️' },
  { name: 'Team', href: '#team', icon: '👥' },
  { name: 'Blog', href: '#blog', icon: '📰' },
  { name: 'Events', href: '#events', icon: '📅' },
  { name: 'Careers', href: '#careers', icon: '💼' },
  { name: 'Pricing', href: '#pricing', icon: '💰' },
  { name: 'FAQ', href: '#faq', icon: '❓' },
  { name: 'Contact', href: '#contact', icon: '📞' },
];

export default function MobileNav({
  activeSection = 'home',
  darkMode = true,
}: {
  activeSection?: string;
  darkMode?: boolean;
}) {
  const [open, setOpen] = useState(false);

  // Close on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const bg = darkMode ? 'rgba(2,2,8,0.99)' : 'rgba(255,255,255,0.99)';
  const textColor = darkMode ? '#fff' : '#000';
  const subText = darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)';
  const borderColor = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';

  return (
    <>
      <style>{`
        @keyframes menuSlide {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
        @keyframes menuItemIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .mob-link { transition: all 0.2s; }
        .mob-link:hover { background: rgba(212,160,23,0.08) !important; }
        .mob-link.active-link { background: rgba(212,160,23,0.1) !important; border-color: rgba(212,160,23,0.3) !important; }
      `}</style>

      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        style={{
          display: 'none', // shown via CSS media query in parent
          background: 'transparent',
          border: `1px solid ${borderColor}`,
          borderRadius: '10px',
          color: textColor,
          width: '42px',
          height: '42px',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '5px',
          padding: '8px',
          transition: 'all 0.3s',
          zIndex: 1001,
          position: 'relative',
        }}
        id="mobile-menu-btn"
      >
        {/* Hamburger lines → X */}
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block',
            width: '20px',
            height: '2px',
            background: '#D4A017',
            borderRadius: '2px',
            transition: 'all 0.3s',
            transform: open
              ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
              : i === 1 ? 'opacity 0 scaleX(0)'
              : 'rotate(-45deg) translate(5px, -5px)'
              : 'none',
            opacity: open && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
          }}
        />
      )}

      {/* Slide-in panel */}
      <nav
        aria-hidden={!open}
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: 'min(320px, 85vw)',
          background: bg,
          backdropFilter: 'blur(40px)',
          borderLeft: `1px solid ${borderColor}`,
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
          boxShadow: open ? '-20px 0 60px rgba(0,0,0,0.5)' : 'none',
          overflowY: 'auto',
        }}
      >
        {/* Panel header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: `1px solid ${borderColor}`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image
              src="/logo.png"
              alt="Together Prosperity"
              width={34}
              height={34}
              style={{
                objectFit: 'contain',
                mixBlendMode: 'screen',
                filter: 'drop-shadow(0 0 12px rgba(212,160,23,0.9))',
                background: 'transparent',
              }}
            />
            <div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                color: '#D4A017', fontWeight: 700,
                fontSize: '9px', letterSpacing: '3px',
              }}>TOGETHER</div>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                color: '#2196F3', fontWeight: 400,
                fontSize: '6.5px', letterSpacing: '4px', marginTop: '2px',
              }}>PROSPERITY</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${borderColor}`,
              color: subText,
              width: '36px', height: '36px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >✕</button>
        </div>

        {/* Nav links */}
        <div style={{ padding: '16px', flex: 1 }}>
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.name.toLowerCase();
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`mob-link${isActive ? ' active-link' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '13px 16px',
                  borderRadius: '12px',
                  marginBottom: '4px',
                  textDecoration: 'none',
                  border: '1px solid transparent',
                  color: isActive ? '#D4A017' : textColor,
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '2px',
                  fontWeight: isActive ? 700 : 400,
                  animation: open ? `menuItemIn 0.3s ease ${i * 0.04}s both` : 'none',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '18px', minWidth: '24px' }}>{link.icon}</span>
                {link.name}
                {isActive && (
                  <div style={{
                    marginLeft: 'auto',
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    background: '#D4A017',
                    boxShadow: '0 0 8px #D4A017',
                  }} />
                )}
              </a>
            );
          })}
        </div>

        {/* CTA at bottom */}
        <div style={{
          padding: '20px 24px',
          borderTop: `1px solid ${borderColor}`,
          flexShrink: 0,
        }}>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #D4A017, #F5A623)',
              color: '#000',
              padding: '14px',
              borderRadius: '50px',
              fontWeight: 800,
              fontSize: '10px',
              letterSpacing: '3px',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(212,160,23,0.35)',
            }}
          >
            📅 BOOK FREE DEMO
          </a>
          <a
            href={`https://wa.me/919845618859`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#25D366',
              color: '#fff',
              padding: '12px',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '10px',
              letterSpacing: '2px',
              textDecoration: 'none',
              marginTop: '10px',
            }}
          >
            💬 WHATSAPP US
          </a>
          <p style={{
            textAlign: 'center',
            color: subText,
            fontSize: '9px',
            fontFamily: "'Space Mono', monospace",
            letterSpacing: '2px',
            marginTop: '16px',
          }}>
            TOGETHER PROSPERITY PVT. LTD.
          </p>
        </div>
      </nav>
    </>
  );
}