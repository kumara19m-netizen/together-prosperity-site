'use client';
import { useState, useEffect } from 'react';
 
interface Referral {
  id: string;
  name: string;
  email: string;
  referrerCode: string;
  timestamp: string;
}
 
interface UserReferral {
  code: string;
  name: string;
  email: string;
  referrals: number;
  points: number;
}
 
interface Reward {
  id: string;
  points: number;
  label: string;
  icon: string;
}
 
interface ReferralContent {
  sectionTag: string;
  title: string;
  desc: string;
  registerTitle: string;
  registerDesc: string;
  btnText: string;
}
 
const STORAGE_KEY = 'tp_referrals';
const USER_KEY = 'tp_my_referral';
const REWARDS_KEY = 'tp_referral_rewards';
const CONTENT_KEY = 'tp_referral_content';
 
const INIT_REWARDS: Reward[] = [
  { id:'1', points:50, label:'Free Tech Consultation (1 hr)', icon:'🎯' },
  { id:'2', points:100, label:'Free Security Audit Report', icon:'🔒' },
  { id:'3', points:200, label:'Priority Demo Booking', icon:'🚀' },
  { id:'4', points:500, label:'Co-branding Opportunity', icon:'🤝' },
];
 
const INIT_CONTENT: ReferralContent = {
  sectionTag: 'EARN REWARDS',
  title: 'Refer & Earn',
  desc: 'Refer colleagues and earn exclusive rewards. Every referral brings you closer to free consultations and priority access.',
  registerTitle: '🎁 Join the Referral Program',
  registerDesc: 'Get your unique referral link and start earning points instantly.',
  btnText: 'GET MY REFERRAL LINK →',
};
 
const loadLS = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
};
const saveLS = (key: string, val: any) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };
 
function generateCode(name: string): string {
  const base = name.toUpperCase().replace(/\s+/g, '').slice(0, 4);
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TP-${base}-${suffix}`;
}
 
const ICON_OPTIONS = ['🎯','🔒','🚀','🤝','💡','🌟','🏆','🎁','💎','⚡','🛡️','🔬','📊','🎓','🏅'];
 
export default function ReferralSystem({ isAdmin = false }: { isAdmin?: boolean }) {
  const [step, setStep] = useState<'register' | 'dashboard'>('register');
  const [myReferral, setMyReferral] = useState<UserReferral | null>(null);
  const [allReferrals, setAllReferrals] = useState<Referral[]>([]);
  const [rewards, setRewards] = useState<Reward[]>(INIT_REWARDS);
  const [content, setContent] = useState<ReferralContent>(INIT_CONTENT);
  const [form, setForm] = useState({ name: '', email: '' });
  const [referForm, setReferForm] = useState({ name: '', email: '', phone: '' });
  const [copied, setCopied] = useState(false);
  const [referSuccess, setReferSuccess] = useState('');
  const [showReferModal, setShowReferModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [urlCode, setUrlCode] = useState('');
 
  // Admin edit state
  const [showContentEdit, setShowContentEdit] = useState(false);
  const [contentDraft, setContentDraft] = useState<ReferralContent>(INIT_CONTENT);
  const [showRewardsEdit, setShowRewardsEdit] = useState(false);
  const [rewardsDraft, setRewardsDraft] = useState<Reward[]>(INIT_REWARDS);
 
  useEffect(() => {
    const saved = loadLS<UserReferral | null>(USER_KEY, null);
    if (saved) { setMyReferral(saved); setStep('dashboard'); }
    setAllReferrals(loadLS<Referral[]>(STORAGE_KEY, []));
    setRewards(loadLS(REWARDS_KEY, INIT_REWARDS));
    setContent(loadLS(CONTENT_KEY, INIT_CONTENT));
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) setUrlCode(ref);
    }
  }, []);
 
  const saveContent = () => {
    setContent(contentDraft);
    saveLS(CONTENT_KEY, contentDraft);
    setShowContentEdit(false);
  };
 
  const saveRewards = () => {
    setRewards(rewardsDraft);
    saveLS(REWARDS_KEY, rewardsDraft);
    setShowRewardsEdit(false);
  };
 
  const register = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    const code = generateCode(form.name);
    const user: UserReferral = { code, name: form.name, email: form.email, referrals: 0, points: 0 };
    setMyReferral(user);
    saveLS(USER_KEY, user);
    setStep('dashboard');
    if (urlCode) {
      const ref: Referral = { id: crypto.randomUUID(), name: form.name, email: form.email, referrerCode: urlCode, timestamp: new Date().toLocaleString() };
      const updated = [...allReferrals, ref];
      setAllReferrals(updated);
      saveLS(STORAGE_KEY, updated);
    }
  };
 
  const sendReferral = () => {
    if (!myReferral || !referForm.name.trim() || !referForm.email.trim()) return;
    const ref: Referral = { id: crypto.randomUUID(), name: referForm.name, email: referForm.email, referrerCode: myReferral.code, timestamp: new Date().toLocaleString() };
    const updated = [...allReferrals, ref];
    setAllReferrals(updated);
    saveLS(STORAGE_KEY, updated);
    const updated_user = { ...myReferral, referrals: myReferral.referrals + 1, points: myReferral.points + 50 };
    setMyReferral(updated_user);
    saveLS(USER_KEY, updated_user);
    setReferSuccess(`✅ Invitation sent to ${referForm.email}! +50 points added.`);
    setReferForm({ name: '', email: '', phone: '' });
    setTimeout(() => { setReferSuccess(''); setShowReferModal(false); }, 3000);
  };
 
  const copyLink = () => {
    if (!myReferral) return;
    navigator.clipboard.writeText(`${window.location.origin}?ref=${myReferral.code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  const shareWhatsApp = () => {
    if (!myReferral) return;
    const link = `${window.location.origin}?ref=${myReferral.code}`;
    const msg = encodeURIComponent(`🚀 Check out Together Prosperity — Blockchain, Cybersecurity, IoT & AI solutions!\n\n${link}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };
 
  const myReferralHistory = allReferrals.filter(r => myReferral && r.referrerCode === myReferral.code);
 
  const inp = { width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:'11px', padding:'12px 16px', color:'#fff', fontSize:'13px', outline:'none', boxSizing:'border-box' as const, fontFamily:"'Sora',sans-serif" };
 
  return (
    <section id="referral" style={{ padding:'100px 60px', background:'rgba(212,160,23,.018)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
 
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'50px', position:'relative' }}>
          <span style={{ fontFamily:"'Space Mono',monospace", color:'rgba(212,160,23,.7)', fontSize:'8.5px', letterSpacing:'7px', display:'block', marginBottom:'12px', fontWeight:700 }}>{content.sectionTag}</span>
          <h2 style={{ fontSize:'clamp(28px,4vw,52px)', fontWeight:900, color:'#fff', marginBottom:'12px' }}>{content.title}</h2>
          <p style={{ color:'rgba(255,255,255,.4)', fontSize:'14px', maxWidth:'500px', margin:'0 auto' }}>{content.desc}</p>
          {isAdmin && (
            <div style={{ display:'flex', gap:'10px', justifyContent:'center', marginTop:'16px', flexWrap:'wrap' }}>
              <button onClick={() => { setContentDraft(content); setShowContentEdit(true); }} style={{ background:'transparent', border:'1px solid rgba(212,160,23,.3)', color:'#D4A017', padding:'6px 16px', borderRadius:'8px', fontSize:'9px', cursor:'pointer', fontFamily:"'Space Mono',monospace", fontWeight:700 }}>✏ EDIT TEXT</button>
              <button onClick={() => { setRewardsDraft([...rewards]); setShowRewardsEdit(true); }} style={{ background:'transparent', border:'1px solid rgba(212,160,23,.3)', color:'#D4A017', padding:'6px 16px', borderRadius:'8px', fontSize:'9px', cursor:'pointer', fontFamily:"'Space Mono',monospace", fontWeight:700 }}>✏ EDIT REWARDS</button>
            </div>
          )}
        </div>
 
        {/* Rewards bar */}
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', marginBottom:'40px' }}>
          {rewards.map(r => (
            <div key={r.id} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(212,160,23,.15)', borderRadius:'14px', padding:'14px 20px', textAlign:'center', minWidth:'160px' }}>
              <div style={{ fontSize:'24px', marginBottom:'6px' }}>{r.icon}</div>
              <div style={{ color:'#D4A017', fontFamily:"'Space Mono',monospace", fontSize:'10px', fontWeight:700, marginBottom:'4px' }}>{r.points} pts</div>
              <div style={{ color:'rgba(255,255,255,.5)', fontSize:'11px', lineHeight:1.4 }}>{r.label}</div>
            </div>
          ))}
        </div>
 
        {/* Main card */}
        <div style={{ background:'rgba(255,255,255,.018)', border:'1px solid rgba(212,160,23,.2)', borderRadius:'24px', padding:'40px' }}>
          {step === 'register' ? (
            <div>
              <h3 style={{ color:'#D4A017', fontSize:'20px', fontWeight:700, marginBottom:'8px' }}>{content.registerTitle}</h3>
              <p style={{ color:'rgba(255,255,255,.4)', fontSize:'12px', marginBottom:'24px' }}>{content.registerDesc}</p>
              {urlCode && (
                <div style={{ background:'rgba(46,204,64,.08)', border:'1px solid rgba(46,204,64,.2)', borderRadius:'12px', padding:'12px 16px', marginBottom:'20px' }}>
                  <p style={{ color:'#2ECC40', fontSize:'12px' }}>🎉 You were referred! Register to give them credit and get started.</p>
                </div>
              )}
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                <input style={inp} placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
                <input style={inp} type="email" placeholder="Your Email *" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
                <button onClick={register} disabled={!form.name.trim()||!form.email.trim()} style={{ background:form.name&&form.email?'linear-gradient(135deg,#D4A017,#F5A623)':'rgba(255,255,255,.06)', border:'none', borderRadius:'12px', padding:'14px', color:form.name&&form.email?'#000':'rgba(255,255,255,.3)', fontWeight:800, fontSize:'12px', cursor:form.name&&form.email?'pointer':'not-allowed', letterSpacing:'2px' }}>
                  {content.btnText}
                </button>
              </div>
            </div>
          ) : myReferral ? (
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'12px', marginBottom:'28px' }}>
                <div>
                  <h3 style={{ color:'#fff', fontSize:'20px', fontWeight:700 }}>👋 Welcome, {myReferral.name.split(' ')[0]}!</h3>
                  <p style={{ color:'rgba(255,255,255,.4)', fontSize:'12px', marginTop:'4px' }}>Your referral dashboard</p>
                </div>
                <div style={{ display:'flex', gap:'16px' }}>
                  <div style={{ textAlign:'center', background:'rgba(212,160,23,.08)', border:'1px solid rgba(212,160,23,.2)', borderRadius:'12px', padding:'12px 20px' }}>
                    <div style={{ color:'#D4A017', fontSize:'24px', fontWeight:800, fontFamily:"'Space Mono',monospace" }}>{myReferral.referrals}</div>
                    <div style={{ color:'rgba(255,255,255,.4)', fontSize:'9px', letterSpacing:'2px' }}>REFERRALS</div>
                  </div>
                  <div style={{ textAlign:'center', background:'rgba(46,204,64,.08)', border:'1px solid rgba(46,204,64,.2)', borderRadius:'12px', padding:'12px 20px' }}>
                    <div style={{ color:'#2ECC40', fontSize:'24px', fontWeight:800, fontFamily:"'Space Mono',monospace" }}>{myReferral.points}</div>
                    <div style={{ color:'rgba(255,255,255,.4)', fontSize:'9px', letterSpacing:'2px' }}>POINTS</div>
                  </div>
                </div>
              </div>
 
              {/* Progress bar */}
              {(() => {
                const next = rewards.find(r => r.points > myReferral.points);
                if (!next) return null;
                const prev = rewards.filter(r => r.points <= myReferral.points).pop();
                const from = prev?.points || 0;
                const progress = ((myReferral.points - from) / (next.points - from)) * 100;
                return (
                  <div style={{ marginBottom:'24px', background:'rgba(255,255,255,.03)', borderRadius:'12px', padding:'16px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                      <span style={{ color:'rgba(255,255,255,.5)', fontSize:'11px' }}>Progress to next reward</span>
                      <span style={{ color:'#D4A017', fontSize:'11px', fontFamily:"'Space Mono',monospace" }}>{next.icon} {next.label}</span>
                    </div>
                    <div style={{ height:'6px', background:'rgba(255,255,255,.06)', borderRadius:'3px', overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${Math.min(100,progress)}%`, background:'linear-gradient(90deg,#D4A017,#F5A623)', borderRadius:'3px', transition:'width .5s' }} />
                    </div>
                    <div style={{ color:'rgba(255,255,255,.3)', fontSize:'10px', marginTop:'6px', textAlign:'right' }}>{myReferral.points}/{next.points} pts</div>
                  </div>
                );
              })()}
 
              {/* Referral link */}
              <div style={{ background:'rgba(0,0,0,.3)', border:'1px solid rgba(212,160,23,.2)', borderRadius:'12px', padding:'16px', marginBottom:'20px' }}>
                <div style={{ color:'rgba(255,255,255,.4)', fontSize:'10px', fontFamily:"'Space Mono',monospace", letterSpacing:'2px', marginBottom:'8px' }}>YOUR REFERRAL CODE</div>
                <div style={{ display:'flex', gap:'10px', alignItems:'center', flexWrap:'wrap' }}>
                  <code style={{ color:'#D4A017', fontSize:'16px', fontFamily:"'Space Mono',monospace", fontWeight:700, flex:1 }}>{myReferral.code}</code>
                  <button onClick={copyLink} style={{ background:copied?'rgba(46,204,64,.15)':'rgba(212,160,23,.1)', border:`1px solid ${copied?'rgba(46,204,64,.3)':'rgba(212,160,23,.3)'}`, color:copied?'#2ECC40':'#D4A017', padding:'8px 16px', borderRadius:'8px', cursor:'pointer', fontSize:'10px', fontWeight:700, letterSpacing:'1px' }}>
                    {copied?'✅ COPIED!':'📋 COPY LINK'}
                  </button>
                  <button onClick={shareWhatsApp} style={{ background:'rgba(37,211,102,.1)', border:'1px solid rgba(37,211,102,.3)', color:'#25D366', padding:'8px 16px', borderRadius:'8px', cursor:'pointer', fontSize:'10px', fontWeight:700 }}>💬 SHARE</button>
                </div>
              </div>
 
              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', marginBottom:'24px' }}>
                <button onClick={() => setShowReferModal(true)} style={{ background:'linear-gradient(135deg,#D4A017,#F5A623)', border:'none', borderRadius:'10px', padding:'12px 24px', color:'#000', fontWeight:700, fontSize:'11px', cursor:'pointer', letterSpacing:'1.5px' }}>+ INVITE SOMEONE</button>
                {isAdmin && (
                  <button onClick={() => setShowAdmin(!showAdmin)} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.1)', borderRadius:'10px', padding:'12px 24px', color:'rgba(255,255,255,.5)', fontWeight:600, fontSize:'11px', cursor:'pointer' }}>
                    📊 ALL REFERRALS ({allReferrals.length})
                  </button>
                )}
              </div>
 
              {myReferralHistory.length > 0 && (
                <div>
                  <h4 style={{ color:'rgba(255,255,255,.5)', fontSize:'10px', fontFamily:"'Space Mono',monospace", letterSpacing:'3px', marginBottom:'12px' }}>YOUR REFERRALS</h4>
                  <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                    {myReferralHistory.map(r => (
                      <div key={r.id} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)', borderRadius:'10px', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <div>
                          <div style={{ color:'#fff', fontSize:'13px', fontWeight:600 }}>{r.name}</div>
                          <div style={{ color:'rgba(255,255,255,.35)', fontSize:'10px' }}>{r.email} · {r.timestamp}</div>
                        </div>
                        <span style={{ background:'rgba(46,204,64,.1)', color:'#2ECC40', padding:'3px 10px', borderRadius:'50px', fontSize:'9px', fontFamily:"'Space Mono',monospace" }}>+50 PTS</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
 
              {isAdmin && showAdmin && (
                <div style={{ marginTop:'24px', background:'rgba(0,0,0,.3)', borderRadius:'12px', padding:'16px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
                    <h4 style={{ color:'#D4A017', fontSize:'12px', fontFamily:"'Space Mono',monospace" }}>ALL REFERRALS ({allReferrals.length})</h4>
                    {allReferrals.length > 0 && (
                      <button onClick={() => {
                        const csv = ['Name,Email,Referrer Code,Timestamp',...allReferrals.map(r=>`"${r.name}","${r.email}","${r.referrerCode}","${r.timestamp}"`)].join('\n');
                        const blob = new Blob([csv],{type:'text/csv'});
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a'); a.href=url; a.download='referrals.csv'; a.click(); URL.revokeObjectURL(url);
                      }} style={{ background:'rgba(212,160,23,.1)', border:'1px solid rgba(212,160,23,.3)', color:'#D4A017', padding:'4px 12px', borderRadius:'6px', fontSize:'9px', cursor:'pointer' }}>📥 EXPORT CSV</button>
                    )}
                  </div>
                  <div style={{ maxHeight:'250px', overflowY:'auto' }}>
                    {allReferrals.length === 0 ? <p style={{ color:'rgba(255,255,255,.3)', fontSize:'12px' }}>No referrals yet.</p> : allReferrals.map(r => (
                      <div key={r.id} style={{ borderBottom:'1px solid rgba(255,255,255,.05)', padding:'8px 0', fontSize:'11px', color:'rgba(255,255,255,.5)' }}>
                        <span style={{ color:'#fff' }}>{r.name}</span> ({r.email}) — via <span style={{ color:'#D4A017' }}>{r.referrerCode}</span> — {r.timestamp}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
 
      {/* ── CONTENT EDIT MODAL ── */}
      {showContentEdit && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.92)', backdropFilter:'blur(20px)', zIndex:10001, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={() => setShowContentEdit(false)}>
          <div style={{ background:'#050510', border:'1px solid rgba(212,160,23,.25)', borderRadius:'24px', padding:'36px', maxWidth:'500px', width:'100%' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color:'#fff', fontSize:'20px', fontWeight:800, marginBottom:'24px' }}>✏ Edit Referral Section Text</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <input style={inp} placeholder="Section Tag" value={contentDraft.sectionTag} onChange={e => setContentDraft({...contentDraft,sectionTag:e.target.value})} />
              <input style={inp} placeholder="Title" value={contentDraft.title} onChange={e => setContentDraft({...contentDraft,title:e.target.value})} />
              <textarea style={{ ...inp, resize:'vertical' as const }} rows={2} placeholder="Description" value={contentDraft.desc} onChange={e => setContentDraft({...contentDraft,desc:e.target.value})} />
              <input style={inp} placeholder="Register Box Title" value={contentDraft.registerTitle} onChange={e => setContentDraft({...contentDraft,registerTitle:e.target.value})} />
              <input style={inp} placeholder="Register Box Description" value={contentDraft.registerDesc} onChange={e => setContentDraft({...contentDraft,registerDesc:e.target.value})} />
              <input style={inp} placeholder="Button Text" value={contentDraft.btnText} onChange={e => setContentDraft({...contentDraft,btnText:e.target.value})} />
              <div style={{ display:'flex', gap:'10px', marginTop:'8px' }}>
                <button onClick={saveContent} style={{ flex:1, background:'linear-gradient(135deg,#D4A017,#F5A623)', border:'none', borderRadius:'12px', padding:'13px', color:'#000', fontWeight:800, cursor:'pointer' }}>💾 SAVE</button>
                <button onClick={() => setShowContentEdit(false)} style={{ flex:1, background:'transparent', border:'1px solid rgba(255,255,255,.1)', borderRadius:'12px', padding:'13px', color:'rgba(255,255,255,.4)', cursor:'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* ── REWARDS EDIT MODAL ── */}
      {showRewardsEdit && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.92)', backdropFilter:'blur(20px)', zIndex:10001, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', overflowY:'auto' }} onClick={() => setShowRewardsEdit(false)}>
          <div style={{ background:'#050510', border:'1px solid rgba(212,160,23,.25)', borderRadius:'24px', padding:'36px', maxWidth:'580px', width:'100%', maxHeight:'92vh', overflowY:'auto' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color:'#fff', fontSize:'20px', fontWeight:800, marginBottom:'24px' }}>✏ Edit Rewards</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              {rewardsDraft.map((r, i) => (
                <div key={r.id} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(212,160,23,.15)', borderRadius:'12px', padding:'16px' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'60px 80px 1fr 40px', gap:'8px', alignItems:'center' }}>
                    <select value={r.icon} onChange={e => { const nd=[...rewardsDraft]; nd[i]={...nd[i],icon:e.target.value}; setRewardsDraft(nd); }} style={{ ...inp, padding:'6px', fontSize:'20px', textAlign:'center' }}>
                      {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                    </select>
                    <input type="number" style={{ ...inp, padding:'8px' }} placeholder="Points" value={r.points} onChange={e => { const nd=[...rewardsDraft]; nd[i]={...nd[i],points:parseInt(e.target.value)||0}; setRewardsDraft(nd); }} />
                    <input style={{ ...inp, padding:'8px' }} placeholder="Reward label" value={r.label} onChange={e => { const nd=[...rewardsDraft]; nd[i]={...nd[i],label:e.target.value}; setRewardsDraft(nd); }} />
                    <button onClick={() => setRewardsDraft(rewardsDraft.filter((_,idx)=>idx!==i))} style={{ background:'rgba(244,67,54,.2)', border:'none', borderRadius:'8px', color:'#f44336', cursor:'pointer', fontSize:'16px', height:'42px', width:'40px' }}>✕</button>
                  </div>
                </div>
              ))}
              <button onClick={() => setRewardsDraft([...rewardsDraft, { id:crypto.randomUUID(), points:0, label:'New Reward', icon:'🎁' }])} style={{ background:'transparent', border:'1px solid rgba(212,160,23,.3)', color:'#D4A017', padding:'10px', borderRadius:'10px', fontSize:'11px', cursor:'pointer' }}>+ ADD REWARD</button>
              <div style={{ display:'flex', gap:'10px', marginTop:'8px' }}>
                <button onClick={saveRewards} style={{ flex:1, background:'linear-gradient(135deg,#D4A017,#F5A623)', border:'none', borderRadius:'12px', padding:'13px', color:'#000', fontWeight:800, cursor:'pointer' }}>💾 SAVE</button>
                <button onClick={() => setShowRewardsEdit(false)} style={{ flex:1, background:'transparent', border:'1px solid rgba(255,255,255,.1)', borderRadius:'12px', padding:'13px', color:'rgba(255,255,255,.4)', cursor:'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* ── INVITE MODAL ── */}
      {showReferModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.92)', backdropFilter:'blur(20px)', zIndex:10001, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={() => setShowReferModal(false)}>
          <div style={{ background:'#050510', border:'1px solid rgba(212,160,23,.25)', borderRadius:'24px', padding:'36px', maxWidth:'440px', width:'100%' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color:'#fff', fontSize:'20px', fontWeight:700, marginBottom:'6px' }}>✉️ Invite Someone</h3>
            <p style={{ color:'rgba(255,255,255,.4)', fontSize:'12px', marginBottom:'24px' }}>We'll send them a personalised invite with your referral code.</p>
            {referSuccess ? (
              <p style={{ color:'#2ECC40', textAlign:'center', padding:'20px', fontSize:'14px' }}>{referSuccess}</p>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                <input style={inp} placeholder="Their Name *" value={referForm.name} onChange={e => setReferForm({...referForm,name:e.target.value})} />
                <input style={inp} type="email" placeholder="Their Email *" value={referForm.email} onChange={e => setReferForm({...referForm,email:e.target.value})} />
                <input style={inp} placeholder="Their Phone (optional)" value={referForm.phone} onChange={e => setReferForm({...referForm,phone:e.target.value})} />
                <div style={{ display:'flex', gap:'10px', marginTop:'4px' }}>
                  <button onClick={sendReferral} style={{ flex:2, background:'linear-gradient(135deg,#D4A017,#F5A623)', border:'none', borderRadius:'10px', padding:'12px', color:'#000', fontWeight:700, fontSize:'11px', cursor:'pointer', letterSpacing:'1.5px' }}>SEND INVITE →</button>
                  <button onClick={() => setShowReferModal(false)} style={{ flex:1, background:'transparent', border:'1px solid rgba(255,255,255,.1)', borderRadius:'10px', padding:'12px', color:'rgba(255,255,255,.4)', cursor:'pointer' }}>CANCEL</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}