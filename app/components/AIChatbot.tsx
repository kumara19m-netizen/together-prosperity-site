'use client';
import { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

/* ══════════════════════════════════════════════════════════════
   SMART RULE-BASED ENGINE — works 100% without any API key
   Falls back to this even if API key IS set but fails
══════════════════════════════════════════════════════════════ */
const RULES: { patterns: string[]; response: string }[] = [
  {
    patterns: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'start', 'help'],
    response: "Hello! 👋 Welcome to Together Prosperity.\n\nI'm **Prospera**, your AI assistant. I can help with:\n\n• Our **services** (Blockchain, Cybersecurity, IoT, AI/ML)\n• **₹0 Pilot Program** details\n• **Booking a demo**\n• Pricing & portfolio\n\nWhat would you like to know?",
  },
  {
    patterns: ['service', 'what do you do', 'what you do', 'offerings', 'solutions', 'build', 'develop', 'provide'],
    response: "We offer **6 core technology services**:\n\n⛓️ **Blockchain Infrastructure** — Immutable ledgers, land records\n🔒 **Cybersecurity** — Zero-trust, penetration testing\n📡 **Internet of Things** — Smart sensors, agriculture\n🤖 **AI/ML Solutions** — Predictive analytics, NLP\n📜 **Smart Contracts** — Formal verification, tamper-proof\n🏛️ **Gov-tech** — Digital India aligned platforms\n\nWhich service interests you most?",
  },
  {
    patterns: ['blockchain', 'ledger', 'hyperledger', 'land record', 'immutable', 'distributed'],
    response: "Our **Blockchain Infrastructure** service:\n\n• Hyperledger Fabric permissioned networks\n• Cryptographic verification & audit trails\n• Land record digitization\n• Token & asset management\n• Smart contract integration\n\n✅ **Case Study:** Digitized **50,000+ land records** for Kolar district — ₹1.2Cr saved, zero fraud post-deployment.\n\nWant to book a free demo?",
  },
  {
    patterns: ['cyber', 'security', 'hack', 'zero trust', 'penetration', 'threat', 'breach', 'protect', 'vapt', 'siem'],
    response: "Our **Cybersecurity** solutions:\n\n• Zero-trust architecture deployment\n• Real-time threat detection (SIEM/SOAR)\n• Penetration testing & VAPT\n• ISO 27001 compliance\n• Incident response planning\n\n✅ **Case Study:** Secured **3 Karnataka government departments** — zero breaches across 18 months.\n\nReady to secure your infrastructure?",
  },
  {
    patterns: ['iot', 'sensor', 'agriculture', 'smart city', 'industrial', 'monitoring', 'farming', 'crop', 'agri'],
    response: "Our **IoT Solutions:**\n\n• Smart sensor deployment (200+ sensors)\n• Real-time monitoring dashboards\n• Edge computing for low-latency response\n• Predictive maintenance systems\n• MQTT/CoAP protocols\n\n✅ **Case Study:** **22% crop yield increase** for Karnataka farmers — ₹80L+ savings in Year 1.\n\nInterested in an IoT pilot?",
  },
  {
    patterns: ['ai', 'ml', 'machine learning', 'artificial intelligence', 'nlp', 'prediction', 'analytics', 'deep learning', 'tensorflow'],
    response: "Our **AI/ML Solutions:**\n\n• Predictive analytics (92% accuracy achieved)\n• Deep learning pipelines (TensorFlow/PyTorch)\n• NLP & text intelligence\n• Computer vision systems\n• Intelligent process automation\n\n✅ **Case Study:** Crop yield prediction model with **92% accuracy** for Karnataka farmers.\n\nWant to explore an AI pilot?",
  },
  {
    patterns: ['smart contract', 'solidity', 'ethereum', 'procurement', 'automated', 'contract'],
    response: "Our **Smart Contracts & Security:**\n\n• Formal contract verification\n• Vulnerability scanning & auditing\n• Multi-signature authorization\n• Automated compliance checks\n• Tamper-proof execution\n\n✅ **Case Study:** Automated government procurement saving **₹2Cr+** in processing costs.\n\nShall I connect you with our team?",
  },
  {
    patterns: ['gov', 'government', 'digital india', 'panchayat', 'public', 'civic', 'municipal', 'e-governance'],
    response: "Our **Gov-tech Solutions** are 100% Digital India aligned:\n\n• Land & property record digitization\n• Subsidy distribution systems\n• Academic credential verification\n• Public grievance portals\n• e-Governance dashboards\n\nWe're registered under Companies Act 2013, Karnataka.\n**CIN:** U72900KA2026PTC12345\n\nReady to transform your department?",
  },
  {
    patterns: ['pilot', 'free', '₹0', 'zero cost', 'trial', 'poc', 'proof of concept', 'no cost'],
    response: "🎉 **₹0 Pilot Program — Yes, it's real!**\n\nEligibility criteria:\n✓ Government body, PSU, or registered enterprise\n✓ Signed NDA + MOU required\n✓ Scope: 100 consulting hours or 30 days (whichever earlier)\n✓ Joint success criteria defined upfront\n✓ Data sharing terms agreed in advance\n\nThis is our way of **proving value before you commit**.\n\n📞 Apply: +91 98456 18859\n✉️ contact@togetherprosperity.com",
  },
  {
    patterns: ['price', 'cost', 'pricing', 'how much', 'fee', 'charge', 'budget', 'rate', 'plan'],
    response: "Our **transparent pricing:**\n\n🆓 **Starter — ₹0**\nFree consultation + pilot program\n\n💼 **Professional — Custom**\nFull consultation, dedicated manager, custom dev\n\n🏢 **Enterprise — Custom**\n24/7 support, SLA guarantee, on-site training\n\nAll projects start with a **free demo**.\n\n📞 **WhatsApp:** +91 98456 18859",
  },
  {
    patterns: ['demo', 'book', 'schedule', 'meeting', 'call', 'talk', 'consult', 'contact', 'appointment'],
    response: "📅 **Book a Free Demo — 3 ways:**\n\n1. **Contact Form** → Scroll to the Contact section below\n2. **WhatsApp** → +91 98456 18859 (fastest response)\n3. **Email** → contact@togetherprosperity.com\n\nWe respond within **24 hours** — usually much faster! 🚀\n\nWhat service are you most interested in?",
  },
  {
    patterns: ['location', 'office', 'where', 'address', 'based', 'headquarter', 'karnataka', 'bangalore', 'kolar', 'malur'],
    response: "📍 **Our Offices:**\n\n**Kolar HQ (Registered):**\nMalur, Kolar District\nKarnataka — 563130\n\n**Bangalore Office:**\nBangalore South\nKarnataka — 560026\n\nWe serve clients **nationwide and internationally**.\n\n**CIN:** U72900KA2026PTC12345\n**Incorporated:** 2026, Companies Act",
  },
  {
    patterns: ['team', 'founder', 'who', 'leadership', 'ceo', 'cto', 'coo', 'people', 'madhu', 'junaid', 'kumara'],
    response: "👥 **Our Leadership Team:**\n\n🚀 **Madhu Vamshi K R** — Founder & CEO\nBlockchain & cybersecurity strategist, Malur Kolar\n\n🛡️ **Junaid Khan** — Co-Founder & CTO\nZero-trust & IoT expert, Bangalore South\n\n🎯 **Kumara Swamy M** — Director & COO\nEnterprise partnerships & operations\n\nAll three bring deep expertise in Digital India tech. Want to speak with our team?",
  },
  {
    patterns: ['portfolio', 'project', 'case study', 'work', 'client', 'achievement', 'result', 'example'],
    response: "📊 **Our Portfolio:**\n\n🏛️ **KarnaLand** — Blockchain Land Records\n50,000+ records, ₹1.2Cr saved, 0 fraud cases\n\n🌾 **AgroSense** — IoT Agriculture Platform\n200+ sensors, 22% yield increase, ₹80L+ savings\n\n🔒 **SecureGov** — Cyber Shield\n3 gov depts, 18 months, zero breaches\n\nAll projects started with our **₹0 pilot**. Want detailed case studies?",
  },
  {
    patterns: ['sector', 'industry', 'healthcare', 'education', 'finance', 'banking', 'supply chain', 'manufacturing', 'which'],
    response: "🏭 **Sectors We Serve:**\n\n🏛️ Government & PSUs\n🏥 Healthcare\n🎓 Education\n🌾 Agriculture\n🏭 Manufacturing\n🏦 Banking & Finance\n🚚 Supply Chain\n🏙️ Smart Cities\n\nEach sector gets a **tailored solution** — not one-size-fits-all.\n\nWhich sector are you in?",
  },
  {
    patterns: ['tech', 'technology', 'stack', 'tools', 'framework', 'language', 'platform'],
    response: "⚙️ **Our Technology Stack:**\n\n**Blockchain:** Hyperledger Fabric, Ethereum/Solidity, IPFS\n**Cybersecurity:** Zero-Trust, SIEM/SOAR, ISO 27001\n**IoT:** MQTT, InfluxDB, Edge Computing\n**AI/ML:** TensorFlow, PyTorch, Python/FastAPI\n**Frontend:** Next.js, React, TypeScript\n**Backend:** Node.js, PostgreSQL\n**Cloud:** AWS/GCP, Docker/Kubernetes\n\nWe choose the **best tool for your specific need**."},
  {
    patterns: ['startup', 'sme', 'small', 'medium', 'enterprise', 'large', 'size', 'organisation', 'organization'],
    response: "We work with **organisations of all sizes:**\n\n• **Startups** — Lean MVPs & pilot projects\n• **SMEs** — Scalable within budget\n• **Large Enterprises** — Full-scale deployments\n• **Government** — Compliance-first platforms\n\nOur **₹0 pilot program** makes it risk-free to start regardless of size.\n\nWhat's your organisation type?",
  },
  {
    patterns: ['whatsapp', 'phone', 'email', 'instagram', 'social', 'follow', 'linkedin', 'twitter'],
    response: "📱 **Connect With Us:**\n\n💬 **WhatsApp:** +91 98456 18859\n📞 **Phone:** +91 98456 18859\n✉️ **Email:** contact@togetherprosperity.com\n📸 **Instagram:** @together_prosperity\n💼 **LinkedIn:** Together Prosperity\n\nWe're most responsive on **WhatsApp** — message anytime!",
  },
  {
    patterns: ['career', 'job', 'hiring', 'work with', 'join', 'vacancy', 'internship', 'apply', 'opening'],
    response: "🚀 **We're Hiring!**\n\nCurrent Openings:\n💻 Full Stack Developer (Bangalore)\n🔒 Cybersecurity Analyst (Bangalore)\n📡 IoT Solutions Architect (Remote)\n🎓 Business Development Intern (Bangalore)\n\n**How to apply:**\nEmail: contact@togetherprosperity.com\nSubject: Application for [Role Name]\n\nStartup environment — real impact from Day 1!",
  },
  {
    patterns: ['about', 'company', 'incorporated', 'registered', 'cin', 'founded', 'history'],
    response: "🏢 **About Together Prosperity:**\n\nTogether Prosperity Private Limited is a next-generation tech company incorporated in Karnataka, India.\n\n📅 **Incorporated:** 2026\n🏛️ **CIN:** U72900KA2026PTC12345\n📍 **HQ:** Malur, Kolar District, Karnataka\n🌐 **Serving:** India & internationally\n\n**Mission:** Making cutting-edge Blockchain, Cybersecurity, IoT & AI tech accessible to every Indian institution.\n\nDigital India aligned from day one 🇮🇳",
  },
  {
    patterns: ['thank', 'thanks', 'great', 'awesome', 'helpful', 'good', 'nice', 'perfect', 'excellent'],
    response: "You're very welcome! 😊\n\nReady to take the next step?\n\n📅 **Book a Demo** → Contact section\n💬 **WhatsApp** → +91 98456 18859\n✉️ **Email** → contact@togetherprosperity.com\n\n**Together Prosperity** — Building India's Digital Future 🇮🇳",
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'later', 'exit', 'close'],
    response: "Goodbye! 👋 Feel free to return anytime.\n\nRemember — our **₹0 pilot program** is always open. No risk, just results.\n\n📞 +91 98456 18859\n🇮🇳 Together Prosperity Private Limited",
  },
];

const DEFAULT_RESPONSE = "Great question! For the most accurate answer, our team would love to help.\n\n📞 **Call/WhatsApp:** +91 98456 18859\n✉️ **Email:** contact@togetherprosperity.com\n\nOr ask me about:\n• Our **services** (blockchain, cybersecurity, IoT, AI)\n• **₹0 Pilot program**\n• **Booking a demo**\n• Our **portfolio** & case studies\n• **Pricing** & plans";

function getSmartResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const rule of RULES) {
    if (rule.patterns.some(p => lower.includes(p))) {
      return rule.response;
    }
  }
  return DEFAULT_RESPONSE;
}

/* Render **bold** markdown and line breaks */
function formatMessage(text: string): React.ReactNode {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      {text.split('\n').map((line, i) => {
        if (line === '') return <div key={i} style={{ height: '6px' }} />;
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <div key={i}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={j} style={{ color: '#D4A017' }}>{part.slice(2, -2)}</strong>
                : <span key={j}>{part}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

const QUICK_REPLIES = [
  '🛠️ Tell me about services',
  '🎁 What is the pilot program?',
  '💰 How much does it cost?',
  '📅 Book a demo',
  '📊 Show me portfolio',
];

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm **Prospera** 🌟, Together Prosperity's AI assistant.\n\nI can help with:\n• Our **services** & solutions\n• **₹0 Pilot Program** details\n• **Booking a demo**\n• Pricing, portfolio & more\n\nWhat would you like to know?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showQuick, setShowQuick] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Proactive unread badge after 25 seconds
  useEffect(() => {
    const t = setTimeout(() => { if (!open) setUnread(1); }, 25000);
    return () => clearTimeout(t);
  }, [open]);

  const sendMessage = async (text?: string) => {
    const userText = (text || input).trim();
    if (!userText || typing) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { role: 'user', content: userText, time }]);
    setInput('');
    setTyping(true);
    setShowQuick(false);

    const delay = 500 + Math.random() * 700;

    // Try Anthropic API if key exists, else use rules
    const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
    let reply = '';

    if (apiKey && apiKey.startsWith('sk-')) {
      try {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            system: `You are Prospera, the friendly AI assistant for Together Prosperity Private Limited — a blockchain, cybersecurity, IoT, and AI/ML company based in Karnataka, India (CIN: U72900KA2026PTC12345). Be warm, concise (3-6 lines unless detail needed), and always guide users toward: booking a demo, the free ₹0 pilot program, or contacting us at +91 98456 18859 / contact@togetherprosperity.com. Key facts: Services: Blockchain (land records), Cybersecurity (zero-trust), IoT (agriculture), AI/ML (92% accuracy), Smart Contracts, Gov-tech. ₹0 pilot for qualified govt/enterprises. Offices: Malur Kolar + Bangalore South. Team: Madhu Vamshi K R (CEO), Junaid Khan (CTO), Kumara Swamy M (COO). Portfolio: KarnaLand (50k land records, ₹1.2Cr saved), AgroSense (22% yield), SecureGov (0 breaches 18 months).`,
            messages: [{ role: 'user', content: userText }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          reply = data.content?.[0]?.text || '';
        }
      } catch {}
    }

    if (!reply) reply = getSmartResponse(userText);

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant', content: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
      if (!open) setUnread(u => u + 1);
    }, delay);
  };

  const handleOpen = () => { setOpen(true); setUnread(0); };

  return (
    <>
      {/* ── Chat window ── */}
      {open && (
        <div style={{
          position: 'fixed', bottom: '90px', left: '20px', zIndex: 9997,
          width: '360px',
          background: '#07070F',
          border: '1px solid rgba(212,160,23,.3)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,.7)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'chatOpen .3s cubic-bezier(.23,1,.32,1)',
        }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#D4A017,#F5A623)', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ width: '38px', height: '38px', background: 'rgba(0,0,0,.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🤖</div>
              <div>
                <div style={{ color: '#000', fontWeight: 800, fontSize: '13px', lineHeight: 1 }}>Prospera AI</div>
                <div style={{ color: 'rgba(0,0,0,.65)', fontSize: '10px', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2ECC40', display: 'inline-block' }} />
                  Together Prosperity Assistant
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'rgba(0,0,0,.2)', border: 'none', color: '#000', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '380px', minHeight: '280px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-end' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: '26px', height: '26px', background: 'linear-gradient(135deg,#D4A017,#F5A623)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>🤖</div>
                )}
                <div style={{ maxWidth: '82%' }}>
                  <div style={{
                    background: msg.role === 'user' ? 'linear-gradient(135deg,#D4A017,#F5A623)' : 'rgba(255,255,255,.07)',
                    color: msg.role === 'user' ? '#000' : 'rgba(255,255,255,.88)',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: '12.5px',
                    lineHeight: 1.65,
                    border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,.07)' : 'none',
                  }}>
                    {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,.2)', fontSize: '9px', marginTop: '3px', textAlign: msg.role === 'user' ? 'right' : 'left', fontFamily: "'Space Mono',monospace" }}>{msg.time}</div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <div style={{ width: '26px', height: '26px', background: 'linear-gradient(135deg,#D4A017,#F5A623)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>🤖</div>
                <div style={{ display: 'flex', gap: '4px', padding: '12px 14px', background: 'rgba(255,255,255,.07)', borderRadius: '18px 18px 18px 4px', border: '1px solid rgba(255,255,255,.07)' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4A017', animation: `typingDot 1.2s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies — shown only at start */}
          {showQuick && messages.length <= 1 && (
            <div style={{ padding: '0 12px 10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => sendMessage(q)} style={{ background: 'rgba(212,160,23,.08)', border: '1px solid rgba(212,160,23,.2)', color: '#D4A017', padding: '5px 11px', borderRadius: '50px', fontSize: '10px', cursor: 'pointer', fontFamily: "'Space Mono',monospace", letterSpacing: '0.3px', whiteSpace: 'nowrap', transition: 'all .2s' }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask me anything..."
              style={{ flex: 1, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', borderRadius: '50px', padding: '9px 16px', color: '#fff', fontSize: '12px', outline: 'none', fontFamily: "'Sora',sans-serif" }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
              style={{ background: input.trim() && !typing ? 'linear-gradient(135deg,#D4A017,#F5A623)' : 'rgba(255,255,255,.06)', border: 'none', borderRadius: '50%', width: '38px', height: '38px', cursor: input.trim() && !typing ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', flexShrink: 0, transition: 'all .2s' }}>
              ➤
            </button>
          </div>

          {/* WhatsApp footer */}
          <div style={{ padding: '6px 14px 10px', textAlign: 'center' }}>
            <a href="https://wa.me/919845618859" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '10px', textDecoration: 'none', fontFamily: "'Space Mono',monospace" }}>
              💬 WhatsApp us for faster support
            </a>
          </div>
        </div>
      )}

      {/* ── Floating button ── */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        style={{
          position: 'fixed', bottom: '20px', left: '80px', zIndex: 9996,
          width: '54px', height: '54px', borderRadius: '50%',
          background: open ? 'rgba(212,160,23,.15)' : 'linear-gradient(135deg,#D4A017,#F5A623)',
          border: open ? '2px solid #D4A017' : 'none',
          cursor: 'pointer',
          boxShadow: open ? 'none' : '0 4px 20px rgba(212,160,23,.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px',
          transition: 'all .3s',
        }}>
        {open ? '✕' : '🤖'}
        {!open && unread > 0 && (
          <div style={{ position: 'absolute', top: '-3px', right: '-3px', background: '#f44336', color: '#fff', borderRadius: '50%', width: '17px', height: '17px', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
            {unread}
          </div>
        )}
      </button>

      <style>{`
        @keyframes chatOpen {
          from { opacity:0; transform:scale(.92) translateY(16px); }
          to { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes typingDot {
          0%,80%,100% { transform:scale(1); opacity:.4; }
          40% { transform:scale(1.5); opacity:1; }
        }
      `}</style>
    </>
  );
}