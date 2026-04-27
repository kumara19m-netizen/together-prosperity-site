'use client';
import { useState, useEffect } from 'react';
 
interface CaseStudy {
  id: string;
  title: string;
  category: string;
  client: string;
  challenge: string;
  solution: string;
  outcome: string;
  tech: string[];
  icon: string;
  color: string;
  pages: string;
  readTime: string;
}
 
const INIT_CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'KarnaLand — Blockchain Land Records',
    category: 'Gov-tech',
    client: 'Kolar District Panchayat, Karnataka',
    challenge: 'Manual land records prone to fraud, tampering, and slow processing. 50,000+ records needed digitization.',
    solution: 'Deployed Hyperledger Fabric permissioned blockchain. Immutable audit trails. Citizen-facing portal for record verification.',
    outcome: '₹1.2Cr saved in operational costs. 0 fraud cases post-deployment. 80% faster record retrieval.',
    tech: ['Hyperledger Fabric', 'React', 'Node.js', 'PostgreSQL'],
    icon: '🏛️', color: '#D4A017', pages: '12 pages', readTime: '8 min read',
  },
  {
    id: '2',
    title: 'AgroSense — Smart Farming IoT Platform',
    category: 'Agriculture IoT',
    client: 'Karnataka Agricultural Department',
    challenge: 'Farmers lacked real-time crop monitoring, leading to 30% yield losses from undetected disease and weather changes.',
    solution: 'Deployed 200+ IoT sensors across 40 farms. ML models for yield prediction. Real-time WhatsApp alerts to farmers.',
    outcome: '22% average yield increase. ₹80L+ farmer savings in Year 1. 92% prediction accuracy.',
    tech: ['MQTT', 'InfluxDB', 'Grafana', 'TensorFlow', 'Python'],
    icon: '🌾', color: '#2ECC40', pages: '10 pages', readTime: '7 min read',
  },
  {
    id: '3',
    title: 'SecureGov — Zero-Trust Cybersecurity',
    category: 'Cybersecurity',
    client: '3 Karnataka Government Departments',
    challenge: 'Critical government infrastructure vulnerable to ransomware and insider threats. Legacy perimeter security insufficient.',
    solution: 'Zero-trust architecture deployment. SIEM/SOAR integration. Continuous penetration testing. ISO 27001 compliance.',
    outcome: 'Zero security breaches across 18 months. 100% compliance achieved. 60% reduction in attack surface.',
    tech: ['Zero Trust', 'SIEM', 'SOAR', 'ISO 27001', 'Splunk'],
    icon: '🔒', color: '#F5A623', pages: '14 pages', readTime: '10 min read',
  },
];
 
const SK = 'tp_case_studies';
const loadLS = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
};
const saveLS = (key: string, val: any) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };
 
const COLOR_OPTIONS = ['#D4A017','#2196F3','#2ECC40','#F5A623','#E91E63','#9C27B0','#FF5722','#00BCD4','#FF6B6B','#4ECDC4'];
const ICON_OPTIONS = ['🏛️','🌾','🔒','🤖','📡','⛓️','📜','🏥','🎓','🏭','🏦','🚚','🏙️','💡','🔬','⚡','🚀','🛡️'];
 
export default function CaseStudyDownload({ isAdmin = false }: { isAdmin?: boolean }) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(INIT_CASE_STUDIES);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [emailModal, setEmailModal] = useState<CaseStudy | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState('');
 
  // Admin state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCS, setEditingCS] = useState<CaseStudy | null>(null);
  const [draft, setDraft] = useState<Omit<CaseStudy,'id'>>({
    title:'', category:'', client:'', challenge:'', solution:'', outcome:'',
    tech:[''], icon:'🏛️', color:'#D4A017', pages:'', readTime:'',
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
 
  // Bottom CTA admin edit
  const [showCtaEdit, setShowCtaEdit] = useState(false);
  const [cta, setCta] = useState({ title: 'Want a Custom Case Study?', desc: "We'll create a detailed case study for your specific industry and use case — free of charge.", btnText: 'REQUEST CUSTOM CASE STUDY →' });
  const [ctaDraft, setCtaDraft] = useState(cta);
 
  useEffect(() => {
    setCaseStudies(loadLS(SK, INIT_CASE_STUDIES));
    const saved = loadLS('tp_cs_cta', null);
    if (saved) setCta(saved);
  }, []);
 
  useEffect(() => { saveLS(SK, caseStudies); }, [caseStudies]);
 
  const openAdd = () => {
    setEditingCS(null);
    setDraft({ title:'', category:'', client:'', challenge:'', solution:'', outcome:'', tech:[''], icon:'🏛️', color:'#D4A017', pages:'', readTime:'' });
    setShowEditModal(true);
  };
 
  const openEdit = (cs: CaseStudy) => {
    setEditingCS(cs);
    setDraft({ title:cs.title, category:cs.category, client:cs.client, challenge:cs.challenge, solution:cs.solution, outcome:cs.outcome, tech:[...cs.tech], icon:cs.icon, color:cs.color, pages:cs.pages, readTime:cs.readTime });
    setShowEditModal(true);
  };
 
  const saveCS = () => {
    if (!draft.title.trim()) return;
    if (editingCS) {
      setCaseStudies(prev => prev.map(c => c.id === editingCS.id ? { ...c, ...draft } : c));
    } else {
      setCaseStudies(prev => [...prev, { id: crypto.randomUUID(), ...draft }]);
    }
    setShowEditModal(false);
  };
 
  const deleteCS = (id: string) => {
    setCaseStudies(prev => prev.filter(c => c.id !== id));
    setDeleteConfirm(null);
  };
 
  const saveCta = () => {
    setCta(ctaDraft);
    saveLS('tp_cs_cta', ctaDraft);
    setShowCtaEdit(false);
  };
 
  const generateAndDownload = (cs: CaseStudy) => {
    const content = `TOGETHER PROSPERITY PRIVATE LIMITED\n${'━'.repeat(56)}\nCASE STUDY: ${cs.title.toUpperCase()}\n${cs.pages} | ${cs.readTime}\n${'━'.repeat(56)}\n\nCATEGORY: ${cs.category}\nCLIENT: ${cs.client}\n\n${'━'.repeat(56)}\nTHE CHALLENGE\n${'━'.repeat(56)}\n\n${cs.challenge}\n\n${'━'.repeat(56)}\nOUR SOLUTION\n${'━'.repeat(56)}\n\n${cs.solution}\n\n${'━'.repeat(56)}\nTECHNOLOGY STACK\n${'━'.repeat(56)}\n\n${cs.tech.map(t => `  • ${t}`).join('\n')}\n\n${'━'.repeat(56)}\nOUTCOME & RESULTS\n${'━'.repeat(56)}\n\n${cs.outcome}\n\n${'━'.repeat(56)}\nABOUT TOGETHER PROSPERITY\n${'━'.repeat(56)}\n\nTogether Prosperity Private Limited — Blockchain, Cybersecurity, IoT, AI/ML\n📍 Malur, Kolar District, Karnataka — 563130\n📞 +91 98456 18859  ✉️ contact@togetherprosperity.com\nCIN: U72900KA2026PTC12345\n${'━'.repeat(56)}\n© 2026 Together Prosperity Private Limited. All Rights Reserved.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TP_CaseStudy_${cs.category.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
 
  const handleDownload = async (cs: CaseStudy) => {
    setDownloading(cs.id);
    await new Promise(r => setTimeout(r, 800));
    generateAndDownload(cs);
    setDownloading(null);
  };
 
  const handleEmailSubmit = () => {
    if (!email.trim() || !name.trim() || !emailModal) return;
    try {
      const existing = JSON.parse(localStorage.getItem('tp_casestudy_leads') || '[]');
      existing.push({ name, email, caseStudy: emailModal.title, timestamp: new Date().toISOString() });
      localStorage.setItem('tp_casestudy_leads', JSON.stringify(existing));
    } catch {}
    generateAndDownload(emailModal);
    setSuccess(`✅ Sent to ${email}! Downloading now...`);
    setTimeout(() => { setSuccess(''); setEmailModal(null); setEmail(''); setName(''); }, 3000);
  };
 
  const inp = { width:'100%', background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', borderRadius:'11px', padding:'12px 16px', color:'#fff', fontSize:'13px', outline:'none', boxSizing:'border-box' as const, fontFamily:"'Sora',sans-serif" };
 
  return (
    <section id="case-studies-dl" style={{ padding:'100px 60px', background:'rgba(46,204,64,.015)', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
 
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'50px' }}>
          <span style={{ fontFamily:"'Space Mono',monospace", color:'rgba(46,204,64,.7)', fontSize:'8.5px', letterSpacing:'7px', display:'block', marginBottom:'12px', fontWeight:700 }}>FREE RESOURCES</span>
          <h2 style={{ fontSize:'clamp(28px,4vw,52px)', fontWeight:900, color:'#fff', marginBottom:'12px' }}>Download Case Studies</h2>
          <p style={{ color:'rgba(255,255,255,.4)', fontSize:'14px', maxWidth:'520px', margin:'0 auto' }}>Real-world proof of our impact. Download detailed case studies and share them with your team.</p>
        </div>
 
        {/* Admin bar */}
        {isAdmin && (
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', marginBottom:'30px', flexWrap:'wrap' }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'8px', color:'rgba(212,160,23,.5)', letterSpacing:'2px', alignSelf:'center' }}>🔐 ADMIN · CASE STUDIES</span>
            <button onClick={openAdd} style={{ background:'transparent', border:'1px solid rgba(212,160,23,.3)', color:'#D4A017', padding:'6px 16px', borderRadius:'8px', fontSize:'10px', cursor:'pointer', fontFamily:"'Space Mono',monospace", fontWeight:700 }}>+ ADD CASE STUDY</button>
            <button onClick={() => { setCtaDraft(cta); setShowCtaEdit(true); }} style={{ background:'transparent', border:'1px solid rgba(212,160,23,.3)', color:'#D4A017', padding:'6px 16px', borderRadius:'8px', fontSize:'10px', cursor:'pointer', fontFamily:"'Space Mono',monospace", fontWeight:700 }}>✏ EDIT CTA SECTION</button>
          </div>
        )}
 
        {/* Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:'24px' }}>
          {caseStudies.map(cs => (
            <div key={cs.id} style={{ background:'rgba(255,255,255,.018)', border:`1px solid ${cs.color}20`, borderRadius:'22px', overflow:'hidden', transition:'all .4s', position:'relative' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(-8px)'; (e.currentTarget as HTMLDivElement).style.borderColor=`${cs.color}45`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform='translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor=`${cs.color}20`; }}>
              <div style={{ height:'4px', background:`linear-gradient(90deg,transparent,${cs.color},transparent)` }} />
              <div style={{ background:`${cs.color}0a`, padding:'28px 28px 20px', borderBottom:`1px solid ${cs.color}15` }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div style={{ fontSize:'40px' }}>{cs.icon}</div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ background:`${cs.color}18`, border:`1px solid ${cs.color}30`, color:cs.color, padding:'3px 10px', borderRadius:'50px', fontSize:'9px', fontFamily:"'Space Mono',monospace", letterSpacing:'2px', marginBottom:'4px' }}>{cs.category.toUpperCase()}</div>
                    <div style={{ color:'rgba(255,255,255,.3)', fontSize:'9px', fontFamily:"'Space Mono',monospace" }}>{cs.pages} · {cs.readTime}</div>
                  </div>
                </div>
                <h3 style={{ color:'#fff', fontSize:'17px', fontWeight:700, marginTop:'12px', lineHeight:1.3 }}>{cs.title}</h3>
                <p style={{ color:'rgba(255,255,255,.4)', fontSize:'11px', marginTop:'6px', fontFamily:"'Space Mono',monospace" }}>📍 {cs.client}</p>
              </div>
              <div style={{ padding:'20px 28px' }}>
                <div style={{ marginBottom:'14px' }}>
                  <div style={{ color:'#f44336', fontSize:'9px', fontFamily:"'Space Mono',monospace", letterSpacing:'2px', marginBottom:'5px' }}>⚠️ CHALLENGE</div>
                  <p style={{ color:'rgba(255,255,255,.5)', fontSize:'12px', lineHeight:1.7 }}>{cs.challenge.slice(0,80)}...</p>
                </div>
                <div style={{ background:`${cs.color}08`, border:`1px solid ${cs.color}20`, borderRadius:'10px', padding:'12px 14px', marginBottom:'16px' }}>
                  <div style={{ color:cs.color, fontSize:'9px', fontFamily:"'Space Mono',monospace", letterSpacing:'2px', marginBottom:'5px' }}>📊 KEY OUTCOME</div>
                  <p style={{ color:'rgba(255,255,255,.7)', fontSize:'12px', lineHeight:1.6, fontWeight:500 }}>{cs.outcome.split('.')[0]}.</p>
                </div>
                <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'20px' }}>
                  {cs.tech.map(t => <span key={t} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', color:'rgba(255,255,255,.45)', padding:'3px 10px', borderRadius:'50px', fontSize:'9px', fontFamily:"'Space Mono',monospace" }}>{t}</span>)}
                </div>
                <div style={{ display:'flex', gap:'8px' }}>
                  <button onClick={() => handleDownload(cs)} disabled={downloading===cs.id} style={{ flex:1, background:downloading===cs.id?'rgba(255,255,255,.06)':`linear-gradient(135deg,${cs.color},${cs.color}cc)`, border:'none', borderRadius:'10px', padding:'11px', color:downloading===cs.id?'rgba(255,255,255,.3)':'#000', fontWeight:700, fontSize:'10px', cursor:downloading===cs.id?'not-allowed':'pointer', letterSpacing:'1.5px', transition:'all .3s' }}>
                    {downloading===cs.id?'⏳ DOWNLOADING...':'⬇️ DOWNLOAD FREE'}
                  </button>
                  <button onClick={() => setEmailModal(cs)} style={{ background:'transparent', border:`1px solid ${cs.color}30`, borderRadius:'10px', padding:'11px 14px', color:cs.color, cursor:'pointer', fontSize:'16px' }} title="Send to email">📧</button>
                </div>
 
                {/* Admin edit/delete buttons */}
                {isAdmin && (
                  <div style={{ display:'flex', gap:'8px', marginTop:'12px' }}>
                    <button onClick={() => openEdit(cs)} style={{ flex:1, background:'transparent', border:'1px solid rgba(212,160,23,.25)', color:'#D4A017', padding:'6px', borderRadius:'8px', fontSize:'9px', cursor:'pointer', fontFamily:"'Space Mono',monospace", fontWeight:700 }}>✏ EDIT</button>
                    <button onClick={() => setDeleteConfirm(cs.id)} style={{ flex:1, background:'transparent', border:'1px solid rgba(244,67,54,.25)', color:'#f44336', padding:'6px', borderRadius:'8px', fontSize:'9px', cursor:'pointer', fontFamily:"'Space Mono',monospace", fontWeight:700 }}>✕ DELETE</button>
                  </div>
                )}
              </div>
            </div>
          ))}
 
          {/* Add card for admin */}
          {isAdmin && (
            <button onClick={openAdd} style={{ background:'rgba(212,160,23,.025)', border:'2px dashed rgba(212,160,23,.22)', borderRadius:'22px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px', cursor:'pointer', minHeight:'300px', transition:'all .4s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(212,160,23,.07)'; (e.currentTarget as HTMLButtonElement).style.borderColor='#D4A017'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(212,160,23,.025)'; (e.currentTarget as HTMLButtonElement).style.borderColor='rgba(212,160,23,.22)'; }}>
              <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'rgba(212,160,23,.07)', border:'2px dashed rgba(212,160,23,.32)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px', color:'#D4A017' }}>+</div>
              <div style={{ color:'rgba(212,160,23,.85)', fontWeight:700, fontSize:'14px' }}>Add Case Study</div>
            </button>
          )}
        </div>
 
        {/* Bottom CTA */}
        <div style={{ textAlign:'center', marginTop:'50px', background:'rgba(255,255,255,.018)', border:'1px solid rgba(212,160,23,.15)', borderRadius:'20px', padding:'36px', position:'relative' }}>
          {isAdmin && (
            <button onClick={() => { setCtaDraft(cta); setShowCtaEdit(true); }} style={{ position:'absolute', top:'12px', right:'12px', background:'rgba(212,160,23,.1)', border:'1px solid rgba(212,160,23,.3)', color:'#D4A017', padding:'4px 12px', borderRadius:'6px', fontSize:'9px', cursor:'pointer', fontFamily:"'Space Mono',monospace" }}>✏ EDIT</button>
          )}
          <div style={{ fontSize:'36px', marginBottom:'12px' }}>📚</div>
          <h3 style={{ color:'#fff', fontSize:'22px', fontWeight:700, marginBottom:'8px' }}>{cta.title}</h3>
          <p style={{ color:'rgba(255,255,255,.4)', fontSize:'13px', maxWidth:'400px', margin:'0 auto 20px' }}>{cta.desc}</p>
          <a href="#contact" style={{ background:'linear-gradient(135deg,#D4A017,#F5A623)', border:'none', borderRadius:'50px', padding:'12px 32px', color:'#000', fontWeight:800, fontSize:'11px', cursor:'pointer', letterSpacing:'2px', textDecoration:'none', display:'inline-block' }}>{cta.btnText}</a>
        </div>
      </div>
 
      {/* ── EDIT/ADD MODAL ── */}
      {showEditModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.92)', backdropFilter:'blur(20px)', zIndex:10001, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', overflowY:'auto' }} onClick={() => setShowEditModal(false)}>
          <div style={{ background:'#050510', border:'1px solid rgba(212,160,23,.25)', borderRadius:'24px', padding:'36px', maxWidth:'620px', width:'100%', maxHeight:'92vh', overflowY:'auto' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color:'#fff', fontSize:'20px', fontWeight:800, marginBottom:'24px' }}>{editingCS ? 'Edit Case Study' : 'Add Case Study'}</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'60px 1fr', gap:'10px' }}>
                <select value={draft.icon} onChange={e => setDraft({...draft, icon:e.target.value})} style={{ ...inp, textAlign:'center', fontSize:'22px', padding:'8px' }}>
                  {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                <input style={inp} placeholder="Title *" value={draft.title} onChange={e => setDraft({...draft, title:e.target.value})} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <input style={inp} placeholder="Category (e.g. Gov-tech)" value={draft.category} onChange={e => setDraft({...draft, category:e.target.value})} />
                <input style={inp} placeholder="Client / Location" value={draft.client} onChange={e => setDraft({...draft, client:e.target.value})} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                <input style={inp} placeholder="Pages (e.g. 12 pages)" value={draft.pages} onChange={e => setDraft({...draft, pages:e.target.value})} />
                <input style={inp} placeholder="Read Time (e.g. 8 min read)" value={draft.readTime} onChange={e => setDraft({...draft, readTime:e.target.value})} />
              </div>
              <textarea style={{ ...inp, resize:'vertical' as const }} rows={2} placeholder="Challenge *" value={draft.challenge} onChange={e => setDraft({...draft, challenge:e.target.value})} />
              <textarea style={{ ...inp, resize:'vertical' as const }} rows={2} placeholder="Solution *" value={draft.solution} onChange={e => setDraft({...draft, solution:e.target.value})} />
              <textarea style={{ ...inp, resize:'vertical' as const }} rows={2} placeholder="Outcome / Results *" value={draft.outcome} onChange={e => setDraft({...draft, outcome:e.target.value})} />
 
              {/* Tech stack */}
              <div>
                <label style={{ color:'rgba(255,255,255,.4)', fontSize:'11px', display:'block', marginBottom:'6px', fontFamily:"'Space Mono',monospace" }}>TECH STACK:</label>
                {draft.tech.map((t,i) => (
                  <div key={i} style={{ display:'flex', gap:'8px', marginBottom:'6px' }}>
                    <input style={inp} value={t} onChange={e => { const nt=[...draft.tech]; nt[i]=e.target.value; setDraft({...draft,tech:nt}); }} placeholder={`Technology ${i+1}`} />
                    <button onClick={() => setDraft({...draft, tech:draft.tech.filter((_,idx)=>idx!==i)})} style={{ background:'rgba(244,67,54,.2)', border:'none', borderRadius:'8px', color:'#f44336', padding:'0 14px', cursor:'pointer', fontSize:'16px', height:'42px', flexShrink:0 }}>✕</button>
                  </div>
                ))}
                <button onClick={() => setDraft({...draft, tech:[...draft.tech,'']})} style={{ background:'transparent', border:'1px solid rgba(212,160,23,.3)', color:'#D4A017', padding:'6px 14px', borderRadius:'8px', fontSize:'10px', cursor:'pointer' }}>+ Add Tech</button>
              </div>
 
              {/* Color */}
              <div>
                <label style={{ color:'rgba(255,255,255,.4)', fontSize:'11px', display:'block', marginBottom:'8px', fontFamily:"'Space Mono',monospace" }}>ACCENT COLOR:</label>
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                  {COLOR_OPTIONS.map(c => (
                    <div key={c} onClick={() => setDraft({...draft,color:c})} style={{ width:'28px', height:'28px', borderRadius:'50%', background:c, cursor:'pointer', border:`3px solid ${draft.color===c?'#fff':'transparent'}`, transition:'all .2s' }} />
                  ))}
                </div>
              </div>
 
              <div style={{ display:'flex', gap:'10px', marginTop:'8px' }}>
                <button onClick={saveCS} style={{ flex:2, background:'linear-gradient(135deg,#D4A017,#F5A623)', border:'none', borderRadius:'12px', padding:'13px', color:'#000', fontWeight:800, fontSize:'12px', cursor:'pointer', letterSpacing:'2px' }}>💾 SAVE</button>
                <button onClick={() => setShowEditModal(false)} style={{ flex:1, background:'transparent', border:'1px solid rgba(255,255,255,.1)', borderRadius:'12px', padding:'13px', color:'rgba(255,255,255,.4)', cursor:'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* ── DELETE CONFIRM ── */}
      {deleteConfirm && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.92)', backdropFilter:'blur(20px)', zIndex:10001, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={() => setDeleteConfirm(null)}>
          <div style={{ background:'#050510', border:'1px solid rgba(244,67,54,.3)', borderRadius:'24px', padding:'36px', maxWidth:'420px', width:'100%', textAlign:'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:'44px', marginBottom:'16px' }}>⚠️</div>
            <h3 style={{ color:'#fff', marginBottom:'12px' }}>Delete Case Study?</h3>
            <p style={{ color:'rgba(255,255,255,.4)', fontSize:'13px', marginBottom:'24px' }}>This cannot be undone.</p>
            <div style={{ display:'flex', gap:'12px' }}>
              <button onClick={() => deleteCS(deleteConfirm)} style={{ flex:1, padding:'12px', background:'#f44336', color:'#fff', border:'none', borderRadius:'12px', cursor:'pointer', fontWeight:700 }}>DELETE</button>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex:1, padding:'12px', background:'transparent', border:'1px solid rgba(255,255,255,.1)', borderRadius:'12px', color:'rgba(255,255,255,.4)', cursor:'pointer' }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
 
      {/* ── CTA EDIT MODAL ── */}
      {showCtaEdit && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.92)', backdropFilter:'blur(20px)', zIndex:10001, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={() => setShowCtaEdit(false)}>
          <div style={{ background:'#050510', border:'1px solid rgba(212,160,23,.25)', borderRadius:'24px', padding:'36px', maxWidth:'500px', width:'100%' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color:'#fff', fontSize:'20px', fontWeight:800, marginBottom:'24px' }}>✏ Edit CTA Section</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              <input style={inp} placeholder="Title" value={ctaDraft.title} onChange={e => setCtaDraft({...ctaDraft,title:e.target.value})} />
              <textarea style={{ ...inp, resize:'vertical' as const }} rows={3} placeholder="Description" value={ctaDraft.desc} onChange={e => setCtaDraft({...ctaDraft,desc:e.target.value})} />
              <input style={inp} placeholder="Button Text" value={ctaDraft.btnText} onChange={e => setCtaDraft({...ctaDraft,btnText:e.target.value})} />
              <div style={{ display:'flex', gap:'10px', marginTop:'8px' }}>
                <button onClick={saveCta} style={{ flex:1, background:'linear-gradient(135deg,#D4A017,#F5A623)', border:'none', borderRadius:'12px', padding:'13px', color:'#000', fontWeight:800, cursor:'pointer' }}>💾 SAVE</button>
                <button onClick={() => setShowCtaEdit(false)} style={{ flex:1, background:'transparent', border:'1px solid rgba(255,255,255,.1)', borderRadius:'12px', padding:'13px', color:'rgba(255,255,255,.4)', cursor:'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* ── EMAIL MODAL ── */}
      {emailModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.92)', backdropFilter:'blur(20px)', zIndex:10001, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={() => setEmailModal(null)}>
          <div style={{ background:'#050510', border:`1px solid ${emailModal.color}30`, borderRadius:'24px', padding:'36px', maxWidth:'440px', width:'100%' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize:'36px', marginBottom:'12px' }}>{emailModal.icon}</div>
            <h3 style={{ color:'#fff', fontSize:'18px', fontWeight:700, marginBottom:'6px' }}>Send to Email</h3>
            <p style={{ color:'rgba(255,255,255,.4)', fontSize:'12px', marginBottom:'20px' }}>{emailModal.title}</p>
            {success ? (
              <p style={{ color:'#2ECC40', textAlign:'center', padding:'20px', fontSize:'14px' }}>{success}</p>
            ) : (
              <>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name *" style={{ ...inp, marginBottom:'10px' }} />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address *" type="email" style={{ ...inp, marginBottom:'14px' }} />
                <p style={{ color:'rgba(255,255,255,.25)', fontSize:'10px', marginBottom:'16px' }}>By submitting, you agree to receive occasional updates from Together Prosperity.</p>
                <div style={{ display:'flex', gap:'10px' }}>
                  <button onClick={handleEmailSubmit} style={{ flex:1, background:`linear-gradient(135deg,${emailModal.color},${emailModal.color}cc)`, border:'none', borderRadius:'10px', padding:'12px', color:'#000', fontWeight:700, fontSize:'11px', cursor:'pointer', letterSpacing:'1.5px' }}>📧 SEND & DOWNLOAD</button>
                  <button onClick={() => setEmailModal(null)} style={{ background:'transparent', border:'1px solid rgba(255,255,255,.1)', borderRadius:'10px', padding:'12px 16px', color:'rgba(255,255,255,.4)', cursor:'pointer', fontSize:'13px' }}>✕</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}