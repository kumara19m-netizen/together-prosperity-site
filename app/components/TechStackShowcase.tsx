'use client';
import { useState, useEffect } from 'react';

interface Tech {
  id: string;
  name: string;
  icon: string;
  category: string;
  desc: string;
  longDesc: string;
  usedIn: string[];
  features: string[];
  color: string;
  level: number;
  docsUrl: string;
  relatedTech: string[];
  yearAdopted: string;
  visible: boolean;
}

interface TechStat {
  id: string;
  icon: string;
  val: string;
  label: string;
  color: string;
}

interface CategoryConfig {
  id: string;
  name: string;
  color: string;
  icon: string;
  desc: string;
}

const INIT_CATEGORIES: CategoryConfig[] = [
  { id:'1', name:'Blockchain',    color:'#D4A017', icon:'⛓️', desc:'Distributed ledger & smart contract technologies' },
  { id:'2', name:'Cybersecurity', color:'#F5A623', icon:'🛡️', desc:'Security frameworks, tools & methodologies' },
  { id:'3', name:'IoT',           color:'#2196F3', icon:'📡', desc:'Connected device protocols & platforms' },
  { id:'4', name:'AI/ML',         color:'#2ECC40', icon:'🤖', desc:'Machine learning & AI frameworks' },
  { id:'5', name:'Frontend',      color:'#61DAFB', icon:'⚛️', desc:'UI frameworks & design systems' },
  { id:'6', name:'Backend',       color:'#339933', icon:'🟢', desc:'Server-side frameworks & databases' },
  { id:'7', name:'Cloud',         color:'#FF9900', icon:'☁️', desc:'Cloud platforms & DevOps tools' },
];

const INIT_TECHS: Tech[] = [
  { id:'1', name:'Hyperledger Fabric', icon:'⛓️', category:'Blockchain', color:'#D4A017', level:5, visible:true, yearAdopted:'2026', docsUrl:'https://hyperledger-fabric.readthedocs.io',
    desc:'Enterprise-grade permissioned blockchain for secure, auditable government and enterprise deployments.',
    longDesc:'Hyperledger Fabric is our primary blockchain platform for government deployments. It provides a modular architecture allowing pluggable implementations of consensus, membership services, and more. We use it for land records, procurement automation, and supply chain traceability across Karnataka.',
    usedIn:['Land Records','Procurement','Supply Chain','Academic Credentials'],
    features:['Permissioned network','Private data collections','Chaincode (smart contracts)','Modular consensus','MSP identity management'],
    relatedTech:['IPFS','Node.js / Express','PostgreSQL'] },
  { id:'2', name:'Ethereum / Solidity', icon:'💎', category:'Blockchain', color:'#627EEA', level:4, visible:true, yearAdopted:'2026', docsUrl:'https://docs.soliditylang.org',
    desc:'Smart contract development on public Ethereum networks for decentralized applications.',
    longDesc:'We use Ethereum and Solidity for public blockchain deployments where decentralization is key. Our team specializes in writing secure, gas-optimized smart contracts for token systems and DeFi integrations.',
    usedIn:['Smart Contracts','Token Systems','DeFi','NFT Systems'],
    features:['ERC-20 / ERC-721 tokens','Gas optimization','Formal verification','OpenZeppelin security','Hardhat testing'],
    relatedTech:['IPFS','TypeScript','Node.js / Express'] },
  { id:'3', name:'IPFS', icon:'🌐', category:'Blockchain', color:'#65C2CB', level:4, visible:true, yearAdopted:'2026', docsUrl:'https://docs.ipfs.tech',
    desc:'InterPlanetary File System for decentralized document and credential storage.',
    longDesc:'IPFS enables content-addressed, decentralized storage for our blockchain solutions. We use it to store large documents, academic credentials, and NFT metadata off-chain while maintaining verifiability on-chain.',
    usedIn:['Document Storage','NFTs','Academic Records','Gov Archives'],
    features:['Content addressing','Decentralized storage','Pinning services','Gateway integration','Filecoin compatibility'],
    relatedTech:['Hyperledger Fabric','Ethereum / Solidity'] },
  { id:'4', name:'Zero-Trust Architecture', icon:'🛡️', category:'Cybersecurity', color:'#F5A623', level:5, visible:true, yearAdopted:'2026', docsUrl:'https://www.nist.gov/publications/zero-trust-architecture',
    desc:'Never trust, always verify — end-to-end identity verification for every user and device.',
    longDesc:'Zero-trust is our foundational security philosophy. We implement it across all government deployments by enforcing strict identity verification, least-privilege access, and micro-segmentation. This approach eliminated 100% of breaches across 3 Karnataka government deployments.',
    usedIn:['Gov Departments','Enterprise Security','Remote Work','Critical Infrastructure'],
    features:['Identity verification','Micro-segmentation','Least privilege access','Continuous monitoring','Device trust scoring'],
    relatedTech:['SIEM / SOAR','Penetration Testing'] },
  { id:'5', name:'SIEM / SOAR', icon:'🔍', category:'Cybersecurity', color:'#FF5722', level:4, visible:true, yearAdopted:'2026', docsUrl:'https://www.splunk.com',
    desc:'Security Information & Event Management with automated orchestrated response.',
    longDesc:'We deploy enterprise SIEM/SOAR solutions using Splunk and IBM QRadar for real-time threat detection. Our SOAR playbooks automate 80% of incident responses, dramatically reducing mean time to respond (MTTR).',
    usedIn:['Threat Detection','Incident Response','Compliance Monitoring','Log Analysis'],
    features:['Real-time correlation','Automated playbooks','Threat intelligence','Compliance reporting','MTTR reduction'],
    relatedTech:['Zero-Trust Architecture','Penetration Testing'] },
  { id:'6', name:'Penetration Testing', icon:'🎯', category:'Cybersecurity', color:'#E91E63', level:5, visible:true, yearAdopted:'2026', docsUrl:'https://owasp.org',
    desc:'Ethical hacking and vulnerability assessment to find weaknesses before attackers do.',
    longDesc:'Our certified ethical hackers conduct comprehensive VAPT (Vulnerability Assessment and Penetration Testing) for government systems. We follow OWASP Top 10 and NIST frameworks, delivering detailed reports with remediation roadmaps.',
    usedIn:['Security Audits','ISO 27001','VAPT Reports','Compliance'],
    features:['OWASP methodology','Network VAPT','Web app testing','Social engineering','Detailed remediation reports'],
    relatedTech:['Zero-Trust Architecture','SIEM / SOAR'] },
  { id:'7', name:'MQTT / CoAP', icon:'📡', category:'IoT', color:'#2196F3', level:5, visible:true, yearAdopted:'2026', docsUrl:'https://mqtt.org',
    desc:'Lightweight messaging protocols for IoT sensor networks with minimal bandwidth usage.',
    longDesc:'MQTT and CoAP are our go-to protocols for IoT sensor communication. We have deployed 200+ sensors using these protocols for smart agriculture in Karnataka, enabling real-time crop monitoring with minimal power consumption.',
    usedIn:['Smart Agriculture','Industrial IoT','Smart Cities','Cold Chain'],
    features:['QoS levels 0/1/2','Retained messages','Last will testament','TLS security','Low bandwidth usage'],
    relatedTech:['InfluxDB','Edge Computing','TensorFlow / PyTorch'] },
  { id:'8', name:'InfluxDB', icon:'📊', category:'IoT', color:'#22ADF6', level:4, visible:true, yearAdopted:'2026', docsUrl:'https://docs.influxdata.com',
    desc:'Purpose-built time-series database for storing and querying high-velocity sensor data.',
    longDesc:'InfluxDB powers our IoT data analytics platform, handling millions of sensor readings per day. Combined with Grafana dashboards, it gives clients real-time visibility into their operations with sub-millisecond query performance.',
    usedIn:['Sensor Analytics','Real-time Monitoring','Dashboards','Predictive Maintenance'],
    features:['Time-series optimized','Flux query language','Grafana integration','Retention policies','High write throughput'],
    relatedTech:['MQTT / CoAP','Edge Computing'] },
  { id:'9', name:'Edge Computing', icon:'⚡', category:'IoT', color:'#00BCD4', level:4, visible:true, yearAdopted:'2026', docsUrl:'https://www.redhat.com/en/topics/edge-computing',
    desc:'Processing data at the edge of the network for real-time response without cloud latency.',
    longDesc:'Edge computing allows us to process sensor data locally on Raspberry Pi and NVIDIA Jetson devices before sending summaries to the cloud. This reduces latency from seconds to milliseconds for critical agricultural alerts.',
    usedIn:['Real-time Alerts','Predictive Maintenance','Manufacturing','Smart Farms'],
    features:['Local processing','Offline capability','Reduced latency','NVIDIA Jetson','Raspberry Pi clusters'],
    relatedTech:['MQTT / CoAP','InfluxDB','TensorFlow / PyTorch'] },
  { id:'10', name:'TensorFlow / PyTorch', icon:'🤖', category:'AI/ML', color:'#2ECC40', level:5, visible:true, yearAdopted:'2026', docsUrl:'https://www.tensorflow.org',
    desc:'Deep learning frameworks powering computer vision, NLP, and predictive analytics models.',
    longDesc:'We build production ML models using both TensorFlow and PyTorch. Our crop yield prediction model achieved 92% accuracy for Karnataka farmers. We also deploy computer vision models for quality control in manufacturing.',
    usedIn:['Yield Prediction','Fraud Detection','NLP','Computer Vision','Quality Control'],
    features:['Custom model training','Transfer learning','Model quantization','TFLite edge deployment','MLOps pipelines'],
    relatedTech:['Python / FastAPI','Apache Kafka','Edge Computing'] },
  { id:'11', name:'Python / FastAPI', icon:'🐍', category:'AI/ML', color:'#3776AB', level:5, visible:true, yearAdopted:'2026', docsUrl:'https://fastapi.tiangolo.com',
    desc:'High-performance ML model serving with Python and FastAPI for production deployments.',
    longDesc:'FastAPI is our preferred framework for serving ML models and data APIs. Its async capabilities handle thousands of predictions per second with sub-10ms latency, making it perfect for real-time IoT and fraud detection pipelines.',
    usedIn:['Model APIs','Data Pipelines','Analytics Services','Microservices'],
    features:['Async by default','Auto API docs','Pydantic validation','WebSocket support','High performance'],
    relatedTech:['TensorFlow / PyTorch','Apache Kafka','Docker / Kubernetes'] },
  { id:'12', name:'Apache Kafka', icon:'🔄', category:'AI/ML', color:'#D4A017', level:4, visible:true, yearAdopted:'2026', docsUrl:'https://kafka.apache.org',
    desc:'Real-time data streaming platform for processing millions of events per second.',
    longDesc:'Kafka is our event streaming backbone. It connects IoT sensor networks, ML pipelines, and analytics dashboards in real time. We process up to 5 million events/day for our largest IoT deployments.',
    usedIn:['Live Analytics','Event Streaming','Data Lakes','IoT Pipelines'],
    features:['High throughput','Fault tolerance','Stream processing','Kafka Streams','Schema registry'],
    relatedTech:['TensorFlow / PyTorch','Python / FastAPI','InfluxDB'] },
  { id:'13', name:'Next.js / React', icon:'⚛️', category:'Frontend', color:'#61DAFB', level:5, visible:true, yearAdopted:'2026', docsUrl:'https://nextjs.org/docs',
    desc:'Production-ready React framework for building fast, scalable government and enterprise portals.',
    longDesc:'All our client-facing portals are built with Next.js for optimal performance and SEO. Server-side rendering ensures government portals load instantly even on slow connections. This very website is built with Next.js.',
    usedIn:['Gov Portals','Citizen Dashboards','Admin Panels','This Website'],
    features:['App Router','Server components','ISR/SSR/SSG','Image optimization','Edge runtime'],
    relatedTech:['TypeScript','Node.js / Express','Docker / Kubernetes'] },
  { id:'14', name:'TypeScript', icon:'📘', category:'Frontend', color:'#3178C6', level:5, visible:true, yearAdopted:'2026', docsUrl:'https://www.typescriptlang.org',
    desc:'Strongly typed JavaScript for building reliable, maintainable large-scale applications.',
    longDesc:'TypeScript is mandatory on all our projects. It catches bugs at compile time, dramatically reducing production issues. Our entire codebase — frontend, backend, and smart contracts — is written in TypeScript.',
    usedIn:['All Web Projects','APIs','Smart Contract ABIs','SDKs'],
    features:['Static typing','Type inference','Decorators','Strict mode','Advanced generics'],
    relatedTech:['Next.js / React','Node.js / Express'] },
  { id:'15', name:'Node.js / Express', icon:'🟢', category:'Backend', color:'#339933', level:5, visible:true, yearAdopted:'2026', docsUrl:'https://nodejs.org',
    desc:'Fast, scalable server-side JavaScript for building RESTful APIs and microservices.',
    longDesc:'Node.js powers our API layer with high concurrency and minimal memory footprint. Combined with Express, we build RESTful APIs that handle thousands of concurrent government portal users without breaking a sweat.',
    usedIn:['API Gateway','Microservices','Blockchain Middleware','Real-time Apps'],
    features:['Event-driven I/O','Cluster mode','JWT auth','Rate limiting','WebSocket support'],
    relatedTech:['TypeScript','PostgreSQL','Docker / Kubernetes'] },
  { id:'16', name:'PostgreSQL', icon:'🐘', category:'Backend', color:'#336791', level:5, visible:true, yearAdopted:'2026', docsUrl:'https://www.postgresql.org/docs',
    desc:'Powerful open-source relational database for complex government data management.',
    longDesc:'PostgreSQL is our primary relational database for government deployments. Its ACID compliance, row-level security, and PostGIS extension make it ideal for land records and geospatial government data.',
    usedIn:['Land Records','User Management','Reporting','Geospatial Data'],
    features:['ACID compliance','Row-level security','PostGIS extension','Full-text search','JSONB support'],
    relatedTech:['Node.js / Express','Docker / Kubernetes'] },
  { id:'17', name:'AWS / GCP', icon:'☁️', category:'Cloud', color:'#FF9900', level:4, visible:true, yearAdopted:'2026', docsUrl:'https://aws.amazon.com',
    desc:'Enterprise cloud infrastructure for scalable, secure, and compliant deployments.',
    longDesc:'We deploy on both AWS and GCP depending on client requirements. For government deployments, we use government cloud regions ensuring data sovereignty. Our multi-cloud approach avoids vendor lock-in.',
    usedIn:['Production Hosting','CI/CD Pipelines','Data Backups','ML Training'],
    features:['Multi-region','Auto scaling','IAM policies','VPC networking','Compliance certifications'],
    relatedTech:['Docker / Kubernetes','PostgreSQL','Node.js / Express'] },
  { id:'18', name:'Docker / Kubernetes', icon:'🐳', category:'Cloud', color:'#2496ED', level:4, visible:true, yearAdopted:'2026', docsUrl:'https://kubernetes.io/docs',
    desc:'Container orchestration for reliable, portable deployments across any infrastructure.',
    longDesc:'All our microservices are containerized with Docker and orchestrated with Kubernetes. This gives us zero-downtime deployments, automatic scaling, and the ability to deploy on-premise for government data residency requirements.',
    usedIn:['Microservices','Auto Scaling','DevOps','On-premise Gov Deployments'],
    features:['Zero-downtime deploys','Auto-scaling','Helm charts','Service mesh','GitOps with ArgoCD'],
    relatedTech:['AWS / GCP','Node.js / Express','Python / FastAPI'] },
];

const INIT_STATS: TechStat[] = [
  { id:'1', icon:'⚙️', val:'18+', label:'Technologies', color:'#D4A017' },
  { id:'2', icon:'🎯', val:'6',   label:'Tech Domains',  color:'#2196F3' },
  { id:'3', icon:'🏆', val:'5★',  label:'Expert Level',  color:'#2ECC40' },
  { id:'4', icon:'📊', val:'91%', label:'Avg Proficiency',color:'#F5A623' },
];

const SK = {
  techs:'tp_ts_techs', cats:'tp_ts_cats', stats:'tp_ts_stats',
};
const loadLS = <T,>(key:string,fallback:T):T => {
  if(typeof window==='undefined') return fallback;
  try{ const s=localStorage.getItem(key); return s?JSON.parse(s):fallback; }catch{ return fallback; }
};
const saveLS=(key:string,val:any)=>{ try{ localStorage.setItem(key,JSON.stringify(val)); }catch{} };

const COLOR_OPTIONS=['#D4A017','#2196F3','#2ECC40','#F5A623','#E91E63','#9C27B0','#FF5722','#00BCD4','#627EEA','#65C2CB','#22ADF6','#3776AB','#339933','#336791','#FF9900','#2496ED','#61DAFB','#3178C6'];
const ICON_OPTIONS=['⛓️','💎','🌐','🛡️','🔍','🎯','📡','📊','⚡','🤖','🐍','🔄','⚛️','📘','🟢','🐘','☁️','🐳','🔒','🔬','💡','🚀','⚙️','🔑','🧠','🦾','📱','🖥️','🔐','🌍'];

export default function TechStackShowcase({
  isAdmin = false,
  isMember = false,
}: {
  isAdmin?: boolean;
  isMember?: boolean;
}) {
  const [techs,   setTechs]   = useState<Tech[]>(INIT_TECHS);
  const [cats,    setCats]    = useState<CategoryConfig[]>(INIT_CATEGORIES);
  const [stats,   setStats]   = useState<TechStat[]>(INIT_STATS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQ,  setSearchQ]  = useState('');

  // Page view
  const [techPage, setTechPage] = useState<Tech|null>(null);

  // Admin modals
  const [showTechModal,  setShowTechModal]  = useState(false);
  const [showCatModal,   setShowCatModal]   = useState(false);
  const [showStatModal,  setShowStatModal]  = useState(false);
  const [editingTech,    setEditingTech]    = useState<Tech|null>(null);
  const [editingCat,     setEditingCat]     = useState<CategoryConfig|null>(null);
  const [editingStat,    setEditingStat]    = useState<TechStat|null>(null);
  const [delTech,        setDelTech]        = useState<string|null>(null);
  const [delCat,         setDelCat]         = useState<string|null>(null);

  // Member suggest modal
  const [showSuggest,    setShowSuggest]    = useState(false);
  const [suggestDraft,   setSuggestDraft]   = useState({ name:'', icon:'⚙️', category:'', desc:'' });
  const [suggestSuccess, setSuggestSuccess] = useState(false);

  // Drafts
  const BLANK_TECH: Omit<Tech,'id'> = { name:'', icon:'⚙️', category:'', desc:'', longDesc:'', usedIn:[''], features:[''], color:'#D4A017', level:4, docsUrl:'', relatedTech:[''], yearAdopted:'2026', visible:true };
  const [techDraft, setTechDraft] = useState<Omit<Tech,'id'>>(BLANK_TECH);
  const BLANK_CAT: Omit<CategoryConfig,'id'> = { name:'', color:'#2196F3', icon:'⚙️', desc:'' };
  const [catDraft,  setCatDraft]  = useState<Omit<CategoryConfig,'id'>>(BLANK_CAT);
  const BLANK_STAT: Omit<TechStat,'id'> = { icon:'⚙️', val:'', label:'', color:'#D4A017' };
  const [statDraft, setStatDraft] = useState<Omit<TechStat,'id'>>(BLANK_STAT);

  useEffect(()=>{
    setTechs(loadLS(SK.techs,INIT_TECHS));
    setCats(loadLS(SK.cats,INIT_CATEGORIES));
    setStats(loadLS(SK.stats,INIT_STATS));
  },[]);
  useEffect(()=>saveLS(SK.techs,techs),[techs]);
  useEffect(()=>saveLS(SK.cats,cats),[cats]);
  useEffect(()=>saveLS(SK.stats,stats),[stats]);

  // ---------- CRUD ----------
  const openAddTech = ()=>{ setEditingTech(null); setTechDraft(BLANK_TECH); setShowTechModal(true); };
  const openEditTech=(t:Tech)=>{ setEditingTech(t); setTechDraft({name:t.name,icon:t.icon,category:t.category,desc:t.desc,longDesc:t.longDesc,usedIn:[...t.usedIn],features:[...t.features],color:t.color,level:t.level,docsUrl:t.docsUrl,relatedTech:[...t.relatedTech],yearAdopted:t.yearAdopted,visible:t.visible}); setShowTechModal(true); };
  const saveTech=()=>{
    if(!techDraft.name.trim()) return;
    if(editingTech){ setTechs(prev=>prev.map(t=>t.id===editingTech.id?{...t,...techDraft}:t)); }
    else { setTechs(prev=>[...prev,{id:crypto.randomUUID(),...techDraft}]); }
    setShowTechModal(false);
  };
  const deleteTech=(id:string)=>{ setTechs(prev=>prev.filter(t=>t.id!==id)); setDelTech(null); if(techPage?.id===id) setTechPage(null); };

  const openAddCat=()=>{ setEditingCat(null); setCatDraft(BLANK_CAT); setShowCatModal(true); };
  const openEditCat=(c:CategoryConfig)=>{ setEditingCat(c); setCatDraft({name:c.name,color:c.color,icon:c.icon,desc:c.desc}); setShowCatModal(true); };
  const saveCat=()=>{
    if(!catDraft.name.trim()) return;
    if(editingCat){ setCats(prev=>prev.map(c=>c.id===editingCat.id?{...c,...catDraft}:c)); }
    else { setCats(prev=>[...prev,{id:crypto.randomUUID(),...catDraft}]); }
    setShowCatModal(false);
  };
  const deleteCat=(id:string)=>{ setCats(prev=>prev.filter(c=>c.id!==id)); setDelCat(null); };

  const openAddStat=()=>{ setEditingStat(null); setStatDraft(BLANK_STAT); setShowStatModal(true); };
  const openEditStat=(s:TechStat)=>{ setEditingStat(s); setStatDraft({icon:s.icon,val:s.val,label:s.label,color:s.color}); setShowStatModal(true); };
  const saveStat=()=>{
    if(!statDraft.val.trim()||!statDraft.label.trim()) return;
    if(editingStat){ setStats(prev=>prev.map(s=>s.id===editingStat.id?{...s,...statDraft}:s)); }
    else { setStats(prev=>[...prev,{id:crypto.randomUUID(),...statDraft}]); }
    setShowStatModal(false);
  };
  const deleteStat=(id:string)=>setStats(prev=>prev.filter(s=>s.id!==id));

  const submitSuggestion=()=>{
    if(!suggestDraft.name.trim()||!suggestDraft.desc.trim()) return;
    try{
      const existing=JSON.parse(localStorage.getItem('tp_tech_suggestions')||'[]');
      existing.push({...suggestDraft,id:crypto.randomUUID(),submittedAt:new Date().toLocaleString()});
      localStorage.setItem('tp_tech_suggestions',JSON.stringify(existing));
    }catch{}
    setSuggestSuccess(true);
    setTimeout(()=>{ setSuggestSuccess(false); setShowSuggest(false); setSuggestDraft({name:'',icon:'⚙️',category:'',desc:''}); },2500);
  };

  const catColor=(cat:string)=>cats.find(c=>c.name===cat)?.color||'#2196F3';
  const renderLevel=(level:number,color:string)=>(
    <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
      {[1,2,3,4,5].map(i=>(
        <div key={i} style={{width:'22px',height:'5px',borderRadius:'3px',background:i<=level?color:'rgba(255,255,255,.08)',boxShadow:i<=level?`0 0 6px ${color}88`:'none',transition:'all .3s'}}/>
      ))}
      <span style={{color:'rgba(255,255,255,.3)',fontSize:'10px',marginLeft:'6px',fontFamily:"'Space Mono',monospace"}}>{level}/5</span>
    </div>
  );

  const allFilter=['All',...cats.map(c=>c.name)];
  const filtered=techs.filter(t=>{
    if(!isAdmin && !t.visible) return false;
    if(activeFilter!=='All' && t.category!==activeFilter) return false;
    if(searchQ && !t.name.toLowerCase().includes(searchQ.toLowerCase()) && !t.category.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const inp={width:'100%',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'11px',padding:'12px 16px',color:'#fff',fontSize:'13px',outline:'none',boxSizing:'border-box' as const,fontFamily:"'Sora',sans-serif"};

  /* ══════════════════ TECH DETAIL PAGE ══════════════════ */
  if(techPage){
    const cat = cats.find(c=>c.name===techPage.category);
    const related = techs.filter(t=>techPage.relatedTech.includes(t.name));
    return(
      <div style={{minHeight:'100vh',background:'#020205',color:'#fff',fontFamily:"'Sora','Segoe UI',sans-serif",padding:'0'}}>
        <style>{`
          @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
          @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
          @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
          @keyframes glow{0%,100%{box-shadow:0 0 20px ${techPage.color}44}50%{box-shadow:0 0 60px ${techPage.color}88}}
          .detail-section{animation:fadeUp .6s ease both}
          .feature-chip{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.7);padding:8px 16px;border-radius:50px;font-size:11px;transition:all .3s;cursor:default}
          .feature-chip:hover{background:${techPage.color}15;border-color:${techPage.color}40;color:${techPage.color}}
          .related-card{background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:18px;cursor:pointer;transition:all .35s}
          .related-card:hover{transform:translateY(-6px);border-color:rgba(212,160,23,.35);background:rgba(255,255,255,.04)}
          ::-webkit-scrollbar{width:2px}::-webkit-scrollbar-thumb{background:#D4A017}
        `}</style>

        {/* Hero */}
        <div style={{background:`radial-gradient(ellipse at top,${techPage.color}18 0%,transparent 65%)`,borderBottom:`1px solid ${techPage.color}20`,padding:'60px 60px 50px',position:'relative',overflow:'hidden'}}>
          {/* Background grid */}
          <div style={{position:'absolute',inset:0,backgroundImage:`linear-gradient(${techPage.color}08 1px,transparent 1px),linear-gradient(90deg,${techPage.color}08 1px,transparent 1px)`,backgroundSize:'40px 40px',pointerEvents:'none'}}/>

          <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:1}}>
            {/* Back button */}
            <button onClick={()=>setTechPage(null)} style={{background:'rgba(255,255,255,.05)',border:`1px solid ${techPage.color}30`,color:techPage.color,padding:'8px 20px',borderRadius:'50px',cursor:'pointer',fontSize:'11px',fontFamily:"'Space Mono',monospace",letterSpacing:'2px',marginBottom:'36px',display:'flex',alignItems:'center',gap:'8px',transition:'all .3s'}}
              onMouseEnter={e=>(e.currentTarget.style.background=`${techPage.color}15`)}
              onMouseLeave={e=>(e.currentTarget.style.background='rgba(255,255,255,.05)')}>
              ← BACK TO TECH STACK
            </button>

            <div style={{display:'flex',gap:'32px',alignItems:'flex-start',flexWrap:'wrap'}}>
              {/* Big icon */}
              <div style={{width:'100px',height:'100px',background:`radial-gradient(circle,${techPage.color}25,${techPage.color}06)`,border:`2px solid ${techPage.color}35`,borderRadius:'24px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'48px',flexShrink:0,animation:'glow 3s ease-in-out infinite',boxShadow:`0 0 40px ${techPage.color}22`}}>
                {techPage.icon}
              </div>
              <div style={{flex:1,minWidth:'280px'}}>
                {/* Category badge */}
                <div style={{display:'flex',gap:'10px',alignItems:'center',marginBottom:'14px',flexWrap:'wrap'}}>
                  <span style={{background:`${techPage.color}18`,border:`1px solid ${techPage.color}35`,color:techPage.color,padding:'4px 14px',borderRadius:'50px',fontSize:'9px',fontFamily:"'Space Mono',monospace",letterSpacing:'3px',fontWeight:700}}>{techPage.category.toUpperCase()}</span>
                  <span style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.4)',padding:'4px 12px',borderRadius:'50px',fontSize:'9px',fontFamily:"'Space Mono',monospace",letterSpacing:'2px'}}>SINCE {techPage.yearAdopted}</span>
                  {!techPage.visible&&<span style={{background:'rgba(244,67,54,.08)',border:'1px solid rgba(244,67,54,.2)',color:'#f44336',padding:'4px 12px',borderRadius:'50px',fontSize:'9px',fontFamily:"'Space Mono',monospace"}}>HIDDEN</span>}
                </div>
                <h1 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:'#fff',marginBottom:'14px',lineHeight:1.1}}>{techPage.name}</h1>
                <div style={{marginBottom:'18px'}}>{renderLevel(techPage.level,techPage.color)}</div>
                <p style={{color:'rgba(255,255,255,.55)',fontSize:'15px',lineHeight:1.9,maxWidth:'600px'}}>{techPage.desc}</p>
                <div style={{display:'flex',gap:'12px',marginTop:'24px',flexWrap:'wrap'}}>
                  {techPage.docsUrl&&<a href={techPage.docsUrl} target="_blank" rel="noopener noreferrer" style={{background:`linear-gradient(135deg,${techPage.color},${techPage.color}bb)`,border:'none',borderRadius:'50px',padding:'11px 28px',color:'#000',fontWeight:800,fontSize:'10px',cursor:'pointer',letterSpacing:'2px',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'8px'}}>📖 VIEW DOCS →</a>}
                  {(isAdmin||isMember)&&<button onClick={()=>openEditTech(techPage)} style={{background:'transparent',border:`1px solid ${techPage.color}40`,color:techPage.color,borderRadius:'50px',padding:'11px 28px',fontSize:'10px',cursor:'pointer',letterSpacing:'2px',fontFamily:"'Space Mono',monospace",fontWeight:700}}>✏ EDIT</button>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{maxWidth:'1100px',margin:'0 auto',padding:'60px 60px',display:'grid',gridTemplateColumns:'1fr 340px',gap:'40px',alignItems:'start'}}>
          {/* Left column */}
          <div>
            {/* Long description */}
            <div className="detail-section" style={{background:`${techPage.color}06`,border:`1px solid ${techPage.color}18`,borderRadius:'20px',padding:'32px',marginBottom:'32px',animationDelay:'.1s'}}>
              <h2 style={{color:techPage.color,fontSize:'11px',fontFamily:"'Space Mono',monospace",letterSpacing:'5px',marginBottom:'18px'}}>OVERVIEW</h2>
              <p style={{color:'rgba(255,255,255,.75)',fontSize:'15px',lineHeight:2}}>{techPage.longDesc}</p>
            </div>

            {/* Features */}
            <div className="detail-section" style={{marginBottom:'32px',animationDelay:'.2s'}}>
              <h2 style={{color:'rgba(255,255,255,.5)',fontSize:'11px',fontFamily:"'Space Mono',monospace",letterSpacing:'5px',marginBottom:'18px'}}>⚙️ KEY CAPABILITIES</h2>
              <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                {techPage.features.map((f,i)=>(
                  <span key={i} className="feature-chip">{f}</span>
                ))}
              </div>
            </div>

            {/* Used In */}
            <div className="detail-section" style={{marginBottom:'32px',animationDelay:'.3s'}}>
              <h2 style={{color:'rgba(255,255,255,.5)',fontSize:'11px',fontFamily:"'Space Mono',monospace",letterSpacing:'5px',marginBottom:'18px'}}>🏗️ DEPLOYED IN</h2>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'12px'}}>
                {techPage.usedIn.map((u,i)=>(
                  <div key={i} style={{background:'rgba(255,255,255,.03)',border:`1px solid ${techPage.color}20`,borderRadius:'12px',padding:'14px 18px',display:'flex',gap:'10px',alignItems:'center'}}>
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:techPage.color,boxShadow:`0 0 8px ${techPage.color}`,flexShrink:0}}/>
                    <span style={{color:'rgba(255,255,255,.7)',fontSize:'13px'}}>{u}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            {related.length>0&&(
              <div className="detail-section" style={{animationDelay:'.4s'}}>
                <h2 style={{color:'rgba(255,255,255,.5)',fontSize:'11px',fontFamily:"'Space Mono',monospace",letterSpacing:'5px',marginBottom:'18px'}}>🔗 RELATED TECHNOLOGIES</h2>
                <div style={{display:'flex',gap:'14px',flexWrap:'wrap'}}>
                  {related.map(r=>(
                    <div key={r.id} className="related-card" onClick={()=>setTechPage(r)} style={{display:'flex',gap:'14px',alignItems:'center',flex:'1 1 200px'}}>
                      <div style={{width:'44px',height:'44px',background:`radial-gradient(circle,${r.color}20,${r.color}05)`,border:`1px solid ${r.color}25`,borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>{r.icon}</div>
                      <div>
                        <div style={{color:'#fff',fontWeight:600,fontSize:'13px'}}>{r.name}</div>
                        <div style={{color:catColor(r.category),fontSize:'9px',fontFamily:"'Space Mono',monospace",marginTop:'2px'}}>{r.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            {/* Stats card */}
            <div className="detail-section" style={{background:'rgba(255,255,255,.025)',border:`1px solid ${techPage.color}20`,borderRadius:'20px',padding:'24px',animationDelay:'.15s'}}>
              <h3 style={{color:techPage.color,fontSize:'10px',fontFamily:"'Space Mono',monospace",letterSpacing:'4px',marginBottom:'18px'}}>QUICK STATS</h3>
              {[
                {label:'Category', val:techPage.category, color:techPage.color},
                {label:'Proficiency', val:`${techPage.level}/5`, color:techPage.color},
                {label:'Year Adopted', val:techPage.yearAdopted, color:'rgba(255,255,255,.6)'},
                {label:'Used In', val:`${techPage.usedIn.length} projects`, color:'rgba(255,255,255,.6)'},
                {label:'Related Tech', val:`${techPage.relatedTech.length} technologies`, color:'rgba(255,255,255,.6)'},
              ].map(({label,val,color})=>(
                <div key={label} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,.05)'}}>
                  <span style={{color:'rgba(255,255,255,.35)',fontSize:'11px',fontFamily:"'Space Mono',monospace"}}>{label}</span>
                  <span style={{color,fontSize:'12px',fontWeight:600}}>{val}</span>
                </div>
              ))}
            </div>

            {/* Proficiency visualization */}
            <div className="detail-section" style={{background:'rgba(255,255,255,.025)',border:`1px solid rgba(255,255,255,.07)`,borderRadius:'20px',padding:'24px',animationDelay:'.25s'}}>
              <h3 style={{color:'rgba(255,255,255,.5)',fontSize:'10px',fontFamily:"'Space Mono',monospace",letterSpacing:'4px',marginBottom:'18px'}}>PROFICIENCY</h3>
              <div style={{textAlign:'center',marginBottom:'16px'}}>
                <div style={{fontSize:'48px',fontWeight:900,color:techPage.color,fontFamily:"'Space Mono',monospace",lineHeight:1}}>{techPage.level * 20}%</div>
                <div style={{color:'rgba(255,255,255,.3)',fontSize:'10px',marginTop:'6px'}}>Expertise Level</div>
              </div>
              <div style={{height:'8px',background:'rgba(255,255,255,.06)',borderRadius:'4px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${techPage.level*20}%`,background:`linear-gradient(90deg,${techPage.color},${techPage.color}88)`,borderRadius:'4px',boxShadow:`0 0 12px ${techPage.color}88`,transition:'width 1s ease'}}/>
              </div>
              <div style={{marginTop:'14px'}}>{renderLevel(techPage.level,techPage.color)}</div>
            </div>

            {/* CTA */}
            <div className="detail-section" style={{background:`linear-gradient(135deg,${techPage.color}12,${techPage.color}06)`,border:`1px solid ${techPage.color}25`,borderRadius:'20px',padding:'24px',textAlign:'center',animationDelay:'.35s'}}>
              <div style={{fontSize:'32px',marginBottom:'10px'}}>🚀</div>
              <h3 style={{color:'#fff',fontSize:'15px',fontWeight:700,marginBottom:'8px'}}>Use this in your project?</h3>
              <p style={{color:'rgba(255,255,255,.4)',fontSize:'11px',lineHeight:1.7,marginBottom:'16px'}}>Book a free consultation to discuss how {techPage.name} can transform your organization.</p>
              <a href="#contact" onClick={()=>setTechPage(null)} style={{background:`linear-gradient(135deg,${techPage.color},${techPage.color}bb)`,border:'none',borderRadius:'50px',padding:'11px 24px',color:'#000',fontWeight:800,fontSize:'10px',cursor:'pointer',letterSpacing:'2px',textDecoration:'none',display:'inline-block'}}>BOOK FREE DEMO →</a>
            </div>

            {/* Admin controls in sidebar */}
            {isAdmin&&(
              <div className="detail-section" style={{background:'rgba(212,160,23,.05)',border:'1px solid rgba(212,160,23,.2)',borderRadius:'20px',padding:'20px',animationDelay:'.4s'}}>
                <h3 style={{color:'#D4A017',fontSize:'10px',fontFamily:"'Space Mono',monospace",letterSpacing:'3px',marginBottom:'14px'}}>🔐 ADMIN</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  <button onClick={()=>openEditTech(techPage)} style={{background:'transparent',border:'1px solid rgba(212,160,23,.3)',color:'#D4A017',padding:'9px',borderRadius:'10px',cursor:'pointer',fontSize:'10px',fontFamily:"'Space Mono',monospace",fontWeight:700}}>✏ EDIT THIS TECH</button>
                  <button onClick={()=>setTechs(prev=>prev.map(t=>t.id===techPage.id?{...t,visible:!t.visible}:t))} style={{background:'transparent',border:'1px solid rgba(255,255,255,.1)',color:'rgba(255,255,255,.4)',padding:'9px',borderRadius:'10px',cursor:'pointer',fontSize:'10px',fontFamily:"'Space Mono',monospace"}}>
                    {techPage.visible?'👁 HIDE FROM USERS':'👁 SHOW TO USERS'}
                  </button>
                  <button onClick={()=>setDelTech(techPage.id)} style={{background:'transparent',border:'1px solid rgba(244,67,54,.2)',color:'#f44336',padding:'9px',borderRadius:'10px',cursor:'pointer',fontSize:'10px',fontFamily:"'Space Mono',monospace",fontWeight:700}}>✕ DELETE TECH</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit modal shown on detail page too */}
        {showTechModal&&<TechEditModal/>}
        {delTech&&<DeleteConfirm id={delTech} onConfirm={deleteTech} onCancel={()=>setDelTech(null)} label="Delete this technology? This cannot be undone."/>}
      </div>
    );
  }

  /* ══════════════════ TECH EDIT MODAL ══════════════════ */
  function TechEditModal(){
    return(
      <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.92)',backdropFilter:'blur(20px)',zIndex:10001,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',overflowY:'auto'}} onClick={()=>setShowTechModal(false)}>
        <div style={{background:'#050510',border:'1px solid rgba(212,160,23,.25)',borderRadius:'24px',padding:'36px',maxWidth:'660px',width:'100%',maxHeight:'92vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
          <h3 style={{color:'#fff',fontSize:'20px',fontWeight:800,marginBottom:'24px'}}>{editingTech?'✏ Edit Technology':'+ Add Technology'}</h3>
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {/* Icon + Name */}
            <div style={{display:'grid',gridTemplateColumns:'60px 1fr',gap:'10px'}}>
              <select value={techDraft.icon} onChange={e=>setTechDraft({...techDraft,icon:e.target.value})} style={{...inp,padding:'8px',fontSize:'22px',textAlign:'center'}}>
                {ICON_OPTIONS.map(i=><option key={i} value={i}>{i}</option>)}
              </select>
              <input style={inp} placeholder="Technology Name *" value={techDraft.name} onChange={e=>setTechDraft({...techDraft,name:e.target.value})}/>
            </div>
            {/* Category + Year */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
              <select style={inp} value={techDraft.category} onChange={e=>setTechDraft({...techDraft,category:e.target.value})}>
                <option value="">Select category *</option>
                {cats.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
              <input style={inp} placeholder="Year Adopted (e.g. 2026)" value={techDraft.yearAdopted} onChange={e=>setTechDraft({...techDraft,yearAdopted:e.target.value})}/>
            </div>
            <textarea style={{...inp,resize:'vertical' as const}} rows={2} placeholder="Short description *" value={techDraft.desc} onChange={e=>setTechDraft({...techDraft,desc:e.target.value})}/>
            <textarea style={{...inp,resize:'vertical' as const}} rows={4} placeholder="Long description (shown on detail page)" value={techDraft.longDesc} onChange={e=>setTechDraft({...techDraft,longDesc:e.target.value})}/>
            <input style={inp} placeholder="Docs URL (e.g. https://...)" value={techDraft.docsUrl} onChange={e=>setTechDraft({...techDraft,docsUrl:e.target.value})}/>

            {/* Proficiency */}
            <div>
              <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>PROFICIENCY LEVEL: {techDraft.level}/5</label>
              <input type="range" min="1" max="5" value={techDraft.level} onChange={e=>setTechDraft({...techDraft,level:parseInt(e.target.value)})} style={{width:'100%',accentColor:techDraft.color}}/>
              <div style={{marginTop:'6px'}}>{renderLevel(techDraft.level,techDraft.color)}</div>
            </div>

            {/* Color */}
            <div>
              <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>ACCENT COLOR:</label>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                {COLOR_OPTIONS.map(c=><div key={c} onClick={()=>setTechDraft({...techDraft,color:c})} style={{width:'28px',height:'28px',borderRadius:'50%',background:c,cursor:'pointer',border:`3px solid ${techDraft.color===c?'#fff':'transparent'}`,transition:'all .2s'}}/>)}
              </div>
            </div>

            {/* Used In */}
            <div>
              <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'6px',fontFamily:"'Space Mono',monospace"}}>USED IN (projects/use cases):</label>
              {techDraft.usedIn.map((u,i)=>(
                <div key={i} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
                  <input style={inp} value={u} onChange={e=>{const n=[...techDraft.usedIn];n[i]=e.target.value;setTechDraft({...techDraft,usedIn:n});}} placeholder={`Use case ${i+1}`}/>
                  <button onClick={()=>setTechDraft({...techDraft,usedIn:techDraft.usedIn.filter((_,idx)=>idx!==i)})} style={{background:'rgba(244,67,54,.2)',border:'none',borderRadius:'8px',color:'#f44336',padding:'0 12px',cursor:'pointer',fontSize:'16px',height:'42px',flexShrink:0}}>✕</button>
                </div>
              ))}
              <button onClick={()=>setTechDraft({...techDraft,usedIn:[...techDraft.usedIn,'']})} style={{background:'transparent',border:'1px solid rgba(212,160,23,.3)',color:'#D4A017',padding:'6px 14px',borderRadius:'8px',fontSize:'10px',cursor:'pointer'}}>+ Add Use Case</button>
            </div>

            {/* Features */}
            <div>
              <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'6px',fontFamily:"'Space Mono',monospace"}}>KEY FEATURES / CAPABILITIES:</label>
              {techDraft.features.map((f,i)=>(
                <div key={i} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
                  <input style={inp} value={f} onChange={e=>{const n=[...techDraft.features];n[i]=e.target.value;setTechDraft({...techDraft,features:n});}} placeholder={`Feature ${i+1}`}/>
                  <button onClick={()=>setTechDraft({...techDraft,features:techDraft.features.filter((_,idx)=>idx!==i)})} style={{background:'rgba(244,67,54,.2)',border:'none',borderRadius:'8px',color:'#f44336',padding:'0 12px',cursor:'pointer',fontSize:'16px',height:'42px',flexShrink:0}}>✕</button>
                </div>
              ))}
              <button onClick={()=>setTechDraft({...techDraft,features:[...techDraft.features,'']})} style={{background:'transparent',border:'1px solid rgba(212,160,23,.3)',color:'#D4A017',padding:'6px 14px',borderRadius:'8px',fontSize:'10px',cursor:'pointer'}}>+ Add Feature</button>
            </div>

            {/* Related Tech */}
            <div>
              <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'6px',fontFamily:"'Space Mono',monospace"}}>RELATED TECHNOLOGIES (names):</label>
              {techDraft.relatedTech.map((r,i)=>(
                <div key={i} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
                  <input style={inp} value={r} onChange={e=>{const n=[...techDraft.relatedTech];n[i]=e.target.value;setTechDraft({...techDraft,relatedTech:n});}} placeholder="Related tech name (must match exactly)"/>
                  <button onClick={()=>setTechDraft({...techDraft,relatedTech:techDraft.relatedTech.filter((_,idx)=>idx!==i)})} style={{background:'rgba(244,67,54,.2)',border:'none',borderRadius:'8px',color:'#f44336',padding:'0 12px',cursor:'pointer',fontSize:'16px',height:'42px',flexShrink:0}}>✕</button>
                </div>
              ))}
              <button onClick={()=>setTechDraft({...techDraft,relatedTech:[...techDraft.relatedTech,'']})} style={{background:'transparent',border:'1px solid rgba(212,160,23,.3)',color:'#D4A017',padding:'6px 14px',borderRadius:'8px',fontSize:'10px',cursor:'pointer'}}>+ Add Related Tech</button>
            </div>

            {/* Visible */}
            <label style={{display:'flex',alignItems:'center',gap:'10px',color:'rgba(255,255,255,.6)',fontSize:'13px',cursor:'pointer'}}>
              <input type="checkbox" checked={techDraft.visible} onChange={e=>setTechDraft({...techDraft,visible:e.target.checked})} style={{accentColor:'#D4A017'}}/>
              Visible to users (uncheck to hide)
            </label>

            <div style={{display:'flex',gap:'10px',marginTop:'8px'}}>
              <button onClick={saveTech} style={{flex:2,background:'linear-gradient(135deg,#D4A017,#F5A623)',border:'none',borderRadius:'12px',padding:'14px',color:'#000',fontWeight:800,fontSize:'12px',cursor:'pointer',letterSpacing:'2px'}}>💾 SAVE</button>
              <button onClick={()=>setShowTechModal(false)} style={{flex:1,background:'transparent',border:'1px solid rgba(255,255,255,.1)',borderRadius:'12px',padding:'14px',color:'rgba(255,255,255,.4)',cursor:'pointer'}}>CANCEL</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════ DELETE CONFIRM ══════════════════ */
  function DeleteConfirm({id,onConfirm,onCancel,label}:{id:string;onConfirm:(id:string)=>void;onCancel:()=>void;label:string}){
    return(
      <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.92)',backdropFilter:'blur(20px)',zIndex:10002,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}} onClick={onCancel}>
        <div style={{background:'#050510',border:'1px solid rgba(244,67,54,.3)',borderRadius:'24px',padding:'36px',maxWidth:'420px',width:'100%',textAlign:'center'}} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:'44px',marginBottom:'16px'}}>⚠️</div>
          <h3 style={{color:'#fff',marginBottom:'12px'}}>Confirm Delete</h3>
          <p style={{color:'rgba(255,255,255,.4)',fontSize:'13px',marginBottom:'24px'}}>{label}</p>
          <div style={{display:'flex',gap:'12px'}}>
            <button onClick={()=>onConfirm(id)} style={{flex:1,padding:'12px',background:'#f44336',color:'#fff',border:'none',borderRadius:'12px',cursor:'pointer',fontWeight:700}}>DELETE</button>
            <button onClick={onCancel} style={{flex:1,padding:'12px',background:'transparent',border:'1px solid rgba(255,255,255,.1)',borderRadius:'12px',color:'rgba(255,255,255,.4)',cursor:'pointer'}}>CANCEL</button>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════ MAIN GRID PAGE ══════════════════ */
  return(
    <section id="tech-stack" style={{padding:'100px 60px',background:'rgba(33,150,243,.015)',position:'relative',zIndex:1}}>
      <style>{`
        @keyframes techReveal{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        .tech-card{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.07);border-radius:18px;padding:22px 18px;cursor:pointer;transition:all .3s cubic-bezier(.23,1,.32,1);position:relative;overflow:hidden}
        .tech-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top left,var(--tc) 0%,transparent 60%);opacity:0;transition:opacity .35s}
        .tech-card:hover{transform:translateY(-8px) scale(1.02);border-color:var(--tb) !important;box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 40px var(--tg)}
        .tech-card:hover::before{opacity:1}
        .cat-btn{padding:7px 18px;border-radius:50px;font-size:9px;font-family:'Space Mono',monospace;letter-spacing:2px;font-weight:700;cursor:pointer;transition:all .25s}
        .cat-btn:hover{transform:translateY(-2px)}
      `}</style>

      <div style={{maxWidth:'1200px',margin:'0 auto'}}>

        {/* Header */}
        <div style={{textAlign:'center',marginBottom:'50px'}}>
          <span style={{fontFamily:"'Space Mono',monospace",color:'rgba(33,150,243,.7)',fontSize:'8.5px',letterSpacing:'7px',display:'block',marginBottom:'12px',fontWeight:700}}>OUR ARSENAL</span>
          <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:'#fff',marginBottom:'12px'}}>Technology Stack</h2>
          <p style={{color:'rgba(255,255,255,.4)',fontSize:'14px',maxWidth:'500px',margin:'0 auto'}}>The cutting-edge tools and frameworks powering our blockchain, cybersecurity, IoT, and AI solutions.</p>

          {/* Admin toolbar */}
          {isAdmin&&(
            <div style={{display:'flex',gap:'8px',justifyContent:'center',marginTop:'20px',flexWrap:'wrap'}}>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:'8px',color:'rgba(212,160,23,.5)',letterSpacing:'2px',alignSelf:'center'}}>🔐 ADMIN</span>
              <button onClick={openAddTech} style={{background:'transparent',border:'1px solid rgba(212,160,23,.3)',color:'#D4A017',padding:'6px 16px',borderRadius:'8px',fontSize:'9px',cursor:'pointer',fontFamily:"'Space Mono',monospace",fontWeight:700}}>+ ADD TECH</button>
              <button onClick={openAddCat} style={{background:'transparent',border:'1px solid rgba(212,160,23,.3)',color:'#D4A017',padding:'6px 16px',borderRadius:'8px',fontSize:'9px',cursor:'pointer',fontFamily:"'Space Mono',monospace",fontWeight:700}}>+ ADD CATEGORY</button>
              <button onClick={openAddStat} style={{background:'transparent',border:'1px solid rgba(212,160,23,.3)',color:'#D4A017',padding:'6px 16px',borderRadius:'8px',fontSize:'9px',cursor:'pointer',fontFamily:"'Space Mono',monospace",fontWeight:700}}>+ ADD STAT</button>
            </div>
          )}
          {/* Member suggest */}
          {isMember&&!isAdmin&&(
            <div style={{marginTop:'16px'}}>
              <button onClick={()=>setShowSuggest(true)} style={{background:'rgba(33,150,243,.1)',border:'1px solid rgba(33,150,243,.3)',color:'#2196F3',padding:'7px 18px',borderRadius:'50px',fontSize:'9px',cursor:'pointer',fontFamily:"'Space Mono',monospace",fontWeight:700}}>💡 SUGGEST A TECHNOLOGY</button>
            </div>
          )}
        </div>

        {/* Search + Filter */}
        <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap',marginBottom:'36px',alignItems:'center'}}>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'rgba(255,255,255,.3)',fontSize:'14px'}}>🔍</span>
            <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search technologies..." style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'50px',padding:'10px 16px 10px 40px',color:'#fff',fontSize:'12px',outline:'none',width:'250px'}}/>
          </div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap',justifyContent:'center'}}>
            {allFilter.map(cat=>{
              const cc=cats.find(c=>c.name===cat);
              const isActive=activeFilter===cat;
              const col=cc?.color||'#2196F3';
              return(
                <button key={cat} onClick={()=>setActiveFilter(cat)} className="cat-btn"
                  style={{background:isActive?`${col}18`:'rgba(255,255,255,.03)',border:`1px solid ${isActive?col:'rgba(255,255,255,.08)'}`,color:isActive?col:'rgba(255,255,255,.4)'}}>
                  {cc?.icon||'🔘'} {cat.toUpperCase()}
                  {isAdmin&&cat!=='All'&&<span onClick={e=>{e.stopPropagation();openEditCat(cc!);}} style={{marginLeft:'6px',opacity:.6,fontSize:'8px'}}>✏</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category info */}
        {activeFilter!=='All'&&(()=>{
          const cc=cats.find(c=>c.name===activeFilter);
          if(!cc) return null;
          return(
            <div style={{background:`${cc.color}06`,border:`1px solid ${cc.color}18`,borderRadius:'14px',padding:'16px 24px',marginBottom:'28px',display:'flex',gap:'14px',alignItems:'center'}}>
              <span style={{fontSize:'24px'}}>{cc.icon}</span>
              <div>
                <div style={{color:cc.color,fontWeight:700,fontSize:'14px'}}>{cc.name}</div>
                <div style={{color:'rgba(255,255,255,.4)',fontSize:'12px',marginTop:'2px'}}>{cc.desc}</div>
              </div>
              {isAdmin&&<button onClick={()=>openEditCat(cc)} style={{marginLeft:'auto',background:'transparent',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',padding:'5px 12px',borderRadius:'6px',fontSize:'9px',cursor:'pointer',fontFamily:"'Space Mono',monospace"}}>✏ EDIT</button>}
            </div>
          );
        })()}

        {/* Tech grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'14px'}}>
          {filtered.map((tech,i)=>{
            const cc=catColor(tech.category);
            return(
              <div key={tech.id} className="tech-card"
                style={{'--tc':`${tech.color}08`,'--tb':`${tech.color}50`,'--tg':`${tech.color}18`,opacity:tech.visible?1:.5,animationDelay:`${i*.04}s`,animation:'techReveal .5s ease both'} as React.CSSProperties}
                onClick={()=>setTechPage(tech)}>
                {/* Hidden badge */}
                {isAdmin&&!tech.visible&&<div style={{position:'absolute',top:'8px',left:'8px',background:'rgba(244,67,54,.15)',border:'1px solid rgba(244,67,54,.3)',color:'#f44336',padding:'2px 8px',borderRadius:'4px',fontSize:'7px',fontFamily:"'Space Mono',monospace"}}>HIDDEN</div>}
                {/* Category dot */}
                <div style={{position:'absolute',top:'12px',right:'12px',width:'8px',height:'8px',borderRadius:'50%',background:cc,boxShadow:`0 0 10px ${cc}`}}/>
                {/* Icon */}
                <div style={{width:'52px',height:'52px',background:`radial-gradient(circle,${tech.color}22,${tech.color}06)`,border:`1px solid ${tech.color}26`,borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',marginBottom:'14px',transition:'all .3s'}}>{tech.icon}</div>
                {/* Name */}
                <div style={{color:'#fff',fontSize:'13px',fontWeight:700,marginBottom:'8px',lineHeight:1.3}}>{tech.name}</div>
                {/* Level bar */}
                <div style={{display:'flex',gap:'3px',marginBottom:'10px'}}>
                  {[1,2,3,4,5].map(i=><div key={i} style={{flex:1,height:'4px',borderRadius:'2px',background:i<=tech.level?tech.color:'rgba(255,255,255,.07)',boxShadow:i<=tech.level?`0 0 5px ${tech.color}88`:'none'}}/>)}
                </div>
                {/* Category chip */}
                <div style={{background:`${cc}12`,border:`1px solid ${cc}20`,color:cc,padding:'3px 9px',borderRadius:'50px',fontSize:'8px',fontFamily:"'Space Mono',monospace",letterSpacing:'1.5px',display:'inline-block',marginBottom:'10px'}}>{tech.category}</div>
                {/* Short desc */}
                <p style={{color:'rgba(255,255,255,.35)',fontSize:'10px',lineHeight:1.6,marginBottom:'12px'}}>{tech.desc.slice(0,65)}...</p>
                {/* View button */}
                <div style={{color:tech.color,fontSize:'9px',fontFamily:"'Space Mono',monospace",fontWeight:700,letterSpacing:'1.5px',display:'flex',alignItems:'center',gap:'4px'}}>
                  VIEW DETAILS <span style={{fontSize:'11px'}}>→</span>
                </div>
                {/* Admin controls */}
                {isAdmin&&(
                  <div style={{display:'flex',gap:'6px',marginTop:'10px',borderTop:'1px solid rgba(255,255,255,.05)',paddingTop:'10px'}} onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>openEditTech(tech)} style={{flex:1,background:'transparent',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',padding:'4px',borderRadius:'6px',fontSize:'8px',cursor:'pointer',fontFamily:"'Space Mono',monospace"}}>✏</button>
                    <button onClick={()=>setTechs(prev=>prev.map(t=>t.id===tech.id?{...t,visible:!t.visible}:t))} style={{flex:1,background:'transparent',border:'1px solid rgba(255,255,255,.1)',color:'rgba(255,255,255,.35)',padding:'4px',borderRadius:'6px',fontSize:'8px',cursor:'pointer',fontFamily:"'Space Mono',monospace"}}>{tech.visible?'👁':'🚫'}</button>
                    <button onClick={()=>setDelTech(tech.id)} style={{flex:1,background:'transparent',border:'1px solid rgba(244,67,54,.2)',color:'#f44336',padding:'4px',borderRadius:'6px',fontSize:'8px',cursor:'pointer',fontFamily:"'Space Mono',monospace"}}>✕</button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add card */}
          {isAdmin&&(
            <button onClick={openAddTech} style={{background:'rgba(212,160,23,.025)',border:'2px dashed rgba(212,160,23,.22)',borderRadius:'18px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'12px',cursor:'pointer',minHeight:'200px',transition:'all .4s'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(212,160,23,.07)';(e.currentTarget as HTMLButtonElement).style.borderColor='#D4A017';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background='rgba(212,160,23,.025)';(e.currentTarget as HTMLButtonElement).style.borderColor='rgba(212,160,23,.22)';}}>
              <div style={{width:'52px',height:'52px',borderRadius:'50%',background:'rgba(212,160,23,.07)',border:'2px dashed rgba(212,160,23,.32)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',color:'#D4A017'}}>+</div>
              <div style={{color:'rgba(212,160,23,.7)',fontFamily:"'Space Mono',monospace",fontSize:'9px',letterSpacing:'2px'}}>ADD TECH</div>
            </button>
          )}
        </div>

        {filtered.length===0&&(
          <div style={{textAlign:'center',padding:'80px',color:'rgba(255,255,255,.3)'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🔍</div>
            <p>No technologies found. Try a different search or filter.</p>
            {searchQ&&<button onClick={()=>setSearchQ('')} style={{marginTop:'12px',background:'transparent',border:'1px solid rgba(33,150,243,.3)',color:'#2196F3',padding:'8px 20px',borderRadius:'50px',cursor:'pointer',fontSize:'11px'}}>Clear Search</button>}
          </div>
        )}

        {/* Stats row */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'16px',marginTop:'50px'}}>
          {stats.map(s=>(
            <div key={s.id} style={{background:'rgba(255,255,255,.025)',border:`1px solid ${s.color}18`,borderRadius:'16px',padding:'22px',textAlign:'center',transition:'all .3s',position:'relative',cursor:isAdmin?'pointer':'default'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=`${s.color}40`;(e.currentTarget as HTMLDivElement).style.transform='translateY(-5px)';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLDivElement).style.borderColor=`${s.color}18`;(e.currentTarget as HTMLDivElement).style.transform='translateY(0)';}}>
              {isAdmin&&<button onClick={()=>openEditStat(s)} style={{position:'absolute',top:'8px',right:'8px',background:'none',border:'none',color:'rgba(212,160,23,.4)',cursor:'pointer',fontSize:'10px'}}>✏</button>}
              <div style={{fontSize:'26px',marginBottom:'8px'}}>{s.icon}</div>
              <div style={{color:s.color,fontSize:'26px',fontWeight:900,fontFamily:"'Space Mono',monospace",lineHeight:1}}>{s.val}</div>
              <div style={{color:'rgba(255,255,255,.3)',fontSize:'9px',letterSpacing:'2.5px',marginTop:'8px',fontFamily:"'Space Mono',monospace"}}>{s.label.toUpperCase()}</div>
              {isAdmin&&<button onClick={()=>deleteStat(s.id)} style={{position:'absolute',bottom:'8px',right:'8px',background:'none',border:'none',color:'rgba(244,67,54,.35)',cursor:'pointer',fontSize:'9px'}}>✕</button>}
            </div>
          ))}
        </div>
      </div>

      {/* ══ MODALS ══ */}

      {/* Tech Edit Modal */}
      {showTechModal&&<TechEditModal/>}

      {/* Category Modal */}
      {showCatModal&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.92)',backdropFilter:'blur(20px)',zIndex:10001,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}} onClick={()=>setShowCatModal(false)}>
          <div style={{background:'#050510',border:'1px solid rgba(212,160,23,.25)',borderRadius:'24px',padding:'36px',maxWidth:'480px',width:'100%'}} onClick={e=>e.stopPropagation()}>
            <h3 style={{color:'#fff',fontSize:'20px',fontWeight:800,marginBottom:'24px'}}>{editingCat?'Edit Category':'Add Category'}</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <div style={{display:'grid',gridTemplateColumns:'60px 1fr',gap:'10px'}}>
                <select value={catDraft.icon} onChange={e=>setCatDraft({...catDraft,icon:e.target.value})} style={{...inp,padding:'8px',fontSize:'22px',textAlign:'center'}}>
                  {ICON_OPTIONS.map(i=><option key={i} value={i}>{i}</option>)}
                </select>
                <input style={inp} placeholder="Category Name *" value={catDraft.name} onChange={e=>setCatDraft({...catDraft,name:e.target.value})}/>
              </div>
              <input style={inp} placeholder="Description" value={catDraft.desc} onChange={e=>setCatDraft({...catDraft,desc:e.target.value})}/>
              <div>
                <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>COLOR:</label>
                <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                  {COLOR_OPTIONS.map(c=><div key={c} onClick={()=>setCatDraft({...catDraft,color:c})} style={{width:'28px',height:'28px',borderRadius:'50%',background:c,cursor:'pointer',border:`3px solid ${catDraft.color===c?'#fff':'transparent'}`,transition:'all .2s'}}/>)}
                </div>
              </div>
              <div style={{display:'flex',gap:'10px',marginTop:'8px'}}>
                <button onClick={saveCat} style={{flex:1,background:'linear-gradient(135deg,#D4A017,#F5A623)',border:'none',borderRadius:'12px',padding:'13px',color:'#000',fontWeight:800,cursor:'pointer'}}>💾 SAVE</button>
                <button onClick={()=>setShowCatModal(false)} style={{flex:1,background:'transparent',border:'1px solid rgba(255,255,255,.1)',borderRadius:'12px',padding:'13px',color:'rgba(255,255,255,.4)',cursor:'pointer'}}>CANCEL</button>
              </div>
              {editingCat&&<button onClick={()=>{setDelCat(editingCat.id);setShowCatModal(false);}} style={{width:'100%',padding:'10px',background:'rgba(244,67,54,.08)',border:'1px solid rgba(244,67,54,.2)',borderRadius:'10px',color:'#f44336',cursor:'pointer',fontSize:'11px'}}>🗑 Delete Category</button>}
            </div>
          </div>
        </div>
      )}

      {/* Stat Modal */}
      {showStatModal&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.92)',backdropFilter:'blur(20px)',zIndex:10001,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}} onClick={()=>setShowStatModal(false)}>
          <div style={{background:'#050510',border:'1px solid rgba(212,160,23,.25)',borderRadius:'24px',padding:'36px',maxWidth:'440px',width:'100%'}} onClick={e=>e.stopPropagation()}>
            <h3 style={{color:'#fff',fontSize:'20px',fontWeight:800,marginBottom:'24px'}}>{editingStat?'Edit Stat':'Add Stat'}</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              <div style={{display:'grid',gridTemplateColumns:'60px 1fr',gap:'10px'}}>
                <select value={statDraft.icon} onChange={e=>setStatDraft({...statDraft,icon:e.target.value})} style={{...inp,padding:'8px',fontSize:'22px',textAlign:'center'}}>
                  {ICON_OPTIONS.map(i=><option key={i} value={i}>{i}</option>)}
                </select>
                <input style={inp} placeholder="Value (e.g. 18+)" value={statDraft.val} onChange={e=>setStatDraft({...statDraft,val:e.target.value})}/>
              </div>
              <input style={inp} placeholder="Label (e.g. Technologies)" value={statDraft.label} onChange={e=>setStatDraft({...statDraft,label:e.target.value})}/>
              <div>
                <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>COLOR:</label>
                <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                  {COLOR_OPTIONS.map(c=><div key={c} onClick={()=>setStatDraft({...statDraft,color:c})} style={{width:'28px',height:'28px',borderRadius:'50%',background:c,cursor:'pointer',border:`3px solid ${statDraft.color===c?'#fff':'transparent'}`,transition:'all .2s'}}/>)}
                </div>
              </div>
              <div style={{display:'flex',gap:'10px',marginTop:'8px'}}>
                <button onClick={saveStat} style={{flex:1,background:'linear-gradient(135deg,#D4A017,#F5A623)',border:'none',borderRadius:'12px',padding:'13px',color:'#000',fontWeight:800,cursor:'pointer'}}>💾 SAVE</button>
                <button onClick={()=>setShowStatModal(false)} style={{flex:1,background:'transparent',border:'1px solid rgba(255,255,255,.1)',borderRadius:'12px',padding:'13px',color:'rgba(255,255,255,.4)',cursor:'pointer'}}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member suggest modal */}
      {showSuggest&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.92)',backdropFilter:'blur(20px)',zIndex:10001,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}} onClick={()=>setShowSuggest(false)}>
          <div style={{background:'#050510',border:'1px solid rgba(33,150,243,.25)',borderRadius:'24px',padding:'36px',maxWidth:'460px',width:'100%'}} onClick={e=>e.stopPropagation()}>
            <h3 style={{color:'#fff',fontSize:'20px',fontWeight:800,marginBottom:'8px'}}>💡 Suggest a Technology</h3>
            <p style={{color:'rgba(255,255,255,.4)',fontSize:'12px',marginBottom:'24px'}}>Your suggestion will be reviewed by admin before being added.</p>
            {suggestSuccess?(
              <div style={{textAlign:'center',padding:'30px'}}>
                <div style={{fontSize:'40px',marginBottom:'12px'}}>✅</div>
                <p style={{color:'#2ECC40',fontSize:'14px',fontWeight:600}}>Suggestion submitted! Admin will review it.</p>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                <div style={{display:'grid',gridTemplateColumns:'60px 1fr',gap:'10px'}}>
                  <select value={suggestDraft.icon} onChange={e=>setSuggestDraft({...suggestDraft,icon:e.target.value})} style={{...inp,padding:'8px',fontSize:'22px',textAlign:'center'}}>
                    {ICON_OPTIONS.map(i=><option key={i} value={i}>{i}</option>)}
                  </select>
                  <input style={inp} placeholder="Technology Name *" value={suggestDraft.name} onChange={e=>setSuggestDraft({...suggestDraft,name:e.target.value})}/>
                </div>
                <select style={inp} value={suggestDraft.category} onChange={e=>setSuggestDraft({...suggestDraft,category:e.target.value})}>
                  <option value="">Select category</option>
                  {cats.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <textarea style={{...inp,resize:'vertical' as const}} rows={3} placeholder="Why should we add this? How do we use it? *" value={suggestDraft.desc} onChange={e=>setSuggestDraft({...suggestDraft,desc:e.target.value})}/>
                <div style={{display:'flex',gap:'10px',marginTop:'4px'}}>
                  <button onClick={submitSuggestion} style={{flex:2,background:'linear-gradient(135deg,#2196F3,#64B5F6)',border:'none',borderRadius:'12px',padding:'13px',color:'#000',fontWeight:800,cursor:'pointer',fontSize:'12px',letterSpacing:'2px'}}>💡 SUBMIT SUGGESTION</button>
                  <button onClick={()=>setShowSuggest(false)} style={{flex:1,background:'transparent',border:'1px solid rgba(255,255,255,.1)',borderRadius:'12px',padding:'13px',color:'rgba(255,255,255,.4)',cursor:'pointer'}}>CANCEL</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Deletes */}
      {delTech&&<DeleteConfirm id={delTech} onConfirm={deleteTech} onCancel={()=>setDelTech(null)} label="Delete this technology? This cannot be undone."/>}
      {delCat&&<DeleteConfirm id={delCat} onConfirm={deleteCat} onCancel={()=>setDelCat(null)} label="Delete this category? Technologies in it will not be deleted."/>}
    </section>
  );
}