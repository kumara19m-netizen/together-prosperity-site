'use client';
import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '919845618859';
const DEFAULT_MSG = encodeURIComponent(
  'Hello Together Prosperity! 👋 I am interested in your services. Please share more details.'
);

export default function WhatsAppBubble() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show bubble after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    // Show tooltip after 5 seconds
    const t2 = setTimeout(() => {
      if (!dismissed) setShowTooltip(true);
    }, 5000);
    // Hide tooltip after 9 seconds
    const t3 = setTimeout(() => setShowTooltip(false), 9000);
    return () => { clearTimeout(t); clearTimeout(t2); clearTimeout(t3); };
  }, [dismissed]);

  if (!visible) return null;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MSG}`;

  return (
    <>
      <style>{`
        @keyframes waBounce {
          0%,100%{transform:scale(1) translateY(0)}
          30%{transform:scale(1.12) translateY(-6px)}
          60%{transform:scale(0.96) translateY(2px)}
        }
        @keyframes waGlow {
          0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.5)}
          50%{box-shadow:0 0 0 16px rgba(37,211,102,0)}
        }
        @keyframes tooltipIn {
          from{opacity:0;transform:translateX(10px)}
          to{opacity:1;transform:translateX(0)}
        }
        @keyframes waIn {
          from{opacity:0;transform:scale(0.5)}
          to{opacity:1;transform:scale(1)}
        }
        .wa-btn:hover { transform: scale(1.12) !important; }
      `}</style>

      {/* Tooltip */}
      {showTooltip && !dismissed && (
        <div style={{
          position: 'fixed',
          bottom: '84px',
          right: '80px',
          background: '#fff',
          borderRadius: '16px 16px 4px 16px',
          padding: '12px 16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          zIndex: 9999,
          maxWidth: '220px',
          animation: 'tooltipIn 0.3s ease',
        }}>
          <button
            onClick={() => { setShowTooltip(false); setDismissed(true); }}
            style={{
              position: 'absolute', top: '6px', right: '8px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#999', fontSize: '14px', lineHeight: 1,
            }}
          >✕</button>
          <p style={{
            margin: 0, fontSize: '13px', color: '#333',
            lineHeight: 1.5, fontFamily: "'Sora', sans-serif",
          }}>
            👋 <strong>Hi there!</strong> Chat with us on WhatsApp for quick answers!
          </p>
          {/* Tail */}
          <div style={{
            position: 'absolute', bottom: '-8px', right: '16px',
            width: 0, height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #fff',
          }} />
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn"
        aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 28px rgba(37,211,102,0.45)',
          zIndex: 9998,
          textDecoration: 'none',
          animation: 'waIn 0.4s cubic-bezier(0.23,1,0.32,1), waGlow 3s ease-in-out 2s infinite',
          transition: 'transform 0.3s, box-shadow 0.3s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 40px rgba(37,211,102,0.6)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 28px rgba(37,211,102,0.45)';
        }}
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.484.651 4.817 1.787 6.84L2 30l7.353-1.768A13.932 13.932 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.594l-.416-.248-4.364 1.05 1.082-4.25-.271-.437A11.47 11.47 0 014.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.005-2.355-1.12-.315-.114-.544-.172-.773.173-.229.344-.886 1.12-1.086 1.35-.2.228-.4.257-.745.085-.345-.172-1.456-.537-2.773-1.712-1.024-.913-1.716-2.04-1.916-2.385-.2-.344-.021-.53.15-.702.155-.154.345-.4.517-.6.172-.199.229-.343.344-.572.114-.229.057-.43-.029-.601-.085-.172-.772-1.862-1.057-2.549-.278-.67-.562-.579-.773-.59-.2-.01-.43-.012-.658-.012a1.263 1.263 0 00-.916.43c-.315.344-1.2 1.177-1.2 2.868s1.228 3.328 1.4 3.557c.172.228 2.42 3.695 5.864 5.183.82.354 1.46.565 1.958.724.823.261 1.572.224 2.163.136.66-.099 2.04-.833 2.327-1.637.287-.803.287-1.49.2-1.635-.085-.143-.314-.228-.658-.4z"/>
        </svg>

        {/* Online dot */}
        <span style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#4CAF50',
          border: '2px solid white',
          animation: 'waGlow 2s ease-in-out infinite',
        }} />
      </a>
    </>
  );
}