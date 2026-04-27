'use client';
import { useState } from 'react';
 
interface GeneratedPost {
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  tags: string[];
}
 
interface AIBlogGeneratorProps {
  isAdmin: boolean;
  onPublish: (post: { id: string; title: string; excerpt: string; content: string; date: string; author: string; readTime: string; featuredImage?: string }) => void;
}
 
const TOPICS = [
  'Blockchain in Indian Land Records',
  'Zero-Trust Cybersecurity for Government',
  'IoT Agriculture in Karnataka',
  'AI ML for Public Distribution System',
  'Smart Contracts in Government Procurement',
  'Digital India 2026 — What\'s Next',
];
 
export default function AIBlogGenerator({ isAdmin, onPublish }: AIBlogGeneratorProps) {
  const [show, setShow] = useState(false);
  const [topic, setTopic] = useState('');
  const [author, setAuthor] = useState('Madhu Vamshi K R');
  const [tone, setTone] = useState('professional');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<GeneratedPost | null>(null);
  const [error, setError] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
 
  if (!isAdmin) return null;
 
  const generate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setError('');
    setGenerated(null);
 
    const prompt = `You are a tech blog writer for Together Prosperity Private Limited — an Indian blockchain, cybersecurity, IoT, and AI/ML company from Karnataka.
 
Write a complete blog post about: "${topic}"
 
Tone: ${tone}
 
Return ONLY a valid JSON object with these exact fields (no markdown, no extra text):
{
  "title": "compelling SEO-friendly title",
  "excerpt": "2-3 sentence summary for listing page",
  "content": "full article in 400-600 words, use \\n for paragraphs",
  "readTime": "X min",
  "tags": ["tag1", "tag2", "tag3"]
}
 
Make it relevant to Indian government, enterprises, Digital India. Reference Together Prosperity naturally where appropriate.`;
 
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
      const parsed: GeneratedPost = JSON.parse(clean);
      setGenerated(parsed);
    } catch (e) {
      setError('Generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  };
 
  const handlePublish = () => {
    if (!generated) return;
    setPublishing(true);
    const post = {
      id: crypto.randomUUID(),
      title: generated.title,
      excerpt: generated.excerpt,
      content: generated.content,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author,
      readTime: generated.readTime,
    };
    onPublish(post);
    setPublished(true);
    setTimeout(() => { setShow(false); setPublished(false); setGenerated(null); setTopic(''); }, 2000);
    setPublishing(false);
  };
 
  return (
    <>
      <style>{`
        @keyframes blogModalIn{from{opacity:0;transform:scale(.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes generatePulse{0%,100%{opacity:1}50%{opacity:.6}}
        .blog-modal{animation:blogModalIn .35s cubic-bezier(.23,1,.32,1)}
        .gen-pulse{animation:generatePulse 1.2s ease-in-out infinite}
        .blog-gen-input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px 16px;color:#fff;font-size:13px;outline:none;transition:all .3s;box-sizing:border-box;font-family:'Sora',sans-serif}
        .blog-gen-input:focus{border-color:#D4A017;box-shadow:0 0 0 3px rgba(212,160,23,.1)}
        .blog-gen-input::placeholder{color:rgba(255,255,255,.2)}
        .blog-topic-chip{background:rgba(212,160,23,.06);border:1px solid rgba(212,160,23,.18);color:rgba(212,160,23,.7);padding:6px 14px;border-radius:20px;font-size:10px;cursor:pointer;transition:all .2s;white-space:nowrap}
        .blog-topic-chip:hover{background:rgba(212,160,23,.15);color:#D4A017}
        .blog-content-preview{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:16px;max-height:200px;overflow-y:auto;color:rgba(255,255,255,.6);font-size:12px;line-height:1.8}
        .blog-content-preview::-webkit-scrollbar{width:2px}.blog-content-preview::-webkit-scrollbar-thumb{background:#D4A017}
      `}</style>
 
      {/* Trigger button — shown in admin dashboard area */}
      <button onClick={() => setShow(true)} style={{ background:'rgba(212,160,23,.1)', border:'1px solid rgba(212,160,23,.3)', color:'#D4A017', padding:'8px 16px', borderRadius:'8px', fontSize:'10px', cursor:'pointer', fontFamily:"'Space Mono',monospace", letterSpacing:'1.5px', display:'flex', alignItems:'center', gap:'8px' }}>
        ✍️ AI BLOG GENERATOR
      </button>
 
      {show && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.92)', backdropFilter:'blur(20px)', zIndex:10010, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }} onClick={e => { if (e.target === e.currentTarget) setShow(false); }}>
          <div className="blog-modal" style={{ background:'#050510', border:'1px solid rgba(212,160,23,.22)', borderRadius:'28px', padding:'40px', width:'100%', maxWidth:'680px', maxHeight:'90vh', overflowY:'auto' }}>
 
            {/* Header */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
              <div>
                <h2 style={{ color:'#D4A017', fontSize:'22px', fontWeight:800 }}>✍️ AI Blog Generator</h2>
                <p style={{ color:'rgba(255,255,255,.4)', fontSize:'12px', marginTop:'4px' }}>Powered by Claude AI — generates full posts in seconds</p>
              </div>
              <button onClick={() => setShow(false)} style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', color:'rgba(255,255,255,.4)', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer', fontSize:'14px' }}>✕</button>
            </div>
 
            {!generated ? (
              <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
                {/* Topic */}
                <div>
                  <label style={{ color:'rgba(255,255,255,.4)', fontSize:'10px', letterSpacing:'3px', display:'block', marginBottom:'10px', fontFamily:"'Space Mono',monospace" }}>BLOG TOPIC *</label>
                  <input className="blog-gen-input" placeholder="e.g. How blockchain is transforming land records in India" value={topic} onChange={e => setTopic(e.target.value)}/>
                  <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'10px' }}>
                    {TOPICS.map(t => <button key={t} className="blog-topic-chip" onClick={() => setTopic(t)}>{t}</button>)}
                  </div>
                </div>
 
                {/* Author & Tone */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                  <div>
                    <label style={{ color:'rgba(255,255,255,.4)', fontSize:'10px', letterSpacing:'3px', display:'block', marginBottom:'8px', fontFamily:"'Space Mono',monospace" }}>AUTHOR</label>
                    <input className="blog-gen-input" value={author} onChange={e => setAuthor(e.target.value)}/>
                  </div>
                  <div>
                    <label style={{ color:'rgba(255,255,255,.4)', fontSize:'10px', letterSpacing:'3px', display:'block', marginBottom:'8px', fontFamily:"'Space Mono',monospace" }}>TONE</label>
                    <select className="blog-gen-input" value={tone} onChange={e => setTone(e.target.value)} style={{ cursor:'pointer' }}>
                      <option value="professional" style={{ background:'#050510' }}>Professional</option>
                      <option value="conversational" style={{ background:'#050510' }}>Conversational</option>
                      <option value="technical" style={{ background:'#050510' }}>Technical</option>
                      <option value="simplified" style={{ background:'#050510' }}>Simplified / Easy</option>
                    </select>
                  </div>
                </div>
 
                {error && <div style={{ background:'rgba(244,67,54,.1)', border:'1px solid rgba(244,67,54,.2)', borderRadius:'10px', padding:'12px', color:'#f44336', fontSize:'12px' }}>{error}</div>}
 
                <button onClick={generate} disabled={generating || !topic.trim()} style={{ background:'linear-gradient(135deg,#D4A017,#F5A623)', border:'none', borderRadius:'14px', padding:'16px', color:'#000', fontWeight:900, fontSize:'13px', letterSpacing:'2px', cursor:topic.trim() ? 'pointer' : 'not-allowed', opacity:topic.trim() ? 1 : 0.5, display:'flex', alignItems:'center', justifyContent:'center', gap:'10px' }}>
                  {generating ? <><span className="gen-pulse">🤖</span> GENERATING...</> : '🚀 GENERATE BLOG POST'}
                </button>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                <div style={{ background:'rgba(46,204,64,.06)', border:'1px solid rgba(46,204,64,.2)', borderRadius:'12px', padding:'12px 16px', display:'flex', alignItems:'center', gap:'10px' }}>
                  <span style={{ fontSize:'20px' }}>✅</span>
                  <span style={{ color:'#2ECC40', fontSize:'13px', fontWeight:600 }}>Blog post generated successfully!</span>
                </div>
 
                {/* Preview */}
                <div>
                  <label style={{ color:'rgba(255,255,255,.4)', fontSize:'10px', letterSpacing:'3px', display:'block', marginBottom:'8px', fontFamily:"'Space Mono',monospace" }}>TITLE</label>
                  <div style={{ color:'#fff', fontSize:'18px', fontWeight:800, lineHeight:1.3 }}>{generated.title}</div>
                </div>
                <div>
                  <label style={{ color:'rgba(255,255,255,.4)', fontSize:'10px', letterSpacing:'3px', display:'block', marginBottom:'8px', fontFamily:"'Space Mono',monospace" }}>EXCERPT</label>
                  <div style={{ color:'rgba(255,255,255,.6)', fontSize:'13px', lineHeight:1.7 }}>{generated.excerpt}</div>
                </div>
                <div>
                  <label style={{ color:'rgba(255,255,255,.4)', fontSize:'10px', letterSpacing:'3px', display:'block', marginBottom:'8px', fontFamily:"'Space Mono',monospace" }}>CONTENT PREVIEW</label>
                  <div className="blog-content-preview">{generated.content.substring(0, 400)}...</div>
                </div>
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                  {generated.tags.map(tag => <span key={tag} style={{ background:'rgba(212,160,23,.08)', border:'1px solid rgba(212,160,23,.2)', color:'#D4A017', padding:'4px 12px', borderRadius:'20px', fontSize:'10px', fontFamily:"'Space Mono',monospace" }}>#{tag}</span>)}
                  <span style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.08)', color:'rgba(255,255,255,.4)', padding:'4px 12px', borderRadius:'20px', fontSize:'10px' }}>📖 {generated.readTime} read</span>
                </div>
 
                <div style={{ display:'flex', gap:'12px' }}>
                  <button onClick={handlePublish} disabled={publishing || published} style={{ flex:1, background:'linear-gradient(135deg,#D4A017,#F5A623)', border:'none', borderRadius:'12px', padding:'14px', color:'#000', fontWeight:900, fontSize:'12px', letterSpacing:'2px', cursor:'pointer' }}>
                    {published ? '✅ PUBLISHED!' : publishing ? 'PUBLISHING...' : '📤 PUBLISH TO BLOG'}
                  </button>
                  <button onClick={() => { setGenerated(null); setTopic(''); }} style={{ flex:1, background:'transparent', border:'1px solid rgba(255,255,255,.1)', borderRadius:'12px', padding:'14px', color:'rgba(255,255,255,.5)', cursor:'pointer', fontSize:'12px', letterSpacing:'2px' }}>↩ REGENERATE</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}