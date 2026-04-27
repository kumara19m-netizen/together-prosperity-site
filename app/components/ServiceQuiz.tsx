'use client';
import { useState, useEffect } from 'react';
 
interface QuizOption { label: string; value: string; icon: string; }
interface Question { id: string; text: string; options: QuizOption[]; }
interface Result { id: string; service: string; icon: string; color: string; desc: string; features: string[]; }
interface QuizContent { sectionTag: string; title: string; desc: string; startBtn: string; }
 
const INIT_QUESTIONS: Question[] = [
  { id: '1', text: 'What best describes your organization?', options: [
    { label: 'Government / PSU', value: 'gov', icon: '🏛️' },
    { label: 'Enterprise / Corporate', value: 'enterprise', icon: '🏢' },
    { label: 'Agriculture / Farming', value: 'agri', icon: '🌾' },
    { label: 'Startup / SME', value: 'startup', icon: '🚀' },
  ]},
  { id: '2', text: 'What is your biggest challenge right now?', options: [
    { label: 'Data security & breaches', value: 'security', icon: '🔒' },
    { label: 'Manual & slow processes', value: 'manual', icon: '⚙️' },
    { label: 'Lack of real-time data', value: 'realtime', icon: '📡' },
    { label: 'Fraud & transparency issues', value: 'fraud', icon: '🔍' },
  ]},
  { id: '3', text: 'What is your primary goal?', options: [
    { label: 'Save costs & time', value: 'cost', icon: '💰' },
    { label: 'Increase transparency', value: 'transparency', icon: '👁️' },
    { label: 'Automate processes', value: 'automate', icon: '🤖' },
    { label: 'Protect infrastructure', value: 'protect', icon: '🛡️' },
  ]},
  { id: '4', text: 'What is your approximate team size?', options: [
    { label: 'Under 50 people', value: 'small', icon: '👥' },
    { label: '50–200 people', value: 'medium', icon: '🏗️' },
    { label: '200–1000 people', value: 'large', icon: '🏭' },
    { label: '1000+ people', value: 'enterprise', icon: '🌐' },
  ]},
  { id: '5', text: 'How soon do you need a solution?', options: [
    { label: 'Immediately (pilot ready)', value: 'now', icon: '⚡' },
    { label: 'Within 3 months', value: 'soon', icon: '📅' },
    { label: 'Within 6 months', value: 'medium', icon: '🗓️' },
    { label: 'Just exploring', value: 'exploring', icon: '🔭' },
  ]},
];
 
const INIT_RESULTS: Result[] = [
  { id: 'blockchain', service: 'Blockchain Infrastructure', icon: '⛓️', color: '#D4A017', desc: 'Your answers indicate you need immutable, transparent record-keeping. Our blockchain solutions eliminate fraud and manual errors permanently.', features: ['Tamper-proof records', 'Distributed ledger', 'Cryptographic verification', 'Audit trail'] },
  { id: 'cybersecurity', service: 'Cybersecurity', icon: '🔒', color: '#F5A623', desc: 'Your organization needs robust security. Our zero-trust architecture and real-time threat detection will protect your critical infrastructure.', features: ['Zero-trust architecture', 'Real-time threat detection', 'Penetration testing', '24/7 monitoring'] },
  { id: 'iot', service: 'IoT Solutions', icon: '📡', color: '#2196F3', desc: 'Real-time data is your need. Our IoT sensor networks provide live monitoring and predictive analytics for your operations.', features: ['Smart sensor networks', 'Real-time dashboards', 'Predictive maintenance', 'Edge computing'] },
  { id: 'aiml', service: 'AI & ML Solutions', icon: '🤖', color: '#2ECC40', desc: 'Automation and intelligence is the answer. Our ML models will transform your raw data into actionable business decisions.', features: ['Predictive analytics', 'Process automation', 'NLP & vision AI', 'Custom ML models'] },
  { id: 'govtech', service: 'Gov-tech Solutions', icon: '🏛️', color: '#2196F3', desc: 'As a government body, our Digital India aligned platforms will digitize your operations and serve citizens better.', features: ['Land record systems', 'Subsidy distribution', 'Citizen portals', 'Compliance ready'] },
  { id: 'smartcontracts', service: 'Smart Contracts', icon: '📜', color: '#D4A017', desc: 'Automate your agreements and procurement. Our secure smart contracts eliminate middlemen and reduce processing costs by 80%.', features: ['Auto-execution', 'Formal verification', 'Multi-sig support', 'Compliance checks'] },
];
 
const INIT_CONTENT: QuizContent = {
  sectionTag: 'FIND YOUR SOLUTION',
  title: 'Which TP Service Is Right for You?',
  desc: 'Answer 5 quick questions and get a personalized recommendation.',
  startBtn: 'START QUIZ →',
};
 
// Simple rule-based result engine
function getResult(answers: string[], results: Result[]): Result {
  const has = (v: string) => answers.includes(v);
  if (has('gov') || has('transparency') || has('fraud')) return results.find(r => r.id === 'govtech') || results[0];
  if (has('security') || has('protect')) return results.find(r => r.id === 'cybersecurity') || results[0];
  if (has('realtime') || has('agri')) return results.find(r => r.id === 'iot') || results[0];
  if (has('automate') || has('manual')) return results.find(r => r.id === 'aiml') || results[0];
  if (has('cost') && has('enterprise')) return results.find(r => r.id === 'smartcontracts') || results[0];
  return results.find(r => r.id === 'blockchain') || results[0];
}
 
const SK = { questions: 'tp_quiz_questions', results: 'tp_quiz_results', content: 'tp_quiz_content' };
const loadLS = <T,>(k: string, fb: T): T => { try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : fb; } catch { return fb; } };
const saveLS = (k: string, v: any) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
 
const COLORS = ['#D4A017', '#F5A623', '#2196F3', '#2ECC40', '#E91E63', '#9C27B0', '#FF5722', '#00BCD4'];
const ICONS = ['⛓️', '🔒', '📡', '🤖', '🏛️', '📜', '🚀', '💡', '🎯', '🔬', '⚡', '🌐', '🛡️', '💎', '🏆'];
 
export default function ServiceQuiz({ isAdmin = false }: { isAdmin?: boolean }) {
  const [questions, setQuestions] = useState<Question[]>(INIT_QUESTIONS);
  const [results, setResults] = useState<Result[]>(INIT_RESULTS);
  const [content, setContent] = useState<QuizContent>(INIT_CONTENT);
 
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
 
  // Admin modals
  const [showContentModal, setShowContentModal] = useState(false);
  const [showQModal, setShowQModal] = useState(false);
  const [showRModal, setShowRModal] = useState(false);
  const [contentDraft, setContentDraft] = useState<QuizContent>(INIT_CONTENT);
  const [qDraft, setQDraft] = useState<Question[]>(INIT_QUESTIONS);
  const [rDraft, setRDraft] = useState<Result[]>(INIT_RESULTS);
  const [editingQ, setEditingQ] = useState<Question | null>(null);
  const [editingR, setEditingR] = useState<Result | null>(null);
  const [qForm, setQForm] = useState<Question>({ id: '', text: '', options: [{ label: '', value: '', icon: '🎯' }] });
  const [rForm, setRForm] = useState<Result>({ id: '', service: '', icon: '⛓️', color: '#D4A017', desc: '', features: [''] });
  const [showQForm, setShowQForm] = useState(false);
  const [showRForm, setShowRForm] = useState(false);
 
  useEffect(() => {
    setQuestions(loadLS(SK.questions, INIT_QUESTIONS));
    setResults(loadLS(SK.results, INIT_RESULTS));
    setContent(loadLS(SK.content, INIT_CONTENT));
  }, []);
  useEffect(() => saveLS(SK.questions, questions), [questions]);
  useEffect(() => saveLS(SK.results, results), [results]);
  useEffect(() => saveLS(SK.content, content), [content]);
 
  const handleAnswer = (value: string) => {
    setSelected(value);
    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);
      setSelected(null);
      if (current < questions.length - 1) setCurrent(current + 1);
      else setResult(getResult(newAnswers, results));
    }, 350);
  };
 
  const reset = () => { setStarted(false); setCurrent(0); setAnswers([]); setResult(null); setSelected(null); };
  const progress = (current / questions.length) * 100;
 
  const inp = { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '10px', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' as const, fontFamily: "'Sora',sans-serif" };
 
  const openAddQ = () => { setEditingQ(null); setQForm({ id: crypto.randomUUID(), text: '', options: [{ label: '', value: '', icon: '🎯' }] }); setShowQForm(true); };
  const openEditQ = (q: Question) => { setEditingQ(q); setQForm({ ...q, options: q.options.map(o => ({ ...o })) }); setShowQForm(true); };
  const saveQ = () => {
    if (!qForm.text.trim()) return;
    if (editingQ) setQDraft(prev => prev.map(q => q.id === editingQ.id ? qForm : q));
    else setQDraft(prev => [...prev, qForm]);
    setShowQForm(false);
  };
 
  const openAddR = () => { setEditingR(null); setRForm({ id: crypto.randomUUID(), service: '', icon: '⛓️', color: '#D4A017', desc: '', features: [''] }); setShowRForm(true); };
  const openEditR = (r: Result) => { setEditingR(r); setRForm({ ...r, features: [...r.features] }); setShowRForm(true); };
  const saveR = () => {
    if (!rForm.service.trim()) return;
    if (editingR) setRDraft(prev => prev.map(r => r.id === editingR.id ? rForm : r));
    else setRDraft(prev => [...prev, rForm]);
    setShowRForm(false);
  };
 
  return (
    <>
      <style>{`
        @keyframes quizIn { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
        @keyframes resultIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        .quiz-card { animation: quizIn 0.35s ease; }
        .quiz-result { animation: resultIn 0.5s cubic-bezier(0.23,1,0.32,1); }
        .quiz-option { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:16px 20px; cursor:pointer; transition:all 0.25s; display:flex; align-items:center; gap:14px; width:100%; text-align:left; }
        .quiz-option:hover { border-color:rgba(212,160,23,0.4); background:rgba(212,160,23,0.05); transform:translateX(6px); }
        .quiz-option.selected { border-color:#D4A017; background:rgba(212,160,23,0.12); transform:translateX(6px); }
      `}</style>
 
      <section id="quiz" style={{ padding: '100px 60px', background: 'rgba(255,255,255,0.007)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ fontFamily: "'Space Mono',monospace", color: 'rgba(212,160,23,0.6)', fontSize: '8.5px', letterSpacing: '7px', marginBottom: '16px', display: 'block' }}>{content.sectionTag}</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, marginBottom: '14px' }}>{content.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>{content.desc}</p>
 
            {isAdmin && (
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '8px', color: 'rgba(212,160,23,.5)', letterSpacing: '2px', alignSelf: 'center' }}>🔐 ADMIN</span>
                <button onClick={() => { setContentDraft({ ...content }); setShowContentModal(true); }} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '5px 14px', borderRadius: '8px', fontSize: '9px', cursor: 'pointer', fontFamily: "'Space Mono',monospace" }}>✏ TEXT</button>
                <button onClick={() => { setQDraft([...questions]); setShowQModal(true); }} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '5px 14px', borderRadius: '8px', fontSize: '9px', cursor: 'pointer', fontFamily: "'Space Mono',monospace" }}>❓ QUESTIONS</button>
                <button onClick={() => { setRDraft([...results]); setShowRModal(true); }} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '5px 14px', borderRadius: '8px', fontSize: '9px', cursor: 'pointer', fontFamily: "'Space Mono',monospace" }}>🏆 RESULTS</button>
              </div>
            )}
          </div>
 
          {!started && !result && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '80px', marginBottom: '24px' }}>🎯</div>
              <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '28px', fontSize: '14px', lineHeight: 1.8 }}>Takes less than 60 seconds. No signup required. Get instant recommendation.</p>
              <button onClick={() => setStarted(true)} style={{ background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '50px', padding: '16px 40px', color: '#000', fontWeight: 900, fontSize: '13px', letterSpacing: '3px', cursor: 'pointer' }}>{content.startBtn}</button>
            </div>
          )}
 
          {started && !result && questions.length > 0 && (
            <div className="quiz-card" key={current}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', fontFamily: "'Space Mono',monospace" }}>Question {current + 1} of {questions.length}</span>
                <span style={{ color: '#D4A017', fontSize: '11px', fontFamily: "'Space Mono',monospace" }}>{Math.round(progress)}% complete</span>
              </div>
              <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', marginBottom: '32px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#D4A017,#F5A623)', borderRadius: '2px', transition: 'width 0.4s ease' }} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '24px', lineHeight: 1.3 }}>{questions[current].text}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {questions[current].options.map(opt => (
                  <button key={opt.value} className={`quiz-option${selected === opt.value ? ' selected' : ''}`} onClick={() => handleAnswer(opt.value)}>
                    <span style={{ fontSize: '24px', flexShrink: 0 }}>{opt.icon}</span>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', fontWeight: 600 }}>{opt.label}</span>
                    {selected === opt.value && <span style={{ marginLeft: 'auto', color: '#D4A017', fontSize: '18px' }}>✓</span>}
                  </button>
                ))}
              </div>
              {current > 0 && (
                <button onClick={() => { setCurrent(c => c - 1); setAnswers(a => a.slice(0, -1)); }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '12px', marginTop: '20px', textDecoration: 'underline' }}>← Back</button>
              )}
            </div>
          )}
 
          {result && (
            <div className="quiz-result" style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${result.color}30`, borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>{result.icon}</div>
              <div style={{ color: result.color, fontSize: '10px', letterSpacing: '4px', fontFamily: "'Space Mono',monospace", marginBottom: '12px' }}>RECOMMENDED FOR YOU</div>
              <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '16px', color: '#fff' }}>{result.service}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.9, marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>{result.desc}</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>
                {result.features.map(f => (
                  <span key={f} style={{ background: `${result.color}10`, border: `1px solid ${result.color}25`, color: result.color, padding: '6px 16px', borderRadius: '50px', fontSize: '11px', fontFamily: "'Space Mono',monospace" }}>{f}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#contact" style={{ background: `linear-gradient(135deg,${result.color},#F5A623)`, color: '#000', padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', fontWeight: 900, fontSize: '12px', letterSpacing: '2px' }}>BOOK A DEMO →</a>
                <button onClick={reset} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', padding: '14px 32px', borderRadius: '50px', cursor: 'pointer', fontSize: '12px', letterSpacing: '2px' }}>RETAKE QUIZ</button>
              </div>
            </div>
          )}
        </div>
      </section>
 
      {/* CONTENT MODAL */}
      {showContentModal && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(20px)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowContentModal(false)}>
          <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.25)', borderRadius: '24px', padding: '36px', maxWidth: '480px', width: '100%' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, marginBottom: '24px' }}>✏ Edit Quiz Text</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input style={inp} placeholder="Section Tag" value={contentDraft.sectionTag} onChange={e => setContentDraft({ ...contentDraft, sectionTag: e.target.value })} />
              <input style={inp} placeholder="Title" value={contentDraft.title} onChange={e => setContentDraft({ ...contentDraft, title: e.target.value })} />
              <input style={inp} placeholder="Description" value={contentDraft.desc} onChange={e => setContentDraft({ ...contentDraft, desc: e.target.value })} />
              <input style={inp} placeholder="Start Button Text" value={contentDraft.startBtn} onChange={e => setContentDraft({ ...contentDraft, startBtn: e.target.value })} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button onClick={() => { setContent(contentDraft); setShowContentModal(false); }} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '13px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>💾 SAVE</button>
                <button onClick={() => setShowContentModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '13px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* QUESTIONS MODAL */}
      {showQModal && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(20px)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowQModal(false)}>
          <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.25)', borderRadius: '24px', padding: '36px', maxWidth: '620px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 800 }}>❓ Edit Questions</h3>
              <button onClick={openAddQ} style={{ background: 'rgba(212,160,23,.1)', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '7px 16px', borderRadius: '8px', fontSize: '10px', cursor: 'pointer', fontFamily: "'Space Mono',monospace" }}>+ ADD</button>
            </div>
            {qDraft.map((q, qi) => (
              <div key={q.id} style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '12px', padding: '14px 18px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#D4A017', fontSize: '9px', fontFamily: "'Space Mono',monospace", marginBottom: '4px' }}>Q{qi + 1}</div>
                    <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{q.text}</div>
                    <div style={{ color: 'rgba(255,255,255,.4)', fontSize: '10px', marginTop: '4px' }}>{q.options.length} options</div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    <button onClick={() => openEditQ(q)} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.2)', color: '#D4A017', padding: '4px 10px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer' }}>✏</button>
                    <button onClick={() => setQDraft(prev => prev.filter(qq => qq.id !== q.id))} style={{ background: 'transparent', border: '1px solid rgba(244,67,54,.2)', color: '#f44336', padding: '4px 10px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer' }}>✕</button>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => { setQuestions(qDraft); setShowQModal(false); }} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '13px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>💾 SAVE ALL</button>
              <button onClick={() => setShowQModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '13px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
 
      {/* Q FORM */}
      {showQForm && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.95)', backdropFilter: 'blur(20px)', zIndex: 10002, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowQForm(false)}>
          <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.25)', borderRadius: '24px', padding: '36px', maxWidth: '540px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>{editingQ ? 'Edit Question' : 'Add Question'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input style={inp} placeholder="Question text *" value={qForm.text} onChange={e => setQForm({ ...qForm, text: e.target.value })} />
              <div style={{ color: 'rgba(255,255,255,.5)', fontSize: '11px', fontFamily: "'Space Mono',monospace", marginTop: '4px' }}>OPTIONS:</div>
              {qForm.options.map((opt, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 1fr auto', gap: '8px', alignItems: 'center' }}>
                  <select value={opt.icon} onChange={e => { const o = [...qForm.options]; o[i] = { ...o[i], icon: e.target.value }; setQForm({ ...qForm, options: o }); }} style={{ ...inp, padding: '8px', fontSize: '20px', textAlign: 'center' }}>
                    {['🏛️', '🏢', '🌾', '🚀', '🔒', '⚙️', '📡', '🔍', '💰', '👁️', '🤖', '🛡️', '👥', '🏗️', '🏭', '🌐', '⚡', '📅', '🗓️', '🔭'].map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                  <input style={inp} placeholder="Label" value={opt.label} onChange={e => { const o = [...qForm.options]; o[i] = { ...o[i], label: e.target.value }; setQForm({ ...qForm, options: o }); }} />
                  <input style={inp} placeholder="Value (unique key)" value={opt.value} onChange={e => { const o = [...qForm.options]; o[i] = { ...o[i], value: e.target.value }; setQForm({ ...qForm, options: o }); }} />
                  <button onClick={() => setQForm({ ...qForm, options: qForm.options.filter((_, idx) => idx !== i) })} style={{ background: 'rgba(244,67,54,.2)', border: 'none', borderRadius: '8px', color: '#f44336', width: '36px', height: '42px', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }}>✕</button>
                </div>
              ))}
              <button onClick={() => setQForm({ ...qForm, options: [...qForm.options, { label: '', value: '', icon: '🎯' }] })} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '7px', borderRadius: '8px', fontSize: '10px', cursor: 'pointer' }}>+ Add Option</button>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button onClick={saveQ} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '13px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>💾 SAVE</button>
                <button onClick={() => setShowQForm(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '13px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* RESULTS MODAL */}
      {showRModal && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(20px)', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowRModal(false)}>
          <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.25)', borderRadius: '24px', padding: '36px', maxWidth: '620px', width: '100%', maxHeight: '85vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 800 }}>🏆 Edit Results</h3>
              <button onClick={openAddR} style={{ background: 'rgba(212,160,23,.1)', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '7px 16px', borderRadius: '8px', fontSize: '10px', cursor: 'pointer', fontFamily: "'Space Mono',monospace" }}>+ ADD</button>
            </div>
            {rDraft.map(r => (
              <div key={r.id} style={{ background: 'rgba(255,255,255,.03)', border: `1px solid ${r.color}20`, borderRadius: '12px', padding: '14px 18px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '24px' }}>{r.icon}</span>
                  <div>
                    <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{r.service}</div>
                    <div style={{ color: r.color, fontSize: '9px', fontFamily: "'Space Mono',monospace", marginTop: '2px' }}>{r.id}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEditR(r)} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.2)', color: '#D4A017', padding: '4px 10px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer' }}>✏</button>
                  <button onClick={() => setRDraft(prev => prev.filter(rr => rr.id !== r.id))} style={{ background: 'transparent', border: '1px solid rgba(244,67,54,.2)', color: '#f44336', padding: '4px 10px', borderRadius: '6px', fontSize: '9px', cursor: 'pointer' }}>✕</button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => { setResults(rDraft); setShowRModal(false); }} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '13px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>💾 SAVE ALL</button>
              <button onClick={() => setShowRModal(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '13px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
            </div>
          </div>
        </div>
      )}
 
      {/* RESULT FORM */}
      {showRForm && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.95)', backdropFilter: 'blur(20px)', zIndex: 10002, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowRForm(false)}>
          <div style={{ background: '#050510', border: '1px solid rgba(212,160,23,.25)', borderRadius: '24px', padding: '36px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#fff', fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>{editingR ? 'Edit Result' : 'Add Result'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '10px' }}>
                <select value={rForm.icon} onChange={e => setRForm({ ...rForm, icon: e.target.value })} style={{ ...inp, padding: '8px', fontSize: '22px', textAlign: 'center' }}>
                  {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                </select>
                <input style={inp} placeholder="Service Name *" value={rForm.service} onChange={e => setRForm({ ...rForm, service: e.target.value })} />
              </div>
              <input style={inp} placeholder="Result ID (unique, e.g. blockchain)" value={rForm.id} onChange={e => setRForm({ ...rForm, id: e.target.value })} />
              <textarea style={{ ...inp, resize: 'vertical' as const }} rows={3} placeholder="Description" value={rForm.desc} onChange={e => setRForm({ ...rForm, desc: e.target.value })} />
              <div>
                <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace" }}>COLOR:</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {COLORS.map(c => <div key={c} onClick={() => setRForm({ ...rForm, color: c })} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, cursor: 'pointer', border: `3px solid ${rForm.color === c ? '#fff' : 'transparent'}`, transition: 'all .2s' }} />)}
                </div>
              </div>
              <div>
                <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace" }}>FEATURES:</label>
                {rForm.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                    <input style={inp} value={f} onChange={e => { const nf = [...rForm.features]; nf[i] = e.target.value; setRForm({ ...rForm, features: nf }); }} placeholder={`Feature ${i + 1}`} />
                    <button onClick={() => setRForm({ ...rForm, features: rForm.features.filter((_, idx) => idx !== i) })} style={{ background: 'rgba(244,67,54,.2)', border: 'none', borderRadius: '8px', color: '#f44336', width: '40px', cursor: 'pointer', flexShrink: 0 }}>✕</button>
                  </div>
                ))}
                <button onClick={() => setRForm({ ...rForm, features: [...rForm.features, ''] })} style={{ background: 'transparent', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '6px 14px', borderRadius: '8px', fontSize: '10px', cursor: 'pointer' }}>+ Add Feature</button>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button onClick={saveR} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '13px', color: '#000', fontWeight: 800, cursor: 'pointer' }}>💾 SAVE</button>
                <button onClick={() => setShowRForm(false)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '13px', color: 'rgba(255,255,255,.4)', cursor: 'pointer' }}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}