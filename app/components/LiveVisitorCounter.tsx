'use client';
import { useState, useEffect } from 'react';

const CITIES = ['Bangalore','Mumbai','Delhi','Hyderabad','Chennai','Pune','Kolar','Mysore','Mangalore','Hubli'];
const PAGES = ['Services','About','Portfolio','Contact','Events','Blog'];

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function LiveVisitorCounter() {
  const [count, setCount] = useState(randBetween(18, 42));
  const [pulseCount, setPulseCount] = useState(0);
  const [recentJoin, setRecentJoin] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 3000);
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Fluctuate visitor count
    const countInterval = setInterval(() => {
      setCount(prev => {
        const delta = Math.random() < 0.5 ? randBetween(-2, 0) : randBetween(0, 3);
        const next = prev + delta;
        return Math.max(8, Math.min(99, next));
      });
      setPulseCount(p => p + 1);
    }, 4500);

    // Show who just joined
    const joinInterval = setInterval(() => {
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const page = PAGES[Math.floor(Math.random() * PAGES.length)];
      setRecentJoin(`${city} is viewing ${page}`);
      setTimeout(() => setRecentJoin(''), 3500);
    }, 8000);

    return () => {
      clearInterval(countInterval);
      clearInterval(joinInterval);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '170px',
      right: '20px',
      zIndex: 9990,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px',
      pointerEvents: 'none',
    }}>
      {/* Recent join toast */}
      {recentJoin && (
        <div style={{
          background: 'rgba(5,5,16,.95)',
          border: '1px solid rgba(46,204,64,.3)',
          borderRadius: '50px',
          padding: '7px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'slideInRight .4s ease',
          pointerEvents: 'none',
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2ECC40', boxShadow: '0 0 8px #2ECC40', flexShrink: 0 }} />
          <span style={{ color: 'rgba(255,255,255,.7)', fontSize: '10px', fontFamily: "'Space Mono',monospace", letterSpacing: '1px', whiteSpace: 'nowrap' }}>
            {recentJoin}
          </span>
        </div>
      )}

      {/* Main counter pill */}
      <div style={{
        background: 'rgba(5,5,16,.92)',
        border: '1px solid rgba(212,160,23,.25)',
        borderRadius: '50px',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0,0,0,.3)',
      }}>
        <div style={{ position: 'relative', width: '10px', height: '10px' }}>
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: '50%',
            background: '#2ECC40',
            animation: 'livePulse 1.5s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', inset: '-4px',
            borderRadius: '50%',
            border: '1.5px solid rgba(46,204,64,.4)',
            animation: 'livePulse 1.5s ease-in-out infinite .4s',
          }} />
        </div>
        <span style={{
          color: '#D4A017',
          fontFamily: "'Space Mono',monospace",
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '1px',
        }}>
          {count} online now
        </span>
      </div>

      <style>{`
        @keyframes livePulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.5;transform:scale(1.3)}
        }
        @keyframes slideInRight {
          from{opacity:0;transform:translateX(20px)}
          to{opacity:1;transform:translateX(0)}
        }
      `}</style>
    </div>
  );
}
