'use client';
import { useState, useEffect } from 'react';
 
interface ServiceOption {
  id: string;
  label: string;
  savingFactor: number;
  timeReduction: number;
}
 
interface ROIContent {
  sectionTag: string;
  title: string;
  desc: string;
  ctaText: string;
  roiMonths: string;
}
 
const INIT_SERVICES: ServiceOption[] = [
  { id: 'blockchain', label: 'Blockchain / Land Records', savingFactor: 0.75, timeReduction: 0.80 },
  { id: 'cybersecurity', label: 'Cybersecurity', savingFactor: 0.60, timeReduction: 0.65 },
  { id: 'iot', label: 'IoT / Agriculture', savingFactor: 0.55, timeReduction: 0.70 },
  { id: 'aiml', label: 'AI & ML Solutions', savingFactor: 0.65, timeReduction: 0.75 },
  { id: 'govtech', label: 'Gov-tech Solutions', savingFactor: 0.70, timeReduction: 0.80 },
  { id: 'smartcontracts', label: 'Smart Contracts', savingFactor: 0.60, timeReduction: 0.70 },
];
 
const INIT_CONTENT: ROIContent = {
  sectionTag: 'ROI CALCULATOR',
  title: 'How Much Will You Save?',
  desc: "Calculate your potential savings with Together Prosperity's solutions.",
  ctaText: 'BOOK FREE DEMO →',
  roiMonths: '3-6 months',
};
 
const SK = { services: 'tp_roi_services', content: 'tp_roi_content' };
const loadLS = <T,>(k: string, fb: T): T => { try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : fb; } catch { return fb; } };
const saveLS = (k: string, v: any) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
 
export default function ROICalculator({ isAdmin = false }: { isAdmin?: boolean }) {
  const [services, setServices] = useState<ServiceOption[]>(INIT_SERVICES);
  const [content, setContent] = useState<ROIContent>(INIT_CONTENT);
  const [inputs, setInputs] = useState({ teamSize: 10, manualHours: 40, avgSalary: 50000, errorRate: 15, service: 'blockchain' });
  const [showResult, setShowResult] = useState(false);
 
  // Admin modals
  const [showContentModal, setShowContentModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [contentDraft, setContentDraft] = useState<ROIContent>(INIT_CONTENT);
  const [servicesDraft, setServicesDraft] = useState<ServiceOption[]>(INIT_SERVICES);
  const [editingSvc, setEditingSvc] = useState<ServiceOption | null>(null);
  const [svcDraft, setSvcDraft] = useState<ServiceOption>({ id: '', label: '', savingFactor: 0.65, timeReduction: 0.70 });
  const [showSvcEdit, setShowSvcEdit] = useState(false);
 
  useEffect(() => {
    setServices(loadLS(SK.services, INIT_SERVICES));
    setContent(loadLS(SK.content, INIT_CONTENT));
  }, []);
 
  useEffect(() => saveLS(SK.services, services), [services]);
  useEffect(() => saveLS(SK.content, content), [content]);
 
  const service = services.find(s => s.id === inputs.service) || services[0];
  const monthlyLaborCost = inputs.teamSize * inputs.avgSalary;
  const errorCost = (monthlyLaborCost * inputs.errorRate / 100) * 2;
  const totalCurrentCost = monthlyLaborCost + errorCost;
  const savedLaborCost = monthlyLaborCost * (service?.savingFactor || 0.65);
  const savedErrorCost = errorCost * 0.95;
  const totalSavings = savedLaborCost + savedErrorCost;
  const hoursSaved = inputs.manualHours * inputs.teamSize * (service?.timeReduction || 0.70);
  const annualSavings = totalSavings * 12;
  const fmt = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
 
  const saveContent = () => { setContent(contentDraft); setShowContentModal(false); };
  const saveServices = () => { setServices(servicesDraft); setShowServicesModal(false); };
  const openAddSvc = () => { setEditingSvc(null); setSvcDraft({ id: crypto.randomUUID(), label: '', savingFactor: 0.65, timeReduction: 0.70 }); setShowSvcEdit(true); };
  const openEditSvc = (s: ServiceOption) => { setEditingSvc(s); setSvcDraft({ ...s }); setShowSvcEdit(true); };
  const saveSvc = () => {
    if (!svcDraft.label.trim()) return;
    if (editingSvc) setServicesDraft(prev => prev.map(s => s.id === editingSvc.id ? svcDraft : s));
    else setServicesDraft(prev => [...prev, svcDraft]);
    setShowSvcEdit(false);
  };
  const deleteSvc = (id: string) => setServicesDraft(prev => prev.filter(s => s.id !== id));
 
  const inp = { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' as const, fontFamily: "'Sora',sans-serif" };
 
  return (
    <>
      <style>{`
        @keyframes roiCount { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .roi-result { animation: roiCount 0.5s ease; }
        .roi-slider { -webkit-appearance:none; width:100%; height:4px; border-radius:2px; background:rgba(212,160,23,0.2); outline:none; }
        .roi-slider::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:linear-gradient(135deg,#D4A017,#F5A623); cursor:pointer; box-shadow:0 0 8px rgba(212,160,23,0.4); }
        .roi-select { width:100%; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:12px 16px; color:#fff; font-size:13px; outline:none; cursor:pointer; }
        .roi-select option { background:#050510; }
        .roi-card { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:16px; padding:20px; }
        .roi-highlight { background:rgba(212,160,23,0.06); border:1px solid rgba(212,160,23,0.2); border-radius:16px; padding:20px; }
      `}</style>
 
      <section id="roi" style={{ padding: '100px 60px', background: 'transparent', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontFamily: "'Space Mono',monospace", color: 'rgba(212,160,23,0.6)', fontSize: '8.5px', letterSpacing: '7px', marginBottom: '16px', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>{content.sectionTag}</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, marginBottom: '14px' }}>{content.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>{content.desc}</p>
 
            {/* Admin toolbar */}
            {isAdmin && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '8px', color: 'rgba(212,160,23,.5)', letterSpacing: '2px', alignSelf: 'center' }}>🔐 ADMIN</span>
                <button onClick={() => { setContentDraft({ ...content }); setShowContentModal(true); }} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '5px 14px', borderRadius: '8px', fontSize: '9px', cursor: 'pointer', fontFamily: "'Space Mono',monospace" }}>✏ EDIT TEXT</button>
                <button onClick={() => { setServicesDraft([...services]); setShowServicesModal(true); }} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '5px 14px', borderRadius: '8px', fontSize: '9px', cursor: 'pointer', fontFamily: "'Space Mono',monospace" }}>⚙ EDIT SERVICES</button>
              </div>
            )}
          </div>
 
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="roi-card">
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '3px', marginBottom: '16px', fontFamily: "'Space Mono',monospace" }}>SELECT SERVICE</label>
                <select className="roi-select" value={inputs.service} onChange={e => { setInputs({ ...inputs, service: e.target.value }); setShowResult(false); }}>
                  {services.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              {[
                { key: 'teamSize', label: 'Team Size', min: 2, max: 500, step: 1, unit: 'people', value: inputs.teamSize },
                { key: 'manualHours', label: 'Manual Hours / Person / Week', min: 5, max: 80, step: 5, unit: 'hrs/week', value: inputs.manualHours },
                { key: 'avgSalary', label: 'Avg Monthly Salary', min: 15000, max: 500000, step: 5000, unit: '₹/month', value: inputs.avgSalary },
                { key: 'errorRate', label: 'Current Error / Rework Rate', min: 1, max: 50, step: 1, unit: '%', value: inputs.errorRate },
              ].map(item => (
                <div key={item.key} className="roi-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <label style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '2px', fontFamily: "'Space Mono',monospace" }}>{item.label}</label>
                    <span style={{ color: '#D4A017', fontWeight: 700, fontSize: '14px', fontFamily: "'Space Mono',monospace" }}>
                      {item.key === 'avgSalary' ? fmt(item.value) : item.value + ' ' + item.unit}
                    </span>
                  </div>
                  <input type="range" className="roi-slider" min={item.min} max={item.max} step={item.step} value={item.value}
                    onChange={e => { setInputs({ ...inputs, [item.key]: Number(e.target.value) }); setShowResult(false); }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>{item.key === 'avgSalary' ? fmt(item.min) : item.min}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>{item.key === 'avgSalary' ? fmt(item.max) : item.max}</span>
                  </div>
                </div>
              ))}
              <button onClick={() => setShowResult(true)} style={{ background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '14px', padding: '16px', color: '#000', fontWeight: 900, fontSize: '13px', letterSpacing: '2px', cursor: 'pointer', transition: 'all 0.3s' }}>
                CALCULATE MY SAVINGS →
              </button>
            </div>
 
            {/* Results */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {showResult ? (
                <div className="roi-result" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="roi-highlight">
                    <div style={{ color: 'rgba(212,160,23,0.6)', fontSize: '9px', letterSpacing: '4px', fontFamily: "'Space Mono',monospace", marginBottom: '8px' }}>ANNUAL SAVINGS POTENTIAL</div>
                    <div style={{ fontSize: '42px', fontWeight: 900, color: '#D4A017', fontFamily: "'Space Mono',monospace", lineHeight: 1 }}>{fmt(annualSavings)}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '8px' }}>per year with {service?.label}</div>
                  </div>
                  {[
                    { label: 'Monthly Labor Savings', value: fmt(savedLaborCost), color: '#2ECC40', icon: '💰' },
                    { label: 'Error Cost Reduction', value: fmt(savedErrorCost), color: '#2196F3', icon: '🎯' },
                    { label: 'Hours Saved / Month', value: Math.round(hoursSaved * 4) + ' hrs', color: '#F5A623', icon: '⏰' },
                    { label: 'Current Monthly Cost', value: fmt(totalCurrentCost), color: 'rgba(255,255,255,0.3)', icon: '📊' },
                    { label: 'ROI Within', value: content.roiMonths, color: '#D4A017', icon: '📈' },
                  ].map(item => (
                    <div key={item.label} className="roi-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ fontSize: '20px' }}>{item.icon}</span>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{item.label}</span>
                      </div>
                      <span style={{ color: item.color, fontWeight: 700, fontSize: '15px', fontFamily: "'Space Mono',monospace" }}>{item.value}</span>
                    </div>
                  ))}
                  <div className="roi-card" style={{ textAlign: 'center' }}>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '12px' }}>Ready to achieve these savings?</div>
                    <a href="#contact" style={{ background: 'linear-gradient(135deg,#D4A017,#F5A623)', color: '#000', padding: '12px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: 800, fontSize: '11px', letterSpacing: '2px', display: 'inline-block' }}>{content.ctaText}</a>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', opacity: 0.4 }}>
                  <div style={{ fontSize: '80px' }}>📊</div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: '14px' }}>Adjust the sliders and click calculate to see your potential savings</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
 
      {/* ── CONTENT MODAL ── */}
      {showContentModal && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(20px)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowContentModal(false)}>
          <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.25)', borderRadius: '24px', padding: '36px', maxWidth: '500px', width: '100%' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, marginBottom: '24px' }}>✏ Edit ROI Calculator Text</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input style={inp} placeholder="Section Tag" value={contentDraft.sectionTag} onChange={e => setContentDraft({ ...contentDraft, sectionTag: e.target.value })} />
              <input style={inp} placeholder="Title" value={contentDraft.title} onChange={e => setContentDraft({ ...contentDraft, title: e.target.value })} />
              <textarea style={{ ...inp, resize: 'vertical' as const }} rows={2} placeholder="Description" value={contentDraft.desc} onChange={e => setContentDraft({ ...contentDraft, desc: e.target.value })} />
              <input style={inp} placeholder="CTA Button Text" value={contentDraft.ctaText} onChange={e => setContentDraft({ ...contentDraft, ctaText: e.target.value })} />
              <input style={inp} placeholder="ROI Timeline (e.g. 3-6 months)" value={contentDraft.roiMonths} onChange={e => setContentDraft({ ...contentDraft, roiMonths: e.target.value })} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button onClick={saveContent} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '13px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>💾 SAVE</button>
                <button onClick={() => setShowContentModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '13px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* ── SERVICES MODAL ── */}
      {showServicesModal && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(20px)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowServicesModal(false)}>
          <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.25)', borderRadius: '24px', padding: '36px', maxWidth: '620px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 800 }}>⚙ Edit ROI Services</h3>
              <button onClick={openAddSvc} style={{ background: 'rgba(212,160,23,.1)', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '7px 16px', borderRadius: '8px', fontSize: '10px', cursor: 'pointer', fontFamily: "'Space Mono',monospace" }}>+ ADD</button>
            </div>
            {servicesDraft.map(s => (
              <div key={s.id} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '12px', padding: '14px 18px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px' }}>{s.label}</div>
                  <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '10px', marginTop: '4px', fontFamily: "'Space Mono',monospace" }}>Saving: {Math.round(s.savingFactor * 100)}% · Time: {Math.round(s.timeReduction * 100)}%</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => openEditSvc(s)} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.2)', color: '#D4A017', padding: '4px 10px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer' }}>✏</button>
                  <button onClick={() => deleteSvc(s.id)} style={{ background: 'transparent', border: '1px solid rgba(244,67,54,.2)', color: '#f44336', padding: '4px 10px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer' }}>✕</button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={saveServices} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '13px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>💾 SAVE ALL</button>
              <button onClick={() => setShowServicesModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '13px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
 
      {/* ── SERVICE EDIT MODAL ── */}
      {showSvcEdit && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.95)', backdropFilter: 'blur(20px)', zIndex: 10002, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowSvcEdit(false)}>
          <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.25)', borderRadius: '24px', padding: '36px', maxWidth: '460px', width: '100%' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>{editingSvc ? 'Edit Service' : 'Add Service'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input style={inp} placeholder="Service Label *" value={svcDraft.label} onChange={e => setSvcDraft({ ...svcDraft, label: e.target.value })} />
              <div>
                <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '10px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace" }}>SAVING FACTOR: {Math.round(svcDraft.savingFactor * 100)}%</label>
                <input type="range" className="roi-slider" min={10} max={90} step={5} value={Math.round(svcDraft.savingFactor * 100)} onChange={e => setSvcDraft({ ...svcDraft, savingFactor: Number(e.target.value) / 100 })} />
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '10px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace" }}>TIME REDUCTION: {Math.round(svcDraft.timeReduction * 100)}%</label>
                <input type="range" className="roi-slider" min={10} max={95} step={5} value={Math.round(svcDraft.timeReduction * 100)} onChange={e => setSvcDraft({ ...svcDraft, timeReduction: Number(e.target.value) / 100 })} />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button onClick={saveSvc} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '13px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>💾 SAVE</button>
                <button onClick={() => setShowSvcEdit(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '13px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}