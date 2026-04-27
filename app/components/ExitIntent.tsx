'use client';
import { useState, useEffect, useRef } from 'react';

interface ExitIntentProps {
  contactEmail?: string;
  whatsapp?: string;
}

export default function ExitIntent({ contactEmail = 'contact@togetherprosperity.com', whatsapp = '919845618859' }: ExitIntentProps) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('tp_exit_seen');
    if (seen) { setDismissed(true); return; }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered.current && !dismissed) {
        triggered.current = true;
        setShow(true);
        sessionStorage.setItem('tp_exit_seen', 'true');
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 15000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dismissed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const existing = JSON.parse(localStorage.getItem('tp_newsletter_emails') || '[]');
      localStorage.setItem('tp_newsletter_emails', JSON.stringify([...existing, email]));
    } catch {}
    setSubmitted(true);
    setTimeout(() => { setShow(false); setDismissed(true); }, 2500);
  };

  if (!show || dismissed) return null;

  return (
    <>
      <style>{`
        @keyframes eiOverlay { from { opacity:0; } to { opacity:1; } }
        @keyframes eiModal { from { opacity:0; transform:scale(0.85) translateY(30px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes eiFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        .ei-overlay { animation: eiOverlay 0.3s ease; }
        .ei-modal { animation: eiModal 0.4s cubic-bezier(0.23,1,0.32,1); }
        .ei-icon { animation: eiFloat 3s ease-in-out infinite; }
        .ei-input { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:13px 18px; color:#fff; font-size:13px; outline:none; transition:all 0.3s; box-sizing:border-box; }
        .ei-input:focus { border-color:#D4A017; box-shadow:0 0 0 3px rgba(212,160,23,0.12); }
        .ei-input::placeholder { color:rgba(255,255,255,0.2); }
        .ei-btn-primary { width:100%; padding:14px; background:linear-gradient(135deg,#D4A017,#F5A623); border:none; border-radius:12px; color:#000; font-weight:800; font-size:12px; letter-spacing:2px; cursor:pointer; transition:all 0.3s; }
        .ei-btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(212,160,23,0.4); }
        .ei-btn-skip { background:none; border:none; color:rgba(255,255,255,0.25); font-size:11px; cursor:pointer; text-decoration:underline; margin-top:10px; }
        .ei-btn-skip:hover { color:rgba(255,255,255,0.5); }
      `}</style>

      <div
        className="ei-overlay"
        style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.88)', backdropFilter:'blur(12px)', zIndex:10010, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}
        onClick={e => { if (e.target === e.currentTarget) { setShow(false); setDismissed(true); } }}
      >
        <div className="ei-modal" style={{ background:'#050510', border:'1px solid rgba(212,160,23,0.25)', borderRadius:'28px', padding:'48px 40px', maxWidth:'480px', width:'100%', textAlign:'center', position:'relative' }}>
          <button onClick={() => { setShow(false); setDismissed(true); }} style={{ position:'absolute', top:'20px', right:'20px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.4)', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer', fontSize:'14px' }}>✕</button>

          {submitted ? (
            <div>
              <div style={{ fontSize:'64px', marginBottom:'20px', animation:'eiFloat 3s ease-in-out infinite' }}>🎉</div>
              <h3 style={{ color:'#D4A017', fontSize:'24px', fontWeight:800, marginBottom:'12px' }}>You're In!</h3>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'14px', lineHeight:1.8 }}>We'll send you our latest insights and exclusive offers. Talk soon!</p>
            </div>
          ) : (
            <>
              <div className="ei-icon" style={{ fontSize:'56px', marginBottom:'20px' }}>🚀</div>
              <div style={{ display:'inline-block', background:'rgba(212,160,23,0.1)', border:'1px solid rgba(212,160,23,0.2)', color:'#D4A017', padding:'4px 16px', borderRadius:'50px', fontSize:'10px', fontFamily:"'Space Mono',monospace", letterSpacing:'3px', marginBottom:'16px' }}>WAIT — BEFORE YOU GO</div>
              <h2 style={{ color:'#fff', fontSize:'26px', fontWeight:900, marginBottom:'12px', lineHeight:1.2 }}>Get a <span style={{ color:'#D4A017' }}>FREE</span> Digital Transformation Consultation</h2>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'13px', lineHeight:1.9, marginBottom:'28px' }}>Join 500+ government departments and enterprises who've already transformed with Together Prosperity. Zero cost, zero obligation.</p>

              <div style={{ display:'flex', gap:'10px', marginBottom:'20px', flexWrap:'wrap', justifyContent:'center' }}>
                {['✅ Free 30-min consultation', '✅ No credit card needed', '✅ Zero-setup pilot'].map(item => (
                  <span key={item} style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.04)', padding:'4px 12px', borderRadius:'50px', border:'1px solid rgba(255,255,255,0.06)' }}>{item}</span>
                ))}
              </div>

              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                <input className="ei-input" type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} required />
                <button type="submit" className="ei-btn-primary">CLAIM FREE CONSULTATION →</button>
              </form>

              <div style={{ display:'flex', gap:'12px', justifyContent:'center', marginTop:'16px' }}>
                <a href={`https://wa.me/${whatsapp}?text=Hi, I'd like a free consultation`} target="_blank" rel="noopener noreferrer" style={{ background:'#25D366', color:'#fff', padding:'10px 20px', borderRadius:'50px', textDecoration:'none', fontSize:'11px', fontWeight:700, display:'flex', alignItems:'center', gap:'6px' }}>💬 WhatsApp Us</a>
                <a href="#contact" onClick={() => { setShow(false); setDismissed(true); }} style={{ background:'rgba(33,150,243,0.1)', border:'1px solid rgba(33,150,243,0.3)', color:'#2196F3', padding:'10px 20px', borderRadius:'50px', textDecoration:'none', fontSize:'11px', fontWeight:700 }}>📅 Book Demo</a>
              </div>

              <button className="ei-btn-skip" onClick={() => { setShow(false); setDismissed(true); }}>No thanks, I don't want a free consultation</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
