'use client';
import { useState, useEffect, useCallback } from 'react';
 
interface ProofEvent {
  id: string;
  city: string;
  state: string;
  action: string;
  service: string;
  time: string;
  icon: string;
}
 
const INIT_EVENTS: ProofEvent[] = [
  { id: '1', city: 'Bangalore', state: 'Karnataka', action: 'just booked a demo for', service: 'Blockchain Infrastructure', time: '2 min ago', icon: '🚀' },
  { id: '2', city: 'Mumbai', state: 'Maharashtra', action: 'requested a proposal for', service: 'Cybersecurity', time: '5 min ago', icon: '🔒' },
  { id: '3', city: 'Delhi', state: 'NCR', action: 'signed up for pilot program', service: 'Gov-tech Solutions', time: '8 min ago', icon: '🏛️' },
  { id: '4', city: 'Hyderabad', state: 'Telangana', action: 'just booked a demo for', service: 'IoT Solutions', time: '12 min ago', icon: '📡' },
  { id: '5', city: 'Chennai', state: 'Tamil Nadu', action: 'downloaded case study on', service: 'Smart Contracts', time: '15 min ago', icon: '📜' },
  { id: '6', city: 'Pune', state: 'Maharashtra', action: 'requested consultation for', service: 'AIML Solutions', time: '18 min ago', icon: '🤖' },
  { id: '7', city: 'Ahmedabad', state: 'Gujarat', action: 'just booked a demo for', service: 'Blockchain Infrastructure', time: '22 min ago', icon: '⛓️' },
  { id: '8', city: 'Kolar', state: 'Karnataka', action: 'enrolled in pilot program for', service: 'Gov-tech Solutions', time: '3 min ago', icon: '🌟' },
  { id: '9', city: 'Mysuru', state: 'Karnataka', action: 'requested a demo for', service: 'Cybersecurity', time: '7 min ago', icon: '🛡️' },
  { id: '10', city: 'Kolkata', state: 'West Bengal', action: 'signed MOU for', service: 'IoT Solutions', time: '25 min ago', icon: '🤝' },
  { id: '11', city: 'Jaipur', state: 'Rajasthan', action: 'just booked a demo for', service: 'AIML Solutions', time: '30 min ago', icon: '💡' },
  { id: '12', city: 'Lucknow', state: 'Uttar Pradesh', action: 'requested pilot for', service: 'Smart Contracts', time: '35 min ago', icon: '⚡' },
];
 
const SK_SP = 'tp_social_proof_events';
const loadLS = <T,>(k: string, fb: T): T => { try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : fb; } catch { return fb; } };
const saveLS = (k: string, v: any) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
 
const ICONS_SP = ['🚀', '🔒', '🏛️', '📡', '📜', '🤖', '⛓️', '🌟', '🛡️', '🤝', '💡', '⚡', '🎯', '💎', '🏆'];
 
export function SocialProof({ isAdmin = false }: { isAdmin?: boolean }) {
  const [events, setEvents] = useState<ProofEvent[]>(INIT_EVENTS);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<ProofEvent>(INIT_EVENTS[0]);
  const [exiting, setExiting] = useState(false);
  const [enabled, setEnabled] = useState(true);
 
  // Admin modal
  const [showModal, setShowModal] = useState(false);
  const [draft, setDraft] = useState<ProofEvent[]>(INIT_EVENTS);
  const [editingEv, setEditingEv] = useState<ProofEvent | null>(null);
  const [evForm, setEvForm] = useState<ProofEvent>({ id: '', city: '', state: '', action: '', service: '', time: '', icon: '🚀' });
  const [showEvForm, setShowEvForm] = useState(false);
 
  useEffect(() => { setEvents(loadLS(SK_SP, INIT_EVENTS)); }, []);
  useEffect(() => saveLS(SK_SP, events), [events]);
 
  const showNext = useCallback(() => {
    if (!enabled || events.length === 0) return;
    const ev = events[Math.floor(Math.random() * events.length)];
    setCurrent(ev);
    setExiting(false);
    setVisible(true);
    setTimeout(() => { setExiting(true); setTimeout(() => setVisible(false), 400); }, 5000);
  }, [enabled, events]);
 
  useEffect(() => {
    const initial = setTimeout(showNext, 8000);
    const interval = setInterval(showNext, 18000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, [showNext]);
 
  const inp = { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' as const };
 
  const openAdd = () => { setEditingEv(null); setEvForm({ id: crypto.randomUUID(), city: '', state: '', action: '', service: '', time: '', icon: '🚀' }); setShowEvForm(true); };
  const openEdit = (e: ProofEvent) => { setEditingEv(e); setEvForm({ ...e }); setShowEvForm(true); };
  const saveEv = () => {
    if (!evForm.city.trim()) return;
    if (editingEv) setDraft(prev => prev.map(e => e.id === editingEv.id ? evForm : e));
    else setDraft(prev => [...prev, evForm]);
    setShowEvForm(false);
  };
 
  // Admin floating button
  if (isAdmin) {
    return (
      <>
        <button onClick={() => { setDraft([...events]); setShowModal(true); }} style={{ position: 'fixed', bottom: '160px', left: '140px', zIndex: 9998, background: 'rgba(212,160,23,.12)', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '6px 14px', borderRadius: '50px', cursor: 'pointer', fontSize: '9px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px' }}>
          📢 SOCIAL PROOF
        </button>
 
        {/* Admin modal */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(20px)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowModal(false)}>
            <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.25)', borderRadius: '24px', padding: '36px', maxWidth: '680px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 800 }}>📢 Edit Social Proof Events</h3>
                <button onClick={openAdd} style={{ background: 'rgba(212,160,23,.1)', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '7px 16px', borderRadius: '8px', fontSize: '10px', cursor: 'pointer', fontFamily: "'Space Mono',monospace" }}>+ ADD</button>
              </div>
              {draft.map(ev => (
                <div key={ev.id} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '12px', padding: '12px 16px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '20px' }}>{ev.icon}</span>
                    <div>
                      <div style={{ color: '#D4A017', fontSize: '12px', fontWeight: 600 }}>{ev.city}, {ev.state}</div>
                      <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '10px' }}>{ev.action} {ev.service}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => openEdit(ev)} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.2)', color: '#D4A017', padding: '4px 10px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer' }}>✏</button>
                    <button onClick={() => setDraft(prev => prev.filter(e => e.id !== ev.id))} style={{ background: 'transparent', border: '1px solid rgba(244,67,54,.2)', color: '#f44336', padding: '4px 10px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer' }}>✕</button>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button onClick={() => { setEvents(draft); setShowModal(false); }} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '13px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>💾 SAVE</button>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '13px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        )}
 
        {/* Event form */}
        {showEvForm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.95)', backdropFilter: 'blur(20px)', zIndex: 10002, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowEvForm(false)}>
            <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.25)', borderRadius: '24px', padding: '36px', maxWidth: '460px', width: '100%' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>{editingEv ? 'Edit Event' : 'Add Event'}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: '8px' }}>
                  <select value={evForm.icon} onChange={e => setEvForm({ ...evForm, icon: e.target.value })} style={{ ...inp, padding: '8px', fontSize: '20px', textAlign: 'center' }}>
                    {ICONS_SP.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                  <input style={inp} placeholder="City *" value={evForm.city} onChange={e => setEvForm({ ...evForm, city: e.target.value })} />
                  <input style={inp} placeholder="State" value={evForm.state} onChange={e => setEvForm({ ...evForm, state: e.target.value })} />
                </div>
                <input style={inp} placeholder="Action (e.g. just booked a demo for)" value={evForm.action} onChange={e => setEvForm({ ...evForm, action: e.target.value })} />
                <input style={inp} placeholder="Service name" value={evForm.service} onChange={e => setEvForm({ ...evForm, service: e.target.value })} />
                <input style={inp} placeholder="Time (e.g. 2 min ago)" value={evForm.time} onChange={e => setEvForm({ ...evForm, time: e.target.value })} />
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button onClick={saveEv} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '13px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>💾 SAVE</button>
                  <button onClick={() => setShowEvForm(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '13px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
                </div>
              </div>
            </div>
          </div>
        )}
 
        {/* Still show the toast for admin preview */}
        {visible && (
          <SocialProofToast current={current} exiting={exiting} onDismiss={() => { setExiting(true); setTimeout(() => setVisible(false), 400); }} onDisable={() => { setEnabled(false); setVisible(false); }} />
        )}
      </>
    );
  }
 
  if (!visible) return null;
  return <SocialProofToast current={current} exiting={exiting} onDismiss={() => { setExiting(true); setTimeout(() => setVisible(false), 400); }} onDisable={() => { setEnabled(false); setVisible(false); }} />;
}
 
function SocialProofToast({ current, exiting, onDismiss, onDisable }: { current: ProofEvent; exiting: boolean; onDismiss: () => void; onDisable: () => void; }) {
  return (
    <>
      <style>{`
        @keyframes spSlideIn { from { transform:translateX(-120%);opacity:0; } to { transform:translateX(0);opacity:1; } }
        @keyframes spSlideOut { from { transform:translateX(0);opacity:1; } to { transform:translateX(-120%);opacity:0; } }
        @keyframes spPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
        .sp-toast { animation: spSlideIn 0.4s cubic-bezier(0.23,1,0.32,1) forwards; }
        .sp-toast.exiting { animation: spSlideOut 0.4s cubic-bezier(0.23,1,0.32,1) forwards; }
        .sp-dot { animation: spPulse 1.5s ease-in-out infinite; }
      `}</style>
      <div className={`sp-toast${exiting ? ' exiting' : ''}`} style={{ position: 'fixed', bottom: '160px', left: '20px', zIndex: 9997, background: 'rgba(5,5,16,0.97)', border: '1px solid rgba(212,160,23,0.35)', borderRadius: '16px', padding: '14px 18px', maxWidth: '300px', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', cursor: 'pointer' }} onClick={onDismiss}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(212,160,23,.2),rgba(33,150,243,.15))', border: '1px solid rgba(212,160,23,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{current.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', color: '#fff', fontWeight: 600, lineHeight: 1.4, marginBottom: '4px' }}>
              <span style={{ color: '#D4A017' }}>Someone from {current.city}</span>
              <span style={{ color: 'rgba(255,255,255,.7)' }}>, {current.state}</span>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)', lineHeight: 1.5 }}>
              {current.action} <span style={{ color: 'rgba(212,160,23,.8)' }}>{current.service}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
              <div className="sp-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2ECC40', boxShadow: '0 0 8px #2ECC40' }} />
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.3)', fontFamily: "'Space Mono',monospace" }}>{current.time}</span>
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); onDisable(); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,.2)', cursor: 'pointer', fontSize: '14px', padding: '0', lineHeight: 1, flexShrink: 0 }}>✕</button>
        </div>
      </div>
    </>
  );
}
 
export default SocialProof;