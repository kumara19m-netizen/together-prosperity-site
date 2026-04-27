'use client';
import { useState } from 'react';
 
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  timestamp: string;
  read: boolean;
}
 
interface ScoredLead extends Lead {
  score: number;
  tier: 'hot' | 'warm' | 'cold';
  reasoning: string;
  followUpTime: string;
  suggestedReply: string;
}
 
interface AILeadScorerProps {
  isAdmin: boolean;
  leads: Lead[];
}
 
const TIER_CONFIG = {
  hot: { color: '#f44336', bg: 'rgba(244,67,54,.1)', border: 'rgba(244,67,54,.25)', label: '🔥 HOT', followUp: 'Within 2 hours' },
  warm: { color: '#F5A623', bg: 'rgba(245,166,35,.1)', border: 'rgba(245,166,35,.25)', label: '⚡ WARM', followUp: 'Within 24 hours' },
  cold: { color: '#2196F3', bg: 'rgba(33,150,243,.1)', border: 'rgba(33,150,243,.25)', label: '❄️ COLD', followUp: 'Within 3 days' },
};
 
export default function AILeadScorer({ isAdmin, leads }: AILeadScorerProps) {
  const [show, setShow] = useState(false);
  const [scoredLeads, setScoredLeads] = useState<ScoredLead[]>([]);
  const [scoring, setScoring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedLead, setSelectedLead] = useState<ScoredLead | null>(null);
 
  if (!isAdmin) return null;
 
  const scoreLead = async (lead: Lead): Promise<ScoredLead> => {
    const prompt = `You are a sales analyst for Together Prosperity Private Limited (blockchain, cybersecurity, IoT, AI/ML company in India).
 
Score this lead from 0-100 and classify as hot/warm/cold:
 
Name: ${lead.name}
Company: ${lead.company || 'Not provided'}
Service interested in: ${lead.service}
Message: ${lead.message}
Phone provided: ${lead.phone ? 'Yes' : 'No'}
 
Scoring criteria:
- Government body or large enterprise = higher score
- Specific technical requirements = higher score
- Urgent language = higher score
- Complete contact info = higher score
- Vague message = lower score
- Just exploring = lower score
 
Return ONLY valid JSON (no markdown):
{
  "score": 75,
  "tier": "warm",
  "reasoning": "brief 1-2 sentence explanation",
  "followUpTime": "Within 4 hours",
  "suggestedReply": "personalized 2-3 sentence reply starting with their name"
}`;
 
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      return { ...lead, ...parsed };
    } catch {
      const score = lead.company ? 55 : 30;
      return { ...lead, score, tier: score >= 60 ? 'warm' : 'cold', reasoning: 'Auto-scored based on completeness.', followUpTime: 'Within 24 hours', suggestedReply: `Hi ${lead.name}, thank you for reaching out to Together Prosperity! We'd love to discuss your requirements for ${lead.service}. Let's schedule a quick call.` };
    }
  };
 
  const scoreAllLeads = async () => {
    if (!leads.length) return;
    setScoring(true);
    setProgress(0);
    setScoredLeads([]);
    const results: ScoredLead[] = [];
    for (let i = 0; i < Math.min(leads.length, 10); i++) {
      const scored = await scoreLead(leads[i]);
      results.push(scored);
      setScoredLeads([...results]);
      setProgress(Math.round(((i + 1) / Math.min(leads.length, 10)) * 100));
    }
    setScoring(false);
  };
 
  const hotCount = scoredLeads.filter(l => l.tier === 'hot').length;
  const warmCount = scoredLeads.filter(l => l.tier === 'warm').length;
  const coldCount = scoredLeads.filter(l => l.tier === 'cold').length;
 
  return (
    <>
      <style>{`
        @keyframes scoreIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
        @keyframes scoreBar{from{width:0}to{width:var(--w)}}
        .score-item{animation:scoreIn .3s ease}
        .score-bar{animation:scoreBar .8s ease forwards}
        .lead-row{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:14px 18px;cursor:pointer;transition:all .25s;display:flex;align-items:center;gap:14px}
        .lead-row:hover{border-color:rgba(212,160,23,.25);background:rgba(212,160,23,.03)}
        .score-modal-scroll::-webkit-scrollbar{width:2px}.score-modal-scroll::-webkit-scrollbar-thumb{background:#D4A017}
      `}</style>
 
      <button onClick={() => setShow(true)} style={{ background:'rgba(212,160,23,.1)', border:'1px solid rgba(212,160,23,.3)', color:'#D4A017', padding:'8px 16px', borderRadius:'8px', fontSize:'10px', cursor:'pointer', fontFamily:"'Space Mono',monospace", letterSpacing:'1.5px', display:'flex', alignItems:'center', gap:'8px' }}>
        📊 AI LEAD SCORER
      </button>
 
      {show && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.92)', backdropFilter:'blur(20px)', zIndex:10010, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={e => { if (e.target === e.currentTarget) { setShow(false); setSelectedLead(null); } }}>
          <div style={{ background:'#050510', border:'1px solid rgba(212,160,23,.22)', borderRadius:'28px', padding:'40px', width:'100%', maxWidth:'780px', maxHeight:'90vh', overflow:'hidden', display:'flex', flexDirection:'column' }}>
 
            {/* Header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px', flexShrink:0 }}>
              <div>
                <h2 style={{ color:'#D4A017', fontSize:'22px', fontWeight:800 }}>📊 AI Lead Scorer</h2>
                <p style={{ color:'rgba(255,255,255,.4)', fontSize:'12px', marginTop:'4px' }}>{leads.length} leads in queue · Powered by Claude AI</p>
              </div>
              <button onClick={() => { setShow(false); setSelectedLead(null); }} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', color:'rgba(255,255,255,.4)', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer', fontSize:'14px' }}>✕</button>
            </div>
 
            {/* Summary stats */}
            {scoredLeads.length > 0 && (
              <div style={{ display:'flex', gap:'12px', marginBottom:'20px', flexShrink:0 }}>
                {[{ label:'🔥 Hot', count:hotCount, color:'#f44336' }, { label:'⚡ Warm', count:warmCount, color:'#F5A623' }, { label:'❄️ Cold', count:coldCount, color:'#2196F3' }].map(item => (
                  <div key={item.label} style={{ flex:1, background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.06)', borderRadius:'12px', padding:'14px', textAlign:'center' }}>
                    <div style={{ fontSize:'24px', fontWeight:900, color:item.color, fontFamily:"'Space Mono',monospace" }}>{item.count}</div>
                    <div style={{ color:'rgba(255,255,255,.4)', fontSize:'11px', marginTop:'4px' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            )}
 
            {/* Progress bar while scoring */}
            {scoring && (
              <div style={{ marginBottom:'20px', flexShrink:0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                  <span style={{ color:'rgba(255,255,255,.5)', fontSize:'12px' }}>🤖 Scoring leads with Claude AI...</span>
                  <span style={{ color:'#D4A017', fontSize:'12px', fontFamily:"'Space Mono',monospace" }}>{progress}%</span>
                </div>
                <div style={{ height:'4px', background:'rgba(255,255,255,.06)', borderRadius:'2px', overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#D4A017,#F5A623)', borderRadius:'2px', transition:'width .3s ease' }}/>
                </div>
              </div>
            )}
 
            {/* Lead list */}
            <div className="score-modal-scroll" style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:'10px' }}>
              {leads.length === 0 ? (
                <div style={{ textAlign:'center', padding:'60px', color:'rgba(255,255,255,.3)' }}>
                  <div style={{ fontSize:'48px', marginBottom:'16px' }}>📭</div>
                  <p>No contact submissions yet.</p>
                </div>
              ) : scoredLeads.length === 0 && !scoring ? (
                <div style={{ textAlign:'center', padding:'60px' }}>
                  <div style={{ fontSize:'64px', marginBottom:'20px' }}>🤖</div>
                  <p style={{ color:'rgba(255,255,255,.5)', marginBottom:'24px', fontSize:'14px' }}>Score up to 10 leads at once using Claude AI to identify your hottest prospects.</p>
                  <button onClick={scoreAllLeads} style={{ background:'linear-gradient(135deg,#D4A017,#F5A623)', border:'none', borderRadius:'14px', padding:'16px 32px', color:'#000', fontWeight:900, fontSize:'13px', letterSpacing:'2px', cursor:'pointer' }}>
                    🚀 SCORE {Math.min(leads.length, 10)} LEADS NOW
                  </button>
                </div>
              ) : (
                scoredLeads
                  .sort((a, b) => b.score - a.score)
                  .map(lead => {
                    const cfg = TIER_CONFIG[lead.tier];
                    return (
                      <div key={lead.id} className="lead-row score-item" onClick={() => setSelectedLead(selectedLead?.id === lead.id ? null : lead)}>
                        <div style={{ background:cfg.bg, border:`1px solid ${cfg.border}`, borderRadius:'8px', padding:'4px 10px', fontSize:'10px', color:cfg.color, fontFamily:"'Space Mono',monospace", flexShrink:0 }}>{cfg.label}</div>
                        <div style={{ flex:1 }}>
                          <div style={{ color:'#fff', fontWeight:600, fontSize:'13px' }}>{lead.name}</div>
                          <div style={{ color:'rgba(255,255,255,.4)', fontSize:'11px' }}>{lead.company || lead.email} · {lead.service}</div>
                        </div>
                        <div style={{ textAlign:'right', flexShrink:0 }}>
                          <div style={{ fontSize:'22px', fontWeight:900, color:cfg.color, fontFamily:"'Space Mono',monospace" }}>{lead.score}</div>
                          <div style={{ fontSize:'9px', color:'rgba(255,255,255,.3)' }}>/ 100</div>
                        </div>
                        {selectedLead?.id === lead.id && (
                          <div style={{ width:'100%', marginTop:'12px', borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:'12px' }} onClick={e => e.stopPropagation()}>
                            <div style={{ color:'rgba(255,255,255,.5)', fontSize:'12px', marginBottom:'8px' }}>💡 {lead.reasoning}</div>
                            <div style={{ color:'rgba(255,255,255,.3)', fontSize:'11px', marginBottom:'8px' }}>⏰ Follow up: <span style={{ color:cfg.color }}>{lead.followUpTime}</span></div>
                            <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(255,255,255,.06)', borderRadius:'10px', padding:'12px', fontSize:'12px', color:'rgba(255,255,255,.6)', lineHeight:1.7, marginBottom:'10px' }}>
                              <div style={{ color:'rgba(255,255,255,.3)', fontSize:'10px', marginBottom:'6px', fontFamily:"'Space Mono',monospace" }}>SUGGESTED REPLY</div>
                              {lead.suggestedReply}
                            </div>
                            <a href={`mailto:${lead.email}?subject=Re: Your inquiry about ${lead.service}&body=${encodeURIComponent(lead.suggestedReply)}`} style={{ background:`${cfg.color}`, color:'#fff', padding:'8px 18px', borderRadius:'8px', textDecoration:'none', fontSize:'11px', fontWeight:700, display:'inline-block' }}>📧 Reply Now</a>
                          </div>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
 
            {scoredLeads.length > 0 && !scoring && (
              <div style={{ marginTop:'16px', flexShrink:0 }}>
                <button onClick={scoreAllLeads} style={{ width:'100%', background:'rgba(212,160,23,.08)', border:'1px solid rgba(212,160,23,.2)', color:'#D4A017', borderRadius:'12px', padding:'12px', cursor:'pointer', fontSize:'12px', letterSpacing:'2px', fontFamily:"'Space Mono',monospace" }}>🔄 RESCORE ALL LEADS</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}