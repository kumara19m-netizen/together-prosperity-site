'use client';
import { useState } from 'react';

interface ProposalData {
  clientName: string;
  clientOrg: string;
  clientEmail: string;
  services: string[];
  budget: string;
  timeline: string;
  problem: string;
  goals: string;
}

const SERVICES = [
  'Blockchain Infrastructure',
  'Cybersecurity',
  'Internet of Things',
  'AIML Solutions',
  'Smart Contracts & Security',
  'Gov-tech Solutions',
];

const BUDGETS = ['₹5L – ₹15L', '₹15L – ₹50L', '₹50L – ₹1Cr', '₹1Cr+', 'To be discussed'];
const TIMELINES = ['1 Month', '3 Months', '6 Months', '12 Months', 'Flexible'];

export default function ProposalGenerator() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState('');
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState<ProposalData>({
    clientName: '', clientOrg: '', clientEmail: '',
    services: [], budget: '', timeline: '', problem: '', goals: '',
  });

  const toggleService = (s: string) =>
    setData(prev => ({
      ...prev,
      services: prev.services.includes(s) ? prev.services.filter(x => x !== s) : [...prev.services, s],
    }));

  const generateProposal = async () => {
    if (!data.clientName || !data.clientOrg || data.services.length === 0) return;
    setLoading(true);
    setStep(3);
    try {
      const prompt = `You are a senior business consultant at Together Prosperity Private Limited, a blockchain, cybersecurity, IoT, and AI/ML company based in Karnataka, India.

Write a professional, detailed business proposal for the following client:

Client: ${data.clientName}
Organization: ${data.clientOrg}
Services Requested: ${data.services.join(', ')}
Budget Range: ${data.budget}
Timeline: ${data.timeline}
Problem Statement: ${data.problem || 'Digital transformation and technology modernization'}
Goals: ${data.goals || 'Improve efficiency, security, and transparency'}

Write a complete proposal with these sections:
1. Executive Summary (2-3 paragraphs, warm and professional)
2. Understanding Your Needs (reference their specific problem)
3. Our Proposed Solution (detailed for each service requested)
4. Why Together Prosperity (mention our Karnataka roots, government experience, pilot program)
5. Implementation Roadmap (phases with timeline)
6. Investment Summary (reference the budget range, mention ₹0 pilot option)
7. Next Steps (clear call to action)

Use professional Indian business English. Include relevant statistics and case study references where appropriate. Keep the tone confident and trustworthy. Format with clear headers using ### for sections.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const result = await response.json();
      const text = result.content?.map((c: any) => c.text || '').join('') || '';
      setProposal(text);
    } catch {
      setProposal('Unable to generate proposal at this time. Please ensure your API key is configured and try again.');
    }
    setLoading(false);
  };

  const copyProposal = () => {
    navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadProposal = () => {
    const header = `TOGETHER PROSPERITY PRIVATE LIMITED
Business Proposal
Prepared for: ${data.clientName} | ${data.clientOrg}
Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
Contact: contact@togetherprosperity.com | +91 98456 18859
CIN: U72900KA2026PTC12345
${'='.repeat(60)}

`;
    const blob = new Blob([header + proposal], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TP_Proposal_${data.clientOrg.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inp = { width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '11px', padding: '12px 16px', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' as const, fontFamily: "'Sora',sans-serif" };
  const steps = ['Client Details', 'Services & Goals', 'Review & Generate', 'Your Proposal'];

  return (
    <section id="proposal" style={{ padding: '100px 60px', background: 'rgba(212,160,23,.018)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ fontFamily: "'Space Mono',monospace", color: 'rgba(212,160,23,.7)', fontSize: '8.5px', letterSpacing: '7px', display: 'block', marginBottom: '12px', fontWeight: 700 }}>AI-POWERED TOOL</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>Proposal Generator</h2>
          <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>Generate a professional, branded business proposal in under 60 seconds using AI.</p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '0', justifyContent: 'center', marginBottom: '40px' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: i <= step ? 'linear-gradient(135deg,#D4A017,#F5A623)' : 'rgba(255,255,255,.06)', border: `2px solid ${i <= step ? '#D4A017' : 'rgba(255,255,255,.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: i <= step ? '#000' : 'rgba(255,255,255,.3)', fontWeight: 700, fontSize: '13px', transition: 'all .3s' }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '9px', color: i <= step ? '#D4A017' : 'rgba(255,255,255,.3)', fontFamily: "'Space Mono',monospace", letterSpacing: '1px', whiteSpace: 'nowrap' }}>{s.toUpperCase()}</span>
              </div>
              {i < steps.length - 1 && <div style={{ width: '60px', height: '2px', background: i < step ? '#D4A017' : 'rgba(255,255,255,.06)', margin: '0 4px', marginBottom: '24px', transition: 'background .3s' }} />}
            </div>
          ))}
        </div>

        {/* Card container */}
        <div style={{ background: 'rgba(255,255,255,.018)', border: '1px solid rgba(212,160,23,.15)', borderRadius: '24px', padding: '40px' }}>

          {/* STEP 0: Client Details */}
          {step === 0 && (
            <div>
              <h3 style={{ color: '#D4A017', fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>👤 Client Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px' }}>CONTACT NAME *</label>
                    <input style={inp} placeholder="e.g. Rajesh Kumar" value={data.clientName} onChange={e => setData({ ...data, clientName: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px' }}>ORGANIZATION *</label>
                    <input style={inp} placeholder="e.g. Karnataka e-Governance" value={data.clientOrg} onChange={e => setData({ ...data, clientOrg: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px' }}>EMAIL (FOR PROPOSAL DELIVERY)</label>
                  <input style={inp} type="email" placeholder="e.g. rajesh@karnataka.gov.in" value={data.clientEmail} onChange={e => setData({ ...data, clientEmail: e.target.value })} />
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px' }}>PROBLEM / CHALLENGE</label>
                  <textarea style={{ ...inp, resize: 'vertical' as const }} rows={3} placeholder="Describe the main problem or challenge your organization faces..." value={data.problem} onChange={e => setData({ ...data, problem: e.target.value })} />
                </div>
                <button onClick={() => { if (data.clientName && data.clientOrg) setStep(1); }} style={{ background: data.clientName && data.clientOrg ? 'linear-gradient(135deg,#D4A017,#F5A623)' : 'rgba(255,255,255,.06)', border: 'none', borderRadius: '12px', padding: '14px', color: data.clientName && data.clientOrg ? '#000' : 'rgba(255,255,255,.3)', fontWeight: 800, fontSize: '12px', cursor: data.clientName && data.clientOrg ? 'pointer' : 'not-allowed', letterSpacing: '2px', transition: 'all .3s' }}>
                  NEXT: SERVICES & GOALS →
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: Services */}
          {step === 1 && (
            <div>
              <h3 style={{ color: '#D4A017', fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>⚙️ Services & Requirements</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', display: 'block', marginBottom: '12px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px' }}>SELECT SERVICES * (choose all that apply)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {SERVICES.map(s => (
                      <label key={s} style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', background: data.services.includes(s) ? 'rgba(212,160,23,.1)' : 'rgba(255,255,255,.03)', border: `1px solid ${data.services.includes(s) ? 'rgba(212,160,23,.4)' : 'rgba(255,255,255,.06)'}`, borderRadius: '10px', padding: '12px 14px', transition: 'all .2s' }}>
                        <input type="checkbox" checked={data.services.includes(s)} onChange={() => toggleService(s)} style={{ accentColor: '#D4A017' }} />
                        <span style={{ color: data.services.includes(s) ? '#D4A017' : 'rgba(255,255,255,.6)', fontSize: '12px', fontWeight: data.services.includes(s) ? 600 : 400 }}>{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px' }}>BUDGET RANGE</label>
                    <select style={inp} value={data.budget} onChange={e => setData({ ...data, budget: e.target.value })}>
                      <option value="">Select budget...</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px' }}>TIMELINE</label>
                    <select style={inp} value={data.timeline} onChange={e => setData({ ...data, timeline: e.target.value })}>
                      <option value="">Select timeline...</option>
                      {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,.4)', fontSize: '11px', display: 'block', marginBottom: '6px', fontFamily: "'Space Mono',monospace", letterSpacing: '2px' }}>KEY GOALS</label>
                  <textarea style={{ ...inp, resize: 'vertical' as const }} rows={2} placeholder="e.g. Reduce fraud, improve transparency, automate processes..." value={data.goals} onChange={e => setData({ ...data, goals: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setStep(0)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '14px', color: 'rgba(255,255,255,.4)', cursor: 'pointer', fontSize: '12px' }}>← BACK</button>
                  <button onClick={() => { if (data.services.length > 0) setStep(2); }} style={{ flex: 2, background: data.services.length > 0 ? 'linear-gradient(135deg,#D4A017,#F5A623)' : 'rgba(255,255,255,.06)', border: 'none', borderRadius: '12px', padding: '14px', color: data.services.length > 0 ? '#000' : 'rgba(255,255,255,.3)', fontWeight: 800, fontSize: '12px', cursor: data.services.length > 0 ? 'pointer' : 'not-allowed', letterSpacing: '2px' }}>NEXT: REVIEW →</button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Review */}
          {step === 2 && (
            <div>
              <h3 style={{ color: '#D4A017', fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>📋 Review & Generate</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {[
                  { label: '👤 Client', val: `${data.clientName} — ${data.clientOrg}` },
                  { label: '⚙️ Services', val: data.services.join(', ') },
                  { label: '💰 Budget', val: data.budget || 'Not specified' },
                  { label: '⏱️ Timeline', val: data.timeline || 'Not specified' },
                  { label: '🎯 Goals', val: data.goals || 'Digital transformation' },
                ].map(({ label, val }) => (
                  <div key={label} style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,.03)', borderRadius: '10px', padding: '14px 16px' }}>
                    <span style={{ color: 'rgba(255,255,255,.3)', fontSize: '12px', minWidth: '100px', fontFamily: "'Space Mono',monospace", fontSize: '10px' }}>{label}</span>
                    <span style={{ color: '#fff', fontSize: '13px', fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(212,160,23,.06)', border: '1px solid rgba(212,160,23,.2)', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                <p style={{ color: 'rgba(212,160,23,.8)', fontSize: '12px', lineHeight: 1.7 }}>🤖 Our AI will generate a complete, professional proposal with Executive Summary, Solution Design, Implementation Roadmap, and Investment Summary — branded for Together Prosperity.</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '12px', padding: '14px', color: 'rgba(255,255,255,.4)', cursor: 'pointer', fontSize: '12px' }}>← BACK</button>
                <button onClick={generateProposal} style={{ flex: 2, background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '12px', padding: '14px', color: '#000', fontWeight: 800, fontSize: '12px', cursor: 'pointer', letterSpacing: '2px' }}>🚀 GENERATE PROPOSAL</button>
              </div>
            </div>
          )}

          {/* STEP 3: Output */}
          {step === 3 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ color: '#D4A017', fontSize: '18px', fontWeight: 700 }}>📄 Your Proposal</h3>
                {!loading && proposal && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={copyProposal} style={{ background: 'rgba(212,160,23,.1)', border: '1px solid rgba(212,160,23,.3)', color: '#D4A017', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>
                      {copied ? '✅ COPIED!' : '📋 COPY'}
                    </button>
                    <button onClick={downloadProposal} style={{ background: 'linear-gradient(135deg,#D4A017,#F5A623)', border: 'none', borderRadius: '8px', padding: '8px 16px', color: '#000', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>⬇️ DOWNLOAD</button>
                    <button onClick={() => { setStep(0); setProposal(''); setData({ clientName: '', clientOrg: '', clientEmail: '', services: [], budget: '', timeline: '', problem: '', goals: '' }); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,.1)', borderRadius: '8px', padding: '8px 14px', color: 'rgba(255,255,255,.4)', cursor: 'pointer', fontSize: '11px' }}>🔄 NEW</button>
                  </div>
                )}
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'spin 1s linear infinite' }}>⚙️</div>
                  <p style={{ color: 'rgba(212,160,23,.8)', fontSize: '14px', fontFamily: "'Space Mono',monospace" }}>Generating your proposal...</p>
                  <p style={{ color: 'rgba(255,255,255,.3)', fontSize: '11px', marginTop: '8px' }}>This takes 10–20 seconds</p>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </div>
              ) : (
                <div style={{ background: 'rgba(0,0,0,.3)', borderRadius: '12px', padding: '24px', maxHeight: '500px', overflowY: 'auto', border: '1px solid rgba(255,255,255,.06)' }}>
                  {/* Branded header */}
                  <div style={{ borderBottom: '1px solid rgba(212,160,23,.2)', paddingBottom: '16px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <div style={{ color: '#D4A017', fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: '13px', letterSpacing: '3px' }}>TOGETHER PROSPERITY</div>
                        <div style={{ color: '#2196F3', fontFamily: "'Space Mono',monospace", fontSize: '9px', letterSpacing: '4px' }}>PRIVATE LIMITED</div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '10px', color: 'rgba(255,255,255,.3)', fontFamily: "'Space Mono',monospace" }}>
                        <div>PROPOSAL FOR: {data.clientOrg.toUpperCase()}</div>
                        <div>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ color: 'rgba(255,255,255,.8)', fontSize: '13px', lineHeight: 2, whiteSpace: 'pre-wrap' }}>
                    {proposal.split('\n').map((line, i) => {
                      if (line.startsWith('### ')) return <h3 key={i} style={{ color: '#D4A017', fontSize: '15px', fontWeight: 700, margin: '20px 0 8px', fontFamily: "'Space Mono',monospace", letterSpacing: '1px' }}>{line.slice(4)}</h3>;
                      if (line.startsWith('## ')) return <h2 key={i} style={{ color: '#fff', fontSize: '18px', fontWeight: 800, margin: '24px 0 10px' }}>{line.slice(3)}</h2>;
                      if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>{line.slice(2, -2)}</strong>;
                      if (line.trim().startsWith('- ')) return <div key={i} style={{ paddingLeft: '16px', color: 'rgba(255,255,255,.6)', marginBottom: '4px' }}>• {line.slice(2)}</div>;
                      return <p key={i} style={{ marginBottom: '8px', color: 'rgba(255,255,255,.7)' }}>{line}</p>;
                    })}
                  </div>

                  {/* Footer */}
                  <div style={{ borderTop: '1px solid rgba(212,160,23,.15)', paddingTop: '16px', marginTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ color: 'rgba(255,255,255,.3)', fontSize: '10px', fontFamily: "'Space Mono',monospace" }}>contact@togetherprosperity.com</span>
                    <span style={{ color: 'rgba(255,255,255,.3)', fontSize: '10px', fontFamily: "'Space Mono',monospace" }}>+91 98456 18859</span>
                    <span style={{ color: 'rgba(255,255,255,.3)', fontSize: '10px', fontFamily: "'Space Mono',monospace" }}>CIN: U72900KA2026PTC12345</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
