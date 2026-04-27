'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#020205',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        fontFamily: "'Sora', 'Segoe UI', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800;900&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes rotate { to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes rotateRev { to{transform:translate(-50%,-50%) rotate(-360deg)} }
      `}</style>

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Orbit rings */}
      <div style={{
        position: 'absolute', width: '320px', height: '320px',
        border: '1px solid rgba(212,160,23,0.15)', borderRadius: '50%',
        top: '50%', left: '50%',
        animation: 'rotate 12s linear infinite',
      }} />
      <div style={{
        position: 'absolute', width: '450px', height: '450px',
        border: '1px dashed rgba(33,150,243,0.1)', borderRadius: '50%',
        top: '50%', left: '50%',
        animation: 'rotateRev 18s linear infinite',
      }} />

      {/* Logo */}
      <div style={{
        animation: mounted ? 'float 4s ease-in-out infinite' : 'none',
        marginBottom: '32px', position: 'relative', zIndex: 1,
      }}>
        <Image
          src="/logo.png"
          alt="Together Prosperity"
          width={100}
          height={100}
          style={{
            objectFit: 'contain',
            mixBlendMode: 'screen',
            filter: 'drop-shadow(0 0 30px rgba(212,160,23,0.9))',
          }}
        />
      </div>

      {/* 404 */}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(80px, 15vw, 160px)',
        background: 'linear-gradient(135deg, #9A6E00, #D4A017, #F5C842, #D4A017)',
        backgroundSize: '300% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer 3s linear infinite',
        lineHeight: 1,
        letterSpacing: '10px',
        position: 'relative', zIndex: 1,
      }}>
        404
      </div>

      <h1 style={{
        color: 'rgba(255,255,255,0.85)',
        fontSize: 'clamp(20px, 3vw, 32px)',
        fontWeight: 800,
        margin: '16px 0 12px',
        animation: mounted ? 'fadeUp 0.6s ease both' : 'none',
        position: 'relative', zIndex: 1,
      }}>
        Page Not Found
      </h1>

      <p style={{
        color: 'rgba(255,255,255,0.3)',
        fontSize: '15px',
        maxWidth: '440px',
        lineHeight: 1.9,
        marginBottom: '40px',
        animation: mounted ? 'fadeUp 0.6s ease 0.1s both' : 'none',
        position: 'relative', zIndex: 1,
      }}>
        This page doesn't exist or has been moved. Let's get you back to building
        something great.
      </p>

      <div style={{
        display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center',
        animation: mounted ? 'fadeUp 0.6s ease 0.2s both' : 'none',
        position: 'relative', zIndex: 1,
      }}>
        <Link
          href="/"
          style={{
            background: 'linear-gradient(135deg, #D4A017, #F5A623)',
            color: '#000',
            padding: '14px 36px',
            borderRadius: '50px',
            fontWeight: 800,
            fontSize: '11px',
            letterSpacing: '3px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 30px rgba(212,160,23,0.35)',
            transition: 'all 0.3s',
          }}
        >
          🏠 GO HOME
        </Link>
        <Link
          href="/#contact"
          style={{
            background: 'transparent',
            border: '1px solid rgba(212,160,23,0.35)',
            color: 'rgba(212,160,23,0.85)',
            padding: '14px 36px',
            borderRadius: '50px',
            fontWeight: 600,
            fontSize: '11px',
            letterSpacing: '3px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s',
          }}
        >
          📞 CONTACT US
        </Link>
      </div>

      {/* Footer tag */}
      <div style={{
        position: 'absolute', bottom: '32px',
        fontFamily: "'Space Mono', monospace",
        color: 'rgba(255,255,255,0.1)',
        fontSize: '10px',
        letterSpacing: '4px',
      }}>
        TOGETHER PROSPERITY PRIVATE LIMITED · EST. 2026
      </div>
    </main>
  );
}