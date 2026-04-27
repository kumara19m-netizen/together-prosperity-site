'use client';
import LanguageSwitcher from './components/MultiLanguage';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import { useLang } from './components/MultiLanguage';
const WhatsAppBubble = dynamic(
  () => import('./components/WhatsAppBubble').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const AIChatbot = dynamic(
  () => import('./components/AIChatbot').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const AIBlogGenerator = dynamic(
  () => import('./components/AIBlogGenerator').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const AILeadScorer = dynamic(
  () => import('./components/AILeadScorer').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const SocialProof = dynamic(
  () => import('./components/SocialProof').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const ExitIntent = dynamic(
  () => import('./components/ExitIntent').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const ROICalculator = dynamic(
  () => import('./components/ROICalculator').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const ServiceQuiz = dynamic(
  () => import('./components/ServiceQuiz').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const EventsSection = dynamic(
  () => import('./components/EventsSection').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const ProposalGenerator = dynamic(
  () => import('./components/ProposalGenerator').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const CaseStudyDownload = dynamic(
  () => import('./components/CaseStudyDownload').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const LiveVisitorCounter = dynamic(
  () => import('./components/LiveVisitorCounter').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const ReferralSystem = dynamic(
  () => import('./components/ReferralSystem').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);
const TechStackShowcase = dynamic(
  () => import('./components/TechStackShowcase').then(mod => ({ default: mod.default ?? mod })),
  { ssr: false }
);


/* ─────────────────────────────── CONSTANTS ─────────────────────────────── */
const ORBIT_DOTS = [0,60,120,180,240,300].map((deg,i)=>({
  top:`${parseFloat((50-47*Math.cos(deg*Math.PI/180)).toFixed(4))}%`,
  left:`${parseFloat((50+47*Math.sin(deg*Math.PI/180)).toFixed(4))}%`,
  size:i%2===0?'10px':'6px',
  color:i%3===0?'#D4A017':i%3===1?'#2196F3':'#2ECC40',
  duration:`${3+i*0.3}s`,delay:`${i*0.2}s`,
}));

const ADMIN_PASSWORD  = process.env.NEXT_PUBLIC_ADMIN_PASSWORD  || 'tp2026admin';
const MEMBER_PASSWORD = process.env.NEXT_PUBLIC_MEMBER_PASSWORD || 'tp2026member';

const COLOR_OPTIONS = ['#D4A017','#2196F3','#2ECC40','#F5A623','#E91E63','#9C27B0','#FF5722','#00BCD4','#FF6B6B','#4ECDC4'];
const EMOJI_OPTIONS  = ['🚀','💡','🔥','⚡','🎯','🛡️','🌐','🔗','💎','🏆','🌟','⚙️','📊','🎨','🛰️'];
const SERVICE_ICONS  = ['🇮🇳','🦚','🐅','☸️','🔱','🕉️','🪔','🎆','🏏','🥘','🍛','🕌','🛕','🚩','🎌','💻','🖥️','⌨️','🖱️','💾','💿','📀','🖨️','📠','☎️','📞','📟','⛓️','🔗','💰','💎','💸','💵','🏦','📊','📈','📉','📋','📃','📄','📑','🧾','🏷️','🔖','💹','🪙','💳','🏧','🔒','🔐','🔑','🗝️','🔏','🔓','⚠️','🚨','🪪','🆔','🔍','🕵️','👁️','🔬','⚔️','🛡️','🔮','🪖','🎭','👮','🧠','🤖','🦾','🦿','👾','🎯','📡','📶','🎲','♟️','🧩','🔢','📐','📏','🧬','⚛️','🧪','🛰️','🔌','💡','🔋','🔦','💨','🌡️','🔊','🎤','🎥','📹','📽️','🎬','📻','🔄','🏛️','⚖️','📜','📝','🖋️','🖊️','✒️','📌','📍','📎','🖇️','📏','📐','✂️','🏢','📑','📰','🗳️','🗂️','📁','📂','🔖','🖌️','🖍️','💼','🎒','📅','📆','🗓️','⏰','⌛','⏳','🔧','🔨','🛠️','⚒️','🪚','🪛','🔩','✏️','✍️','🪤','🏙️','🌆','🌃','🏗️','🚦','🌾','🌽','🌻','🌿','🍃','🍂','🍁','🍀','🌱','🌳','🌲','🌴','🌵','🌷','🌸','🌹','🌺','🌻','🌼','🏥','💊','💉','🩺','🩻','🩹','🩸','🫀','🫁','🦷','🦴','👂','🫂','🎓','📚','📖','📘','📙','📕','📗','📔','📓','📒','🏭','🛢️','🚚','🚛','🚜','✈️','🚀','🛸','🚢','🛳️','⛴️','🚁','🛩️','🚆','📦','🌟','⭐','✨','💧','❄️','🌈','☀️','🌙','💫','💥','🥇','🥈','🥉','🏅','🎖️','🎈','🎉','🎊','🎁','🎀','🧧','📿','📇','📋','🌐','📶','⚡','🔥'];

const GALLERY_CATEGORIES = ['All','Events','Projects','Team','Office','Awards','Media'];

/* ─────────────────────────────── INTERFACES ────────────────────────────── */
interface TeamMember    { id:string; name:string; role:string; tag:string; location:string; color:string; initial:string; desc:string; emoji:string; photo?:string; linkedin?:string; }
interface ServiceMedia  { type:'image'|'video'; url:string; title?:string; }
interface Service       { id:string; icon:string; title:string; desc:string; color:string; cs:string; cg:string; tag:string; features:string[]; caseStudy:string; visible:boolean; media?:ServiceMedia[]; }
interface FaqItem       { id:string; q:string; a:string; }
interface Sector        { id:string; icon:string; name:string; description:string; }
interface StatItem      { id:string; num:string; label:string; color:string; }
interface ContactInfo   { phone:string; whatsapp:string; email:string; address1:string; address2:string; instagram:string; linkedin:string; twitter:string; }
interface HeroContent   { headline1:string; headline2:string; subheadline:string; desc:string; }
interface JobListing    { id:string; title:string; location:string; type:string; description:string; }
interface Testimonial   { id:string; name:string; role:string; company:string; content:string; rating:number; photo?:string; linkedinUrl?:string; }
interface BlogPost      { id:string; title:string; excerpt:string; date:string; author:string; readTime:string; content?:string; featuredImage?:string; }
interface PricingPlan   { id:string; name:string; price:string; features:string[]; recommended?:boolean; }
interface Review        { id:string; name:string; rating:number; comment:string; date:string; }
interface PortfolioItem { id:string; title:string; category:string; desc:string; tech:string[]; outcome:string; icon:string; color:string; }
interface Partner       { id:string; name:string; logo:string; url:string; description:string; }
interface Announcement  { id:string; text:string; active:boolean; }
interface LegalContent  { privacy:string; terms:string; cookie:string; }
interface CompanyDetails{ cin:string; gst:string; msme:string; }
interface PilotCriteria { title:string; description:string; eligibility:string[]; }
interface GalleryImage  { id:string; url:string; title:string; category?:string; date?:string; }
interface Achievement   { id:string; year:string; title:string; description:string; icon?:string; }
interface Collaboration { id:string; name:string; logo:string; url:string; description:string; }
interface PendingItem   { id:string; type:'gallery'|'blog'; data:any; submittedBy:string; submittedAt:string; }
interface ActivityLog   { id:string; action:string; user:string; timestamp:string; }
interface ContactSub    { id:string; name:string; email:string; phone:string; company:string; service:string; message:string; timestamp:string; read:boolean; }

/* ─────────────────────────────── STORAGE KEYS ──────────────────────────── */
const SK = {
  services:'tp_services', team:'tp_team', blog:'tp_blog', gallery:'tp_gallery',
  achievements:'tp_achievements', testimonials:'tp_testimonials', portfolio:'tp_portfolio',
  faqs:'tp_faqs', sectors:'tp_sectors', stats:'tp_stats', contact:'tp_contact',
  hero:'tp_hero', pricing:'tp_pricing', jobs:'tp_jobs', partners:'tp_partners',
  announcements:'tp_announcements', legal:'tp_legal', company:'tp_company',
  pilot:'tp_pilot', collaborations:'tp_collaborations', pendingQueue:'tp_pending_queue',
  activityLog:'tp_activity_log', contactSubs:'tp_contact_submissions',
  newsletterEmails:'tp_newsletter_emails', serviceReviews:'service_reviews',
  cookieLogs:'cookie_consent_logs', ticker:'tp_ticker', darkMode:'dark_mode',
  cookieConsent:'cookie_consent', gaMeasurementId:'ga_measurement_id',
};

/* ─────────────────────────────── HELPERS ──────────────────────────────── */
const loadLS = <T,>(key:string, fallback:T):T => {
  if (typeof window === 'undefined') return fallback;
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
};
const saveLS = (key:string, val:any) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };

const compressImage = (file:File, maxW=1200, q=0.75): Promise<string> =>
  new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      const img = new window.Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > maxW) { h = h*maxW/w; w = maxW; }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d')?.drawImage(img,0,0,w,h);
        resolve(canvas.toDataURL('image/jpeg', q));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });

const hexToRgb = (hex:string) => {
  const r=parseInt(hex.slice(1,3),16), g=parseInt(hex.slice(3,5),16), b=parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
};

const addLog = (action:string, user:string, setLogs:React.Dispatch<React.SetStateAction<ActivityLog[]>>) => {
  setLogs(prev => {
    const updated = [{id:crypto.randomUUID(), action, user, timestamp:new Date().toLocaleString()}, ...prev].slice(0,100);
    saveLS(SK.activityLog, updated);
    return updated;
  });
};

/* ─────────────────────────────── INITIAL DATA ──────────────────────────── */
const INIT_SERVICES: Service[] = [
  {id:'1',icon:'⛓️',title:'Blockchain Infrastructure',desc:'Immutable distributed ledger systems and cryptographic verification frameworks built for Indian institutions. Tamper-proof, transparent, and fully auditable.',color:'#D4A017',cs:'rgba(212,160,23,.1)',cg:'rgba(212,160,23,.065)',tag:'CORE TECH',features:['Distributed ledger deployment','Cryptographic verification','Immutable audit trails','Permissioned blockchain networks','Token & asset management'],caseStudy:'Deployed for land record digitization across Karnataka municipalities.',visible:true,media:[{type:'image',url:'https://picsum.photos/id/1/800/500',title:'Blockchain Architecture'},{type:'image',url:'https://picsum.photos/id/2/800/500',title:'Distributed Ledger'},{type:'video',url:'https://www.youtube.com/embed/SSo_EIwHSd4',title:'How Blockchain Works'}]},
  {id:'2',icon:'🔒',title:'Cybersecurity',desc:'End-to-end security protocols, real-time threat intelligence, penetration testing, and zero-trust architecture protecting critical government and enterprise infrastructure.',color:'#F5A623',cs:'rgba(245,166,35,.1)',cg:'rgba(245,166,35,.065)',tag:'PROTECTION',features:['Zero-trust architecture','Real-time threat detection','Penetration testing','Security audits & compliance','Incident response planning'],caseStudy:'Secured digital infrastructure for 3 government departments with zero breaches.',visible:true,media:[{type:'image',url:'https://picsum.photos/id/3/800/500',title:'Security Operations Center'},{type:'image',url:'https://picsum.photos/id/4/800/500',title:'Threat Detection Dashboard'}]},
  {id:'3',icon:'📡',title:'Internet of Things',desc:'Intelligent sensor networks and connected ecosystems enabling real-time monitoring for agriculture, smart cities, industrial automation, and supply chain management.',color:'#2196F3',cs:'rgba(33,150,243,.1)',cg:'rgba(33,150,243,.065)',tag:'CONNECTIVITY',features:['Smart sensor deployment','Industrial IoT integration','Real-time monitoring dashboards','Edge computing solutions','Predictive maintenance systems'],caseStudy:'Connected 200+ sensors across agricultural fields for real-time crop monitoring.',visible:true,media:[{type:'image',url:'https://picsum.photos/id/5/800/500',title:'IoT Sensor Network'},{type:'image',url:'https://picsum.photos/id/6/800/500',title:'Smart Agriculture'}]},
  {id:'4',icon:'🤖',title:'AIML Solutions',desc:'Advanced machine learning models, deep learning pipelines, NLP, and intelligent automation transforming raw data into actionable business intelligence.',color:'#2ECC40',cs:'rgba(46,204,64,.1)',cg:'rgba(46,204,64,.065)',tag:'INTELLIGENCE',features:['Predictive analytics models','Deep learning pipelines','NLP & text intelligence','Computer vision systems','Intelligent process automation'],caseStudy:'Built predictive crop yield model with 92% accuracy for Karnataka farmers.',visible:true},
  {id:'5',icon:'📜',title:'Smart Contracts & Security',desc:'Cybersecurity-hardened smart contracts with built-in vulnerability scanning, formal verification, and tamper-proof execution for procurement and public distribution systems.',color:'#D4A017',cs:'rgba(212,160,23,.1)',cg:'rgba(212,160,23,.065)',tag:'SECURE AUTO',features:['Formal contract verification','Vulnerability scanning','Tamper-proof execution','Multi-signature authorization','Automated compliance checks'],caseStudy:'Automated government procurement saving ₹2Cr+ in manual processing costs.',visible:true},
  {id:'6',icon:'🏛️',title:'Gov-tech Solutions',desc:'Digital India aligned platforms for land records, subsidy distribution, academic credential verification, and transparent government operations built for scale.',color:'#2196F3',cs:'rgba(33,150,243,.1)',cg:'rgba(33,150,243,.065)',tag:'GOVERNANCE',features:['Land record digitization','Subsidy distribution systems','Academic credential verification','Public grievance portals','e-Governance dashboards'],caseStudy:'Digitized 50,000+ land records for Kolar district panchayats.',visible:true},
];

const INIT_TEAM: TeamMember[] = [
  {id:'1',name:'Madhu Vamshi K R',role:'Founder & CEO',tag:'FOUNDER',location:'Malur, Kolar · Karnataka',color:'#D4A017',initial:'M',emoji:'🚀',desc:"Visionary entrepreneur architecting blockchain and cybersecurity solutions for India's digital transformation. Passionate about making cutting-edge tech accessible to every institution.",photo:'https://randomuser.me/api/portraits/men/32.jpg',linkedin:'https://www.linkedin.com/in/madhu-vamshi'},
  {id:'2',name:'Junaid Khan',role:'Co-Founder & CTO',tag:'CO-FOUNDER',location:'Bangalore South · Karnataka',color:'#2196F3',initial:'J',emoji:'🛡️',desc:'Technology strategist and cybersecurity expert building zero-trust architectures and IoT ecosystems that protect critical infrastructure at national scale.',photo:'https://randomuser.me/api/portraits/men/45.jpg',linkedin:'https://www.linkedin.com/in/junaid-khan'},
  {id:'3',name:'Kumara Swamy M',role:'Director & COO',tag:'DIRECTOR',location:'Karnataka, India',color:'#2ECC40',initial:'K',emoji:'🎯',desc:"Strategic operations leader overseeing governance, business development, and enterprise partnerships. Drives Together Prosperity's expansion across India and beyond.",photo:'https://randomuser.me/api/portraits/men/68.jpg',linkedin:'https://www.linkedin.com/in/kumara-swamy'},
];

const INIT_FAQ: FaqItem[] = [
  {id:'1',q:'What does Together Prosperity do?',a:'We build blockchain, cybersecurity, IoT, AI & ML solutions for government institutions, enterprises, and organizations across India and globally.'},
  {id:'2',q:'How do I book a demo?',a:"Click the 'Book a Demo' button, fill in the contact form, or WhatsApp us at +91 98456 18859. We'll respond within 24 hours."},
  {id:'3',q:'Are your solutions suitable for government organizations?',a:'Absolutely. All our solutions are designed with government compliance, Digital India standards, and Indian regulatory frameworks in mind from day one.'},
  {id:'4',q:'Do you work with startups or only large enterprises?',a:'We work with organizations of all sizes — from startups and SMEs to large enterprises and government departments. Solutions are tailored to your scale and budget.'},
  {id:'5',q:'What is your technology stack?',a:'We use cutting-edge blockchain platforms, cloud-native architectures, IoT protocols, and state-of-the-art machine learning frameworks — chosen based on your specific requirements.'},
  {id:'6',q:'Where are you based?',a:'Headquartered in Karnataka, India with offices in Malur (Kolar District) and Bangalore South. We serve clients nationwide and internationally.'},
];

const INIT_SECTORS: Sector[] = [
  {id:'1',icon:'🏛️',name:'Government',description:'Secure, transparent digital governance solutions for state and central government departments. Land record blockchain, public grievance portals, e-governance dashboards.'},
  {id:'2',icon:'🏥',name:'Healthcare',description:'HIPAA-compliant patient data management, telemedicine platforms, and blockchain for medical record integrity.'},
  {id:'3',icon:'🎓',name:'Education',description:'Credential verification using blockchain, secure student data systems, and AI-powered learning analytics.'},
  {id:'4',icon:'🌾',name:'Agriculture',description:'IoT sensors for crop monitoring, predictive yield models, supply chain traceability for farm-to-fork.'},
  {id:'5',icon:'🏭',name:'Manufacturing',description:'Industry 4.0 solutions: predictive maintenance, quality control AI, and secure supply chain integration.'},
  {id:'6',icon:'🏦',name:'Banking & Finance',description:'Fraud detection ML models, KYC blockchain, smart contracts for loans and insurance.'},
  {id:'7',icon:'🚚',name:'Supply Chain',description:'End-to-end traceability using blockchain, IoT-enabled cold chain monitoring, and logistics optimization.'},
  {id:'8',icon:'🏙️',name:'Smart Cities',description:'Integrated command centers, traffic analytics, waste management IoT, and citizen engagement platforms.'},
];

const INIT_STATS: StatItem[] = [
  {id:'1',num:'2026',label:'Incorporated',color:'#D4A017'},
  {id:'2',num:'6+',label:'Tech Domains',color:'#2196F3'},
  {id:'3',num:'8+',label:'Sectors Served',color:'#2ECC40'},
  {id:'4',num:'₹3Cr+',label:'Value Delivered',color:'#F5A623'},
  {id:'5',num:'100%',label:'Gov-Ready',color:'#D4A017'},
  {id:'6',num:'₹0',label:'Zero Setup Cost (Pilot)',color:'#D4A017'},
  {id:'7',num:'∞',label:'Innovation',color:'#2196F3'},
  {id:'8',num:'🌍',label:'Worldwide',color:'#2ECC40'},
  {id:'9',num:'3',label:'Core Leadership',color:'#F5A623'},
];

const INIT_CONTACT: ContactInfo = {
  phone:'+91 98456 18859',whatsapp:'919845618859',email:'contact@togetherprosperity.com',
  address1:'Malur, Kolar District\nKarnataka — 563130',address2:'Bangalore South\nKarnataka — 560026',
  instagram:'https://www.instagram.com/together_prosperity',linkedin:'#',twitter:'#',
};

const INIT_HERO: HeroContent = {
  headline1:'We Make Indian Governments',headline2:'Tamper-Proof',
  subheadline:'Blockchain · Cybersecurity · IoT · AIML',
  desc:'We engineer transformative digital ecosystems combining Blockchain, Cybersecurity, IoT, AI & ML — empowering governments, enterprises, and communities across India and beyond.',
};

const INIT_TESTIMONIALS: Testimonial[] = [
  {id:'1',name:'Rajesh Kumar',role:'IT Director',company:'Karnataka e-Governance',content:'Together Prosperity helped us digitize land records across 5 districts using their blockchain platform. The process was seamless and the team understood our compliance needs perfectly.',rating:5,photo:'https://randomuser.me/api/portraits/men/41.jpg',linkedinUrl:'https://linkedin.com'},
  {id:'2',name:'Priya Sharma',role:'CEO',company:'FinSecure Pvt Ltd',content:'Their zero-trust cybersecurity framework stopped two intrusion attempts within the first month. We now sleep better knowing our customer data is protected.',rating:5,photo:'https://randomuser.me/api/portraits/women/68.jpg',linkedinUrl:'https://linkedin.com'},
  {id:'3',name:'Amit Patel',role:'CTO',company:'AgriTech Solutions',content:'The IoT sensors and ML models they deployed increased our crop yield predictions accuracy by 92%. Real-time alerts have reduced wastage by 30%.',rating:5,photo:'https://randomuser.me/api/portraits/men/52.jpg',linkedinUrl:'https://linkedin.com'},
];

const INIT_BLOG: BlogPost[] = [
  {id:'1',title:'Blockchain in Government: The Future of Transparent Governance',excerpt:'How distributed ledger technology is revolutionizing government operations in India...',date:'April 15, 2026',author:'Madhu Vamshi K R',readTime:'5 min',content:'Full article content would go here...'},
  {id:'2',title:'Top 5 Cybersecurity Threats for Indian Enterprises in 2026',excerpt:'Protect your business from emerging cyber threats with these essential strategies...',date:'April 10, 2026',author:'Junaid Khan',readTime:'7 min',content:'Full article content...'},
  {id:'3',title:'Why Indian Enterprises Need Zero-Trust Cybersecurity in 2026',excerpt:'With the rapid digitization of Indian businesses, traditional perimeter security is no longer enough. Zero-trust architecture is the new standard.',date:'April 20, 2026',author:'Junaid Khan',readTime:'12 min',content:'Zero-trust is not a product; it\'s a mindset. In 2026, it\'s the only way to protect Indian enterprises from sophisticated ransomware, phishing, and insider threats.'},
];

const INIT_PRICING: PricingPlan[] = [
  {id:'1',name:'Starter',price:'₹0',features:['Basic consultation','1 service domain','Email support','Community access'],recommended:false},
  {id:'2',name:'Professional',price:'Custom',features:['Full consultation','Multiple service domains','Priority support','Dedicated account manager','Custom development'],recommended:true},
  {id:'3',name:'Enterprise',price:'Custom',features:['Everything in Professional','24/7 support','On-site training','SLA guarantee','Custom SLAs'],recommended:false},
];

const INIT_JOBS: JobListing[] = [
  {id:'1',title:'Full Stack Developer',location:'Bangalore, India',type:'Full-time',description:'Looking for a passionate developer with experience in React, Node.js, and blockchain technologies.'},
  {id:'2',title:'Cybersecurity Analyst',location:'Bangalore, India',type:'Full-time',description:'Join our security team to protect critical infrastructure and conduct penetration testing.'},
  {id:'3',title:'IoT Solutions Architect',location:'Remote, India',type:'Remote',description:'Design and implement IoT solutions for agriculture and smart city projects.'},
  {id:'4',title:'Business Development Intern',location:'Bangalore, India',type:'Internship',description:'Learn and grow with our sales team. Great opportunity for recent graduates.'},
];

const INIT_PORTFOLIO: PortfolioItem[] = [
  {id:'1',title:'KarnaLand — Land Record Blockchain',category:'Gov-tech',desc:'Digitized 50,000+ land records for Kolar district using permissioned blockchain, eliminating fraud and manual errors.',tech:['Hyperledger Fabric','React','Node.js','PostgreSQL'],outcome:'₹1.2Cr saved in operational costs, 0 fraud cases post-deployment.',icon:'🏛️',color:'#D4A017'},
  {id:'2',title:'AgroSense IoT Platform',category:'Agriculture IoT',desc:'Connected 200+ smart sensors across 40 farms for real-time crop monitoring, weather correlation, and yield prediction.',tech:['MQTT','InfluxDB','Grafana','ML Models'],outcome:'22% average yield increase, ₹80L+ farmer savings in Year 1.',icon:'🌾',color:'#2ECC40'},
  {id:'3',title:'SecureGov Cyber Shield',category:'Cybersecurity',desc:'Zero-trust security architecture deployed for 3 Karnataka government departments — threat detection, pen-testing & compliance.',tech:['Zero Trust','SIEM','SOAR','ISO 27001'],outcome:'Zero breaches across 18 months, 100% compliance achieved.',icon:'🔒',color:'#F5A623'},
];

const INIT_PARTNERS: Partner[] = [
  {id:'1',name:'Digital India',logo:'🇮🇳',url:'https://www.digitalindia.gov.in',description:"Government of India's flagship programme to transform India into a digitally empowered society and knowledge economy."},
  {id:'2',name:'Karnataka Govt',logo:'🏛️',url:'https://www.karnataka.gov.in',description:'Progressive state government actively promoting technology adoption in governance, agriculture, and public services.'},
  {id:'3',name:'NASSCOM',logo:'💻',url:'https://nasscom.in',description:'The premier trade body and chamber of commerce for the Indian tech industry, fostering innovation and policy advocacy.'},
  {id:'4',name:'Startup India',logo:'🚀',url:'https://www.startupindia.gov.in',description:'Government initiative to build a strong ecosystem for nurturing innovation and startups in India.'},
  {id:'5',name:'MeitY',logo:'⚡',url:'https://www.meity.gov.in',description:"Ministry of Electronics & Information Technology, driving India's digital transformation and cybersecurity policies."},
];

const INIT_ANNOUNCEMENTS: Announcement[] = [
  {id:'1',text:'🚀 Limited Time Offer: Free consultation for first 50 clients!',active:true},
];

const INIT_LEGAL: LegalContent = {
  privacy:`## Privacy Policy\n\n**Last updated: April 20, 2026**\n\nTogether Prosperity Private Limited ("we", "us", "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.\n\n### Information We Collect\nWe may collect personal information that you voluntarily provide to us when you register on the website, express an interest in our services, participate in activities, or contact us. This includes:\n- Name, email address, phone number, company name.\n- Any other information you choose to provide.\n\n### How We Use Your Information\nWe use the information we collect to:\n- Provide, operate, and maintain our website and services.\n- Improve, personalize, and expand our website and services.\n- Communicate with you, including for customer service, updates, and marketing.\n- Prevent fraud and enhance security.\n\n### Sharing Your Information\nWe do not sell, trade, or rent your personal information to third parties.\n\n### Data Security\nWe implement reasonable technical and organizational measures to protect your personal information.\n\n### Contact Us\nEmail: contact@togetherprosperity.com\nAddress: Malur, Kolar District, Karnataka — 563130`,
  terms:`## Terms of Service\n\n**Last updated: April 20, 2026**\n\n### 1. Acceptance of Terms\nBy accessing or using the website of Together Prosperity Private Limited, you agree to be bound by these Terms of Service.\n\n### 2. Description of Services\nWe provide consulting, development, and implementation services in blockchain, cybersecurity, IoT, AI/ML, and related technologies.\n\n### 3. User Responsibilities\nYou agree to provide accurate information and not use our website for any unlawful purpose.\n\n### 4. Intellectual Property\nAll content on this website is the property of Together Prosperity Private Limited and protected by Indian copyright laws.\n\n### 5. Governing Law\nThese Terms shall be governed by the laws of India. Disputes subject to the exclusive jurisdiction of courts in Karnataka.\n\n### Contact Us\nEmail: contact@togetherprosperity.com`,
  cookie:`## Cookie Policy\n\n**Last updated: April 20, 2026**\n\nTogether Prosperity Private Limited uses cookies and similar tracking technologies on our website.\n\n### What Are Cookies?\nCookies are small text files stored on your device when you visit a website.\n\n### Types of Cookies We Use\n- **Essential Cookies**: Necessary for the website to function.\n- **Analytics Cookies**: Help us understand how visitors use our site. Only loaded after you consent.\n- **Preference Cookies**: Remember your settings, such as dark mode preference.\n\n### How to Control Cookies\nYou can control and/or delete cookies as you wish via your browser settings.\n\n### Contact Us\nEmail: contact@togetherprosperity.com`,
};

const INIT_COMPANY: CompanyDetails = { cin:'U72900KA2026PTC12345', gst:'29AABCT1234E1Z5', msme:'UDYAM-KA-XX-XXXXXXX' };

const INIT_PILOT: PilotCriteria = {
  title:'₹0 Pilot Project – Eligibility',
  description:'We offer zero‑setup‑cost pilot projects to qualified government departments and enterprises.',
  eligibility:['Must be a government body, PSU, or registered enterprise','Signed NDA and Memorandum of Understanding (MOU)','Scope capped at 100 consulting hours or 30 days, whichever earlier','Joint success criteria defined before kickoff','Data sharing and IP ownership terms agreed in advance'],
};

const INIT_TICKER = [
  '50,000+ Land Records Secured','₹1.2Cr Saved','22% Yield Increase','0 Security Breaches',
  '200+ IoT Sensors','92% ML Accuracy','Karnataka Headquarters','Incorporated 2026',
  'Blockchain Infrastructure','Cybersecurity Platforms','Gov-tech Systems','IoT Ecosystems',
];

// Smooth transition helper (fixed version)
const smoothUpdate = (updateCallback: () => void) => {
  if (typeof document !== 'undefined' && document.startViewTransition) {
    document.startViewTransition(updateCallback);
  } else {
    updateCallback();
  }
};

/* ═══════════════════════════════ MAIN COMPONENT ═══════════════════════════════ */
export default function Home() {
    const { t } = useLang();
  /* ── form & UI ── */
  const [formData,setFormData]       = useState({name:'',email:'',phone:'',company:'',service:'',message:''});
  const [privacyAccepted,setPriv]    = useState(false);
  const [submitted,setSubmitted]     = useState(false);
  const [sending,setSending]         = useState(false);
  const [scrollY,setScrollY]         = useState(0);
  const [mobileMenuOpen,setMobMenu]  = useState(false);
  const [readProgress,setReadProgress]= useState(0);
  const [showBackToTop,setShowBTT]   = useState(false);
  const [activeFaq,setActiveFaq]     = useState<string|null>(null);
  const [activeSection,setActiveSection]= useState('home');
  const [countersVisible,setCounters]= useState(false);
  const [heroVisible,setHeroVis]     = useState(false);
  const [mousePos,setMousePos]       = useState({x:0,y:0});
  const [typedText,setTypedText]     = useState('');
  const [phraseIdx,setPhraseIdx]     = useState(0);
  const [charIdx,setCharIdx]         = useState(0);
  const [deleting,setDeleting]       = useState(false);
  const [darkMode,setDarkMode]       = useState(false);
  const [selectedMediaIndex,setSelMedia]= useState(0);

  /* ── search/filter ── */
  const [serviceSearch,setSvcSearch] = useState('');
  const [blogSearch,setBlogSearch]   = useState('');
  const [selectedBlogCat,setBlogCat] = useState('All');

  /* ── gallery state ── */
  const [showFullGallery,setShowFullGallery]  = useState(false);
  const [galleryFilter,setGalleryFilter]       = useState('All');
  const [gallerySearch,setGallerySearch]       = useState('');
  const [gallerySort,setGallerySort]           = useState('newest');
  const [lightboxImg,setLightboxImg]           = useState<GalleryImage|null>(null);
  const [lightboxIdx,setLightboxIdx]           = useState(0);

  /* ── cookie & analytics ── */
  const [cookieConsent,setCookieConsent]= useState(false);
  const [gaMeasurementId,setGaId]      = useState('');

  /* ── newsletter ── */
  const [newsletterEmail,setNlEmail]   = useState('');
  const [newsletterSub,setNlSub]       = useState(false);

  /* ── chat ── */
  const [showChat,setShowChat]         = useState(false);
  const [chatMsg,setChatMsg]           = useState('');
  const [chatMessages,setChatMessages] = useState<{text:string;sender:string;time:string}[]>([]);

  /* ── auth ── */
  const [isAdmin,setIsAdmin]           = useState(false);
  const [isMember,setIsMember]         = useState(false);
  const [showLogin,setShowLogin]       = useState(false);
  const [loginRole,setLoginRole]       = useState<'admin'|'member'>('admin');
  const [loginPw,setLoginPw]           = useState('');
  const [loginErr,setLoginErr]         = useState(false);
  const [showAdminBadge,setAdminBadge] = useState(false);
  const [showDashboard,setShowDashboard]=useState(false);
  const [showPendingModal,setShowPending]=useState(false);
  const [pendingRejectId,setPendingRejectId]=useState<string|null>(null);
  const [rejectReason,setRejectReason] = useState('');
  const [showCookieLogs,setShowCookieLogs]=useState(false);

  /* ── calendly ── */
  const [showCalendly,setShowCalendly] = useState(false);

  /* ── member features ── */
  const [showMemberBioEditor,setShowMemberBio]=useState(false);
  const [memberBioDraft,setMemberBioDraft]=useState<TeamMember|null>(null);
  const [showMemberBlogEditor,setShowMemberBlog]=useState(false);
  const [memberBlogDraft,setMemberBlogDraft]=useState({title:'',excerpt:'',date:new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}),author:'',readTime:'5 min',content:'',featuredImage:''});
  const [showMemberGallery,setShowMemberGallery]=useState(false);
  const [memberGalleryDraft,setMemberGalleryDraft]=useState({url:'',title:'',category:'Events',date:new Date().toISOString().split('T')[0]});
  const [uploadPreview,setUploadPreview]=useState('');

  /* ── service reviews ── */
  const [serviceReviews,setServiceReviews]=useState<{[key:string]:Review[]}>({});
  const [newReview,setNewReview]=useState({name:'',rating:5,comment:''});
  const [submittingReview,setSubReview]=useState(false);

  /* ── content state ── */
  const [team,setTeam]                 = useState<TeamMember[]>(INIT_TEAM);
  const [services,setServices]         = useState<Service[]>(INIT_SERVICES);
  const [faqs,setFaqs]                 = useState<FaqItem[]>(INIT_FAQ);
  const [sectors,setSectors]           = useState<Sector[]>(INIT_SECTORS);
  const [stats,setStats]               = useState<StatItem[]>(INIT_STATS);
  const [contact,setContact]           = useState<ContactInfo>(INIT_CONTACT);
  const [hero,setHero]                 = useState<HeroContent>(INIT_HERO);
  const [testimonials,setTestimonials] = useState<Testimonial[]>(INIT_TESTIMONIALS);
  const [blogPosts,setBlogPosts]       = useState<BlogPost[]>(INIT_BLOG);
  const [pricingPlans,setPricing]      = useState<PricingPlan[]>(INIT_PRICING);
  const [jobListings,setJobs]          = useState<JobListing[]>(INIT_JOBS);
  const [portfolio,setPortfolio]       = useState<PortfolioItem[]>(INIT_PORTFOLIO);
  const [partners,setPartners]         = useState<Partner[]>(INIT_PARTNERS);
  const [announcements,setAnnounce]    = useState<Announcement[]>(INIT_ANNOUNCEMENTS);
  const [legal,setLegal]               = useState<LegalContent>(INIT_LEGAL);
  const [companyDetails,setCompany]    = useState<CompanyDetails>(INIT_COMPANY);
  const [pilotCriteria,setPilot]       = useState<PilotCriteria>(INIT_PILOT);
  const [galleryImages,setGallery]     = useState<GalleryImage[]>([]);
  const [achievements,setAchievements] = useState<Achievement[]>([]);
  const [collaborations,setCollabs]    = useState<Collaboration[]>([]);
  const [pendingQueue,setPendingQueue] = useState<PendingItem[]>([]);
  const [activityLogs,setActivityLogs] = useState<ActivityLog[]>([]);
  const [contactSubs,setContactSubs]   = useState<ContactSub[]>([]);
  const [newsletterEmails,setNlEmails] = useState<string[]>([]);
  const [cookieLogs,setCookieLogs]     = useState<any[]>([]);
  const [tickerItems,setTickerItems]   = useState<string[]>(INIT_TICKER);

  /* ── modal state: Team ── */
  const [showTeamModal,setShowTeamModal]= useState(false);
  const [editingMember,setEditingMember]=useState<TeamMember|null>(null);
  const [teamDraft,setTeamDraft]       = useState({name:'',role:'',tag:'',location:'',color:'#D4A017',initial:'',desc:'',emoji:'🚀',photo:'',linkedin:''});
  const [deleteTeamConfirm,setDelTeam] = useState<string|null>(null);

  /* ── modal state: Service ── */
  const [showServiceModal,setShowSvcModal]= useState(false);
  const [editingService,setEditingSvc] = useState<Service|null>(null);
  const [serviceDraft,setSvcDraft]     = useState<Omit<Service,'id'>>({icon:'⛓️',title:'',desc:'',color:'#D4A017',cs:'rgba(212,160,23,.1)',cg:'rgba(212,160,23,.065)',tag:'',features:[''],caseStudy:'',visible:true,media:[]});
  const [deleteServiceConfirm,setDelSvc]=useState<string|null>(null);
  const [serviceDetailModal,setSvcDetail]=useState<Service|null>(null);

  /* ── modal state: FAQ ── */
  const [showFaqModal,setShowFaqModal] = useState(false);
  const [editingFaq,setEditingFaq]     = useState<FaqItem|null>(null);
  const [faqDraft,setFaqDraft]         = useState({q:'',a:''});
  const [deleteFaqConfirm,setDelFaq]   = useState<string|null>(null);

  /* ── modal state: Sector ── */
  const [showSectorModal,setShowSectorModal]=useState(false);
  const [editingSector,setEditingSector]=useState<Sector|null>(null);
  const [sectorDraft,setSectorDraft]   = useState({icon:'🏛️',name:'',description:''});
  const [selectedSector,setSelSector]  = useState<Sector|null>(null);

  /* ── modal state: Stat ── */
  const [showStatModal,setShowStatModal]=useState(false);
  const [editingStat,setEditingStat]   = useState<StatItem|null>(null);
  const [statDraft,setStatDraft]       = useState({num:'',label:'',color:'#D4A017'});

  /* ── modal state: Contact ── */
  const [showContactModal,setShowContactModal]=useState(false);
  const [contactDraft,setContactDraft] = useState<ContactInfo>(INIT_CONTACT);

  /* ── modal state: Hero ── */
  const [showHeroModal,setShowHeroModal]=useState(false);
  const [heroDraft,setHeroDraft]       = useState<HeroContent>(INIT_HERO);

  /* ── modal state: Testimonial ── */
  const [showTestModal,setShowTestModal]=useState(false);
  const [editingTest,setEditingTest]   = useState<Testimonial|null>(null);
  const [testDraft,setTestDraft]       = useState({name:'',role:'',company:'',content:'',rating:5,photo:'',linkedinUrl:''});

  /* ── modal state: Blog ── */
  const [showBlogModal,setShowBlogModal]=useState(false);
  const [editingBlog,setEditingBlog]   = useState<BlogPost|null>(null);
  const [blogDraft,setBlogDraft]       = useState({title:'',excerpt:'',date:new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}),author:'',readTime:'5 min',content:'',featuredImage:''});
  const [blogDetailModal,setBlogDetail]=useState<BlogPost|null>(null);

  /* ── modal state: Job ── */
  const [showJobModal,setShowJobModal] = useState(false);
  const [editingJob,setEditingJob]     = useState<JobListing|null>(null);
  const [jobDraft,setJobDraft]         = useState({title:'',location:'',type:'Full-time',description:''});

  /* ── modal state: Pricing ── */
  const [showPricingModal,setShowPricingModal]=useState(false);
  const [editingPricing,setEditingPricing]=useState<PricingPlan|null>(null);
  const [pricingDraft,setPricingDraft] = useState({name:'',price:'',features:[''],recommended:false});

  /* ── modal state: Portfolio ── */
  const [showPortfolioModal,setShowPortfolioModal]=useState(false);
  const [editingPortfolio,setEditingPortfolio]=useState<PortfolioItem|null>(null);
  const [portfolioDraft,setPortfolioDraft]=useState<Omit<PortfolioItem,'id'>>({title:'',category:'',desc:'',tech:[''],outcome:'',icon:'🏛️',color:'#D4A017'});
  const [portfolioDetail,setPortfolioDetail]=useState<PortfolioItem|null>(null);

  /* ── modal state: Partner ── */
  const [showPartnerModal,setShowPartnerModal]=useState(false);
  const [editingPartner,setEditingPartner]=useState<Partner|null>(null);
  const [partnerDraft,setPartnerDraft] = useState({name:'',logo:'🇮🇳',url:'#',description:''});
  const [selectedPartner,setSelPartner]=useState<Partner|null>(null);

  /* ── modal state: Announcement ── */
  const [showAnnModal,setShowAnnModal] = useState(false);
  const [editingAnn,setEditingAnn]     = useState<Announcement|null>(null);
  const [annDraft,setAnnDraft]         = useState({text:'',active:true});

  /* ── modal state: Legal ── */
  const [showLegalModal,setShowLegalModal]=useState(false);
  const [legalDraft,setLegalDraft]     = useState<LegalContent>(INIT_LEGAL);
  const [legalType,setLegalType]       = useState<'privacy'|'terms'|'cookie'>('privacy');
  const [showLegalView,setShowLegalView]=useState<'privacy'|'terms'|'cookie'|null>(null);

  /* ── modal state: Company / Pilot / GA ── */
  const [showCompanyModal,setShowCompanyModal]=useState(false);
  const [companyDraft,setCompanyDraft] = useState<CompanyDetails>(INIT_COMPANY);
  const [showPilotModal,setShowPilotModal]=useState(false);
  const [pilotDraft,setPilotDraft]     = useState<PilotCriteria>(INIT_PILOT);
  const [showGaModal,setShowGaModal]   = useState(false);
  const [gaDraft,setGaDraft]           = useState('');

  /* ── modal state: Gallery ── */
  const [showGalleryModal,setShowGalleryModal]=useState(false);
  const [editingGallery,setEditingGallery]=useState<GalleryImage|null>(null);
  const [galleryDraft,setGalleryDraft] = useState({url:'',title:'',category:'Events',date:''});
  const [delGalleryConfirm,setDelGallery]=useState<string|null>(null);
  const [lightboxForGallery,setLightboxForGallery]=useState<GalleryImage|null>(null);

  /* ── modal state: Achievement ── */
  const [showAchModal,setShowAchModal] = useState(false);
  const [editingAch,setEditingAch]     = useState<Achievement|null>(null);
  const [achDraft,setAchDraft]         = useState({year:'',title:'',description:'',icon:'🏆'});
  const [delAchConfirm,setDelAch]      = useState<string|null>(null);

  /* ── modal state: Collaboration ── */
  const [showCollabModal,setShowCollabModal]=useState(false);
  const [editingCollab,setEditingCollab]=useState<Collaboration|null>(null);
  const [collabDraft,setCollabDraft]   = useState({name:'',logo:'🤝',url:'',description:''});
  const [delCollabConfirm,setDelCollab]=useState<string|null>(null);

  /* ── modal state: Ticker edit ── */
  const [showTickerModal,setShowTickerModal]=useState(false);
  const [tickerDraft, setTickerDraft] = useState<string[]>(INIT_TICKER);

const canvasRef = useRef<HTMLCanvasElement>(null);
const statsRef  = useRef<HTMLDivElement>(null);

const typingPhrases = ['Blockchain Infrastructure','Cybersecurity Platforms','Gov-tech Systems','IoT Ecosystems','Smart Contracts','AIML Solutions'];

  /* ══════════════════════════════ EFFECTS ══════════════════════════════ */
  useEffect(()=>{
    // Load all data from localStorage
    setServices(loadLS(SK.services, INIT_SERVICES));
    setTeam(loadLS(SK.team, INIT_TEAM));
    setBlogPosts(loadLS(SK.blog, INIT_BLOG));
    setGallery(loadLS(SK.gallery, []));
    setAchievements(loadLS(SK.achievements, []));
    setTestimonials(loadLS(SK.testimonials, INIT_TESTIMONIALS));
    setPortfolio(loadLS(SK.portfolio, INIT_PORTFOLIO));
    setFaqs(loadLS(SK.faqs, INIT_FAQ));
    setSectors(loadLS(SK.sectors, INIT_SECTORS));
    setStats(loadLS(SK.stats, INIT_STATS));
    setContact(loadLS(SK.contact, INIT_CONTACT));
    setHero(loadLS(SK.hero, INIT_HERO));
    setPricing(loadLS(SK.pricing, INIT_PRICING));
    setJobs(loadLS(SK.jobs, INIT_JOBS));
    setPartners(loadLS(SK.partners, INIT_PARTNERS));
    setAnnounce(loadLS(SK.announcements, INIT_ANNOUNCEMENTS));
    setLegal(loadLS(SK.legal, INIT_LEGAL));
    setCompany(loadLS(SK.company, INIT_COMPANY));
    setPilot(loadLS(SK.pilot, INIT_PILOT));
    setCollabs(loadLS(SK.collaborations, []));
    setPendingQueue(loadLS(SK.pendingQueue, []));
    setActivityLogs(loadLS(SK.activityLog, []));
    setContactSubs(loadLS(SK.contactSubs, []));
    setNlEmails(loadLS(SK.newsletterEmails, []));
    setServiceReviews(loadLS(SK.serviceReviews, {}));
    setCookieLogs(loadLS(SK.cookieLogs, []));
    setTickerItems(loadLS(SK.ticker, INIT_TICKER));
    // Settings
    const dark = localStorage.getItem(SK.darkMode);
    if (dark==='enabled') { setDarkMode(true); document.body.style.background='#020205'; }
    const cc = localStorage.getItem(SK.cookieConsent);
    if (cc==='accepted') setCookieConsent(true);
    const ga = localStorage.getItem(SK.gaMeasurementId);
    if (ga) setGaId(ga);
    setTimeout(()=>setHeroVis(true),100);
  },[]);

  // Auto-save all content
  useEffect(()=>saveLS(SK.services, services),[services]);
  useEffect(()=>saveLS(SK.team, team),[team]);
  useEffect(()=>saveLS(SK.blog, blogPosts),[blogPosts]);
  useEffect(()=>saveLS(SK.gallery, galleryImages),[galleryImages]);
  useEffect(()=>saveLS(SK.achievements, achievements),[achievements]);
  useEffect(()=>saveLS(SK.testimonials, testimonials),[testimonials]);
  useEffect(()=>saveLS(SK.portfolio, portfolio),[portfolio]);
  useEffect(()=>saveLS(SK.faqs, faqs),[faqs]);
  useEffect(()=>saveLS(SK.sectors, sectors),[sectors]);
  useEffect(()=>saveLS(SK.stats, stats),[stats]);
  useEffect(()=>saveLS(SK.contact, contact),[contact]);
  useEffect(()=>saveLS(SK.hero, hero),[hero]);
  useEffect(()=>saveLS(SK.pricing, pricingPlans),[pricingPlans]);
  useEffect(()=>saveLS(SK.jobs, jobListings),[jobListings]);
  useEffect(()=>saveLS(SK.partners, partners),[partners]);
  useEffect(()=>saveLS(SK.announcements, announcements),[announcements]);
  useEffect(()=>saveLS(SK.legal, legal),[legal]);
  useEffect(()=>saveLS(SK.company, companyDetails),[companyDetails]);
  useEffect(()=>saveLS(SK.pilot, pilotCriteria),[pilotCriteria]);
  useEffect(()=>saveLS(SK.collaborations, collaborations),[collaborations]);
  useEffect(()=>saveLS(SK.pendingQueue, pendingQueue),[pendingQueue]);
  useEffect(()=>saveLS(SK.activityLog, activityLogs),[activityLogs]);
  useEffect(()=>saveLS(SK.contactSubs, contactSubs),[contactSubs]);
  useEffect(()=>saveLS(SK.newsletterEmails, newsletterEmails),[newsletterEmails]);
  useEffect(()=>saveLS(SK.serviceReviews, serviceReviews),[serviceReviews]);
  useEffect(()=>saveLS(SK.cookieLogs, cookieLogs),[cookieLogs]);
  useEffect(()=>saveLS(SK.ticker, tickerItems),[tickerItems]);

  // Update Core Leadership stat with team count
  useEffect(()=>{
    setStats(prev=>prev.map(s=>s.label==='Core Leadership'?{...s,num:String(team.length)}:s));
  },[team.length]);

  // Typewriter
  useEffect(()=>{
    const phrase = typingPhrases[phraseIdx];
    const timer = setTimeout(()=>{
      if (!deleting && charIdx<phrase.length){ setTypedText(phrase.slice(0,charIdx+1)); setCharIdx(c=>c+1); }
      else if (!deleting && charIdx===phrase.length){ setTimeout(()=>setDeleting(true),2000); }
      else if (deleting && charIdx>0){ setTypedText(phrase.slice(0,charIdx-1)); setCharIdx(c=>c-1); }
      else { setDeleting(false); setPhraseIdx(p=>(p+1)%typingPhrases.length); }
    }, deleting?35:75);
    return ()=>clearTimeout(timer);
  },[charIdx,deleting,phraseIdx]);

  // Scroll effects
  useEffect(()=>{
    const onScroll = ()=>{
      const sy=window.scrollY;
      setScrollY(sy); setShowBTT(sy>600);
      const doc=document.documentElement;
      const total=doc.scrollHeight-doc.clientHeight;
      setReadProgress(total>0?Math.round((sy/total)*100):0);
      ['home','about','services','portfolio','gallery','team','testimonials','blog','achievements','collaborations','careers','pricing','faq','contact'].forEach(s=>{
        const el=document.getElementById(s);
        if(el&&el.getBoundingClientRect().top<=150) setActiveSection(s);
      });
    };
    const onMouseMove=(e:MouseEvent)=>setMousePos({x:e.clientX,y:e.clientY});
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('mousemove',onMouseMove,{passive:true});
    onScroll();
    return ()=>{ window.removeEventListener('scroll',onScroll); window.removeEventListener('mousemove',onMouseMove); };
  },[]);

  // IntersectionObserver for stats
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting) setCounters(true);},{threshold:.3});
    if(statsRef.current) obs.observe(statsRef.current);
    return ()=>obs.disconnect();
  },[]);

  // Lightbox keyboard nav
  useEffect(()=>{
    const filteredGallery = getFilteredGallery();
    const handler=(e:KeyboardEvent)=>{
      if(!lightboxImg) return;
      if(e.key==='ArrowRight'&&lightboxIdx<filteredGallery.length-1){ setLightboxImg(filteredGallery[lightboxIdx+1]); setLightboxIdx(lightboxIdx+1); }
      if(e.key==='ArrowLeft'&&lightboxIdx>0){ setLightboxImg(filteredGallery[lightboxIdx-1]); setLightboxIdx(lightboxIdx-1); }
      if(e.key==='Escape') setLightboxImg(null);
    };
    window.addEventListener('keydown',handler);
    return ()=>window.removeEventListener('keydown',handler);
  },[lightboxImg,lightboxIdx,galleryImages,galleryFilter,gallerySearch,gallerySort]);

  // Canvas particles
  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext('2d'); if(!ctx) return;
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    type P={x:number;y:number;vx:number;vy:number;size:number;color:string;alpha:number};
    const pts:P[]=[];
    const cols=['#D4A017','#F5A623','#2196F3','#2ECC40','#ffffff'];
    for(let i=0;i<100;i++) pts.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,size:Math.random()*2+.5,color:cols[Math.floor(Math.random()*cols.length)],alpha:Math.random()*.45+.08});
    let aid:number;
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach((p,i)=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0;
        if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fillStyle=p.color; ctx.globalAlpha=p.alpha; ctx.fill();
        pts.slice(i+1).forEach(q=>{ const d=Math.sqrt((p.x-q.x)**2+(p.y-q.y)**2); if(d<120){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle='#D4A017'; ctx.globalAlpha=(1-d/120)*.055; ctx.lineWidth=.4; ctx.stroke(); } });
        ctx.globalAlpha=1;
      });
      aid=requestAnimationFrame(draw);
    };
    draw();
    const resize=()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; };
    window.addEventListener('resize',resize);
    return ()=>{ cancelAnimationFrame(aid); window.removeEventListener('resize',resize); };
  },[]);

  /* ══════════════════════════════ THEME ══════════════════════════════ */
  const bgColor    = darkMode?'#020205':'#ffffff';
  const textColor  = darkMode?'#fff':'#000';
  const cardBg     = darkMode?'rgba(255,255,255,.016)':'rgba(0,0,0,.02)';
  const borderColor= darkMode?'rgba(255,255,255,.05)':'rgba(0,0,0,.08)';
  const subText    = darkMode?'rgba(255,255,255,.3)':'rgba(0,0,0,.5)';

  /* ══════════════════════════════ HELPERS ══════════════════════════════ */
  const renderStars=(rating:number)=>'⭐'.repeat(rating)+'☆'.repeat(5-rating);

  const getFilteredGallery = useCallback(()=>{
    return galleryImages.filter(img=>{
      if(galleryFilter!=='All' && img.category!==galleryFilter) return false;
      if(gallerySearch && !img.title.toLowerCase().includes(gallerySearch.toLowerCase())) return false;
      return true;
    }).sort((a,b)=>{
      if(gallerySort==='newest') return new Date(b.date||0).getTime()-new Date(a.date||0).getTime();
      if(gallerySort==='oldest') return new Date(a.date||0).getTime()-new Date(b.date||0).getTime();
      return 0;
    });
  },[galleryImages,galleryFilter,gallerySearch,gallerySort]);

 const toggleDarkMode = () => {
  smoothUpdate(() => {
    const next = !darkMode;
    setDarkMode(next);
    try { localStorage.setItem(SK.darkMode, next ? 'enabled' : 'disabled'); } catch {}
    document.body.style.background = next ? '#020205' : '#ffffff';
  });
};
  const acceptCookies=()=>{
    setCookieConsent(true);
    try { localStorage.setItem(SK.cookieConsent,'accepted'); } catch {}
    if(gaMeasurementId && typeof window!=='undefined' && (window as any).gtag)
      (window as any).gtag('consent','update',{analytics_storage:'granted'});
    const logEntry={timestamp:new Date().toISOString(),userAgent:navigator.userAgent,sessionId:Math.random().toString(36).substring(2,15),consent:'accepted'};
    setCookieLogs(prev=>[...prev,logEntry]);
  };

  const sendChatMessage=()=>{
    if(!chatMsg.trim()) return;
    const time=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
    setChatMessages(prev=>[...prev,{text:chatMsg,sender:'user',time}]);
    setChatMsg('');
    setTimeout(()=>setChatMessages(prev=>[...prev,{text:'Thanks for reaching out! Our team will respond within 24 hours. You can also WhatsApp us for faster response.',sender:'bot',time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}]),1000);
  };

  const handleNewsletterSignup=(e:React.FormEvent)=>{
    e.preventDefault(); if(!newsletterEmail.trim()) return;
    setNlEmails(prev=>[...prev,newsletterEmail]);
    setNlSub(true); setTimeout(()=>setNlSub(false),3000); setNlEmail('');
    addLog(`Newsletter signup: ${newsletterEmail}`,'guest',setActivityLogs);
  };

  const handleContactSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!privacyAccepted){ alert(t.privacyConsent + ' ' + t.privacyPolicy); return; }
    setSending(true);
    const sub:ContactSub={id:crypto.randomUUID(),...formData,timestamp:new Date().toLocaleString(),read:false};
    setContactSubs(prev=>[sub,...prev]);
    addLog(`Contact form: ${formData.name}`,'guest',setActivityLogs);
    try {
      const res=await fetch('https://formsubmit.co/ajax/contact@togetherprosperity.com',{
        method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({name:formData.name,email:formData.email,phone:formData.phone||'Not provided',company:formData.company||'Not provided',service:formData.service,message:formData.message,_subject:`🚀 New Demo Request from ${formData.name} — Together Prosperity`,_template:'table',_captcha:'false',_replyto:formData.email})
      });
      const data=await res.json();
      if(data.success==='true'||data.success===true||res.ok){
        setSubmitted(true);
        const waMsg=encodeURIComponent(`📩 NEW ENQUIRY - Together Prosperity\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone||'Not provided'}\n🏢 Organization: ${formData.company||'Not provided'}\n⚙️ Service: ${formData.service}\n💬 Message: ${formData.message}`);
        window.open(`https://wa.me/${contact.whatsapp}?text=${waMsg}`,'_blank');
      } else { alert('Something went wrong. Please WhatsApp us directly.'); }
    } catch { alert('Something went wrong. Please WhatsApp us directly.'); }
    setSending(false);
  };

  const handleLogin=()=>{
    if(loginRole==='admin' && loginPw===ADMIN_PASSWORD){
      setIsAdmin(true); setIsMember(false); setShowLogin(false); setLoginPw(''); setLoginErr(false);
      setAdminBadge(true); setTimeout(()=>setAdminBadge(false),3500);
      addLog('Admin logged in','admin',setActivityLogs);
    } else if(loginRole==='member' && loginPw===MEMBER_PASSWORD){
      setIsMember(true); setIsAdmin(false); setShowLogin(false); setLoginPw(''); setLoginErr(false);
      setAdminBadge(true); setTimeout(()=>setAdminBadge(false),3500);
      addLog('Member logged in','member',setActivityLogs);
      if(!localStorage.getItem('member_name')){
        const n=prompt('Enter your name for activity logging:');
        if(n) localStorage.setItem('member_name',n);
      }
    } else { setLoginErr(true); }
  };

  const logout=()=>{ setIsAdmin(false); setIsMember(false); addLog('Logged out','user',setActivityLogs); };

  const exportSubmissionsCSV=()=>{
    const csv=['Name,Email,Phone,Company,Service,Message,Timestamp,Read',...contactSubs.map(s=>`"${s.name}","${s.email}","${s.phone}","${s.company}","${s.service}","${s.message}","${s.timestamp}","${s.read}"`)].join('\n');
    const blob=new Blob([csv],{type:'text/csv'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download='contact_submissions.csv'; a.click(); URL.revokeObjectURL(url);
  };

  const exportNewsletterCSV=()=>{
    const csv=['Email',...newsletterEmails].join('\n');
    const blob=new Blob([csv],{type:'text/csv'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download='newsletter_emails.csv'; a.click(); URL.revokeObjectURL(url);
  };

  /* ── Member features ── */
  const addPendingItem=(type:'gallery'|'blog',data:any)=>{
    const memberName=localStorage.getItem('member_name')||'Member';
    const newItem:PendingItem={id:crypto.randomUUID(),type,data,submittedBy:memberName,submittedAt:new Date().toLocaleString()};
    setPendingQueue(prev=>[...prev,newItem]);
    addLog(`${memberName} submitted ${type} for approval`,'member',setActivityLogs);
  };
  const approvePending=(id:string)=>{
    const item=pendingQueue.find(p=>p.id===id); if(!item) return;
    if(item.type==='gallery') setGallery(prev=>[...prev,item.data as GalleryImage]);
    else if(item.type==='blog') setBlogPosts(prev=>[...prev,item.data as BlogPost]);
    setPendingQueue(prev=>prev.filter(p=>p.id!==id));
    addLog(`Approved ${item.type} from ${item.submittedBy}`,'admin',setActivityLogs);
  };
  const rejectPending=(id:string,reason:string)=>{
    const item=pendingQueue.find(p=>p.id===id);
    if(item) addLog(`Rejected ${item.type} from ${item.submittedBy}: ${reason}`,'admin',setActivityLogs);
    setPendingQueue(prev=>prev.filter(p=>p.id!==id));
    setPendingRejectId(null); setRejectReason('');
  };
  const openMemberBioEditor=()=>{
    const memberName=localStorage.getItem('member_name')||'';
    const me=team.find(t=>t.name.toLowerCase().includes(memberName.toLowerCase()));
    if(me){ setMemberBioDraft({...me}); setShowMemberBio(true); }
    else alert('Could not find your profile. Contact admin.');
  };
  const saveMemberBio=()=>{
    if(memberBioDraft){ setTeam(prev=>prev.map(t=>t.id===memberBioDraft.id?memberBioDraft:t)); setShowMemberBio(false); addLog(`Updated bio: ${memberBioDraft.name}`,'member',setActivityLogs); }
  };
  const submitMemberBlog=()=>{
    if(!memberBlogDraft.title.trim()||!memberBlogDraft.excerpt.trim()) return;
    addPendingItem('blog',{...memberBlogDraft,id:crypto.randomUUID()});
    setShowMemberBlog(false); alert('Your blog post has been submitted for admin approval.');
  };
  const handleMemberGalleryFile=async(file:File)=>{
    if(file.size>5*1024*1024){ alert('File too large. Max 5MB.'); return; }
    const compressed=await compressImage(file); setMemberGalleryDraft(prev=>({...prev,url:compressed})); setUploadPreview(compressed);
  };
  const submitMemberGallery=()=>{
    if(!memberGalleryDraft.url.trim()||!memberGalleryDraft.title.trim()) return;
    addPendingItem('gallery',{...memberGalleryDraft,id:crypto.randomUUID()});
    setShowMemberGallery(false); alert('Your image has been submitted for admin approval.');
  };

  /* ── Reviews ── */
  const handleSubmitReview=(e:React.FormEvent)=>{
    e.preventDefault();
    if(!serviceDetailModal||!newReview.name.trim()||!newReview.comment.trim()) return;
    setSubReview(true);
    const review:Review={id:Date.now().toString(),name:newReview.name.trim(),rating:newReview.rating,comment:newReview.comment.trim(),date:new Date().toLocaleDateString('en-IN')};
    setServiceReviews(prev=>({...prev,[serviceDetailModal.id]:[review,...(prev[serviceDetailModal.id]||[])]}));
    setNewReview({name:'',rating:5,comment:''}); setSubReview(false);
  };

  /* ══════════════════════════════ ADMIN CRUD ══════════════════════════════ */
  // TEAM
  const openAddTeam=()=>{ if(!isAdmin)return; setEditingMember(null); setTeamDraft({name:'',role:'',tag:'',location:'',color:'#D4A017',initial:'',desc:'',emoji:'🚀',photo:'',linkedin:''}); setShowTeamModal(true); };
  const openEditTeam=(m:TeamMember)=>{ if(!isAdmin)return; setEditingMember(m); setTeamDraft({name:m.name,role:m.role,tag:m.tag,location:m.location,color:m.color,initial:m.initial,desc:m.desc,emoji:m.emoji,photo:m.photo||'',linkedin:m.linkedin||''}); setShowTeamModal(true); };
  const saveTeam=()=>{
    if(!teamDraft.name.trim()||!teamDraft.role.trim()) return;
    const nm={...teamDraft,initial:teamDraft.initial.trim()||teamDraft.name.trim()[0].toUpperCase(),tag:teamDraft.tag.trim()||teamDraft.role.trim().toUpperCase()};
    if(editingMember){ setTeam(t=>t.map(m=>m.id===editingMember.id?{...m,...nm}:m)); addLog(`Edited team: ${nm.name}`,'admin',setActivityLogs); }
    else { setTeam(t=>[...t,{id:crypto.randomUUID(),...nm}]); addLog(`Added team: ${nm.name}`,'admin',setActivityLogs); }
    setShowTeamModal(false);
  };
  const deleteTeam=(id:string)=>{ setTeam(t=>t.filter(m=>m.id!==id)); setDelTeam(null); addLog('Deleted team member','admin',setActivityLogs); };

  // SERVICE
  const openAddService=()=>{ if(!isAdmin)return; setEditingSvc(null); setSvcDraft({icon:'⛓️',title:'',desc:'',color:'#D4A017',cs:'rgba(212,160,23,.1)',cg:'rgba(212,160,23,.065)',tag:'',features:[''],caseStudy:'',visible:true,media:[]}); setShowSvcModal(true); };
  const openEditService=(s:Service)=>{ if(!isAdmin)return; setEditingSvc(s); setSvcDraft({icon:s.icon,title:s.title,desc:s.desc,color:s.color,cs:s.cs,cg:s.cg,tag:s.tag,features:[...s.features],caseStudy:s.caseStudy,visible:s.visible,media:s.media?[...s.media]:[]}); setShowSvcModal(true); };
  const saveService=()=>{
    if(!serviceDraft.title.trim()) return;
    const rgb=serviceDraft.color.startsWith('#')?hexToRgb(serviceDraft.color):'212,160,23';
    const u={...serviceDraft,cs:`rgba(${rgb},.1)`,cg:`rgba(${rgb},.065)`,tag:serviceDraft.tag||serviceDraft.title.toUpperCase().slice(0,10),features:serviceDraft.features.filter(f=>f.trim()),media:serviceDraft.media||[]};
    if(editingService){ setServices(s=>s.map(sv=>sv.id===editingService.id?{...sv,...u}:sv)); addLog(`Edited service: ${u.title}`,'admin',setActivityLogs); }
    else { setServices(s=>[...s,{id:crypto.randomUUID(),...u}]); addLog(`Added service: ${u.title}`,'admin',setActivityLogs); }
    setShowSvcModal(false);
  };
  const deleteService=(id:string)=>{ setServices(s=>s.filter(sv=>sv.id!==id)); setDelSvc(null); addLog('Deleted service','admin',setActivityLogs); };
  const toggleSvcVisibility=(id:string)=>setServices(s=>s.map(sv=>sv.id===id?{...sv,visible:!sv.visible}:sv));

  // FAQ
  const openAddFaq=()=>{ if(!isAdmin)return; setEditingFaq(null); setFaqDraft({q:'',a:''}); setShowFaqModal(true); };
  const openEditFaq=(f:FaqItem)=>{ if(!isAdmin)return; setEditingFaq(f); setFaqDraft({q:f.q,a:f.a}); setShowFaqModal(true); };
  const saveFaq=()=>{
    if(!faqDraft.q.trim()||!faqDraft.a.trim()) return;
    if(editingFaq){ setFaqs(f=>f.map(fq=>fq.id===editingFaq.id?{...fq,...faqDraft}:fq)); addLog('Edited FAQ','admin',setActivityLogs); }
    else { setFaqs(f=>[...f,{id:crypto.randomUUID(),...faqDraft}]); addLog('Added FAQ','admin',setActivityLogs); }
    setShowFaqModal(false);
  };
  const deleteFaq=(id:string)=>{ setFaqs(f=>f.filter(fq=>fq.id!==id)); setDelFaq(null); addLog('Deleted FAQ','admin',setActivityLogs); };

  // SECTOR
  const openAddSector=()=>{ if(!isAdmin)return; setEditingSector(null); setSectorDraft({icon:'🏛️',name:'',description:''}); setShowSectorModal(true); };
  const openEditSector=(s:Sector)=>{ if(!isAdmin)return; setEditingSector(s); setSectorDraft({icon:s.icon,name:s.name,description:s.description}); setShowSectorModal(true); };
  const saveSector=()=>{
    if(!sectorDraft.name.trim()) return;
    if(editingSector){ setSectors(s=>s.map(sc=>sc.id===editingSector.id?{...sc,...sectorDraft}:sc)); addLog(`Edited sector: ${sectorDraft.name}`,'admin',setActivityLogs); }
    else { setSectors(s=>[...s,{id:crypto.randomUUID(),...sectorDraft}]); addLog(`Added sector: ${sectorDraft.name}`,'admin',setActivityLogs); }
    setShowSectorModal(false);
  };
  const deleteSector=(id:string)=>{ setSectors(s=>s.filter(sc=>sc.id!==id)); addLog('Deleted sector','admin',setActivityLogs); };

  // STAT
  const openAddStat=()=>{ if(!isAdmin)return; setEditingStat(null); setStatDraft({num:'',label:'',color:'#D4A017'}); setShowStatModal(true); };
  const openEditStat=(s:StatItem)=>{ if(!isAdmin)return; setEditingStat(s); setStatDraft({num:s.num,label:s.label,color:s.color}); setShowStatModal(true); };
  const saveStat=()=>{
    if(!statDraft.num.trim()||!statDraft.label.trim()) return;
    if(editingStat){ setStats(s=>s.map(st=>st.id===editingStat.id?{...st,...statDraft}:st)); addLog(`Edited stat: ${statDraft.label}`,'admin',setActivityLogs); }
    else { setStats(s=>[...s,{id:crypto.randomUUID(),...statDraft}]); addLog(`Added stat: ${statDraft.label}`,'admin',setActivityLogs); }
    setShowStatModal(false);
  };
  const deleteStat=(id:string)=>{ setStats(s=>s.filter(st=>st.id!==id)); addLog('Deleted stat','admin',setActivityLogs); };

  // CONTACT
  const openEditContact=()=>{ if(!isAdmin)return; setContactDraft({...contact}); setShowContactModal(true); };
  const saveContact=()=>{ setContact(contactDraft); addLog('Updated contact info','admin',setActivityLogs); setShowContactModal(false); };

  // HERO
  const openEditHero=()=>{ if(!isAdmin)return; setHeroDraft({...hero}); setShowHeroModal(true); };
  const saveHero=()=>{ setHero(heroDraft); addLog('Updated hero content','admin',setActivityLogs); setShowHeroModal(false); };

  // TESTIMONIAL
  const openAddTestimonial=()=>{ if(!isAdmin)return; setEditingTest(null); setTestDraft({name:'',role:'',company:'',content:'',rating:5,photo:'',linkedinUrl:''}); setShowTestModal(true); };
  const openEditTestimonial=(t:Testimonial)=>{ if(!isAdmin)return; setEditingTest(t); setTestDraft({name:t.name,role:t.role,company:t.company,content:t.content,rating:t.rating,photo:t.photo||'',linkedinUrl:t.linkedinUrl||''}); setShowTestModal(true); };
  const saveTestimonial=()=>{
    if(!testDraft.name.trim()||!testDraft.content.trim()) return;
    if(editingTest){ setTestimonials(t=>t.map(ts=>ts.id===editingTest.id?{...ts,...testDraft}:ts)); addLog('Edited testimonial','admin',setActivityLogs); }
    else { setTestimonials(t=>[...t,{id:crypto.randomUUID(),...testDraft}]); addLog('Added testimonial','admin',setActivityLogs); }
    setShowTestModal(false);
  };
  const deleteTestimonial=(id:string)=>{ setTestimonials(t=>t.filter(ts=>ts.id!==id)); addLog('Deleted testimonial','admin',setActivityLogs); };

  // BLOG
  const openAddBlog=()=>{ if(!isAdmin)return; setEditingBlog(null); setBlogDraft({title:'',excerpt:'',date:new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}),author:'',readTime:'5 min',content:'',featuredImage:''}); setShowBlogModal(true); };
  const openEditBlog=(b:BlogPost)=>{ if(!isAdmin)return; setEditingBlog(b); setBlogDraft({title:b.title,excerpt:b.excerpt,date:b.date,author:b.author,readTime:b.readTime,content:b.content||'',featuredImage:b.featuredImage||''}); setShowBlogModal(true); };
  const saveBlog=()=>{
    if(!blogDraft.title.trim()||!blogDraft.excerpt.trim()) return;
    if(editingBlog){ setBlogPosts(b=>b.map(bl=>bl.id===editingBlog.id?{...bl,...blogDraft}:bl)); addLog('Edited blog post','admin',setActivityLogs); }
    else { setBlogPosts(b=>[...b,{id:crypto.randomUUID(),...blogDraft}]); addLog('Added blog post','admin',setActivityLogs); }
    setShowBlogModal(false);
  };
  const deleteBlog=(id:string)=>{ setBlogPosts(b=>b.filter(bl=>bl.id!==id)); addLog('Deleted blog post','admin',setActivityLogs); };

  // JOB
  const openAddJob=()=>{ if(!isAdmin)return; setEditingJob(null); setJobDraft({title:'',location:'',type:'Full-time',description:''}); setShowJobModal(true); };
  const openEditJob=(j:JobListing)=>{ if(!isAdmin)return; setEditingJob(j); setJobDraft({title:j.title,location:j.location,type:j.type,description:j.description}); setShowJobModal(true); };
  const saveJob=()=>{
    if(!jobDraft.title.trim()||!jobDraft.description.trim()) return;
    if(editingJob){ setJobs(j=>j.map(jb=>jb.id===editingJob.id?{...jb,...jobDraft}:jb)); addLog('Edited job','admin',setActivityLogs); }
    else { setJobs(j=>[...j,{id:crypto.randomUUID(),...jobDraft}]); addLog('Added job','admin',setActivityLogs); }
    setShowJobModal(false);
  };
  const deleteJob=(id:string)=>{ setJobs(j=>j.filter(jb=>jb.id!==id)); addLog('Deleted job','admin',setActivityLogs); };

  // PRICING
  const openAddPricing=()=>{ if(!isAdmin)return; setEditingPricing(null); setPricingDraft({name:'',price:'',features:[''],recommended:false}); setShowPricingModal(true); };
  const openEditPricing=(p:PricingPlan)=>{ if(!isAdmin)return; setEditingPricing(p); setPricingDraft({name:p.name,price:p.price,features:[...p.features],recommended:p.recommended||false}); setShowPricingModal(true); };
  const savePricing=()=>{
    if(!pricingDraft.name.trim()||!pricingDraft.price.trim()) return;
    if(editingPricing){ setPricing(p=>p.map(pl=>pl.id===editingPricing.id?{...pl,...pricingDraft}:pl)); addLog('Edited pricing plan','admin',setActivityLogs); }
    else { setPricing(p=>[...p,{id:crypto.randomUUID(),...pricingDraft}]); addLog('Added pricing plan','admin',setActivityLogs); }
    setShowPricingModal(false);
  };
  const deletePricing=(id:string)=>{ setPricing(p=>p.filter(pl=>pl.id!==id)); addLog('Deleted pricing plan','admin',setActivityLogs); };

  // PORTFOLIO
  const openAddPortfolio=()=>{ if(!isAdmin)return; setEditingPortfolio(null); setPortfolioDraft({title:'',category:'',desc:'',tech:[''],outcome:'',icon:'🏛️',color:'#D4A017'}); setShowPortfolioModal(true); };
  const openEditPortfolio=(p:PortfolioItem)=>{ if(!isAdmin)return; setEditingPortfolio(p); setPortfolioDraft({title:p.title,category:p.category,desc:p.desc,tech:[...p.tech],outcome:p.outcome,icon:p.icon,color:p.color}); setShowPortfolioModal(true); };
  const savePortfolio=()=>{
    if(!portfolioDraft.title.trim()) return;
    if(editingPortfolio){ setPortfolio(p=>p.map(pi=>pi.id===editingPortfolio.id?{...pi,...portfolioDraft}:pi)); addLog('Edited portfolio item','admin',setActivityLogs); }
    else { setPortfolio(p=>[...p,{id:crypto.randomUUID(),...portfolioDraft}]); addLog('Added portfolio item','admin',setActivityLogs); }
    setShowPortfolioModal(false);
  };
  const deletePortfolio=(id:string)=>{ setPortfolio(p=>p.filter(pi=>pi.id!==id)); addLog('Deleted portfolio item','admin',setActivityLogs); };

  // PARTNER
  const openAddPartner=()=>{ if(!isAdmin)return; setEditingPartner(null); setPartnerDraft({name:'',logo:'🇮🇳',url:'#',description:''}); setShowPartnerModal(true); };
  const openEditPartner=(p:Partner)=>{ if(!isAdmin)return; setEditingPartner(p); setPartnerDraft({name:p.name,logo:p.logo,url:p.url,description:p.description}); setShowPartnerModal(true); };
  const savePartner=()=>{
    if(!partnerDraft.name.trim()) return;
    if(editingPartner){ setPartners(prev=>prev.map(p=>p.id===editingPartner.id?{...p,...partnerDraft}:p)); addLog(`Edited partner: ${partnerDraft.name}`,'admin',setActivityLogs); }
    else { setPartners(prev=>[...prev,{id:crypto.randomUUID(),...partnerDraft}]); addLog(`Added partner: ${partnerDraft.name}`,'admin',setActivityLogs); }
    setShowPartnerModal(false);
  };
  const deletePartner=(id:string)=>{ setPartners(prev=>prev.filter(p=>p.id!==id)); addLog('Deleted partner','admin',setActivityLogs); };

  // ANNOUNCEMENT
  const openAddAnn=()=>{ if(!isAdmin)return; setEditingAnn(null); setAnnDraft({text:'',active:true}); setShowAnnModal(true); };
  const openEditAnn=(a:Announcement)=>{ if(!isAdmin)return; setEditingAnn(a); setAnnDraft({text:a.text,active:a.active}); setShowAnnModal(true); };
  const saveAnn=()=>{
    if(!annDraft.text.trim()) return;
    if(editingAnn){ setAnnounce(prev=>prev.map(a=>a.id===editingAnn.id?{...a,...annDraft}:a)); addLog('Edited announcement','admin',setActivityLogs); }
    else { setAnnounce(prev=>[...prev,{id:crypto.randomUUID(),...annDraft}]); addLog('Added announcement','admin',setActivityLogs); }
    setShowAnnModal(false);
  };
  const deleteAnn=(id:string)=>{ setAnnounce(prev=>prev.filter(a=>a.id!==id)); addLog('Deleted announcement','admin',setActivityLogs); };

  // LEGAL
  const openEditLegal=(type:'privacy'|'terms'|'cookie')=>{ setLegalType(type); setLegalDraft({...legal}); setShowLegalModal(true); };
  const saveLegal=()=>{ setLegal(legalDraft); addLog(`Updated ${legalType} policy`,'admin',setActivityLogs); setShowLegalModal(false); };

  // COMPANY
  const openEditCompany=()=>{ setCompanyDraft({...companyDetails}); setShowCompanyModal(true); };
  const saveCompany=()=>{ setCompany(companyDraft); addLog('Updated company details','admin',setActivityLogs); setShowCompanyModal(false); };

  // PILOT
  const openEditPilot=()=>{ setPilotDraft({...pilotCriteria}); setShowPilotModal(true); };
  const savePilot=()=>{ setPilot(pilotDraft); addLog('Updated pilot criteria','admin',setActivityLogs); setShowPilotModal(false); };

  // GA4
  const openEditGa=()=>{ setGaDraft(gaMeasurementId); setShowGaModal(true); };
  const saveGa=()=>{ setGaId(gaDraft); try{ localStorage.setItem(SK.gaMeasurementId,gaDraft); }catch{} setShowGaModal(false); };

  // GALLERY
  const openAddGallery=()=>{ if(!isAdmin)return; setEditingGallery(null); setGalleryDraft({url:'',title:'',category:'Events',date:new Date().toISOString().split('T')[0]}); setShowGalleryModal(true); };
  const openEditGallery=(img:GalleryImage)=>{ if(!isAdmin)return; setEditingGallery(img); setGalleryDraft({url:img.url,title:img.title,category:img.category||'Events',date:img.date||''}); setShowGalleryModal(true); };
  const saveGallery=()=>{
    if(!galleryDraft.url.trim()) return;
    if(editingGallery){ setGallery(prev=>prev.map(i=>i.id===editingGallery.id?{...i,...galleryDraft}:i)); addLog('Edited gallery image','admin',setActivityLogs); }
    else { setGallery(prev=>[...prev,{id:crypto.randomUUID(),...galleryDraft}]); addLog('Added gallery image','admin',setActivityLogs); }
    setShowGalleryModal(false);
  };
  const deleteGallery=(id:string)=>{ setGallery(prev=>prev.filter(i=>i.id!==id)); setDelGallery(null); addLog('Deleted gallery image','admin',setActivityLogs); };

  // ACHIEVEMENT
  const openAddAch=()=>{ if(!isAdmin)return; setEditingAch(null); setAchDraft({year:'',title:'',description:'',icon:'🏆'}); setShowAchModal(true); };
  const openEditAch=(a:Achievement)=>{ if(!isAdmin)return; setEditingAch(a); setAchDraft({year:a.year,title:a.title,description:a.description,icon:a.icon||'🏆'}); setShowAchModal(true); };
  const saveAch=()=>{
    if(!achDraft.title.trim()||!achDraft.year.trim()) return;
    if(editingAch){ setAchievements(prev=>prev.map(a=>a.id===editingAch.id?{...a,...achDraft}:a)); addLog('Edited achievement','admin',setActivityLogs); }
    else { setAchievements(prev=>[...prev,{id:crypto.randomUUID(),...achDraft}]); addLog('Added achievement','admin',setActivityLogs); }
    setShowAchModal(false);
  };
  const deleteAch=(id:string)=>{ setAchievements(prev=>prev.filter(a=>a.id!==id)); setDelAch(null); addLog('Deleted achievement','admin',setActivityLogs); };

  // COLLABORATION
  const openAddCollab=()=>{ if(!isAdmin)return; setEditingCollab(null); setCollabDraft({name:'',logo:'🤝',url:'',description:''}); setShowCollabModal(true); };
  const openEditCollab=(c:Collaboration)=>{ if(!isAdmin)return; setEditingCollab(c); setCollabDraft({name:c.name,logo:c.logo,url:c.url,description:c.description}); setShowCollabModal(true); };
  const saveCollab=()=>{
    if(!collabDraft.name.trim()) return;
    if(editingCollab){ setCollabs(prev=>prev.map(c=>c.id===editingCollab.id?{...c,...collabDraft}:c)); addLog('Edited collaboration','admin',setActivityLogs); }
    else { setCollabs(prev=>[...prev,{id:crypto.randomUUID(),...collabDraft}]); addLog('Added collaboration','admin',setActivityLogs); }
    setShowCollabModal(false);
  };
  const deleteCollab=(id:string)=>{ setCollabs(prev=>prev.filter(c=>c.id!==id)); setDelCollab(null); addLog('Deleted collaboration','admin',setActivityLogs); };

  /* ── Filtered data ── */
  const filteredServices=services.filter(s=>
    s.title.toLowerCase().includes(serviceSearch.toLowerCase())||s.desc.toLowerCase().includes(serviceSearch.toLowerCase())
  );
  const blogCategories=['All',...Array.from(new Set(blogPosts.map(b=>b.author)))];
  const filteredBlogs=blogPosts.filter(b=>{
    const ms=b.title.toLowerCase().includes(blogSearch.toLowerCase())||b.excerpt.toLowerCase().includes(blogSearch.toLowerCase());
    const mc=selectedBlogCat==='All'||b.author===selectedBlogCat;
    return ms&&mc;
  });

  const navLinks = [
    {name: t.home, href:'#home'},
    {name: t.about, href:'#about'},
    {name: t.services, href:'#services'},
    {name: t.portfolio, href:'#portfolio'},
    {name: t.gallery, href:'#gallery'},
    {name: t.team, href:'#team'},
    {name: t.blog, href:'#blog'},
    {name: t.events, href:'#events'},
    {name: t.careers, href:'#careers'},
    {name: t.pricing, href:'#pricing'},
    {name: t.faq, href:'#faq'},
    {name: t.contact, href:'#contact'}
  ];

  /* ══════════════════════════════ MINI COMPONENTS ══════════════════════════════ */
  const MiniBtn=({onClick,children,danger=false}:{onClick:()=>void;children:React.ReactNode;danger?:boolean})=>(
    <button onClick={onClick} style={{border:`1px solid ${danger?'rgba(244,67,54,.25)':'rgba(212,160,23,.25)'}`,background:'transparent',color:danger?'#f44336':'#D4A017',padding:'4px 12px',borderRadius:'6px',fontSize:'9px',letterSpacing:'1.5px',fontWeight:700,cursor:'pointer',fontFamily:"'Space Mono',monospace",transition:'all .2s'}}
      onMouseEnter={e=>(e.currentTarget.style.background=danger?'rgba(244,67,54,.1)':'rgba(212,160,23,.1)')}
      onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
    >{children}</button>
  );

  const AdminBar = ({ label, onAdd, onEdit, onEditLabel = '✏ EDIT' }: { label: string; onAdd?: () => void; onEdit?: () => void; onEditLabel?: string }) => {
    if (!isAdmin && !isMember) return null;
    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '8px', color: 'rgba(212,160,23,.5)', letterSpacing: '2px' }}>
          {isAdmin ? '🔐 ADMIN' : '👤 MEMBER'} · {label}
        </span>
        {onAdd && <MiniBtn onClick={onAdd}>+ ADD</MiniBtn>}
        {onEdit && <MiniBtn onClick={onEdit}>{onEditLabel}</MiniBtn>}
      </div>
    );
  };

  const SectionTag=({children}:{children:React.ReactNode})=>(
    <span style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.6)',fontSize:'8.5px',letterSpacing:'7px',marginBottom:'16px',display:'block',fontWeight:700,textTransform:'uppercase'}}>{children}</span>
  );

  /* ══════════════════════════════ FULL GALLERY VIEW ══════════════════════════════ */
  if (showFullGallery) {
    const fg = getFilteredGallery();
    return (
      <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:bgColor,zIndex:10002,overflowY:'auto',padding:'30px 40px'}}>
        <style>{`*{box-sizing:border-box;margin:0;padding:0} .tag-chip{background:rgba(212,160,23,.07);border:1px solid rgba(212,160,23,.18);color:rgba(212,160,23,.7);padding:5px 17px;border-radius:50px;font-size:9px;letter-spacing:4px;font-weight:700;display:inline-block;transition:all .3s;font-family:'Space Mono',monospace;cursor:pointer} .tag-chip.active-chip{background:rgba(212,160,23,.2);color:#D4A017;border-color:#D4A017} .btn-secondary{background:transparent;border:1px solid rgba(212,160,23,.3);color:rgba(212,160,23,.85)!important;padding:10px 24px;border-radius:50px;font-weight:600;font-size:10.5px;letter-spacing:3px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .4s;cursor:pointer;white-space:nowrap} .btn-primary{background:linear-gradient(135deg,#D4A017,#F5A623);color:#000!important;border:none;padding:10px 24px;border-radius:50px;font-weight:800;font-size:10.5px;letter-spacing:3px;display:inline-flex;align-items:center;gap:8px;transition:all .4s;cursor:pointer;white-space:nowrap} .masonry{column-count:3;column-gap:20px} @media(max-width:1024px){.masonry{column-count:2}} @media(max-width:600px){.masonry{column-count:1}}`}</style>
        <div style={{maxWidth:'1400px',margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'30px',flexWrap:'wrap',gap:'15px'}}>
            <div><h2 style={{color:'#D4A017',fontSize:'28px',fontWeight:800,fontFamily:"'Space Mono',monospace"}}>📸 Together Prosperity Gallery</h2><p style={{color:subText,fontSize:'12px',marginTop:'4px'}}>{fg.length} {t.photos}</p></div>
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
              {(isAdmin||isMember)&&<button onClick={()=>{setShowFullGallery(false);isAdmin?openAddGallery():setShowMemberGallery(true)}} className="btn-primary" style={{fontSize:'10px',padding:'8px 18px'}}>📸 {t.addImage}</button>}
              <button onClick={()=>setShowFullGallery(false)} className="btn-secondary">✕ {t.close}</button>
            </div>
          </div>
          <div style={{display:'flex',gap:'15px',flexWrap:'wrap',marginBottom:'25px',alignItems:'center'}}>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {GALLERY_CATEGORIES.map(cat=>(
                <button key={cat} onClick={()=>setGalleryFilter(cat)} className={`tag-chip${galleryFilter===cat?' active-chip':''}`}>{cat}</button>
              ))}
            </div>
            <input type="text" placeholder={t.searchGallery} value={gallerySearch} onChange={e=>setGallerySearch(e.target.value)} style={{padding:'8px 16px',borderRadius:'50px',border:`1px solid ${borderColor}`,background:cardBg,color:textColor,outline:'none',fontSize:'12px'}}/>
            <select value={gallerySort} onChange={e=>setGallerySort(e.target.value)} style={{padding:'8px 12px',borderRadius:'8px',border:`1px solid ${borderColor}`,background:cardBg,color:textColor,outline:'none',fontSize:'12px'}}>
              <option value="newest">{t.newestFirst}</option>
              <option value="oldest">{t.oldestFirst}</option>
            </select>
          </div>
          <div className="masonry">
            {fg.map((img,idx)=>(
              <div key={img.id} style={{breakInside:'avoid',marginBottom:'20px',background:cardBg,borderRadius:'16px',overflow:'hidden',border:`1px solid ${borderColor}`,cursor:'pointer',transition:'all .3s'}} onClick={()=>smoothUpdate(()=>setLightboxImg(img))}>
                <img src={img.url} alt={img.title} style={{width:'100%',display:'block'}}/>
                <div style={{padding:'12px'}}>
                  <div style={{fontWeight:600,color:textColor,fontSize:'13px'}}>{img.title}</div>
                  <div style={{fontSize:'11px',color:subText,marginTop:'4px'}}>{img.category} {img.date&&`• ${img.date}`}</div>
                  {isAdmin&&(
                    <div style={{display:'flex',gap:'8px',marginTop:'10px'}} onClick={e=>e.stopPropagation()}>
                      <button onClick={()=>{setShowFullGallery(false);openEditGallery(img);}} className="btn-secondary" style={{padding:'3px 10px',fontSize:'9px'}}>✏ {t.edit}</button>
                      <button onClick={()=>setDelGallery(img.id)} className="btn-secondary" style={{padding:'3px 10px',fontSize:'9px',borderColor:'rgba(244,67,54,.3)',color:'#f44336'}}>🗑 {t.delete}</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {fg.length===0&&<div style={{textAlign:'center',padding:'80px',color:subText}}><div style={{fontSize:'64px',marginBottom:'16px'}}>🖼️</div><p>{t.noImagesFound}</p></div>}
        </div>
        {/* Lightbox */}
        {lightboxImg&&(
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,.96)',zIndex:10003,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} onClick={()=>setLightboxImg(null)}>
            <div style={{maxWidth:'90vw',maxHeight:'80vh'}} onClick={e=>e.stopPropagation()}>
              <img src={lightboxImg.url} alt={lightboxImg.title} style={{maxWidth:'100%',maxHeight:'75vh',objectFit:'contain',borderRadius:'8px'}}/>
              <div style={{color:'#fff',textAlign:'center',marginTop:'16px'}}><div style={{fontSize:'16px',fontWeight:600}}>{lightboxImg.title}</div><div style={{fontSize:'12px',color:'rgba(255,255,255,.5)',marginTop:'4px'}}>{lightboxImg.category} {lightboxImg.date&&`• ${lightboxImg.date}`}</div></div>
              <div style={{display:'flex',justifyContent:'center',gap:'12px',marginTop:'20px',flexWrap:'wrap'}}>
                <button onClick={()=>{if(lightboxIdx>0){setLightboxImg(fg[lightboxIdx-1]);setLightboxIdx(lightboxIdx-1);}}} className="btn-secondary" disabled={lightboxIdx===0}>← {t.prev}</button>
                <button onClick={()=>{if(lightboxIdx<fg.length-1){setLightboxImg(fg[lightboxIdx+1]);setLightboxIdx(lightboxIdx+1);}}} className="btn-secondary" disabled={lightboxIdx===fg.length-1}>{t.next} →</button>
                <a href={lightboxImg.url} download className="btn-secondary">⬇ {t.download}</a>
                <button onClick={()=>{navigator.clipboard.writeText(window.location.href);}} className="btn-secondary">🔗 {t.share}</button>
              </div>
              <div style={{textAlign:'center',color:'rgba(255,255,255,.4)',marginTop:'12px',fontSize:'11px'}}>{lightboxIdx+1} / {fg.length}</div>
            </div>
            <button onClick={()=>setLightboxImg(null)} style={{position:'absolute',top:'20px',right:'30px',background:'none',border:'none',color:'#fff',fontSize:'32px',cursor:'pointer'}}>✕</button>
          </div>
        )}
      </div>
    );
  }

  /* ══════════════════════════════ MAIN RENDER ══════════════════════════════ */
  return (
    <main suppressHydrationWarning style={{background:bgColor,color:textColor,fontFamily:"'Sora','Segoe UI',sans-serif",overflowX:'hidden',transition:'all .3s'}}>
      <Head>
        <title>Together Prosperity – Blockchain, Cybersecurity, IoT, AI/ML Solutions</title>
        <meta name="description" content="Together Prosperity Private Limited builds blockchain, cybersecurity, IoT, and AI/ML solutions for Indian government and enterprises. Zero‑setup pilot projects available."/>
        <meta property="og:title" content="Together Prosperity – Digital India Tech Solutions"/>
        <meta property="og:description" content="Empowering India's digital transformation with cutting-edge technology."/>
        <meta property="og:type" content="website"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>

      {/* Google Analytics */}
      {cookieConsent && gaMeasurementId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive"/>
          <Script id="google-analytics" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];
            function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());
            gtag('config','${gaMeasurementId}');
          `}</Script>
        </>
      )}

      <style suppressHydrationWarning>{`
      /* ========== VIEW TRANSITIONS SMOOTH ANIMATION ========== */
::view-transition-group(*),
::view-transition-old(*),
::view-transition-new(*) {
  animation-duration: 0.25s;
  animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:2px}::-webkit-scrollbar-track{background:#020205}::-webkit-scrollbar-thumb{background:linear-gradient(#D4A017,#2196F3);border-radius:2px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(70px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-16px) rotate(2deg)}66%{transform:translateY(-8px) rotate(-1deg)}}
        @keyframes logoFloat{0%,100%{transform:translateY(0) scale(1);filter:drop-shadow(0 0 35px rgba(212,160,23,.9)) drop-shadow(0 0 70px rgba(212,160,23,.45)) drop-shadow(0 0 120px rgba(33,150,243,.25))}50%{transform:translateY(-22px) scale(1.03);filter:drop-shadow(0 0 60px rgba(212,160,23,1)) drop-shadow(0 0 120px rgba(212,160,23,.7)) drop-shadow(0 0 200px rgba(33,150,243,.5))}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes ringRotate{to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes ringRotateRev{to{transform:translate(-50%,-50%) rotate(-360deg)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulseRing{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.35}50%{transform:translate(-50%,-50%) scale(1.08);opacity:.85}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(212,160,23,.4)}50%{box-shadow:0 0 0 18px rgba(212,160,23,0)}}
        @keyframes modalIn{from{opacity:0;transform:scale(.88) translateY(30px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes overlayIn{from{opacity:0}to{opacity:1}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes countUp{from{opacity:0;transform:scale(.3) translateY(24px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes adminBadge{0%{opacity:0;transform:translateY(-20px)}20%,80%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-20px)}}
        @keyframes orbitDot{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.6);opacity:1}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.7}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes faqOpen{from{opacity:0;max-height:0}to{opacity:1;max-height:300px}}
        @keyframes gradientFlow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes lockShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
        @keyframes cardReveal{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}

        .nav-link{color:${darkMode?'rgba(255,255,255,.28)':'rgba(0,0,0,.4)'}!important;text-decoration:none;font-size:14px;letter-spacing:4px;font-weight:700;transition:all .3s;position:relative;font-family:'Space Mono',monospace;padding:6px 0;white-space:nowrap}
        .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1.5px;background:linear-gradient(90deg,#D4A017,#F5A623);transition:width .35s;border-radius:1px}
        .nav-link:hover,.nav-link.active{color:#D4A017!important}.nav-link:hover::after,.nav-link.active::after{width:100%}

        .btn-primary{background:linear-gradient(135deg,#D4A017 0%,#F5A623 50%,#D4A017 100%);background-size:200% auto;color:#000!important;border:none;padding:15px 38px;border-radius:50px;font-weight:800;font-size:10.5px;letter-spacing:3px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .4s;cursor:pointer;animation:glowPulse 3.5s infinite;font-family:'Sora',sans-serif;white-space:nowrap}
        .btn-primary:hover{background-position:right center;transform:translateY(-4px) scale(1.05);box-shadow:0 24px 70px rgba(212,160,23,.55)}
        .btn-secondary{background:transparent;border:1px solid rgba(212,160,23,.3);color:rgba(212,160,23,.85)!important;padding:15px 38px;border-radius:50px;font-weight:600;font-size:10.5px;letter-spacing:3px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .4s;backdrop-filter:blur(10px);cursor:pointer;white-space:nowrap}
        .btn-secondary:hover{background:rgba(212,160,23,.06);border-color:#D4A017;transform:translateY(-4px) scale(1.05);box-shadow:0 0 50px rgba(212,160,23,.18)}

        .glass{background:${darkMode?'rgba(255,255,255,.022)':'rgba(0,0,0,.02)'};border:1px solid ${darkMode?'rgba(255,255,255,.06)':'rgba(0,0,0,.08)'};border-radius:20px;transition:all .4s cubic-bezier(.23,1,.32,1)}
        .glass:hover{border-color:rgba(212,160,23,.3);background:rgba(255,255,255,.038);transform:translateY(-8px);box-shadow:0 32px 80px rgba(0,0,0,.45)}

        .service-card{background:${cardBg};border:1px solid ${borderColor};border-radius:22px;padding:38px 32px;transition:all .45s cubic-bezier(.23,1,.32,1);cursor:pointer;position:relative;overflow:hidden}
        .service-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top left,var(--cg,rgba(212,160,23,.06)) 0%,transparent 65%);opacity:0;transition:opacity .4s}
        .service-card::after{content:'';position:absolute;top:-100%;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--cc,#D4A017),transparent);transition:all .3s}
        .service-card:hover{transform:translateY(-16px);border-color:var(--cc,#D4A017);box-shadow:0 50px 100px rgba(0,0,0,.7),0 0 80px var(--cs,rgba(212,160,23,.1));background:rgba(255,255,255,.032)}
        .service-card:hover::before{opacity:1}.service-card:hover::after{top:200%;transition:top 2.5s linear}
        .service-card.hidden-service{opacity:.4;border-style:dashed}

        .stat-card{background:${cardBg};border:1px solid ${borderColor};border-radius:18px;padding:32px 14px;text-align:center;transition:all .38s;position:relative;overflow:hidden;cursor:default}
        .stat-card::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:2px;background:var(--sc,#D4A017);transition:width .45s;border-radius:2px}
        .stat-card:hover{border-color:var(--sc,#D4A017);transform:translateY(-10px);background:rgba(255,255,255,.032)}.stat-card:hover::after{width:70%}

        .team-card{background:${cardBg};border:1px solid ${borderColor};border-radius:24px;padding:44px 32px;text-align:center;transition:all .5s cubic-bezier(.23,1,.32,1);position:relative;overflow:hidden}
        .team-card:hover{transform:translateY(-16px);box-shadow:0 60px 120px rgba(0,0,0,.6)}

        .faq-item{background:${cardBg};border:1px solid ${borderColor};border-radius:17px;overflow:hidden;transition:all .32s;cursor:pointer}
        .faq-item:hover{border-color:rgba(212,160,23,.24)}.faq-item.active{border-color:rgba(212,160,23,.4);background:rgba(212,160,23,.02)}
        .faq-header{padding:24px 32px;display:flex;justify-content:space-between;align-items:center;gap:12px}
        .faq-body{padding:0 32px 24px;animation:faqOpen .3s ease}
        .faq-toggle{min-width:24px;height:24px;width:24px;border-radius:50%;background:rgba(212,160,23,.1);border:1px solid rgba(212,160,23,.2);color:#D4A017;display:flex;align-items:center;justify-content:center;font-size:14px;transition:transform .3s}
        .faq-toggle.open{transform:rotate(45deg)}

        .form-input{width:100%;background,${darkMode?'rgba(255,255,255,.028)':'rgba(0,0,0,.03)'};border:1px solid ${darkMode?'rgba(255,255,255,.07)':'rgba(0,0,0,.12)'};border-radius:13px;padding:14px 18px;color:${textColor};font-size:13px;font-family:'Sora',sans-serif;outline:none;transition:all .3s;box-sizing:border-box}
        .form-input:focus{border-color:#D4A017;background:rgba(212,160,23,.04);box-shadow:0 0 0 4px rgba(212,160,23,.08)}
        .form-input::placeholder{color:${darkMode?'rgba(255,255,255,.16)':'rgba(0,0,0,.35)'}}

        .modal-input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:11px;padding:12px 15px;color:#fff;font-size:13px;font-family:'Sora',sans-serif;outline:none;transition:all .3s;box-sizing:border-box}
        .modal-input:focus{border-color:#D4A017;box-shadow:0 0 0 3px rgba(212,160,23,.12)}

        .search-input{background:${cardBg};border:1px solid ${borderColor};border-radius:50px;padding:10px 20px 10px 44px;color:${textColor};font-size:13px;font-family:'Sora',sans-serif;outline:none;transition:all .3s;width:100%;max-width:360px}
        .search-input:focus{border-color:#D4A017;box-shadow:0 0 0 3px rgba(212,160,23,.08)}

        .tag-chip{background:rgba(212,160,23,.07);border:1px solid rgba(212,160,23,.18);color:rgba(212,160,23,.7);padding:5px 17px;border-radius:50px;font-size:9px;letter-spacing:4px;font-weight:700;display:inline-block;transition:all .3s;font-family:'Space Mono',monospace}
        .tag-chip:hover{background:rgba(212,160,23,.14);color:#D4A017;border-color:rgba(212,160,23,.5);transform:translateY(-3px)}
        .tag-chip.active-chip{background:rgba(212,160,23,.2);color:#D4A017;border-color:#D4A017}

        .logo-ring-1{position:absolute;width:290px;height:290px;border:1.5px solid rgba(212,160,23,.28);border-top-color:rgba(212,160,23,.95);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);animation:ringRotate 7s linear infinite}
        .logo-ring-2{position:absolute;width:360px;height:360px;border:1px dashed rgba(33,150,243,.2);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);animation:ringRotateRev 14s linear infinite}
        .logo-ring-3{position:absolute;width:230px;height:230px;border:1px solid rgba(46,204,64,.15);border-bottom-color:rgba(46,204,64,.9);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);animation:ringRotate 11s linear infinite reverse}
        .logo-ring-4{position:absolute;width:420px;height:420px;border:.5px solid rgba(212,160,23,.07);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);animation:ringRotateRev 20s linear infinite}

        .ticker-wrap{overflow:hidden;background:rgba(212,160,23,.025);border-top:1px solid rgba(212,160,23,.09);border-bottom:1px solid rgba(212,160,23,.09);padding:13px 0}
        .ticker-content{display:flex;white-space:nowrap;animation:ticker 45s linear infinite}
        .ticker-item{padding:0 55px;color:rgba(212,160,23,.55);font-size:8.5px;letter-spacing:4.5px;font-weight:700;font-family:'Space Mono',monospace}

        .gold-text{background:linear-gradient(135deg,#9A6E00,#D4A017,#F5C842,#F5A623,#D4A017,#9A6E00);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
        .blue-text{background:linear-gradient(135deg,#0D47A1,#2196F3,#82B1FF,#2196F3);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 5s linear infinite}

        .gradient-border{position:relative;border-radius:20px;padding:1px;background:linear-gradient(135deg,rgba(212,160,23,.45),rgba(33,150,243,.35),rgba(46,204,64,.3),rgba(212,160,23,.45));background-size:300% 300%;animation:gradientFlow 4s ease infinite}
        .gradient-border-inner{background:#060610;border-radius:19px;padding:36px 28px;height:100%}

        .add-card{background:rgba(212,160,23,.025);border:2px dashed rgba(212,160,23,.22);border-radius:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;cursor:pointer;transition:all .4s;min-height:280px;width:100%}
        .add-card:hover{background:rgba(212,160,23,.07);border-color:#D4A017;transform:translateY(-10px);box-shadow:0 30px 70px rgba(0,0,0,.45)}

        .color-swatch{width:30px;height:30px;border-radius:50%;border:3px solid transparent;cursor:pointer;transition:all .22s}.color-swatch:hover{transform:scale(1.28)}.color-swatch.sel{border-color:#fff;box-shadow:0 0 0 2px rgba(255,255,255,.3)}
        .emoji-btn{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;width:38px;height:38px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;transition:all .2s}
        .emoji-btn:hover,.emoji-btn.sel{background:rgba(212,160,23,.1);border-color:rgba(212,160,23,.4);transform:scale(1.18)}

        .portfolio-card{background:${cardBg};border:1px solid ${borderColor};border-radius:22px;padding:32px;transition:all .4s;position:relative;overflow:hidden;cursor:pointer}
        .portfolio-card:hover{transform:translateY(-12px);border-color:rgba(212,160,23,.35);box-shadow:0 40px 90px rgba(0,0,0,.6)}

        .card-base{background:${cardBg};border:1px solid ${borderColor};border-radius:14px;padding:20px 28px;text-align:center;transition:all .3s;cursor:pointer}
        .card-base:hover{border-color:rgba(212,160,23,.35);transform:translateY(-6px);background:rgba(212,160,23,.03)}

        .gallery-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:20px;margin-top:30px}
        .gallery-card img{width:100%;height:180px;object-fit:cover;border-radius:12px;margin-bottom:12px}

        .social-pill{transition:all .3s!important}.social-pill:hover{transform:translateY(-5px) scale(1.08)!important;box-shadow:0 14px 35px rgba(0,0,0,.45)!important}
        .cursor-blink{display:inline-block;width:2px;height:1.1em;background:#D4A017;margin-left:3px;vertical-align:text-bottom;animation:blink 1s infinite}
        .noise{position:fixed;inset:0;opacity:.018;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none;z-index:9999}
        .admin-toast{position:fixed;top:80px;left:50%;transform:translateX(-50%);z-index:9998;background:rgba(5,5,16,.97);border:1px solid rgba(212,160,23,.55);border-radius:50px;padding:11px 26px;display:flex;align-items:center;gap:10px;font-family:'Space Mono',monospace;font-size:10.5px;color:#D4A017;letter-spacing:2px;animation:adminBadge 3.5s ease forwards;box-shadow:0 10px 50px rgba(212,160,23,.25)}
        .lock-btn{background:${darkMode?'rgba(255,255,255,.022)':'rgba(0,0,0,.04)'};border:1px solid ${darkMode?'rgba(255,255,255,.05)':'rgba(0,0,0,.15)'};color:${darkMode?'rgba(255,255,255,.24)':'rgba(0,0,0,.5)'};padding:7px 17px;border-radius:50px;font-size:9px;letter-spacing:2.5px;font-family:'Space Mono',monospace;cursor:pointer;transition:all .3s}
        .lock-btn:hover{border-color:rgba(212,160,23,.38);color:#D4A017;background:rgba(212,160,23,.055)}
        .admin-badge-btn{display:inline-flex;align-items:center;gap:6px;background:rgba(212,160,23,.08);border:1px solid rgba(212,160,23,.32);color:#D4A017;padding:6px 16px;border-radius:50px;font-size:9px;letter-spacing:2.5px;font-weight:700;font-family:'Space Mono',monospace;cursor:pointer;transition:all .3s}
        .admin-badge-btn:hover{background:rgba(244,67,54,.08);border-color:rgba(244,67,54,.35);color:#f44336}
        .gradient-hr{height:1px;background:linear-gradient(90deg,transparent,rgba(212,160,23,.4),rgba(33,150,243,.3),transparent);border:none;margin:0}
        .contact-block{background:${cardBg};border:1px solid ${borderColor};border-radius:19px;padding:28px 32px;margin-bottom:14px;transition:all .32s}
        .contact-block:hover{border-color:rgba(212,160,23,.26);background:rgba(255,255,255,.032);transform:translateX(5px)}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.92);backdrop-filter:blur(28px);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;animation:overlayIn .22s ease;overflow-y:auto}
        .modal-box{background:#050510;border:1px solid rgba(212,160,23,.2);border-radius:28px;padding:44px;width:100%;max-width:620px;max-height:92vh;overflow-y:auto;animation:modalIn .32s cubic-bezier(.23,1,.32,1)}
        .modal-box::-webkit-scrollbar{width:2px}.modal-box::-webkit-scrollbar-thumb{background:#D4A017}
        .admin-box{background:#050510;border:1px solid rgba(212,160,23,.28);border-radius:24px;padding:44px;width:100%;max-width:420px;animation:modalIn .3s cubic-bezier(.23,1,.32,1);text-align:center}
        .admin-pw{width:100%;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px 18px;color:#fff;font-size:15px;font-family:'Space Mono',monospace;outline:none;text-align:center;letter-spacing:5px;transition:all .3s}
        .admin-pw:focus{border-color:#D4A017;box-shadow:0 0 0 3px rgba(212,160,23,.14)}
        .admin-pw.err{border-color:#f44336;animation:lockShake .4s ease}
        .detail-modal{background:#050510;border:1px solid rgba(212,160,23,.22);border-radius:28px;padding:0;width:100%;max-width:900px;max-height:92vh;overflow:hidden;animation:modalIn .32s cubic-bezier(.23,1,.32,1);display:flex;flex-direction:column}
        .chat-widget{position:fixed;bottom:90px;right:20px;z-index:9999}
        .floating-book-btn{position:fixed;bottom:20px;right:20px;z-index:9998;animation:pulse 2s ease-in-out infinite}
        .progress-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#D4A017,#F5A623,#2196F3);z-index:10001;transition:width .1s linear}
        .back-to-top{position:fixed;bottom:145px;left:20px;z-index:9998;width:45px;height:45px;border-radius:50%;background:linear-gradient(135deg,#D4A017,#F5A623);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 20px rgba(212,160,23,.4);transition:all .3s;animation:slideUp .3s ease}
        .back-to-top:hover{transform:translateY(-3px);box-shadow:0 8px 30px rgba(212,160,23,.5)}
        .dark-toggle{position:fixed;bottom:95px;left:20px;z-index:9998;background:${darkMode?'#fff':'#000'};color:${darkMode?'#000':'#fff'};border:none;border-radius:50%;width:45px;height:45px;cursor:pointer;font-size:20px;box-shadow:0 2px 10px rgba(0,0,0,.2);transition:all .3s}
        .media-thumb{width:60px;height:60px;border-radius:8px;cursor:pointer;border:2px solid transparent;transition:all .2s;overflow:hidden}
        .media-thumb.active{border-color:#D4A017}
        .video-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px}
        .video-container iframe{position:absolute;top:0;left:0;width:100%;height:100%}
        .mobile-menu-btn{display:none;background:transparent;border:none;color:${textColor};font-size:24px;cursor:pointer;z-index:1001}
        .mobile-nav{position:fixed;top:68px;left:0;right:0;background:${darkMode?'rgba(2,2,8,.98)':'rgba(255,255,255,.98)'};backdrop-filter:blur(40px);border-bottom:1px solid ${borderColor};padding:20px;transform:translateY(-110%);transition:transform .3s ease;z-index:999;display:none}
        .mobile-nav.open{transform:translateY(0);display:block}
        .mobile-nav a{display:block;padding:12px 0;color:${textColor};text-decoration:none;font-family:'Space Mono',monospace;font-size:12px;letter-spacing:2px;border-bottom:1px solid ${borderColor}}
        .mobile-nav a.active{color:#D4A017}

        @media(max-width:768px){
          nav{padding:0 18px!important;height:60px!important}
        nav>div:nth-child(2){display:none!important}
        .mobile-menu-btn{display:block!important}
         .mobile-nav{display:block}
          section,footer{padding-left:20px!important;padding-right:20px!important}
          #home{padding-top:100px!important;padding-bottom:60px!important}
          .logo-ring-1{width:190px!important;height:190px!important}
          .logo-ring-2{width:230px!important;height:230px!important}
          .logo-ring-3{width:150px!important;height:150px!important}
          .logo-ring-4{width:270px!important;height:270px!important}
          .modal-box{padding:24px!important}.admin-box{padding:28px!important}
          .detail-modal{max-width:100%!important}
          .chat-widget{display:none!important}
          .gallery-grid{grid-template-columns:1fr!important}
          div[style*="1fr 1.6fr"]{display:flex!important;flex-direction:column!important}
        }
      `}</style>

      {/* Read progress bar */}
      <div className="progress-bar" style={{width:`${readProgress}%`}}/>
      <div className="noise"/>
      <canvas ref={canvasRef} style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:.5}}/>
      <div style={{position:'fixed',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(212,160,23,.04) 0%,transparent 70%)',left:mousePos.x-200,top:mousePos.y-200,pointerEvents:'none',zIndex:1,transition:'left .1s,top .1s',mixBlendMode:'screen'}}/>

      {/* Admin/Member toast */}
      {showAdminBadge&&<div className="admin-toast">{isAdmin?t.adminMode:t.memberMode}</div>}

      {/* Back to top */}
      {showBackToTop&&<button className="back-to-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} title={t.backToTop}>↑</button>}

      {/* Dark mode toggle */}
      <button className="dark-toggle" onClick={toggleDarkMode} title={darkMode?t.lightMode:t.darkMode}>{darkMode?'☀️':'🌙'}</button>

      {/* Announcement bar */}
      {announcements.filter(a=>a.active).map(ann=>(
        <div key={ann.id} style={{background:'linear-gradient(135deg,#D4A017,#F5A623)',color:'#000',padding:'10px 20px',textAlign:'center',fontSize:'11px',fontWeight:600,position:'relative',zIndex:1001}}>
          {ann.text}
          {isAdmin&&<button onClick={()=>setAnnounce(prev=>prev.map(a=>a.id===ann.id?{...a,active:false}:a))} style={{background:'rgba(0,0,0,.2)',border:'none',marginLeft:'15px',cursor:'pointer',fontSize:'12px',fontWeight:'bold',padding:'2px 8px',borderRadius:'4px'}}>✕</button>}
        </div>
      ))}

      {/* Floating book demo */}
      <div className="floating-book-btn">
        <a href="#contact" className="btn-primary" style={{padding:'12px 24px',fontSize:'10px',animation:'none',boxShadow:'0 4px 20px rgba(212,160,23,.4)'}}>📅 {t.bookDemo}</a>
      </div>

      {/* Cookie consent */}
      {!cookieConsent&&(
        <div style={{position:'fixed',bottom:'20px',left:'20px',right:'80px',background:darkMode?'#1a1a2e':'#fff',borderRadius:'12px',padding:'16px 20px',zIndex:10000,boxShadow:'0 4px 20px rgba(0,0,0,.2)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px',border:`1px solid ${borderColor}`}}>
          <span style={{fontSize:'12px',color:textColor}}>{t.cookieText} <button onClick={()=>setShowLegalView('cookie')} style={{background:'none',border:'none',color:'#D4A017',textDecoration:'underline',cursor:'pointer',fontSize:'12px'}}>{t.learnMore}</button></span>
          <div style={{display:'flex',gap:'10px'}}>
            <button onClick={acceptCookies} className="btn-primary" style={{padding:'8px 20px',fontSize:'10px',animation:'none'}}>{t.accept}</button>
            <button onClick={()=>setCookieConsent(true)} style={{background:'transparent',border:`1px solid ${borderColor}`,padding:'8px 20px',borderRadius:'50px',cursor:'pointer',fontSize:'10px',color:textColor}}>{t.decline}</button>
          </div>
        </div>
      )}

      {/* Calendly Modal */}
      {showCalendly&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowCalendly(false)}}>
          <div style={{background:darkMode?'#1a1a2e':'#fff',borderRadius:'16px',width:'90%',maxWidth:'600px',padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'16px'}}><h3 style={{color:textColor}}>{t.scheduleMeeting}</h3><button onClick={()=>setShowCalendly(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:textColor}}>✕</button></div>
            <div style={{background:darkMode?'rgba(255,255,255,.04)':'#f5f5f5',borderRadius:'12px',padding:'40px',textAlign:'center'}}>
              <p style={{marginBottom:'20px',color:textColor,fontSize:'18px'}}>{t.bookFreeDemo}</p>
              <p style={{fontSize:'13px',color:subText,marginBottom:'24px'}}>{t.calendlyReplace}</p>
              <button className="btn-primary" onClick={()=>window.open('https://calendly.com','_blank')} style={{animation:'none'}}>{t.openCalendly} →</button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ NAVBAR ════════════ */}
      <nav style={{position:'fixed',top:announcements.some(a=>a.active)?'40px':'0',width:'100%',zIndex:1000,background:scrollY>80?(darkMode?'rgba(2,2,8,.98)':'rgba(255,255,255,.98)'):(darkMode?'rgba(2,2,8,.4)':'rgba(255,255,255,.4)'),borderBottom:`1px solid ${scrollY>80?borderColor:'rgba(255,255,255,.028)'}`,padding:'0 48px',display:'flex',alignItems:'center',justifyContent:'space-between',backdropFilter:'blur(40px)',height:'68px',transition:'all .5s',gap:'16px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'13px',flexShrink:0}}>
          <div style={{position:'relative'}}><div style={{position:'absolute',inset:'-4px',borderRadius:'50%',background:'radial-gradient(circle,rgba(212,160,23,.18) 0%,transparent 70%)'}}/>
            <Image src="/logo.png" alt="Together Prosperity" width={40} height={40} style={{objectFit:'contain',mixBlendMode:'screen',filter:'drop-shadow(0 0 16px rgba(212,160,23,.95)) drop-shadow(0 0 32px rgba(212,160,23,.55))',background:'transparent',position:'relative',zIndex:1}}/>
          </div>
          <div><div style={{fontFamily:"'Space Mono',monospace",color:'#D4A017',fontWeight:700,fontSize:'10px',letterSpacing:'4px',lineHeight:1}}>TOGETHER</div><div style={{fontFamily:"'Space Mono',monospace",color:'#2196F3',fontWeight:400,fontSize:'7px',letterSpacing:'5px',marginTop:'3px'}}>PROSPERITY</div></div>
        </div>
        <div style={{display:'flex',gap:'18px',alignItems:'center',flexWrap:'nowrap',overflowX:'auto'}}>
          {navLinks.map(l=><a key={l.name} href={l.href} className={`nav-link${activeSection===l.name.toLowerCase()?' active':''}`}>{l.name}</a>)}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0}}>
          {isAdmin&&<button onClick={()=>setShowDashboard(true)} className="admin-badge-btn" style={{background:'rgba(212,160,23,.15)'}}>📊 {t.dashboard}{pendingQueue.length>0&&<span style={{background:'#f44336',color:'#fff',borderRadius:'50%',width:'16px',height:'16px',fontSize:'9px',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>{pendingQueue.length}</span>}</button>}
          {isMember&&(<>
            <button onClick={openMemberBioEditor} className="admin-badge-btn" style={{background:'rgba(33,150,243,.15)'}}>✏ {t.myBio}</button>
            <button onClick={()=>setShowMemberBlog(true)} className="admin-badge-btn" style={{background:'rgba(33,150,243,.15)'}}>✍️ {t.writePost}</button>
            <button onClick={()=>{setShowMemberGallery(true);setUploadPreview('');setMemberGalleryDraft({url:'',title:'',category:'Events',date:new Date().toISOString().split('T')[0]});}} className="admin-badge-btn" style={{background:'rgba(33,150,243,.15)'}}>📸 {t.uploadImage}</button>
          </>)}
          {(isAdmin||isMember)?<button onClick={logout} className="admin-badge-btn">{isAdmin?t.adminLogout:t.memberLogout}</button>:<button onClick={()=>setShowLogin(true)} className="lock-btn">🔐</button>}
          <LanguageSwitcher />
          <a href="#contact" className="btn-primary" style={{padding:'8px 18px',fontSize:'9px',letterSpacing:'2px',animation:'none'}}>{t.bookDemo}</a>
        </div>
        <button className="mobile-menu-btn" onClick={()=>setMobMenu(!mobileMenuOpen)}>{mobileMenuOpen?'✕':'☰'}</button>
      </nav>
      <div className={`mobile-nav ${mobileMenuOpen?'open':''}`}>
        {navLinks.map(l=>(<a key={l.name} href={l.href} className={activeSection===l.name.toLowerCase()?'active':''} onClick={()=>setMobMenu(false)}>{l.name}</a>))}
      </div>

      {/* ════════════ HERO ════════════ */}
      <section id="home" style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'130px 24px 80px',position:'relative',overflow:'hidden',zIndex:1}}>
        <div style={{position:'relative',zIndex:2,maxWidth:'1060px',opacity:heroVisible?1:0,transform:heroVisible?'translateY(0)':'translateY(40px)',transition:'all 1.2s cubic-bezier(.23,1,.32,1)'}}>
          <AdminBar label={t.editHeroContent} onEdit={openEditHero} onEditLabel="✏ EDIT HERO"/>
          <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '60px',
            background: darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.3)',
            backdropFilter: 'blur(12px)',
            padding: '18px 32px',
            borderRadius: '120px',
            width: 'fit-content',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: `2px solid ${borderColor}`,
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:'10px',
              background:'rgba(46,204,64,.12)',
              border:'1px solid rgba(46,204,64,.3)',
              color:'#2ECC40',
              padding:'10px 24px',
              borderRadius:'60px',
              fontSize:'11px',
              letterSpacing:'4px',
              fontWeight:700
            }}>
              <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#2ECC40',boxShadow:'0 0 10px #2ECC40'}}/>
              {t.incorporated}
            </div>
            <span className="tag-chip" style={{padding:'10px 24px', fontSize:'11px'}}>{t.karnatakaIndia}</span>
            <span className="tag-chip" style={{padding:'10px 24px', fontSize:'11px'}}>{t.digitalIndia}</span>
          </div>
          <div style={{marginBottom:'48px',display:'flex',justifyContent:'center',animation:'fadeUp .8s ease .1s both'}}>
            <div style={{position:'relative',width:'280px',height:'280px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div className="logo-ring-1"/><div className="logo-ring-2"/><div className="logo-ring-3"/><div className="logo-ring-4"/>
              {ORBIT_DOTS.map((dot,i)=>(<div key={i} style={{position:'absolute',top:dot.top,left:dot.left,width:dot.size,height:dot.size,background:dot.color,borderRadius:'50%',boxShadow:`0 0 20px ${dot.color},0 0 40px ${dot.color}55`,animation:`orbitDot ${dot.duration} ease-in-out infinite ${dot.delay}`}}/>))}
              <div style={{position:'absolute',width:'200px',height:'200px',borderRadius:'50%',background:'radial-gradient(circle,rgba(212,160,23,.1) 0%,transparent 70%)',animation:'pulseRing 4s ease-in-out infinite'}}/>
              <Image src="/logo.png" alt="Together Prosperity" width={190} height={190} style={{objectFit:'contain',position:'relative',zIndex:2,animation:'logoFloat 5s ease-in-out infinite',mixBlendMode:'screen',background:'transparent'}}/>
            </div>
          </div>
          <div style={{animation:'fadeUp .8s ease .2s both',marginBottom:'36px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',marginBottom:'16px'}}><div style={{height:'1px',width:'80px',background:'linear-gradient(90deg,transparent,rgba(212,160,23,.5))'}}/><span style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.4)',fontSize:'8px',letterSpacing:'4px'}}>{t.estLabel}</span><div style={{height:'1px',width:'80px',background:'linear-gradient(90deg,rgba(212,160,23,.5),transparent)'}}/></div>
            <h1 className="gold-text" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(32px,6vw,82px)',letterSpacing:'7px',lineHeight:1,marginBottom:'14px'}}>TOGETHER PROSPERITY</h1>
            <h1 className="gold-text" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(24px,4.5vw,60px)',letterSpacing:'7px',lineHeight:1,marginBottom:'20px',opacity:.7}}>PRIVATE LIMITED</h1>
            <div style={{display:'flex',justifyContent:'center',marginBottom:'8px'}}><div style={{height:'2px',width:'260px',background:'linear-gradient(90deg,transparent,#D4A017 20%,#F5A623 50%,#2196F3 80%,transparent)',borderRadius:'2px',animation:'shimmer 3s linear infinite',backgroundSize:'200% auto'}}/></div>
            <div style={{fontFamily:"'Space Mono',monospace",color:darkMode?'rgba(255,255,255,.22)':'rgba(0,0,0,.35)',fontSize:'8px',letterSpacing:'5px',marginTop:'8px'}}>{t.officiallyRegistered}</div>
          </div>
          <h2 style={{fontSize:'clamp(20px,3.2vw,46px)',fontWeight:900,lineHeight:1.15,marginBottom:'16px',animation:'fadeUp .8s ease .3s both',letterSpacing:'-0.5px'}}>
            <span style={{color:darkMode?'rgba(255,255,255,.72)':'rgba(0,0,0,.7)'}}>{hero.headline1} </span>
            <span className="blue-text">{hero.headline2}</span>
          </h2>
          <div style={{height:'30px',marginBottom:'12px',animation:'fadeUp .8s ease .35s both'}}>
            <span style={{fontFamily:"'Space Mono',monospace",color:darkMode?'rgba(255,255,255,.38)':'rgba(0,0,0,.4)',fontSize:'clamp(11px,1.4vw,16px)',letterSpacing:'1.5px'}}>
              <span style={{color:'rgba(212,160,23,.7)'}}>▸ </span><span style={{color:'#D4A017',fontWeight:700}}>{typedText}</span><span className="cursor-blink"/>
            </span>
          </div>
          <p style={{color:subText,fontSize:'clamp(13px,1.3vw,15.5px)',maxWidth:'620px',margin:'12px auto 0',lineHeight:2.3,animation:'fadeUp .8s ease .4s both'}}>{hero.desc}</p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginTop:'44px',animation:'fadeUp .8s ease .5s both'}}>
            <button onClick={()=>setShowCalendly(true)} className="btn-primary">{t.bookFreeDemo}</button>
            <a href="#services" className="btn-secondary">{t.exploreServices}</a>
          </div>
          <div style={{display:'flex',gap:'8px',justifyContent:'center',flexWrap:'wrap',marginTop:'36px',animation:'fadeUp .8s ease .6s both'}}>
            {['Blockchain','Cybersecurity','IoT','AI & ML','Smart Contracts','Gov-tech','Digital India','Worldwide'].map(tag=>(<span key={tag} className="tag-chip" style={{cursor:'default'}}>{tag}</span>))}
          </div>
        </div>
        <div style={{position:'absolute',bottom:'40px',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',animation:'fadeIn 2.5s ease 1.5s both'}}>
          <span style={{fontFamily:"'Space Mono',monospace",color:'rgba(255,255,255,.15)',fontSize:'7.5px',letterSpacing:'5px'}}>{t.scroll}</span>
          <div style={{width:'1px',height:'44px',background:'linear-gradient(to bottom,rgba(212,160,23,.7),transparent)',animation:'float 2.5s ease-in-out infinite'}}/>
        </div>
      </section>

      {/* Newsletter bar */}
      <div style={{background:'linear-gradient(135deg,#D4A017,#F5A623)',padding:'30px 20px',textAlign:'center',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'600px',margin:'0 auto'}}>
          <h3 style={{color:'#000',fontSize:'18px',marginBottom:'8px'}}>{t.newsletterTitle}</h3>
          <p style={{color:'rgba(0,0,0,.7)',fontSize:'12px',marginBottom:'16px'}}>{t.newsletterDesc}</p>
          <form onSubmit={handleNewsletterSignup} style={{display:'flex',gap:'10px',flexWrap:'wrap',justifyContent:'center'}}>
            <input type="email" placeholder={t.newsletterPlaceholder} value={newsletterEmail} onChange={e=>setNlEmail(e.target.value)} required style={{flex:1,minWidth:'200px',padding:'12px 18px',borderRadius:'50px',border:'none',outline:'none',fontSize:'13px'}}/>
            <button type="submit" style={{background:'#000',color:'#fff',border:'none',padding:'12px 28px',borderRadius:'50px',cursor:'pointer',fontWeight:700,fontSize:'12px'}}>{t.subscribe}</button>
          </form>
          {newsletterSub&&<p style={{color:'#000',marginTop:'10px',fontSize:'11px',fontWeight:600}}>{t.newsletterSuccess} ({newsletterEmails.length} subscribers)</p>}
        </div>
      </div>

      {/* Ticker */}
      <div className="ticker-wrap" style={{position:'relative',zIndex:1}}>
        {isAdmin&&<button onClick={()=>{setTickerDraft([...tickerItems]);setShowTickerModal(true);}} style={{position:'absolute',right:'10px',top:'50%',transform:'translateY(-50%)',background:'rgba(212,160,23,.15)',border:'1px solid rgba(212,160,23,.3)',color:'#D4A017',fontSize:'9px',padding:'3px 10px',borderRadius:'6px',cursor:'pointer',zIndex:1,fontFamily:"'Space Mono',monospace"}}>✏ {t.edit}</button>}
        <div className="ticker-content">
          {[...Array(2)].map((_,r)=>(
            <span key={r} style={{display:'flex'}}>
              {tickerItems.map((ticker,i)=>(<span key={i} className="ticker-item">{ticker}<span style={{color:'rgba(212,160,23,.22)',margin:'0 12px'}}>◆</span></span>))}
            </span>
          ))}
        </div>
      </div>
      <hr className="gradient-hr"/>

      {/* ════════════ STATS ════════════ */}
      <section ref={statsRef} style={{background:'rgba(255,255,255,.007)',padding:'90px 60px',position:'relative',zIndex:1}}>
        {isAdmin&&<div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}><button onClick={openAddStat} className="btn-secondary" style={{padding:'6px 20px',fontSize:'11px'}}>+ {t.addStat}</button></div>}
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(145px,1fr))',gap:'12px'}}>
          {stats.map((stat,i)=>(
            <div key={stat.id} className="stat-card" style={{'--sc':stat.color,animation:countersVisible?`countUp .55s ease ${i*.07}s both`:'none',cursor:isAdmin?'pointer':'default',position:'relative'} as React.CSSProperties} onClick={()=>isAdmin&&openEditStat(stat)}>
              <div style={{fontSize:'40px',fontWeight:900,color:stat.color,lineHeight:1.2,fontFamily:"'Space Mono',monospace"}}>{stat.num}</div>
              <div style={{color:subText,fontSize:'11px',letterSpacing:'3px',marginTop:'14px',textTransform:'uppercase',fontFamily:"'Space Mono',monospace"}}>{stat.label}</div>
              {isAdmin&&<div style={{position:'absolute',top:'8px',right:'8px',fontSize:'10px',color:'rgba(212,160,23,.5)'}}>✏️</div>}
            </div>
          ))}
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ ABOUT ════════════ */}
      <section id="about" style={{padding:'130px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1140px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'80px'}}>
            <SectionTag>{t.whoWeAre}</SectionTag>
            <h2 style={{fontSize:'clamp(30px,4vw,56px)',fontWeight:900,color:textColor,marginBottom:'22px',letterSpacing:'-1px'}}>{t.aboutTitle}</h2>
            <p style={{color:subText,fontSize:'15px',maxWidth:'680px',margin:'0 auto',lineHeight:2.3}}>{t.aboutDesc}</p>
          </div>
          {/* Partners */}
          <div style={{textAlign:'center',marginBottom:'60px'}}>
            <SectionTag>{t.trustedEcosystem}</SectionTag>
            <AdminBar label={t.editPartners} onAdd={openAddPartner}/>
            <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap',marginTop:'24px'}}>
              {partners.map(p=>(
                <div key={p.id} className="card-base" onClick={()=>setSelPartner(p)} style={{minWidth:'120px'}}>
                  <div style={{fontSize:'28px',marginBottom:'8px'}}>{p.logo}</div>
                  <div style={{color:subText,fontSize:'15px',fontFamily:"'Space Mono',monospace",letterSpacing:'2px'}}>{p.name}</div>
                  {isAdmin&&<div style={{marginTop:'6px',display:'flex',gap:'6px',justifyContent:'center'}} onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>openEditPartner(p)} style={{background:'transparent',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',fontSize:'8px',cursor:'pointer',padding:'4px 8px',borderRadius:'4px'}}>✏</button>
                    <button onClick={()=>deletePartner(p.id)} style={{background:'transparent',border:'1px solid rgba(244,67,54,.2)',color:'#f44336',fontSize:'8px',cursor:'pointer',padding:'4px 8px',borderRadius:'4px'}}>✕</button>
                  </div>}
                </div>
              ))}
            </div>
          </div>
          {/* Sectors */}
          <div style={{textAlign:'center'}}>
            <SectionTag>{t.sectorsWeServe}</SectionTag>
            <AdminBar label={t.sectors} onAdd={openAddSector}/>
            <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginTop:'24px'}}>
              {sectors.map(s=>(
                <div key={s.id} className="card-base" style={{padding:'14px 26px',fontSize:'15px',display:'flex',gap:'10px',alignItems:'center',position:'relative'}}>
                  <span onClick={()=>setSelSector(s)} style={{display:'flex',gap:'8px',alignItems:'center',cursor:'pointer'}}><span>{s.icon}</span><span>{s.name}</span></span>
                  {isAdmin&&<div style={{display:'flex',gap:'4px',marginLeft:'4px'}}>
                    <button onClick={()=>openEditSector(s)} style={{background:'transparent',border:'none',color:'#D4A017',fontSize:'10px',cursor:'pointer'}}>✏</button>
                    <button onClick={()=>deleteSector(s.id)} style={{background:'transparent',border:'none',color:'#f44336',fontSize:'10px',cursor:'pointer'}}>✕</button>
                  </div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ SERVICES ════════════ */}
      <section id="services" style={{padding:'130px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1240px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <SectionTag>{t.whatWeBuild}</SectionTag>
            <h2 style={{fontSize:'clamp(30px,4vw,56px)',fontWeight:900,color:textColor,marginBottom:'14px',letterSpacing:'-1px'}}>{t.coreServices}</h2>
            <p style={{color:subText,fontSize:'14px',maxWidth:'500px',margin:'0 auto'}}>{t.coreServicesDesc}</p>
          </div>
          <div style={{display:'flex',justifyContent:'center',marginBottom:'32px',position:'relative'}}>
            <span style={{position:'absolute',left:'calc(50% - 160px)',top:'50%',transform:'translateY(-50%)',color:subText,fontSize:'16px',zIndex:1}}>🔍</span>
            <input className="search-input" placeholder={t.searchServices} value={serviceSearch} onChange={e=>setSvcSearch(e.target.value)}/>
          </div>
          <AdminBar label={t.servicesLabel} onAdd={openAddService}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(350px,1fr))',gap:'16px'}}>
            {filteredServices.map(s=>(
              <div key={s.id} className={`service-card${!s.visible?' hidden-service':''}`} style={{'--cc':s.color,'--cs':s.cs,'--cg':s.cg} as React.CSSProperties}>
                <div style={{position:'absolute',top:'20px',right:'20px',display:'flex',gap:'6px',alignItems:'center'}}>
                  <span style={{fontFamily:"'Space Mono',monospace",color:s.color,fontSize:'7.5px',letterSpacing:'2.5px',background:`${s.color}0e`,border:`1px solid ${s.color}20`,padding:'3px 12px',borderRadius:'50px'}}>{s.tag}</span>
                  {isAdmin&&!s.visible&&<span style={{fontFamily:"'Space Mono',monospace",color:'#888',fontSize:'7px',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',padding:'3px 8px',borderRadius:'50px'}}>HIDDEN</span>}
                </div>
                <div style={{width:'60px',height:'60px',background:`radial-gradient(circle,${s.color}22,${s.color}06)`,border:`1px solid ${s.color}26`,borderRadius:'17px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',marginBottom:'22px',animation:'float 3.5s ease-in-out infinite'}}>{s.icon}</div>
                <h3 style={{color:s.color,fontSize:'17px',fontWeight:700,marginBottom:'13px'}}>{s.title}</h3>
                <p style={{color:subText,fontSize:'12.5px',lineHeight:2}}>{s.desc}</p>
                <div style={{marginTop:'28px',display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
                  <button onClick={()=>{setSelMedia(0);setSvcDetail(s);}} style={{background:'transparent',border:'none',color:s.color,fontSize:'9.5px',letterSpacing:'2px',fontWeight:700,fontFamily:"'Space Mono',monospace",cursor:'pointer',display:'flex',alignItems:'center',gap:'6px',padding:0}}>{t.learnMore}</button>
                  {isAdmin&&(<>
                    <button onClick={()=>openEditService(s)} style={{background:'transparent',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',fontSize:'8px',fontWeight:700,fontFamily:"'Space Mono',monospace",cursor:'pointer',padding:'4px 10px',borderRadius:'6px'}}>✏ {t.edit}</button>
                    <button onClick={()=>toggleSvcVisibility(s.id)} style={{background:'transparent',border:'1px solid rgba(255,255,255,.1)',color:'rgba(255,255,255,.35)',fontSize:'8px',fontFamily:"'Space Mono',monospace",cursor:'pointer',padding:'4px 10px',borderRadius:'6px'}}>{s.visible?`👁 ${t.hide}`:`👁 ${t.show}`}</button>
                    <button onClick={()=>setDelSvc(s.id)} style={{background:'transparent',border:'1px solid rgba(244,67,54,.18)',color:'#f44336',fontSize:'8px',fontFamily:"'Space Mono',monospace",cursor:'pointer',padding:'4px 10px',borderRadius:'6px'}}>✕ {t.del}</button>
                  </>)}
                </div>
              </div>
            ))}
            {filteredServices.length===0&&(
              <div style={{gridColumn:'1/-1',textAlign:'center',padding:'60px',color:subText}}>
                <div style={{fontSize:'48px',marginBottom:'16px'}}>🔍</div><p>{t.noServicesMatch}</p>
                <button onClick={()=>setSvcSearch('')} style={{marginTop:'12px',background:'transparent',border:'1px solid rgba(212,160,23,.3)',color:'#D4A017',padding:'8px 20px',borderRadius:'50px',cursor:'pointer',fontSize:'11px'}}>{t.clearSearch}</button>
              </div>
            )}
            {isAdmin&&(<button className="add-card" onClick={openAddService}><div style={{width:'64px',height:'64px',borderRadius:'50%',background:'rgba(212,160,23,.07)',border:'2px dashed rgba(212,160,23,.32)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',color:'#D4A017'}}>+</div><div style={{color:'rgba(212,160,23,.85)',fontWeight:700,fontSize:'14px'}}>{t.addService}</div></button>)}
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ PORTFOLIO ════════════ */}
      <section id="portfolio" style={{padding:'100px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'60px'}}>
            <SectionTag>{t.caseStudies}</SectionTag>
            <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:textColor,marginBottom:'14px'}}>{t.ourWork}</h2>
            <p style={{color:subText}}>{t.ourWorkDesc}</p>
          </div>
          <AdminBar label={t.portfolioLabel} onAdd={openAddPortfolio}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:'24px'}}>
            {portfolio.map(item=>(
              <div key={item.id} className="portfolio-card" onClick={()=>setPortfolioDetail(item)}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:`linear-gradient(90deg,transparent,${item.color},transparent)`}}/>
                <div style={{display:'flex',gap:'14px',alignItems:'flex-start',marginBottom:'18px'}}>
                  <div style={{width:'52px',height:'52px',background:`radial-gradient(circle,${item.color}22,${item.color}06)`,border:`1px solid ${item.color}26`,borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0}}>{item.icon}</div>
                  <div><span style={{background:`${item.color}15`,color:item.color,padding:'3px 10px',borderRadius:'50px',fontSize:'8px',fontFamily:"'Space Mono',monospace",letterSpacing:'2px'}}>{item.category}</span><h3 style={{color:textColor,fontSize:'16px',fontWeight:700,marginTop:'6px'}}>{item.title}</h3></div>
                </div>
                <p style={{color:subText,fontSize:'12.5px',lineHeight:1.9,marginBottom:'16px'}}>{item.desc}</p>
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginBottom:'14px'}}>{item.tech.map((t,i)=>(<span key={i} style={{background:'rgba(255,255,255,.04)',border:`1px solid ${borderColor}`,color:subText,padding:'3px 10px',borderRadius:'50px',fontSize:'9px',fontFamily:"'Space Mono',monospace"}}>{t}</span>))}</div>
                <div style={{background:`${item.color}0a`,border:`1px solid ${item.color}18`,borderRadius:'10px',padding:'10px 14px'}}>
                  <span style={{color:item.color,fontSize:'9px',fontFamily:"'Space Mono',monospace",letterSpacing:'2px'}}>📊 {t.outcomeLabel}: </span>
                  <span style={{color:subText,fontSize:'11px'}}>{item.outcome}</span>
                </div>
                {isAdmin&&(<div style={{display:'flex',gap:'8px',marginTop:'16px'}} onClick={e=>e.stopPropagation()}>
                  <button onClick={()=>openEditPortfolio(item)} style={{background:'transparent',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',fontSize:'8px',fontWeight:700,fontFamily:"'Space Mono',monospace",cursor:'pointer',padding:'4px 10px',borderRadius:'6px'}}>✏ {t.edit}</button>
                  <button onClick={()=>deletePortfolio(item.id)} style={{background:'transparent',border:'1px solid rgba(244,67,54,.18)',color:'#f44336',fontSize:'8px',fontFamily:"'Space Mono',monospace",cursor:'pointer',padding:'4px 10px',borderRadius:'6px'}}>✕ {t.del}</button>
                </div>)}
              </div>
            ))}
            {isAdmin&&(<button className="add-card" onClick={openAddPortfolio}><div style={{width:'64px',height:'64px',borderRadius:'50%',background:'rgba(212,160,23,.07)',border:'2px dashed rgba(212,160,23,.32)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',color:'#D4A017'}}>+</div><div style={{color:'rgba(212,160,23,.85)',fontWeight:700,fontSize:'14px'}}>{t.addCaseStudy}</div></button>)}
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section id="testimonials" style={{padding:'100px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'60px'}}>
            <SectionTag>{t.clientLove}</SectionTag>
            <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:textColor,marginBottom:'14px'}}>{t.clientsTitle}</h2>
            <p style={{color:subText}}>{t.clientsDesc}</p>
          </div>
          <AdminBar label={t.testimonialsLabel} onAdd={openAddTestimonial}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'24px'}}>
            {testimonials.map(t=>(
              <div key={t.id} className="glass" style={{padding:'28px',cursor:isAdmin?'pointer':'default',position:'relative'}} onClick={()=>isAdmin&&openEditTestimonial(t)}>
                <div style={{fontSize:'28px',marginBottom:'12px'}}>{renderStars(t.rating)}</div>
                <p style={{color:darkMode?'rgba(255,255,255,.6)':'rgba(0,0,0,.6)',fontSize:'14px',lineHeight:1.8,marginBottom:'20px',fontStyle:'italic'}}>"{t.content}"</p>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div style={{width:'40px',height:'40px',borderRadius:'50%',overflow:'hidden',background:'rgba(212,160,23,.2)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    {t.photo?<img src={t.photo} alt={t.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<span style={{fontSize:'20px'}}>👤</span>}
                  </div>
                  <div><strong style={{color:'#D4A017'}}>{t.name}</strong><div style={{fontSize:'12px',color:subText}}>{t.role}, {t.company}</div></div>
                  {t.linkedinUrl&&<a href={t.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{marginLeft:'auto',color:'#0077b5',fontSize:'18px'}}>🔗</a>}
                </div>
                {isAdmin&&(
                  <div style={{marginTop:'12px',display:'flex',gap:'8px'}} onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>openEditTestimonial(t)} style={{background:'transparent',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',fontSize:'8px',cursor:'pointer',padding:'2px 8px',borderRadius:'4px'}}>✏ {t.edit}</button>
                    <button onClick={()=>deleteTestimonial(t.id)} style={{background:'transparent',border:'1px solid rgba(244,67,54,.18)',color:'#f44336',fontSize:'8px',cursor:'pointer',padding:'2px 8px',borderRadius:'4px'}}>✕</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ GALLERY ════════════ */}
      <section id="gallery" style={{padding:'100px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'60px'}}>
            <SectionTag>{t.visualGallery}</SectionTag>
            <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:textColor,marginBottom:'14px'}}>{t.galleryTitle}</h2>
            <p style={{color:subText}}>{t.galleryDesc}</p>
          </div>
          <AdminBar label={t.galleryLabel} onAdd={openAddGallery}/>
          {galleryImages.length===0&&!isAdmin?(
            <div style={{textAlign:'center',padding:'60px',color:subText}}><div style={{fontSize:'48px',marginBottom:'16px'}}>🖼️</div><p>{t.noGalleryImages}</p></div>
          ):(
            <div className="gallery-grid">
              {galleryImages.slice(0,6).map(img => (
                <div
                  key={img.id}
                  className="gallery-card card-base"
                  onClick={() => smoothUpdate(() => setLightboxForGallery(img))}
                >
                  <img src={img.url} alt={img.title} loading="lazy" />
                  <div style={{ fontWeight: 600, color: textColor, fontSize: '13px' }}>{img.title}</div>
                  <div style={{ fontSize: '11px', color: subText, marginTop: '4px' }}>
                    {img.category} {img.date && `• ${img.date}`}
                  </div>
                  {isAdmin && (
                    <div
                      style={{ display: 'flex', gap: '8px', marginTop: '10px', justifyContent: 'center' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <button onClick={() => openEditGallery(img)} className="btn-secondary" style={{ padding: '3px 10px', fontSize: '9px' }}>
                        ✏
                      </button>
                      <button
                        onClick={() => setDelGallery(img.id)}
                        className="btn-secondary"
                        style={{ padding: '3px 10px', fontSize: '9px', borderColor: 'rgba(244,67,54,.3)', color: '#f44336' }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {galleryImages.length>0&&(
            <div style={{textAlign:'center',marginTop:'30px'}}>
              <button onClick={()=>setShowFullGallery(true)} className="btn-primary" style={{animation:'none',padding:'12px 32px'}}>{t.viewAllPhotos} {galleryImages.length} →</button>
            </div>
          )}
          {isAdmin&&galleryImages.length===0&&(<button className="add-card" onClick={openAddGallery} style={{marginTop:'30px'}}><div style={{fontSize:'32px'}}>+</div><div style={{color:'rgba(212,160,23,.85)',fontWeight:700}}>{t.addFirstImage}</div></button>)}
          {/* Member upload CTA */}
          {isMember&&!isAdmin&&(
            <div style={{textAlign:'center',marginTop:'20px'}}>
              <button onClick={()=>{setShowMemberGallery(true);setUploadPreview('');setMemberGalleryDraft({url:'',title:'',category:'Events',date:new Date().toISOString().split('T')[0]});}} className="btn-secondary" style={{padding:'8px 20px',fontSize:'11px'}}>📸 {t.submitImage}</button>
            </div>
          )}
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ ACHIEVEMENTS ════════════ */}
      <section id="achievements" style={{padding:'100px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'60px'}}>
            <SectionTag>{t.achievements}</SectionTag>
            <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:textColor,marginBottom:'14px'}}>{t.achievementsTitle}</h2>
            <p style={{color:subText}}>{t.achievementsDesc}</p>
          </div>
          <AdminBar label={t.achievementsLabel} onAdd={openAddAch}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px'}}>
            {achievements.map(ach=>(
              <div key={ach.id} className="card-base" style={{textAlign:'left',cursor:'default'}}>
                <div style={{fontSize:'32px',marginBottom:'12px'}}>{ach.icon||'🏆'}</div>
                <div style={{color:'#D4A017',fontSize:'12px',fontFamily:"'Space Mono',monospace",marginBottom:'8px'}}>{ach.year}</div>
                <h3 style={{color:textColor,fontSize:'18px',fontWeight:700,marginBottom:'10px'}}>{ach.title}</h3>
                <p style={{color:subText,fontSize:'13px',lineHeight:1.7}}>{ach.description}</p>
                {isAdmin&&(<div style={{display:'flex',gap:'8px',marginTop:'16px'}}>
                  <button onClick={()=>openEditAch(ach)} className="btn-secondary" style={{padding:'3px 10px',fontSize:'9px'}}>✏ {t.edit}</button>
                  <button onClick={()=>setDelAch(ach.id)} className="btn-secondary" style={{padding:'3px 10px',fontSize:'9px',borderColor:'rgba(244,67,54,.18)',color:'#f44336'}}>✕ {t.del}</button>
                </div>)}
              </div>
            ))}
          </div>
          {isAdmin&&achievements.length===0&&(<button className="add-card" onClick={openAddAch} style={{marginTop:'30px'}}><div style={{fontSize:'32px'}}>+</div><div style={{color:'rgba(212,160,23,.85)',fontWeight:700}}>{t.addAchievement}</div></button>)}
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ COLLABORATIONS ════════════ */}
      <section id="collaborations" style={{padding:'100px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'60px'}}>
            <SectionTag>{t.collaborations}</SectionTag>
            <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:textColor,marginBottom:'14px'}}>{t.collabTitle}</h2>
            <p style={{color:subText}}>{t.collabDesc}</p>
          </div>
          <AdminBar label={t.collaborationsLabel} onAdd={openAddCollab}/>
          <div style={{display:'flex',gap:'22px',flexWrap:'wrap',justifyContent:'center'}}>
            {collaborations.map(c=>(
              <div key={c.id} className="card-base" style={{width:'220px',cursor:'pointer'}} onClick={()=>window.open(c.url,'_blank')}>
                <div style={{fontSize:'36px',marginBottom:'8px'}}>{c.logo}</div>
                <div style={{fontWeight:700,color:textColor,marginBottom:'6px'}}>{c.name}</div>
                <p style={{color:subText,fontSize:'11px',lineHeight:1.5}}>{c.description}</p>
                {isAdmin&&(<div style={{display:'flex',gap:'8px',marginTop:'12px',justifyContent:'center'}} onClick={e=>e.stopPropagation()}>
                  <button onClick={()=>openEditCollab(c)} className="btn-secondary" style={{padding:'3px 10px',fontSize:'9px'}}>✏</button>
                  <button onClick={()=>setDelCollab(c.id)} className="btn-secondary" style={{padding:'3px 10px',fontSize:'9px',borderColor:'rgba(244,67,54,.18)',color:'#f44336'}}>✕</button>
                </div>)}
              </div>
            ))}
          </div>
          {isAdmin&&collaborations.length===0&&(<button className="add-card" onClick={openAddCollab} style={{marginTop:'30px'}}><div style={{fontSize:'32px'}}>+</div><div style={{color:'rgba(212,160,23,.85)',fontWeight:700}}>{t.addCollaboration}</div></button>)}
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ BLOG ════════════ */}
      <section id="blog" style={{padding:'100px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <SectionTag>{t.insights}</SectionTag>
            <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:textColor,marginBottom:'14px'}}>{t.blogTitle}</h2>
            <p style={{color:subText}}>{t.blogDesc}</p>
          </div>
          <div style={{display:'flex',gap:'14px',alignItems:'center',flexWrap:'wrap',justifyContent:'center',marginBottom:'32px'}}>
            <div style={{position:'relative'}}><span style={{position:'absolute',left:'16px',top:'50%',transform:'translateY(-50%)',color:subText}}>🔍</span><input className="search-input" placeholder={t.searchPosts} value={blogSearch} onChange={e=>setBlogSearch(e.target.value)} style={{paddingLeft:'44px'}}/></div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',justifyContent:'center'}}>
              {blogCategories.map(cat=>(<button key={cat} onClick={()=>setBlogCat(cat)} className={`tag-chip${selectedBlogCat===cat?' active-chip':''}`} style={{cursor:'pointer',border:'none',padding:'6px 16px'}}>{cat}</button>))}
            </div>
          </div>
          <AdminBar label={t.blogPostsLabel} onAdd={openAddBlog}/>
          {isMember&&!isAdmin&&(
            <div style={{textAlign:'center',marginBottom:'20px'}}>
              <button onClick={()=>setShowMemberBlog(true)} className="btn-secondary" style={{padding:'8px 20px',fontSize:'11px'}}>✍️ {t.submitPost}</button>
            </div>
          )}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(350px,1fr))',gap:'24px'}}>
            {filteredBlogs.map(post=>(
              <div key={post.id} className="glass" style={{padding:'28px',cursor:'pointer',transition:'all .4s'}} onClick={()=>isAdmin?openEditBlog(post):setBlogDetail(post)}>
                {post.featuredImage&&<img src={post.featuredImage} alt={post.title} style={{width:'100%',height:'160px',objectFit:'cover',borderRadius:'12px',marginBottom:'16px'}}/>}
                <div style={{fontSize:'32px',marginBottom:'16px'}}>📰</div>
                <h3 style={{fontSize:'17px',fontWeight:700,marginBottom:'10px',color:textColor,lineHeight:1.4}}>{post.title}</h3>
                <p style={{color:subText,fontSize:'13px',lineHeight:1.7,marginBottom:'12px'}}>{post.excerpt}</p>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'4px',fontSize:'10px',color:darkMode?'rgba(255,255,255,.3)':'rgba(0,0,0,.3)',fontFamily:"'Space Mono',monospace",borderTop:`1px solid ${borderColor}`,paddingTop:'12px',marginTop:'12px'}}>
                  <span>📅 {post.date}</span><span>✍️ {post.author}</span><span>📖 {post.readTime}</span>
                </div>
                {isAdmin&&(
                  <div style={{marginTop:'12px',display:'flex',gap:'8px'}} onClick={e=>e.stopPropagation()}>
                    <button onClick={()=>openEditBlog(post)} style={{background:'transparent',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',fontSize:'8px',cursor:'pointer',padding:'2px 8px',borderRadius:'4px'}}>✏ {t.edit}</button>
                    <button onClick={()=>deleteBlog(post.id)} style={{background:'transparent',border:'1px solid rgba(244,67,54,.18)',color:'#f44336',fontSize:'8px',cursor:'pointer',padding:'2px 8px',borderRadius:'4px'}}>✕ {t.del}</button>
                  </div>
                )}
              </div>
            ))}
            {filteredBlogs.length===0&&(<div style={{gridColumn:'1/-1',textAlign:'center',padding:'60px',color:subText}}><div style={{fontSize:'48px',marginBottom:'16px'}}>📭</div><p>{t.noPostsFound}</p></div>)}
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ TEAM ════════════ */}
      <section id="team" style={{padding:'130px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1140px',margin:'0 auto',textAlign:'center'}}>
          <SectionTag>{t.thePeople}</SectionTag>
          <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:textColor,marginBottom:'12px'}}>{t.teamTitle}</h2>
          <AdminBar label={t.teamLabel} onAdd={openAddTeam}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'22px',textAlign:'left',marginTop:'20px'}}>
            {team.map((member,idx)=>(
              <div key={member.id} className="team-card" style={{borderColor:`${member.color}10`,animation:`cardReveal .6s ease ${idx*.12}s both`,textAlign:'center'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(90deg,transparent,${member.color},transparent)`}}/>
                <div style={{position:'relative',zIndex:1}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',marginBottom:'26px'}}>
                    <span style={{fontSize:'22px'}}>{member.emoji}</span>
                    <span style={{fontFamily:"'Space Mono',monospace",background:`${member.color}0d`,border:`1px solid ${member.color}20`,color:member.color,fontSize:'8px',letterSpacing:'3.5px',padding:'3px 13px',borderRadius:'50px'}}>{member.tag}</span>
                  </div>
                  {member.photo?(
                    <div style={{width:'106px',height:'106px',margin:'0 auto 22px',borderRadius:'50%',overflow:'hidden',border:`2px solid ${member.color}35`}}><img src={member.photo} alt={member.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
                  ):(
                    <div style={{width:'106px',height:'106px',background:`radial-gradient(circle,${member.color}26,${member.color}06)`,borderRadius:'50%',margin:'0 auto 22px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'42px',fontWeight:900,color:member.color,border:`2px solid ${member.color}35`,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:'2px'}}>{member.initial}</div>
                  )}
                  <h3 style={{color:darkMode?'rgba(255,255,255,.9)':'rgba(0,0,0,.9)',fontSize:'21px',fontWeight:800,marginBottom:'5px'}}>{member.name}</h3>
                  <div style={{color:member.color,fontSize:'9.5px',letterSpacing:'4px',marginBottom:'15px',fontWeight:700,fontFamily:"'Space Mono',monospace"}}>{member.role}</div>
                  <p style={{color:subText,fontSize:'12.5px',lineHeight:2,marginBottom:'15px'}}>{member.desc}</p>
                  {member.location&&<div style={{color:darkMode?'rgba(255,255,255,.16)':'rgba(0,0,0,.3)',fontSize:'10px',marginBottom:'22px',fontFamily:"'Space Mono',monospace"}}>📍 {member.location}</div>}
                  {member.linkedin&&<a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{display:'inline-block',color:'#0077b5',fontSize:'12px',marginBottom:'16px'}}>🔗 LinkedIn</a>}
                  {isAdmin&&(
                    <div style={{display:'flex',gap:'8px',justifyContent:'center',borderTop:`1px solid ${borderColor}`,paddingTop:'18px'}}>
                      <button className="btn-secondary" style={{padding:'6px 14px',fontSize:'9.5px'}} onClick={()=>openEditTeam(member)}>✏ {t.edit}</button>
                      <button className="btn-secondary" style={{padding:'6px 14px',fontSize:'9.5px',borderColor:'rgba(244,67,54,.18)',color:'#f44336'}} onClick={()=>setDelTeam(member.id)}>✕ {t.remove}</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAdmin&&(<button className="add-card" onClick={openAddTeam}><div style={{width:'72px',height:'72px',borderRadius:'50%',background:'rgba(212,160,23,.07)',border:'2px dashed rgba(212,160,23,.32)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',color:'#D4A017'}}>+</div><div style={{color:'rgba(212,160,23,.85)',fontWeight:700,fontSize:'14px'}}>{t.addTeamMember}</div></button>)}
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ CAREERS ════════════ */}
      <section id="careers" style={{padding:'100px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'60px'}}>
            <SectionTag>{t.joinUs}</SectionTag>
            <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:textColor,marginBottom:'14px'}}>{t.careersTitle}</h2>
            <p style={{color:subText}}>{t.careersDesc}</p>
          </div>
          <AdminBar label={t.jobListingsLabel} onAdd={openAddJob}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'20px'}}>
            {jobListings.map(job=>(
              <div key={job.id} className="glass" style={{padding:'28px',position:'relative'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
                  <span style={{background:'rgba(212,160,23,.1)',color:'#D4A017',padding:'4px 12px',borderRadius:'50px',fontSize:'9px',fontWeight:700,fontFamily:"'Space Mono',monospace"}}>{job.type}</span>
                  <span style={{fontSize:'16px'}}>📍</span>
                </div>
                <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'6px',color:textColor}}>{job.title}</h3>
                <p style={{color:'rgba(212,160,23,.6)',fontSize:'11px',marginBottom:'12px',fontFamily:"'Space Mono',monospace"}}>{job.location}</p>
                <p style={{color:subText,fontSize:'13px',lineHeight:1.7,marginBottom:'16px'}}>{job.description}</p>
                <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                  <button className="btn-primary" style={{padding:'8px 20px',fontSize:'9px',animation:'none'}} onClick={()=>window.open(`mailto:${contact.email}?subject=Application for ${job.title}`)}>{t.applyNow}</button>
                  {isAdmin&&<>
                    <button onClick={()=>openEditJob(job)} style={{background:'transparent',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',fontSize:'8px',cursor:'pointer',padding:'6px 12px',borderRadius:'6px'}}>✏ {t.edit}</button>
                    <button onClick={()=>deleteJob(job.id)} style={{background:'transparent',border:'1px solid rgba(244,67,54,.18)',color:'#f44336',fontSize:'8px',cursor:'pointer',padding:'6px 12px',borderRadius:'6px'}}>✕</button>
                  </>}
                </div>
              </div>
            ))}
            {isAdmin&&(<button className="add-card" style={{minHeight:'200px'}} onClick={openAddJob}><div style={{fontSize:'32px'}}>+</div><div style={{color:'rgba(212,160,23,.85)',fontWeight:700}}>{t.addJob}</div></button>)}
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ PRICING ════════════ */}
      <section id="pricing" style={{padding:'100px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'60px'}}>
            <SectionTag>{t.pricingTag}</SectionTag>
            <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:textColor,marginBottom:'14px'}}>{t.pricingTitle}</h2>
            <p style={{color:subText}}>{t.pricingDesc}</p>
          </div>
          <AdminBar label={t.pricingPlansLabel} onAdd={openAddPricing}/>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px',alignItems:'start'}}>
            {pricingPlans.map(plan=>(
              <div key={plan.id} style={{padding:'1px',borderRadius:'22px',background:plan.recommended?'linear-gradient(135deg,#D4A017,#F5A623,#2196F3)':'transparent',position:'relative'}}>
                {plan.recommended&&<div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#D4A017,#F5A623)',color:'#000',padding:'4px 18px',borderRadius:'50px',fontSize:'9px',fontWeight:700,whiteSpace:'nowrap',zIndex:1}}>🔥 {t.recommended}</div>}
                <div style={{background:cardBg,border:plan.recommended?'none':`1px solid ${borderColor}`,borderRadius:'21px',padding:'40px 28px',textAlign:'center',cursor:isAdmin?'pointer':'default'}} onClick={()=>isAdmin&&openEditPricing(plan)}>
                  <h3 style={{fontSize:'23px',fontWeight:800,marginBottom:'14px',color:textColor}}>{plan.name}</h3>
                  <div style={{fontSize:'40px',fontWeight:900,color:'#D4A017',marginBottom:'24px',fontFamily:"'Space Mono',monospace"}}>{plan.price}</div>
                  <div style={{marginBottom:'28px'}}>{plan.features.map((f,i)=>(<div key={i} style={{padding:'9px 0',fontSize:'13px',color:subText,borderBottom:`1px solid ${borderColor}`,display:'flex',gap:'8px',alignItems:'center',textAlign:'left'}}><span style={{color:'#2ECC40',flexShrink:0}}>✓</span>{f}</div>))}</div>
                  <a href="#contact" className="btn-primary" style={{display:'flex',justifyContent:'center',animation:'none',padding:'12px'}}>{t.getStarted}</a>
                  {isAdmin&&(
                    <div style={{marginTop:'12px',display:'flex',gap:'8px',justifyContent:'center'}}>
                      <button onClick={e=>{e.stopPropagation();openEditPricing(plan);}} style={{background:'transparent',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',fontSize:'8px',cursor:'pointer',padding:'2px 8px',borderRadius:'4px'}}>✏</button>
                      <button onClick={e=>{e.stopPropagation();deletePricing(plan.id);}} style={{background:'transparent',border:'1px solid rgba(244,67,54,.18)',color:'#f44336',fontSize:'8px',cursor:'pointer',padding:'2px 8px',borderRadius:'4px'}}>✕</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ PILOT ════════════ */}
      <section id="pilot" style={{padding:'80px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'900px',margin:'0 auto',textAlign:'center'}}>
          <SectionTag>{t.pilotTag}</SectionTag>
          <AdminBar label={t.pilotEligibility} onEdit={openEditPilot}/>
          <div className="glass" style={{padding:'40px',textAlign:'left'}}>
            <h3 style={{fontSize:'24px',fontWeight:800,color:'#D4A017',marginBottom:'16px'}}>{pilotCriteria.title}</h3>
            <p style={{color:subText,fontSize:'14px',marginBottom:'24px',lineHeight:1.8}}>{pilotCriteria.description}</p>
            <div style={{background:'rgba(212,160,23,.05)',borderRadius:'16px',padding:'24px'}}>
              <h4 style={{fontSize:'13px',fontWeight:700,letterSpacing:'2px',marginBottom:'12px',color:'#D4A017'}}>✅ {t.eligibilityRequirements}</h4>
              <ul style={{listStyle:'none',padding:0}}>{pilotCriteria.eligibility.map((item,i)=>(<li key={i} style={{marginBottom:'12px',display:'flex',gap:'10px',alignItems:'center',color:subText,fontSize:'13px'}}><span style={{color:'#2ECC40',fontWeight:700}}>✓</span>{item}</li>))}</ul>
            </div>
            <div style={{marginTop:'24px',textAlign:'center'}}><a href="#contact" className="btn-primary" style={{animation:'none',padding:'12px 32px'}}>{t.applyForPilot}</a></div>
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ FAQ ════════════ */}
      <section id="faq" style={{padding:'110px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'840px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'70px'}}>
            <SectionTag>{t.faqTag}</SectionTag>
            <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:textColor,marginBottom:'14px'}}>{t.faqTitle}</h2>
            <p style={{color:subText}}>{t.faqDesc}</p>
          </div>
          <AdminBar label={t.faqLabel} onAdd={openAddFaq}/>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {faqs.map(faq=>(
              <div key={faq.id} className={`faq-item${activeFaq===faq.id?' active':''}`} onClick={()=>setActiveFaq(activeFaq===faq.id?null:faq.id)}>
                <div className="faq-header">
                  <div style={{display:'flex',gap:'14px',alignItems:'flex-start',flex:1}}>
                    <span style={{color:'#D4A017',fontFamily:"'Space Mono',monospace",fontSize:'10px',minWidth:'18px',marginTop:'2px',fontWeight:700}}>Q.</span>
                    <span style={{color:darkMode?'rgba(255,255,255,.78)':'rgba(0,0,0,.8)',fontSize:'13.5px',fontWeight:600}}>{faq.q}</span>
                  </div>
                  <div style={{display:'flex',gap:'6px',alignItems:'center',flexShrink:0}}>
                    {isAdmin&&<>
                      <button onClick={e=>{e.stopPropagation();openEditFaq(faq);}} style={{background:'transparent',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',fontSize:'9px',fontWeight:700,padding:'3px 8px',borderRadius:'5px',cursor:'pointer'}}>✏</button>
                      <button onClick={e=>{e.stopPropagation();setDelFaq(faq.id);}} style={{background:'transparent',border:'1px solid rgba(244,67,54,.18)',color:'#f44336',fontSize:'9px',fontWeight:700,padding:'3px 8px',borderRadius:'5px',cursor:'pointer'}}>✕</button>
                    </>}
                    <div className={`faq-toggle${activeFaq===faq.id?' open':''}`}>{activeFaq===faq.id?'−':'+'}</div>
                  </div>
                </div>
                {activeFaq===faq.id&&(<div className="faq-body"><p style={{color:subText,fontSize:'13px',lineHeight:2,paddingLeft:'32px'}}>{faq.a}</p></div>)}
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ CONTACT ════════════ */}
      <section id="contact" style={{padding:'130px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1240px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'80px'}}>
            <SectionTag>{t.getInTouch}</SectionTag>
            <h2 style={{fontSize:'clamp(30px,4vw,56px)',fontWeight:900,color:textColor,marginBottom:'14px'}}>{t.contactTitle}</h2>
            <AdminBar label={t.editContactInfo} onEdit={openEditContact} onEditLabel="✏ EDIT CONTACT"/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.6fr',gap:'40px',alignItems:'start'}}>
            <div>
              <div className="contact-block">
                <h3 style={{color:subText,fontSize:'8.5px',letterSpacing:'4px',marginBottom:'20px',fontFamily:"'Space Mono',monospace"}}>{t.callOrWhatsapp}</h3>
                <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                  <a href={`tel:${contact.phone}`} className="btn-primary" style={{padding:'11px 20px',fontSize:'10px',animation:'none'}}>📞 {contact.phone}</a>
                  <a href={`https://wa.me/${contact.whatsapp}?text=Hello%20Together%20Prosperity%2C%20I%20am%20interested%20in%20your%20services.`} target="_blank" rel="noopener noreferrer" style={{background:'#25D366',color:'#fff',padding:'11px 22px',borderRadius:'50px',textDecoration:'none',fontWeight:700,fontSize:'10.5px',display:'inline-flex',alignItems:'center',gap:'6px'}}>💬 WhatsApp</a>
                </div>
              </div>
              <div className="contact-block">
                <h3 style={{color:subText,fontSize:'8.5px',letterSpacing:'4px',marginBottom:'13px',fontFamily:"'Space Mono',monospace"}}>{t.emailUs}</h3>
                <a href={`mailto:${contact.email}`} style={{color:'#2196F3',fontSize:'13px',textDecoration:'none',fontWeight:600}}>{contact.email}</a>
              </div>
              <div className="contact-block">
                <h3 style={{color:subText,fontSize:'8.5px',letterSpacing:'4px',marginBottom:'15px',fontFamily:"'Space Mono',monospace"}}>{t.ourLocations}</h3>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
                  <div><div style={{color:textColor,fontSize:'11.5px',fontWeight:600,marginBottom:'5px'}}>{t.kolarOffice}</div><div style={{color:subText,fontSize:'10.5px',lineHeight:2,whiteSpace:'pre-line'}}>{contact.address1}</div></div>
                  <div><div style={{color:textColor,fontSize:'11.5px',fontWeight:600,marginBottom:'5px'}}>{t.bangaloreOffice}</div><div style={{color:subText,fontSize:'10.5px',lineHeight:2,whiteSpace:'pre-line'}}>{contact.address2}</div></div>
                </div>
              </div>
              <div className="contact-block">
                <h3 style={{color:subText,fontSize:'8.5px',letterSpacing:'4px',marginBottom:'16px',fontFamily:"'Space Mono',monospace"}}>{t.followUs}</h3>
                <div style={{display:'flex',gap:'9px',flexWrap:'wrap'}}>
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="social-pill" style={{background:'linear-gradient(135deg,#833ab4,#fd1d1d,#f77737)',color:'#fff',padding:'9px 18px',borderRadius:'50px',textDecoration:'none',fontSize:'11px',fontWeight:600}}>📸 Instagram</a>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="social-pill" style={{background:'#0077b5',color:'#fff',padding:'9px 18px',borderRadius:'50px',textDecoration:'none',fontSize:'11px',fontWeight:600}}>💼 LinkedIn</a>
                  <a href={contact.twitter} target="_blank" rel="noopener noreferrer" className="social-pill" style={{background:'#000',border:'1px solid rgba(255,255,255,.2)',color:'#fff',padding:'9px 18px',borderRadius:'50px',textDecoration:'none',fontSize:'11px',fontWeight:600}}>𝕏 Twitter</a>
                </div>
              </div>
            </div>
            <div className="gradient-border">
              <div className="gradient-border-inner">
                <SectionTag>{t.bookADemo}</SectionTag>
                <h3 style={{color:'#fff',fontSize:'26px',fontWeight:800,marginBottom:'8px'}}>{t.letsBuild}</h3>
                {submitted?(
                  <div style={{textAlign:'center',padding:'60px 20px'}}>
                    <div style={{fontSize:'64px',marginBottom:'24px',animation:'float 3s ease-in-out infinite'}}>🎉</div>
                    <h3 style={{color:'#D4A017',fontSize:'24px',fontWeight:800,marginBottom:'13px'}}>{t.messageSent}</h3>
                    <p style={{color:'rgba(255,255,255,.3)',fontSize:'14px',lineHeight:2}}>{t.messageSentDesc}</p>
                    <button onClick={()=>{setSubmitted(false);setFormData({name:'',email:'',phone:'',company:'',service:'',message:''});setPriv(false);}} className="btn-secondary" style={{marginTop:'16px',padding:'10px 28px',fontSize:'11px'}}>{t.sendAnother}</button>
                  </div>
                ):(
                  <form onSubmit={handleContactSubmit} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                      <input className="form-input" type="text" placeholder={t.yourName} required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/>
                      <input className="form-input" type="email" placeholder={t.email} required value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                      <input className="form-input" type="tel" placeholder={t.phone} value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})}/>
                      <input className="form-input" type="text" placeholder={t.organization} value={formData.company} onChange={e=>setFormData({...formData,company:e.target.value})}/>
                    </div>
                    <select className="form-input" required value={formData.service} onChange={e=>setFormData({...formData,service:e.target.value})}>
                      <option value="">{t.selectService}</option>
                      {services.filter(s=>s.visible).map(s=><option key={s.id} value={s.title}>{s.title}</option>)}
                      <option value="Multiple Services">{t.multipleServices}</option>
                      <option value="General Inquiry">{t.generalInquiry}</option>
                    </select>
                    <textarea className="form-input" rows={4} placeholder={t.message} required value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} style={{resize:'vertical'}}/>
                    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                      <input type="checkbox" id="privacyCheck" checked={privacyAccepted} onChange={e=>setPriv(e.target.checked)} required/>
                      <label htmlFor="privacyCheck" style={{fontSize:'11px',color:'rgba(255,255,255,.6)'}}>{t.privacyConsent} <button type="button" onClick={()=>setShowLegalView('privacy')} style={{background:'none',border:'none',color:'#D4A017',textDecoration:'underline',cursor:'pointer',fontSize:'11px'}}>{t.privacyPolicy}</button> {t.privacyConsent2}</label>
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary" style={{width:'100%',padding:'16px',justifyContent:'center',animation:'none'}}>{sending?t.sending:t.sendMessage}</button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="gradient-hr"/>

      {/* ════════════ FOOTER ════════════ */}
      <footer style={{background:darkMode?'rgba(0,0,2,.9)':'rgba(240,240,245,.9)',borderTop:`1px solid ${borderColor}`,padding:'84px 60px 36px',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(215px,1fr))',gap:'54px',marginBottom:'54px'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'13px',marginBottom:'20px'}}>
              <Image src="/logo.png" alt="Logo" width={42} height={42} style={{objectFit:'contain',mixBlendMode:'screen',filter:'drop-shadow(0 0 14px rgba(212,160,23,.85))',background:'transparent'}}/>
              <div><div style={{fontFamily:"'Space Mono',monospace",color:'#D4A017',fontWeight:700,fontSize:'10.5px',letterSpacing:'4px'}}>TOGETHER</div><div style={{fontFamily:"'Space Mono',monospace",color:'#2196F3',fontWeight:400,fontSize:'7px',letterSpacing:'5.5px',marginTop:'3px'}}>PROSPERITY</div></div>
            </div>
            <p style={{color:subText,fontSize:'12px',lineHeight:2.2}}>{t.poweredBy}</p>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginTop:'20px'}}>
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" style={{background:'rgba(212,160,23,.08)',border:'1px solid rgba(212,160,23,.18)',color:'#D4A017',width:'36px',height:'36px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',fontSize:'14px',transition:'all .3s'}}>📸</a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{background:'rgba(33,150,243,.08)',border:'1px solid rgba(33,150,243,.18)',color:'#2196F3',width:'36px',height:'36px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',fontSize:'14px',transition:'all .3s'}}>💼</a>
              <a href={contact.twitter} target="_blank" rel="noopener noreferrer" style={{background:'rgba(255,255,255,.04)',border:`1px solid ${borderColor}`,color:subText,width:'36px',height:'36px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',fontSize:'14px',transition:'all .3s'}}>𝕏</a>
            </div>
          </div>
          <div>
            <h4 style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.5)',fontSize:'8.5px',letterSpacing:'4px',marginBottom:'24px'}}>{t.quickLinks}</h4>
            {['Home','About','Services','Portfolio','Gallery','Team','Blog','Achievements','Collaborations','Careers','Pricing','FAQ','Contact'].map(item=>(
              <div key={item} style={{marginBottom:'10px'}}>
                <a href={`#${item.toLowerCase()}`} style={{color:subText,textDecoration:'none',fontSize:'12.5px',transition:'color .2s'}} onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#D4A017';}} onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color=darkMode?'rgba(255,255,255,.3)':'rgba(0,0,0,.5)';}}>→ {item}</a>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.5)',fontSize:'8.5px',letterSpacing:'4px',marginBottom:'24px'}}>{t.legal}</h4>
            {(['privacy','terms','cookie'] as const).map(type=>(
              <div key={type} style={{marginBottom:'10px'}}>
                <button onClick={()=>setShowLegalView(type)} style={{background:'none',border:'none',color:subText,fontSize:'12.5px',cursor:'pointer',fontFamily:'inherit',padding:0,textAlign:'left'}}>
                  {type==='privacy'?t.privacyPolicyFull:type==='terms'?t.terms:t.cookie}
                </button>
                {isAdmin&&<button onClick={()=>openEditLegal(type)} style={{marginLeft:'8px',background:'none',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',padding:'1px 6px',borderRadius:'3px',fontSize:'9px',cursor:'pointer'}}>✏</button>}
              </div>
            ))}
          </div>
          <div>
            <h4 style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.5)',fontSize:'8.5px',letterSpacing:'4px',marginBottom:'24px'}}>{t.contact}</h4>
            <a href={`tel:${contact.phone}`} style={{display:'block',color:'#D4A017',fontSize:'13.5px',textDecoration:'none',fontWeight:600,marginBottom:'14px'}}>📞 {contact.phone}</a>
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{display:'block',color:'#25D366',fontSize:'12.5px',textDecoration:'none',marginBottom:'14px'}}>💬 WhatsApp Us</a>
            <a href={`mailto:${contact.email}`} style={{display:'block',color:'#2196F3',fontSize:'11px',textDecoration:'none',wordBreak:'break-word',marginBottom:'20px'}}>✉️ {contact.email}</a>
            <div style={{fontFamily:"'Space Mono',monospace",color:subText,fontSize:'9px',letterSpacing:'2px',lineHeight:2}}>
              <div>📍 Kolar District, Karnataka</div>
              <div>📍 Bangalore South, Karnataka</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:`1px solid ${borderColor}`,paddingTop:'28px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
            <p style={{color:darkMode?'rgba(255,255,255,.1)':'rgba(0,0,0,.3)',fontSize:'10.5px',fontFamily:"'Space Mono',monospace"}}>© 2026 Together Prosperity Private Limited. {t.allRightsReserved}</p>
            <p style={{color:darkMode?'rgba(255,255,255,.1)':'rgba(0,0,0,.3)',fontSize:'10.5px',fontFamily:"'Space Mono',monospace"}}>CIN: {companyDetails.cin} | GST: {companyDetails.gst} | MSME: {companyDetails.msme}{isAdmin&&<button onClick={openEditCompany} style={{marginLeft:'12px',background:'none',border:'1px solid rgba(212,160,23,.3)',color:'#D4A017',padding:'2px 8px',borderRadius:'4px',fontSize:'9px',cursor:'pointer'}}>✏ {t.edit}</button>}</p>
          </div>
          <p style={{color:darkMode?'rgba(255,255,255,.1)':'rgba(0,0,0,.3)',fontSize:'10.5px',fontFamily:"'Space Mono',monospace"}}>{t.incorporatedUnderAct}</p>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════════
                               ALL MODALS (unchanged)
      ═══════════════════════════════════════════════════════════════════ */}

      {/* ── LOGIN MODAL (unchanged) ── */}
      {showLogin&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget){setShowLogin(false);setLoginPw('');setLoginErr(false);}}}>
          <div className="admin-box">
            <div style={{fontSize:'44px',marginBottom:'22px'}}>🔐</div>
            <div style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.7)',fontSize:'8.5px',letterSpacing:'6px',marginBottom:'10px'}}>ACCESS PORTAL</div>
            <h3 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'22px'}}>Select Role</h3>
            <div style={{display:'flex',gap:'12px',marginBottom:'20px'}}>
              <button onClick={()=>setLoginRole('admin')} className="btn-secondary" style={{flex:1,padding:'8px',justifyContent:'center',background:loginRole==='admin'?'rgba(212,160,23,.15)':'transparent'}}>🔐 Admin</button>
              <button onClick={()=>setLoginRole('member')} className="btn-secondary" style={{flex:1,padding:'8px',justifyContent:'center',background:loginRole==='member'?'rgba(33,150,243,.15)':'transparent'}}>👤 Member</button>
            </div>
            <input className={`admin-pw${loginErr?' err':''}`} type="password" placeholder="Password" value={loginPw} onChange={e=>{setLoginPw(e.target.value);setLoginErr(false);}} onKeyDown={e=>e.key==='Enter'&&handleLogin()} autoFocus/>
            {loginErr&&<p style={{color:'#f44336',fontSize:'10.5px',marginTop:'11px'}}>❌ Incorrect password</p>}
            <div style={{display:'flex',gap:'11px',marginTop:'24px'}}>
              <button onClick={()=>{setShowLogin(false);setLoginPw('');setLoginErr(false);}} style={{flex:1,padding:'13px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'12px',color:'rgba(255,255,255,.4)',cursor:'pointer',fontFamily:"'Sora',sans-serif"}}>CANCEL</button>
              <button onClick={handleLogin} style={{flex:1,padding:'13px',background:'linear-gradient(135deg,#D4A017,#F5A623)',border:'none',borderRadius:'12px',color:'#000',cursor:'pointer',fontWeight:800,fontFamily:"'Sora',sans-serif"}}>LOGIN</button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADMIN DASHBOARD MODAL (unchanged) ── */}
      {showDashboard&&isAdmin&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowDashboard(false)}}>
          <div className="modal-box" style={{maxWidth:'1000px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <h2 style={{color:'#D4A017',fontSize:'24px',fontWeight:800}}>📊 Admin Dashboard</h2>
              <div style={{display:'flex',gap:'8px'}}>
                {pendingQueue.length>0&&<button onClick={()=>{setShowDashboard(false);setShowPending(true);}} className="btn-primary" style={{padding:'8px 16px',fontSize:'11px',animation:'none'}}>📋 {pendingQueue.length} Pending</button>}
                <button onClick={()=>setShowDashboard(false)} className="btn-secondary" style={{padding:'8px 16px',fontSize:'11px'}}>✕ Close</button>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'12px',marginBottom:'30px'}}>
              {[{label:'Gallery Images',val:galleryImages.length,color:'#D4A017'},{label:'Blog Posts',val:blogPosts.length,color:'#2196F3'},{label:'Team Members',val:team.length,color:'#2ECC40'},{label:'Services',val:services.length,color:'#F5A623'},{label:'Newsletter Subs',val:newsletterEmails.length,color:'#D4A017'},{label:'Contact Forms',val:contactSubs.length,color:'#2196F3'},{label:'Pending Items',val:pendingQueue.length,color:'#f44336'},{label:'Achievements',val:achievements.length,color:'#2ECC40'}].map(({label,val,color})=>(
                <div key={label} className="stat-card" style={{'--sc':color} as React.CSSProperties}><div style={{fontSize:'26px',fontWeight:900,color,fontFamily:"'Space Mono',monospace"}}>{val}</div><div style={{color:'rgba(255,255,255,.5)',fontSize:'9px',letterSpacing:'2px',marginTop:'8px'}}>{label}</div></div>
              ))}
            </div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
              <button onClick={()=>{setShowDashboard(false);openAddGallery();}} className="btn-primary" style={{padding:'8px 16px',fontSize:'10px',animation:'none'}}>📸 + Image</button>
              <button onClick={()=>{setShowDashboard(false);openAddBlog();}} className="btn-primary" style={{padding:'8px 16px',fontSize:'10px',animation:'none'}}>✍️ + Blog</button>
              <button onClick={()=>{setShowDashboard(false);openAddTeam();}} className="btn-primary" style={{padding:'8px 16px',fontSize:'10px',animation:'none'}}>👤 + Team</button>
              <button onClick={()=>{setShowDashboard(false);openAddService();}} className="btn-primary" style={{padding:'8px 16px',fontSize:'10px',animation:'none'}}>⚙️ + Service</button>
              <button onClick={()=>{setShowDashboard(false);openAddAch();}} className="btn-primary" style={{padding:'8px 16px',fontSize:'10px',animation:'none'}}>🏆 + Achievement</button>
              <button onClick={exportSubmissionsCSV} className="btn-secondary" style={{padding:'8px 16px',fontSize:'10px'}}>📥 Export Submissions</button>
              <button onClick={exportNewsletterCSV} className="btn-secondary" style={{padding:'8px 16px',fontSize:'10px'}}>📧 Export Newsletter</button>
              <AIBlogGenerator isAdmin={isAdmin} onPublish={(post) => setBlogPosts(prev => [post, ...prev])} />
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
              <div>
                <h3 style={{color:'#D4A017',marginBottom:'12px',fontSize:'14px',fontFamily:"'Space Mono',monospace"}}>RECENT ACTIVITY</h3>
                <div style={{maxHeight:'200px',overflowY:'auto',background:'rgba(0,0,0,.3)',padding:'12px',borderRadius:'12px'}}>
                  {activityLogs.slice(0,15).map(log=>(<div key={log.id} style={{fontSize:'10px',color:'rgba(255,255,255,.5)',borderBottom:'1px solid rgba(255,255,255,.05)',padding:'5px 0'}}>[{log.timestamp}] <span style={{color:'#D4A017'}}>{log.user}</span>: {log.action}</div>))}
                  {activityLogs.length===0&&<p style={{color:'rgba(255,255,255,.3)',fontSize:'11px'}}>No activity yet.</p>}
                </div>
              </div>
              <div>
                <h3 style={{color:'#D4A017',marginBottom:'12px',fontSize:'14px',fontFamily:"'Space Mono',monospace"}}>CONTACT SUBMISSIONS</h3>
                <div style={{maxHeight:'200px',overflowY:'auto'}}>
                  {contactSubs.slice(0,5).map(sub=>(
                    <div key={sub.id} style={{background:'rgba(255,255,255,.03)',borderRadius:'8px',padding:'10px',marginBottom:'8px',border:`1px solid ${sub.read?'transparent':'rgba(212,160,23,.3)'}`}}>
                      <div style={{fontSize:'12px',fontWeight:600,color:'#fff'}}>{sub.name} <span style={{color:'rgba(255,255,255,.4)',fontWeight:400,fontSize:'10px'}}>({sub.email})</span></div>
                      <div style={{fontSize:'10px',color:'rgba(255,255,255,.5)',marginTop:'2px'}}>{sub.service} · {sub.timestamp}</div>
                      {!sub.read&&<button onClick={()=>setContactSubs(prev=>prev.map(s=>s.id===sub.id?{...s,read:true}:s))} style={{marginTop:'4px',background:'none',border:'1px solid rgba(212,160,23,.2)',color:'#D4A017',fontSize:'9px',cursor:'pointer',padding:'1px 6px',borderRadius:'3px'}}>Mark Read</button>}
                    </div>
                  ))}
                  {contactSubs.length===0&&<p style={{color:'rgba(255,255,255,.3)',fontSize:'11px'}}>No submissions yet.</p>}
                </div>
              </div>
            </div>
            <div style={{marginTop:'20px'}}>
              <AILeadScorer isAdmin={isAdmin} leads={contactSubs} />
            </div>
          </div>
        </div>
      )}

      {/* ── PENDING APPROVALS MODAL (unchanged) ── */}
      {showPendingModal&&isAdmin&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowPending(false)}}>
          <div className="modal-box">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <h2 style={{color:'#D4A017',fontSize:'22px',fontWeight:800}}>📋 Pending Approvals ({pendingQueue.length})</h2>
              <button onClick={()=>setShowPending(false)} style={{background:'transparent',border:'none',color:'#fff',fontSize:'20px',cursor:'pointer'}}>✕</button>
            </div>
            {pendingQueue.length===0?(<p style={{color:'rgba(255,255,255,.5)',textAlign:'center',padding:'40px'}}>No pending items! All caught up ✅</p>):(
              pendingQueue.map(item=>(
                <div key={item.id} style={{border:'1px solid rgba(212,160,23,.2)',borderRadius:'12px',padding:'16px',marginBottom:'16px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                    <div><span style={{background:'rgba(212,160,23,.1)',color:'#D4A017',padding:'3px 10px',borderRadius:'50px',fontSize:'10px',fontFamily:"'Space Mono',monospace"}}>{item.type.toUpperCase()}</span><span style={{color:'rgba(255,255,255,.5)',fontSize:'11px',marginLeft:'10px'}}>by {item.submittedBy} · {item.submittedAt}</span></div>
                  </div>
                  {item.type==='gallery'&&item.data.url&&<img src={item.data.url} alt={item.data.title} style={{maxWidth:'150px',borderRadius:'8px',marginBottom:'10px'}}/>}
                  {item.type==='blog'&&<div style={{color:'rgba(255,255,255,.7)',fontSize:'13px',marginBottom:'10px'}}><strong>{item.data.title}</strong><br/><span style={{fontSize:'11px',color:'rgba(255,255,255,.5)'}}>{item.data.excerpt}</span></div>}
                  {pendingRejectId===item.id?(
                    <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
                      <input type="text" placeholder="Rejection reason (optional)" value={rejectReason} onChange={e=>setRejectReason(e.target.value)} className="modal-input" style={{flex:1,padding:'6px 10px'}}/>
                      <button onClick={()=>rejectPending(item.id,rejectReason)} style={{background:'#f44336',color:'#fff',border:'none',padding:'6px 14px',borderRadius:'8px',cursor:'pointer',fontSize:'11px'}}>Confirm Reject</button>
                      <button onClick={()=>{setPendingRejectId(null);setRejectReason('');}} style={{background:'transparent',border:'1px solid rgba(255,255,255,.2)',color:'rgba(255,255,255,.5)',padding:'6px 14px',borderRadius:'8px',cursor:'pointer',fontSize:'11px'}}>Cancel</button>
                    </div>
                  ):(
                    <div style={{display:'flex',gap:'8px'}}>
                      <button onClick={()=>approvePending(item.id)} className="btn-primary" style={{padding:'6px 16px',fontSize:'11px',animation:'none'}}>✅ Approve</button>
                      <button onClick={()=>setPendingRejectId(item.id)} className="btn-secondary" style={{padding:'6px 16px',fontSize:'11px',borderColor:'rgba(244,67,54,.3)',color:'#f44336'}}>❌ Reject</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── COOKIE LOGS MODAL (unchanged) ── */}
      {showCookieLogs&&isAdmin&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowCookieLogs(false)}}>
          <div className="modal-box" style={{maxWidth:'800px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
              <h2 style={{color:'#D4A017',fontSize:'22px',fontWeight:800}}>🍪 Cookie Consent Logs</h2>
              <button onClick={()=>setShowCookieLogs(false)} style={{background:'transparent',border:'none',color:'#fff',fontSize:'20px',cursor:'pointer'}}>✕</button>
            </div>
            <p style={{color:'rgba(255,255,255,.5)',fontSize:'11px',marginBottom:'16px'}}>{cookieLogs.length} consent records collected.</p>
            <button onClick={()=>{navigator.clipboard.writeText(JSON.stringify(cookieLogs,null,2));alert('Logs copied!');}} className="btn-secondary" style={{padding:'6px 14px',fontSize:'10px',marginBottom:'16px'}}>📋 Copy All Logs</button>
            <div style={{maxHeight:'400px',overflowY:'auto',background:'rgba(0,0,0,.3)',padding:'12px',borderRadius:'12px'}}>
              {cookieLogs.length===0?<p style={{color:'rgba(255,255,255,.3)',fontSize:'11px'}}>No cookie consents recorded yet.</p>:cookieLogs.map((log,idx)=>(
                <pre key={idx} style={{color:'#2ECC40',fontSize:'10px',fontFamily:'monospace',marginBottom:'10px',whiteSpace:'pre-wrap',wordBreak:'break-all',borderBottom:'1px solid rgba(255,255,255,.05)',paddingBottom:'8px'}}>{JSON.stringify(log,null,2)}</pre>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SERVICE DETAIL MODAL (unchanged) ── */}
      {serviceDetailModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget){setSvcDetail(null);setNewReview({name:'',rating:5,comment:''}); }}}>
          <div className="detail-modal">
            <div style={{padding:'32px 36px',borderBottom:`1px solid ${serviceDetailModal.color}30`,background:`radial-gradient(ellipse at top left,${serviceDetailModal.color}0a 0%,transparent 60%)`}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'20px'}}>
                <div style={{width:'60px',height:'60px',background:`radial-gradient(circle,${serviceDetailModal.color}28,${serviceDetailModal.color}08)`,border:`1px solid ${serviceDetailModal.color}30`,borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',flexShrink:0}}>{serviceDetailModal.icon}</div>
                <div style={{flex:1}}>
                  <span style={{fontFamily:"'Space Mono',monospace",color:serviceDetailModal.color,fontSize:'8px',letterSpacing:'3px',background:`${serviceDetailModal.color}0d`,border:`1px solid ${serviceDetailModal.color}20`,padding:'3px 12px',borderRadius:'50px',display:'inline-block',marginBottom:'10px'}}>{serviceDetailModal.tag}</span>
                  <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'8px'}}>{serviceDetailModal.title}</h2>
                  <p style={{color:'rgba(255,255,255,.4)',fontSize:'13px',lineHeight:1.8}}>{serviceDetailModal.desc}</p>
                </div>
                <button onClick={()=>setSvcDetail(null)} style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.4)',width:'34px',height:'34px',borderRadius:'50%',cursor:'pointer',flexShrink:0,fontSize:'16px'}}>✕</button>
              </div>
            </div>
            <div style={{padding:'32px 36px',overflowY:'auto',maxHeight:'calc(92vh - 200px)'}}>
              {/* Media Gallery */}
              {serviceDetailModal.media&&serviceDetailModal.media.length>0&&(
                <div style={{marginBottom:'32px'}}>
                  <h3 style={{color:serviceDetailModal.color,fontSize:'10px',letterSpacing:'4px',fontFamily:"'Space Mono',monospace",marginBottom:'16px'}}>📸 MEDIA GALLERY</h3>
                  <div style={{marginBottom:'12px'}}>
                    {serviceDetailModal.media[selectedMediaIndex]?.type==='video'?(
                      <div className="video-container"><iframe src={serviceDetailModal.media[selectedMediaIndex].url} title={serviceDetailModal.media[selectedMediaIndex].title||'Video'} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/></div>
                    ):(
                      <img src={serviceDetailModal.media[selectedMediaIndex]?.url} alt={serviceDetailModal.media[selectedMediaIndex]?.title||'Image'} style={{width:'100%',borderRadius:'12px',objectFit:'cover',maxHeight:'400px'}}/>
                    )}
                  </div>
                  {serviceDetailModal.media[selectedMediaIndex]?.title&&<div style={{textAlign:'center',color:'rgba(255,255,255,.5)',fontSize:'11px',marginBottom:'12px',fontFamily:"'Space Mono',monospace"}}>{serviceDetailModal.media[selectedMediaIndex].title}</div>}
                  {serviceDetailModal.media.length>1&&(
                    <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                      {serviceDetailModal.media.map((media,idx)=>(
                        <div key={idx} className={`media-thumb${selectedMediaIndex===idx?' active':''}`} onClick={()=>setSelMedia(idx)}>
                          {media.type==='video'?<div style={{width:'60px',height:'60px',background:`${serviceDetailModal.color}20`,borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>▶️</div>:<img src={media.url} alt={media.title||'Thumbnail'} style={{width:'60px',height:'60px',objectFit:'cover'}}/>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {/* Key Features */}
              <div style={{marginBottom:'32px'}}>
                <h3 style={{color:serviceDetailModal.color,fontSize:'10px',letterSpacing:'4px',fontFamily:"'Space Mono',monospace",marginBottom:'16px'}}>⚙️ KEY FEATURES</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {serviceDetailModal.features.map((f,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',background:'rgba(255,255,255,.016)',border:`1px solid ${serviceDetailModal.color}12`,borderRadius:'10px',padding:'12px 16px'}}>
                      <div style={{width:'6px',height:'6px',borderRadius:'50%',background:serviceDetailModal.color,boxShadow:`0 0 8px ${serviceDetailModal.color}`,flexShrink:0}}/>
                      <span style={{color:'rgba(255,255,255,.65)',fontSize:'13px'}}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Case Study */}
              {serviceDetailModal.caseStudy&&(
                <div style={{background:'rgba(255,255,255,.016)',border:`1px solid ${serviceDetailModal.color}18`,borderRadius:'14px',padding:'20px',marginBottom:'32px'}}>
                  <div style={{color:serviceDetailModal.color,fontSize:'9px',letterSpacing:'4px',fontFamily:"'Space Mono',monospace",marginBottom:'10px'}}>📊 CASE STUDY</div>
                  <p style={{color:'rgba(255,255,255,.45)',fontSize:'13px',lineHeight:1.9}}>{serviceDetailModal.caseStudy}</p>
                </div>
              )}
              {/* Reviews */}
              <div style={{marginBottom:'32px'}}>
                <h3 style={{color:serviceDetailModal.color,fontSize:'10px',letterSpacing:'4px',fontFamily:"'Space Mono',monospace",marginBottom:'16px'}}>⭐ REVIEWS ({serviceReviews[serviceDetailModal.id]?.length||0})</h3>
                {serviceReviews[serviceDetailModal.id]&&serviceReviews[serviceDetailModal.id].length>0&&(
                  <div style={{background:'rgba(255,255,255,.02)',borderRadius:'12px',padding:'16px',marginBottom:'20px',textAlign:'center'}}>
                    <div style={{fontSize:'32px',fontWeight:800,color:serviceDetailModal.color}}>
                      {(serviceReviews[serviceDetailModal.id].reduce((acc,rev)=>acc+rev.rating,0)/serviceReviews[serviceDetailModal.id].length).toFixed(1)}
                    </div>
                    <div style={{fontSize:'16px',marginTop:'8px'}}>{renderStars(Math.round(serviceReviews[serviceDetailModal.id].reduce((acc,rev)=>acc+rev.rating,0)/serviceReviews[serviceDetailModal.id].length))}</div>
                    <div style={{color:'rgba(255,255,255,.3)',fontSize:'11px',marginTop:'4px'}}>Based on {serviceReviews[serviceDetailModal.id].length} reviews</div>
                  </div>
                )}
                <form onSubmit={handleSubmitReview} style={{background:'rgba(255,255,255,.02)',border:`1px solid ${serviceDetailModal.color}15`,borderRadius:'14px',padding:'20px',marginBottom:'24px'}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr auto',gap:'12px',marginBottom:'12px'}}>
                    <input type="text" placeholder="Your name" value={newReview.name} onChange={e=>setNewReview({...newReview,name:e.target.value})} className="modal-input" style={{padding:'10px 14px'}} required/>
                    <select value={newReview.rating} onChange={e=>setNewReview({...newReview,rating:parseInt(e.target.value)})} className="modal-input" style={{padding:'10px 14px',width:'auto'}}>
                      {[5,4,3,2,1].map(r=><option key={r} value={r}>{r} Stars</option>)}
                    </select>
                  </div>
                  <textarea placeholder="Share your experience..." value={newReview.comment} onChange={e=>setNewReview({...newReview,comment:e.target.value})} rows={3} className="modal-input" style={{resize:'vertical'}} required/>
                  <button type="submit" disabled={submittingReview} style={{marginTop:'12px',background:`linear-gradient(135deg,${serviceDetailModal.color},${serviceDetailModal.color}cc)`,border:'none',borderRadius:'10px',padding:'10px 20px',color:'#000',fontWeight:700,fontSize:'11px',cursor:submittingReview?'not-allowed':'pointer'}}>
                    {submittingReview?'SUBMITTING...':'✍️ SUBMIT REVIEW'}
                  </button>
                </form>
                {(!serviceReviews[serviceDetailModal.id]||serviceReviews[serviceDetailModal.id].length===0)?(
                  <div style={{textAlign:'center',padding:'40px',color:'rgba(255,255,255,.2)',fontSize:'13px'}}>No reviews yet. Be the first!</div>
                ):(
                  <div style={{display:'flex',flexDirection:'column',gap:'14px',maxHeight:'400px',overflowY:'auto'}}>
                    {serviceReviews[serviceDetailModal.id].map((review:Review)=>(
                      <div key={review.id} style={{background:'rgba(255,255,255,.016)',border:`1px solid ${serviceDetailModal.color}10`,borderRadius:'12px',padding:'16px'}}>
                        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                          <div><span style={{color:'#fff',fontWeight:600}}>{review.name}</span><div style={{fontSize:'12px',marginTop:'4px'}}>{renderStars(review.rating)}</div></div>
                          <span style={{color:'rgba(255,255,255,.2)',fontSize:'10px',fontFamily:"'Space Mono',monospace"}}>{review.date}</span>
                        </div>
                        <p style={{color:'rgba(255,255,255,.5)',fontSize:'12.5px',lineHeight:1.7}}>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={{padding:'24px 36px',borderTop:`1px solid ${serviceDetailModal.color}20`,display:'flex',gap:'12px'}}>
              <button onClick={()=>{setSvcDetail(null);document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});setFormData(prev=>({...prev,service:serviceDetailModal.title}));}} className="btn-primary" style={{flex:1,justifyContent:'center',animation:'none',padding:'12px'}}>🚀 REQUEST A DEMO</button>
              <button onClick={()=>setSvcDetail(null)} style={{flex:1,padding:'12px',background:'transparent',border:`1px solid ${serviceDetailModal.color}30`,borderRadius:'50px',color:serviceDetailModal.color,cursor:'pointer',fontSize:'10.5px',fontWeight:600}}>CLOSE</button>
            </div>
          </div>
        </div>
      )}

      {/* ── PORTFOLIO DETAIL MODAL (unchanged) ── */}
      {portfolioDetail&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setPortfolioDetail(null)}}>
          <div className="detail-modal">
            <div style={{padding:'32px 36px',borderBottom:`1px solid ${portfolioDetail.color}30`,background:`radial-gradient(ellipse at top left,${portfolioDetail.color}0a 0%,transparent 60%)`}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'20px'}}>
                <div style={{width:'60px',height:'60px',background:`radial-gradient(circle,${portfolioDetail.color}28,${portfolioDetail.color}08)`,border:`1px solid ${portfolioDetail.color}30`,borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',flexShrink:0}}>{portfolioDetail.icon}</div>
                <div style={{flex:1}}>
                  <span style={{fontFamily:"'Space Mono',monospace",color:portfolioDetail.color,fontSize:'8px',letterSpacing:'3px',background:`${portfolioDetail.color}0d`,border:`1px solid ${portfolioDetail.color}20`,padding:'3px 12px',borderRadius:'50px',display:'inline-block',marginBottom:'10px'}}>{portfolioDetail.category}</span>
                  <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'8px'}}>{portfolioDetail.title}</h2>
                  <p style={{color:'rgba(255,255,255,.4)',fontSize:'13px',lineHeight:1.8}}>{portfolioDetail.desc}</p>
                </div>
                <button onClick={()=>setPortfolioDetail(null)} style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.4)',width:'34px',height:'34px',borderRadius:'50%',cursor:'pointer',flexShrink:0,fontSize:'16px'}}>✕</button>
              </div>
            </div>
            <div style={{padding:'32px 36px',overflowY:'auto'}}>
              <div style={{marginBottom:'24px'}}>
                <h3 style={{color:portfolioDetail.color,fontSize:'10px',letterSpacing:'4px',fontFamily:"'Space Mono',monospace",marginBottom:'14px'}}>🛠️ TECH STACK</h3>
                <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>{portfolioDetail.tech.map((t,i)=>(<span key={i} style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.6)',padding:'6px 14px',borderRadius:'50px',fontSize:'11px',fontFamily:"'Space Mono',monospace"}}>{t}</span>))}</div>
              </div>
              <div style={{background:`${portfolioDetail.color}0a`,border:`1px solid ${portfolioDetail.color}20`,borderRadius:'14px',padding:'20px'}}>
                <div style={{color:portfolioDetail.color,fontSize:'9px',letterSpacing:'4px',fontFamily:"'Space Mono',monospace",marginBottom:'10px'}}>📊 OUTCOME</div>
                <p style={{color:'rgba(255,255,255,.65)',fontSize:'14px',lineHeight:1.9,fontWeight:500}}>{portfolioDetail.outcome}</p>
              </div>
            </div>
            <div style={{padding:'24px 36px',borderTop:`1px solid ${portfolioDetail.color}20`,display:'flex',gap:'12px'}}>
              <button onClick={()=>{setPortfolioDetail(null);document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});}} className="btn-primary" style={{flex:1,justifyContent:'center',animation:'none',padding:'12px'}}>🚀 DISCUSS THIS PROJECT</button>
              <button onClick={()=>setPortfolioDetail(null)} style={{flex:1,padding:'12px',background:'transparent',border:`1px solid ${portfolioDetail.color}30`,borderRadius:'50px',color:portfolioDetail.color,cursor:'pointer',fontSize:'10.5px',fontWeight:600}}>CLOSE</button>
            </div>
          </div>
        </div>
      )}

      {/* ── BLOG DETAIL MODAL (unchanged) ── */}
      {blogDetailModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setBlogDetail(null)}}>
          <div className="detail-modal">
            <div style={{padding:'32px 36px',borderBottom:'1px solid rgba(212,160,23,.2)',background:'radial-gradient(ellipse at top left,rgba(212,160,23,.05) 0%,transparent 60%)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                <div>
                  <div style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.6)',fontSize:'8px',letterSpacing:'3px',marginBottom:'10px'}}>📰 BLOG POST</div>
                  <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,lineHeight:1.3}}>{blogDetailModal.title}</h2>
                  <div style={{display:'flex',gap:'16px',marginTop:'12px',flexWrap:'wrap',fontSize:'10px',color:'rgba(255,255,255,.3)',fontFamily:"'Space Mono',monospace"}}>
                    <span>📅 {blogDetailModal.date}</span><span>✍️ {blogDetailModal.author}</span><span>📖 {blogDetailModal.readTime} read</span>
                  </div>
                </div>
                <button onClick={()=>setBlogDetail(null)} style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.4)',width:'34px',height:'34px',borderRadius:'50%',cursor:'pointer',flexShrink:0,fontSize:'16px'}}>✕</button>
              </div>
            </div>
            <div style={{padding:'32px 36px',overflowY:'auto',maxHeight:'60vh'}}>
              {blogDetailModal.featuredImage&&<img src={blogDetailModal.featuredImage} alt={blogDetailModal.title} style={{width:'100%',borderRadius:'12px',marginBottom:'24px',objectFit:'cover',maxHeight:'300px'}}/>}
              {blogDetailModal.content?(
                <div style={{color:'rgba(255,255,255,.8)',fontSize:'15px',lineHeight:2}}>
                  {blogDetailModal.content.split('\n').map((line,i)=>(
                    <p key={i} style={{marginBottom:'16px'}}>{line}</p>
                  ))}
                </div>
              ):(
                <p style={{color:'rgba(255,255,255,.6)',fontSize:'15px',lineHeight:2}}>{blogDetailModal.excerpt}</p>
              )}
            </div>
            <div style={{padding:'24px 36px',borderTop:'1px solid rgba(212,160,23,.15)',display:'flex',gap:'12px'}}>
              <button onClick={()=>setBlogDetail(null)} style={{flex:1,padding:'12px',background:'transparent',border:'1px solid rgba(212,160,23,.3)',borderRadius:'50px',color:'#D4A017',cursor:'pointer',fontSize:'10.5px',fontWeight:600}}>← BACK TO BLOG</button>
            </div>
          </div>
        </div>
      )}

      {/* ── PARTNER DETAIL MODAL (unchanged) ── */}
      {selectedPartner&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setSelPartner(null)}}>
          <div className="admin-box">
            <div style={{fontSize:'48px',textAlign:'center',marginBottom:'16px'}}>{selectedPartner.logo}</div>
            <h2 style={{color:'#D4A017',fontSize:'22px',fontWeight:800,marginBottom:'12px',textAlign:'center'}}>{selectedPartner.name}</h2>
            <p style={{color:'rgba(255,255,255,.6)',fontSize:'13px',lineHeight:1.8,marginBottom:'20px',textAlign:'center'}}>{selectedPartner.description}</p>
            {selectedPartner.url&&selectedPartner.url!=='#'&&(
              <a href={selectedPartner.url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{display:'flex',justifyContent:'center',animation:'none'}}>Visit Website →</a>
            )}
            <button onClick={()=>setSelPartner(null)} style={{marginTop:'12px',width:'100%',padding:'10px',background:'transparent',border:'1px solid rgba(255,255,255,.1)',borderRadius:'12px',color:'rgba(255,255,255,.4)',cursor:'pointer',fontFamily:"'Sora',sans-serif"}}>CLOSE</button>
          </div>
        </div>
      )}

      {/* ── SECTOR DETAIL MODAL (unchanged) ── */}
      {selectedSector&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setSelSector(null)}}>
          <div className="admin-box">
            <div style={{fontSize:'48px',textAlign:'center',marginBottom:'16px'}}>{selectedSector.icon}</div>
            <h2 style={{color:'#D4A017',fontSize:'22px',fontWeight:800,marginBottom:'12px',textAlign:'center'}}>{selectedSector.name}</h2>
            <p style={{color:'rgba(255,255,255,.6)',fontSize:'13px',lineHeight:1.8,marginBottom:'20px',textAlign:'center'}}>{selectedSector.description}</p>
            <button onClick={()=>setSelSector(null)} style={{width:'100%',padding:'10px',background:'transparent',border:'1px solid rgba(255,255,255,.1)',borderRadius:'12px',color:'rgba(255,255,255,.4)',cursor:'pointer',fontFamily:"'Sora',sans-serif"}}>CLOSE</button>
          </div>
        </div>
      )}
      {/* ── GALLERY LIGHTBOX (inline) ── */}
      {lightboxForGallery&&(
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,.97)',zIndex:10001,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}} onClick={()=>setLightboxForGallery(null)}>
          <div style={{maxWidth:'90vw',maxHeight:'80vh'}} onClick={e=>e.stopPropagation()}>
            <img src={lightboxForGallery.url} alt={lightboxForGallery.title} style={{maxWidth:'100%',maxHeight:'75vh',objectFit:'contain',borderRadius:'8px'}}/>
            <div style={{color:'#fff',textAlign:'center',marginTop:'16px'}}><div style={{fontSize:'16px',fontWeight:600}}>{lightboxForGallery.title}</div><div style={{fontSize:'12px',color:'rgba(255,255,255,.5)',marginTop:'4px'}}>{lightboxForGallery.category} {lightboxForGallery.date&&`• ${lightboxForGallery.date}`}</div></div>
            <div style={{display:'flex',justifyContent:'center',gap:'12px',marginTop:'16px',flexWrap:'wrap'}}>
              <a href={lightboxForGallery.url} download className="btn-secondary">⬇ Download</a>
              <button onClick={()=>setShowFullGallery(true)} className="btn-primary" style={{animation:'none',padding:'8px 20px',fontSize:'11px'}}>View Full Gallery</button>
            </div>
          </div>
          <button onClick={()=>setLightboxForGallery(null)} style={{position:'absolute',top:'20px',right:'30px',background:'none',border:'none',color:'#fff',fontSize:'32px',cursor:'pointer'}}>✕</button>
        </div>
      )}

      {/* ── TEAM MODAL (unchanged) ── */}
      {showTeamModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowTeamModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingMember?'Edit Team Member':'Add Team Member'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Full Name *" value={teamDraft.name} onChange={e=>setTeamDraft({...teamDraft,name:e.target.value})}/>
              <input className="modal-input" placeholder="Role *" value={teamDraft.role} onChange={e=>setTeamDraft({...teamDraft,role:e.target.value})}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <input className="modal-input" placeholder="Tag (e.g., FOUNDER)" value={teamDraft.tag} onChange={e=>setTeamDraft({...teamDraft,tag:e.target.value})}/>
                <input className="modal-input" placeholder="Initial (e.g., M)" value={teamDraft.initial} onChange={e=>setTeamDraft({...teamDraft,initial:e.target.value})} maxLength={2}/>
              </div>
              <input className="modal-input" placeholder="Location" value={teamDraft.location} onChange={e=>setTeamDraft({...teamDraft,location:e.target.value})}/>
              <input className="modal-input" placeholder="Photo URL (optional)" value={teamDraft.photo} onChange={e=>setTeamDraft({...teamDraft,photo:e.target.value})}/>
              <input className="modal-input" placeholder="LinkedIn URL (optional)" value={teamDraft.linkedin} onChange={e=>setTeamDraft({...teamDraft,linkedin:e.target.value})}/>
              <textarea className="modal-input" rows={3} placeholder="Bio / Description" value={teamDraft.desc} onChange={e=>setTeamDraft({...teamDraft,desc:e.target.value})}/>
              <div><label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Emoji:</label><div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>{EMOJI_OPTIONS.map(emoji=><button key={emoji} className={`emoji-btn${teamDraft.emoji===emoji?' sel':''}`} onClick={()=>setTeamDraft({...teamDraft,emoji})}>{emoji}</button>)}</div></div>
              <div><label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Accent Color:</label><div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>{COLOR_OPTIONS.map(c=><div key={c} className={`color-swatch${teamDraft.color===c?' sel':''}`} style={{background:c}} onClick={()=>setTeamDraft({...teamDraft,color:c})}/>)}</div></div>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}>
                <button onClick={saveTeam} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button>
                <button onClick={()=>setShowTeamModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE TEAM CONFIRM (unchanged) ── */}
      {deleteTeamConfirm&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setDelTeam(null)}}>
          <div className="admin-box"><div style={{fontSize:'44px',marginBottom:'16px'}}>⚠️</div><h3 style={{color:'#fff',marginBottom:'12px'}}>Remove Team Member?</h3><p style={{color:'rgba(255,255,255,.4)',fontSize:'13px',marginBottom:'24px'}}>This cannot be undone.</p><div style={{display:'flex',gap:'12px'}}><button onClick={()=>deleteTeam(deleteTeamConfirm)} style={{flex:1,padding:'12px',background:'#f44336',color:'#fff',border:'none',borderRadius:'12px',cursor:'pointer',fontWeight:700}}>REMOVE</button><button onClick={()=>setDelTeam(null)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div></div>
        </div>
      )}

      {/* ── SERVICE MODAL (unchanged) ── */}
      {showServiceModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowSvcModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingService?'Edit Service':'Add New Service'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div style={{display:'flex',gap:'12px'}}>
                <select value={serviceDraft.icon} onChange={e=>setSvcDraft({...serviceDraft,icon:e.target.value})} className="modal-input" style={{width:'80px',textAlign:'center',fontSize:'22px',flexShrink:0}}>
                  {SERVICE_ICONS.map(icon=><option key={icon} value={icon}>{icon}</option>)}
                </select>
                <input className="modal-input" placeholder="Service Title *" value={serviceDraft.title} onChange={e=>setSvcDraft({...serviceDraft,title:e.target.value})}/>
              </div>
              <textarea className="modal-input" rows={3} placeholder="Description *" value={serviceDraft.desc} onChange={e=>setSvcDraft({...serviceDraft,desc:e.target.value})}/>
              <div><label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Accent Color:</label><div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>{COLOR_OPTIONS.map(c=><div key={c} className={`color-swatch${serviceDraft.color===c?' sel':''}`} style={{background:c}} onClick={()=>setSvcDraft({...serviceDraft,color:c})}/>)}</div></div>
              <input className="modal-input" placeholder="Tag (e.g., CORE TECH)" value={serviceDraft.tag} onChange={e=>setSvcDraft({...serviceDraft,tag:e.target.value})}/>
              {/* Media */}
              <div>
                <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>📷 Media Gallery (Images & Videos)</label>
                {serviceDraft.media?.map((media,idx)=>(
                  <div key={idx} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'center'}}>
                    <select value={media.type} onChange={e=>{const nm=[...(serviceDraft.media||[])];nm[idx]={...nm[idx],type:e.target.value as 'image'|'video'};setSvcDraft({...serviceDraft,media:nm});}} className="modal-input" style={{width:'90px',flexShrink:0}}>
                      <option value="image">Image</option><option value="video">Video</option>
                    </select>
                    <input className="modal-input" placeholder="URL" value={media.url} onChange={e=>{const nm=[...(serviceDraft.media||[])];nm[idx]={...nm[idx],url:e.target.value};setSvcDraft({...serviceDraft,media:nm});}}/>
                    <input className="modal-input" placeholder="Title" value={media.title||''} onChange={e=>{const nm=[...(serviceDraft.media||[])];nm[idx]={...nm[idx],title:e.target.value};setSvcDraft({...serviceDraft,media:nm});}}/>
                    <button onClick={()=>setSvcDraft({...serviceDraft,media:serviceDraft.media?.filter((_,i)=>i!==idx)})} style={{background:'rgba(244,67,54,.2)',border:'none',borderRadius:'8px',color:'#f44336',padding:'0 14px',cursor:'pointer',fontSize:'16px',flexShrink:0,height:'42px'}}>✕</button>
                  </div>
                ))}
                <button onClick={()=>setSvcDraft({...serviceDraft,media:[...(serviceDraft.media||[]),{type:'image',url:'',title:''}]})} className="btn-secondary" style={{padding:'6px 14px',fontSize:'10px'}}>+ Add Media</button>
              </div>
              {/* Features */}
              <div>
                <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Features:</label>
                {serviceDraft.features.map((f,i)=>(
                  <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                    <input className="modal-input" value={f} onChange={e=>{const nf=[...serviceDraft.features];nf[i]=e.target.value;setSvcDraft({...serviceDraft,features:nf});}} placeholder={`Feature ${i+1}`}/>
                    <button onClick={()=>setSvcDraft({...serviceDraft,features:serviceDraft.features.filter((_,idx)=>idx!==i)})} style={{background:'rgba(244,67,54,.2)',border:'none',borderRadius:'8px',color:'#f44336',padding:'0 14px',cursor:'pointer',fontSize:'16px',flexShrink:0,height:'42px'}}>✕</button>
                  </div>
                ))}
                <button onClick={()=>setSvcDraft({...serviceDraft,features:[...serviceDraft.features,'']})} className="btn-secondary" style={{padding:'6px 14px',fontSize:'10px'}}>+ Add Feature</button>
              </div>
              <textarea className="modal-input" rows={2} placeholder="Case Study" value={serviceDraft.caseStudy} onChange={e=>setSvcDraft({...serviceDraft,caseStudy:e.target.value})}/>
              <label style={{display:'flex',alignItems:'center',gap:'10px',color:'rgba(255,255,255,.6)',fontSize:'13px',cursor:'pointer'}}>
                <input type="checkbox" checked={serviceDraft.visible} onChange={e=>setSvcDraft({...serviceDraft,visible:e.target.checked})}/> Visible on site
              </label>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}>
                <button onClick={saveService} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button>
                <button onClick={()=>setShowSvcModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE SERVICE CONFIRM (unchanged) ── */}
      {deleteServiceConfirm&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setDelSvc(null)}}>
          <div className="admin-box"><div style={{fontSize:'44px',marginBottom:'16px'}}>⚠️</div><h3 style={{color:'#fff',marginBottom:'12px'}}>Delete Service?</h3><p style={{color:'rgba(255,255,255,.4)',fontSize:'13px',marginBottom:'24px'}}>This cannot be undone.</p><div style={{display:'flex',gap:'12px'}}><button onClick={()=>deleteService(deleteServiceConfirm)} style={{flex:1,padding:'12px',background:'#f44336',color:'#fff',border:'none',borderRadius:'12px',cursor:'pointer',fontWeight:700}}>DELETE</button><button onClick={()=>setDelSvc(null)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div></div>
        </div>
      )}

      {/* ── FAQ MODAL (unchanged) ── */}
      {showFaqModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowFaqModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingFaq?'Edit FAQ':'Add FAQ'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Question *" value={faqDraft.q} onChange={e=>setFaqDraft({...faqDraft,q:e.target.value})}/>
              <textarea className="modal-input" rows={4} placeholder="Answer *" value={faqDraft.a} onChange={e=>setFaqDraft({...faqDraft,a:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveFaq} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowFaqModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE FAQ CONFIRM (unchanged) ── */}
      {deleteFaqConfirm&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setDelFaq(null)}}>
          <div className="admin-box"><div style={{fontSize:'44px',marginBottom:'16px'}}>⚠️</div><h3 style={{color:'#fff',marginBottom:'12px'}}>Delete FAQ?</h3><p style={{color:'rgba(255,255,255,.4)',fontSize:'13px',marginBottom:'24px'}}>This cannot be undone.</p><div style={{display:'flex',gap:'12px'}}><button onClick={()=>deleteFaq(deleteFaqConfirm)} style={{flex:1,padding:'12px',background:'#f44336',color:'#fff',border:'none',borderRadius:'12px',cursor:'pointer',fontWeight:700}}>DELETE</button><button onClick={()=>setDelFaq(null)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div></div>
        </div>
      )}

      {/* ── SECTOR MODAL (unchanged) ── */}
      {showSectorModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowSectorModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingSector?'Edit Sector':'Add Sector'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div style={{display:'grid',gridTemplateColumns:'80px 1fr',gap:'12px'}}>
                <select value={sectorDraft.icon} onChange={e=>setSectorDraft({...sectorDraft,icon:e.target.value})} className="modal-input" style={{textAlign:'center',fontSize:'22px'}}>
                  {SERVICE_ICONS.map(icon=><option key={icon} value={icon}>{icon}</option>)}
                </select>
                <input className="modal-input" placeholder="Sector Name *" value={sectorDraft.name} onChange={e=>setSectorDraft({...sectorDraft,name:e.target.value})}/>
              </div>
              <textarea className="modal-input" rows={3} placeholder="Description (shown on click)" value={sectorDraft.description} onChange={e=>setSectorDraft({...sectorDraft,description:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveSector} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowSectorModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── STAT MODAL (unchanged) ── */}
      {showStatModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowStatModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingStat?'Edit Stat':'Add Stat'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Number/Value (e.g., 2026, 6+, ∞)" value={statDraft.num} onChange={e=>setStatDraft({...statDraft,num:e.target.value})}/>
              <input className="modal-input" placeholder="Label (e.g., Incorporated)" value={statDraft.label} onChange={e=>setStatDraft({...statDraft,label:e.target.value})}/>
              <div><label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Color:</label><div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>{COLOR_OPTIONS.map(c=><div key={c} className={`color-swatch${statDraft.color===c?' sel':''}`} style={{background:c}} onClick={()=>setStatDraft({...statDraft,color:c})}/>)}</div></div>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}>
                <button onClick={saveStat} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button>
                <button onClick={()=>setShowStatModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button>
              </div>
              {editingStat&&<button onClick={()=>{deleteStat(editingStat.id);setShowStatModal(false);}} style={{width:'100%',padding:'10px',background:'rgba(244,67,54,.1)',border:'1px solid rgba(244,67,54,.2)',borderRadius:'10px',color:'#f44336',cursor:'pointer',fontSize:'12px'}}>🗑 Delete This Stat</button>}
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT MODAL (unchanged) ── */}
      {showContactModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowContactModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>Edit Contact Info</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Phone" value={contactDraft.phone} onChange={e=>setContactDraft({...contactDraft,phone:e.target.value})}/>
              <input className="modal-input" placeholder="WhatsApp (no +, e.g., 919845618859)" value={contactDraft.whatsapp} onChange={e=>setContactDraft({...contactDraft,whatsapp:e.target.value})}/>
              <input className="modal-input" type="email" placeholder="Email" value={contactDraft.email} onChange={e=>setContactDraft({...contactDraft,email:e.target.value})}/>
              <textarea className="modal-input" rows={2} placeholder="Address 1" value={contactDraft.address1} onChange={e=>setContactDraft({...contactDraft,address1:e.target.value})}/>
              <textarea className="modal-input" rows={2} placeholder="Address 2" value={contactDraft.address2} onChange={e=>setContactDraft({...contactDraft,address2:e.target.value})}/>
              <input className="modal-input" placeholder="Instagram URL" value={contactDraft.instagram} onChange={e=>setContactDraft({...contactDraft,instagram:e.target.value})}/>
              <input className="modal-input" placeholder="LinkedIn URL" value={contactDraft.linkedin} onChange={e=>setContactDraft({...contactDraft,linkedin:e.target.value})}/>
              <input className="modal-input" placeholder="Twitter/X URL" value={contactDraft.twitter} onChange={e=>setContactDraft({...contactDraft,twitter:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveContact} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowContactModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO MODAL (unchanged) ── */}
      {showHeroModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowHeroModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>Edit Hero Content</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Headline 1 (colored text)" value={heroDraft.headline1} onChange={e=>setHeroDraft({...heroDraft,headline1:e.target.value})}/>
              <input className="modal-input" placeholder="Headline 2 (blue gradient)" value={heroDraft.headline2} onChange={e=>setHeroDraft({...heroDraft,headline2:e.target.value})}/>
              <input className="modal-input" placeholder="Subheadline" value={heroDraft.subheadline} onChange={e=>setHeroDraft({...heroDraft,subheadline:e.target.value})}/>
              <textarea className="modal-input" rows={4} placeholder="Description paragraph" value={heroDraft.desc} onChange={e=>setHeroDraft({...heroDraft,desc:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveHero} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowHeroModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── TESTIMONIAL MODAL (unchanged) ── */}
      {showTestModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowTestModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingTest?'Edit Testimonial':'Add Testimonial'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Client Name *" value={testDraft.name} onChange={e=>setTestDraft({...testDraft,name:e.target.value})}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <input className="modal-input" placeholder="Role" value={testDraft.role} onChange={e=>setTestDraft({...testDraft,role:e.target.value})}/>
                <input className="modal-input" placeholder="Company" value={testDraft.company} onChange={e=>setTestDraft({...testDraft,company:e.target.value})}/>
              </div>
              <textarea className="modal-input" rows={3} placeholder="Testimonial Content *" value={testDraft.content} onChange={e=>setTestDraft({...testDraft,content:e.target.value})}/>
              <input className="modal-input" placeholder="Photo URL (optional)" value={testDraft.photo} onChange={e=>setTestDraft({...testDraft,photo:e.target.value})}/>
              <input className="modal-input" placeholder="LinkedIn URL (optional)" value={testDraft.linkedinUrl} onChange={e=>setTestDraft({...testDraft,linkedinUrl:e.target.value})}/>
              <div><label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Rating:</label><select className="modal-input" value={testDraft.rating} onChange={e=>setTestDraft({...testDraft,rating:parseInt(e.target.value)})}>{[5,4,3,2,1].map(r=><option key={r} value={r}>{r} Stars {'⭐'.repeat(r)}</option>)}</select></div>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveTestimonial} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowTestModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── BLOG MODAL (unchanged) ── */}
      {showBlogModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowBlogModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingBlog?'Edit Blog Post':'Add Blog Post'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Post Title *" value={blogDraft.title} onChange={e=>setBlogDraft({...blogDraft,title:e.target.value})}/>
              <textarea className="modal-input" rows={3} placeholder="Excerpt / Summary *" value={blogDraft.excerpt} onChange={e=>setBlogDraft({...blogDraft,excerpt:e.target.value})}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <input className="modal-input" placeholder="Date" value={blogDraft.date} onChange={e=>setBlogDraft({...blogDraft,date:e.target.value})}/>
                <input className="modal-input" placeholder="Read Time (e.g., 5 min)" value={blogDraft.readTime} onChange={e=>setBlogDraft({...blogDraft,readTime:e.target.value})}/>
              </div>
              <input className="modal-input" placeholder="Author Name" value={blogDraft.author} onChange={e=>setBlogDraft({...blogDraft,author:e.target.value})}/>
              <input className="modal-input" placeholder="Featured Image URL (optional)" value={blogDraft.featuredImage} onChange={e=>setBlogDraft({...blogDraft,featuredImage:e.target.value})}/>
              <textarea className="modal-input" rows={6} placeholder="Full content (Markdown supported)" value={blogDraft.content} onChange={e=>setBlogDraft({...blogDraft,content:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveBlog} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowBlogModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── JOB MODAL (unchanged) ── */}
      {showJobModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowJobModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingJob?'Edit Job':'Add Job Listing'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Job Title *" value={jobDraft.title} onChange={e=>setJobDraft({...jobDraft,title:e.target.value})}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <input className="modal-input" placeholder="Location" value={jobDraft.location} onChange={e=>setJobDraft({...jobDraft,location:e.target.value})}/>
                <select className="modal-input" value={jobDraft.type} onChange={e=>setJobDraft({...jobDraft,type:e.target.value})}>
                  <option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Remote">Remote</option><option value="Internship">Internship</option><option value="Contract">Contract</option>
                </select>
              </div>
              <textarea className="modal-input" rows={3} placeholder="Job Description *" value={jobDraft.description} onChange={e=>setJobDraft({...jobDraft,description:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveJob} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowJobModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── PRICING MODAL (unchanged) ── */}
      {showPricingModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowPricingModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingPricing?'Edit Pricing Plan':'Add Pricing Plan'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Plan Name *" value={pricingDraft.name} onChange={e=>setPricingDraft({...pricingDraft,name:e.target.value})}/>
              <input className="modal-input" placeholder="Price (e.g., ₹0, Custom)" value={pricingDraft.price} onChange={e=>setPricingDraft({...pricingDraft,price:e.target.value})}/>
              <div>
                <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Features:</label>
                {pricingDraft.features.map((f,i)=>(
                  <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                    <input className="modal-input" value={f} onChange={e=>{const nf=[...pricingDraft.features];nf[i]=e.target.value;setPricingDraft({...pricingDraft,features:nf});}} placeholder={`Feature ${i+1}`}/>
                    <button onClick={()=>setPricingDraft({...pricingDraft,features:pricingDraft.features.filter((_,idx)=>idx!==i)})} style={{background:'rgba(244,67,54,.2)',border:'none',borderRadius:'8px',color:'#f44336',padding:'0 14px',cursor:'pointer',fontSize:'16px',flexShrink:0,height:'42px'}}>✕</button>
                  </div>
                ))}
                <button onClick={()=>setPricingDraft({...pricingDraft,features:[...pricingDraft.features,'']})} className="btn-secondary" style={{padding:'6px 14px',fontSize:'10px'}}>+ Add Feature</button>
              </div>
              <label style={{display:'flex',alignItems:'center',gap:'10px',color:'rgba(255,255,255,.6)',fontSize:'13px',cursor:'pointer'}}>
                <input type="checkbox" checked={pricingDraft.recommended} onChange={e=>setPricingDraft({...pricingDraft,recommended:e.target.checked})}/> Mark as Recommended
              </label>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={savePricing} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowPricingModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── PORTFOLIO MODAL (unchanged) ── */}
      {showPortfolioModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowPortfolioModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingPortfolio?'Edit Case Study':'Add Case Study'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div style={{display:'flex',gap:'12px'}}>
                <select value={portfolioDraft.icon} onChange={e=>setPortfolioDraft({...portfolioDraft,icon:e.target.value})} className="modal-input" style={{width:'80px',textAlign:'center',fontSize:'22px',flexShrink:0}}>
                  {SERVICE_ICONS.map(icon=><option key={icon} value={icon}>{icon}</option>)}
                </select>
                <input className="modal-input" placeholder="Project Title *" value={portfolioDraft.title} onChange={e=>setPortfolioDraft({...portfolioDraft,title:e.target.value})}/>
              </div>
              <input className="modal-input" placeholder="Category (e.g., Gov-tech)" value={portfolioDraft.category} onChange={e=>setPortfolioDraft({...portfolioDraft,category:e.target.value})}/>
              <textarea className="modal-input" rows={3} placeholder="Description *" value={portfolioDraft.desc} onChange={e=>setPortfolioDraft({...portfolioDraft,desc:e.target.value})}/>
              <textarea className="modal-input" rows={2} placeholder="Outcome / Results" value={portfolioDraft.outcome} onChange={e=>setPortfolioDraft({...portfolioDraft,outcome:e.target.value})}/>
              <div>
                <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Tech Stack:</label>
                {portfolioDraft.tech.map((t,i)=>(
                  <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                    <input className="modal-input" value={t} onChange={e=>{const nt=[...portfolioDraft.tech];nt[i]=e.target.value;setPortfolioDraft({...portfolioDraft,tech:nt});}} placeholder={`Technology ${i+1}`}/>
                    <button onClick={()=>setPortfolioDraft({...portfolioDraft,tech:portfolioDraft.tech.filter((_,idx)=>idx!==i)})} style={{background:'rgba(244,67,54,.2)',border:'none',borderRadius:'8px',color:'#f44336',padding:'0 14px',cursor:'pointer',fontSize:'16px',flexShrink:0,height:'42px'}}>✕</button>
                  </div>
                ))}
                <button onClick={()=>setPortfolioDraft({...portfolioDraft,tech:[...portfolioDraft.tech,'']})} className="btn-secondary" style={{padding:'6px 14px',fontSize:'10px'}}>+ Add Technology</button>
              </div>
              <div><label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Accent Color:</label><div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>{COLOR_OPTIONS.map(c=><div key={c} className={`color-swatch${portfolioDraft.color===c?' sel':''}`} style={{background:c}} onClick={()=>setPortfolioDraft({...portfolioDraft,color:c})}/>)}</div></div>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={savePortfolio} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowPortfolioModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── PARTNER MODAL (unchanged) ── */}
      {showPartnerModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowPartnerModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingPartner?'Edit Partner':'Add Partner'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Partner Name" value={partnerDraft.name} onChange={e=>setPartnerDraft({...partnerDraft,name:e.target.value})}/>
              <div style={{display:'grid',gridTemplateColumns:'80px 1fr',gap:'12px'}}>
                <select value={partnerDraft.logo} onChange={e=>setPartnerDraft({...partnerDraft,logo:e.target.value})} className="modal-input" style={{textAlign:'center',fontSize:'22px'}}>
                  {SERVICE_ICONS.map(icon=><option key={icon} value={icon}>{icon}</option>)}
                </select>
                <input className="modal-input" placeholder="Website URL" value={partnerDraft.url} onChange={e=>setPartnerDraft({...partnerDraft,url:e.target.value})}/>
              </div>
              <textarea className="modal-input" rows={3} placeholder="Description (shown on click)" value={partnerDraft.description} onChange={e=>setPartnerDraft({...partnerDraft,description:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={savePartner} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowPartnerModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── ANNOUNCEMENT MODAL (unchanged) ── */}
      {showAnnModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowAnnModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingAnn?'Edit Announcement':'Add Announcement'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Announcement text" value={annDraft.text} onChange={e=>setAnnDraft({...annDraft,text:e.target.value})}/>
              <label style={{display:'flex',alignItems:'center',gap:'10px',color:'rgba(255,255,255,.6)',fontSize:'13px',cursor:'pointer'}}>
                <input type="checkbox" checked={annDraft.active} onChange={e=>setAnnDraft({...annDraft,active:e.target.checked})}/> Active (visible to visitors)
              </label>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveAnn} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowAnnModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── LEGAL EDIT MODAL (unchanged) ── */}
      {showLegalModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowLegalModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>Edit {legalType==='privacy'?'Privacy Policy':legalType==='terms'?'Terms of Service':'Cookie Policy'}</h2>
            <textarea className="modal-input" rows={14} value={legalDraft[legalType]} onChange={e=>setLegalDraft({...legalDraft,[legalType]:e.target.value})} style={{fontFamily:'monospace',fontSize:'11px'}}/>
            <div style={{display:'flex',gap:'12px',marginTop:'16px'}}><button onClick={saveLegal} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowLegalModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
          </div>
        </div>
      )}

      {/* ── LEGAL VIEW MODAL (unchanged) ── */}
      {showLegalView&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowLegalView(null)}}>
          <div className="modal-box">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
              <h2 style={{color:'#D4A017',fontSize:'22px',fontWeight:800}}>{showLegalView==='privacy'?t.privacyPolicyFull:showLegalView==='terms'?t.terms:t.cookie}</h2>
              <button onClick={()=>setShowLegalView(null)} style={{background:'transparent',border:'none',color:'#fff',fontSize:'20px',cursor:'pointer'}}>✕</button>
            </div>
            <div style={{color:'rgba(255,255,255,.8)',fontSize:'13px',lineHeight:1.9,whiteSpace:'pre-wrap',maxHeight:'60vh',overflowY:'auto'}}>
              {legal[showLegalView].split('\n').map((line,i)=>(<p key={i} style={{marginBottom:'10px'}}>{line}</p>))}
            </div>
            <div style={{marginTop:'20px',textAlign:'right'}}><button onClick={()=>setShowLegalView(null)} className="btn-secondary" style={{padding:'8px 24px'}}>Close</button></div>
          </div>
        </div>
      )}

      {/* ── COMPANY DETAILS MODAL (unchanged) ── */}
      {showCompanyModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowCompanyModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>Edit Company Registration Details</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="CIN (Company Identification Number)" value={companyDraft.cin} onChange={e=>setCompanyDraft({...companyDraft,cin:e.target.value})}/>
              <input className="modal-input" placeholder="GST Number" value={companyDraft.gst} onChange={e=>setCompanyDraft({...companyDraft,gst:e.target.value})}/>
              <input className="modal-input" placeholder="MSME Registration Number" value={companyDraft.msme} onChange={e=>setCompanyDraft({...companyDraft,msme:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveCompany} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowCompanyModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── PILOT CRITERIA MODAL (unchanged) ── */}
      {showPilotModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowPilotModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>Edit Pilot Eligibility Criteria</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Title" value={pilotDraft.title} onChange={e=>setPilotDraft({...pilotDraft,title:e.target.value})}/>
              <textarea className="modal-input" rows={3} placeholder="Description" value={pilotDraft.description} onChange={e=>setPilotDraft({...pilotDraft,description:e.target.value})}/>
              <div>
                <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Eligibility Requirements:</label>
                {pilotDraft.eligibility.map((item,i)=>(
                  <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                    <input className="modal-input" value={item} onChange={e=>{const nl=[...pilotDraft.eligibility];nl[i]=e.target.value;setPilotDraft({...pilotDraft,eligibility:nl});}}/>
                    <button onClick={()=>setPilotDraft({...pilotDraft,eligibility:pilotDraft.eligibility.filter((_,idx)=>idx!==i)})} style={{background:'rgba(244,67,54,.2)',border:'none',borderRadius:'8px',color:'#f44336',padding:'0 14px',cursor:'pointer',fontSize:'16px',flexShrink:0,height:'42px'}}>✕</button>
                  </div>
                ))}
                <button onClick={()=>setPilotDraft({...pilotDraft,eligibility:[...pilotDraft.eligibility,'']})} className="btn-secondary" style={{padding:'6px 14px',fontSize:'10px'}}>+ Add Requirement</button>
              </div>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={savePilot} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowPilotModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── GA4 MODAL (unchanged) ── */}
      {showGaModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowGaModal(false)}}>
          <div className="admin-box">
            <h3 style={{color:'#fff',fontSize:'20px',fontWeight:800,marginBottom:'16px'}}>📊 Google Analytics 4</h3>
            <p style={{color:'rgba(255,255,255,.5)',fontSize:'12px',marginBottom:'16px'}}>Enter your GA4 Measurement ID. Analytics only loads after cookie consent.</p>
            <input className="modal-input" placeholder="Measurement ID (e.g., G-XXXXXXXXXX)" value={gaDraft} onChange={e=>setGaDraft(e.target.value)} style={{textAlign:'center',letterSpacing:'3px'}}/>
            <div style={{display:'flex',gap:'12px',marginTop:'20px'}}><button onClick={saveGa} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>SAVE</button><button onClick={()=>setShowGaModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
          </div>
        </div>
      )}

      {/* ── GALLERY MODAL (unchanged) ── */}
      {showGalleryModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowGalleryModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingGallery?'Edit Image':'Add Image to Gallery'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Image URL or paste base64" value={galleryDraft.url} onChange={e=>setGalleryDraft({...galleryDraft,url:e.target.value})}/>
              <div>
                <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Or upload file (max 5MB):</label>
                <input type="file" accept="image/*" onChange={async e=>{
                  if(!e.target.files?.[0]) return;
                  const file=e.target.files[0];
                  if(file.size>5*1024*1024){alert('File too large. Max 5MB.');return;}
                  const compressed=await compressImage(file);
                  setGalleryDraft(prev=>({...prev,url:compressed}));
                }} style={{color:'rgba(255,255,255,.6)',fontSize:'12px'}}/>
              </div>
              {galleryDraft.url&&<img src={galleryDraft.url} alt="Preview" style={{maxHeight:'150px',objectFit:'cover',borderRadius:'8px'}}/>}
              <input className="modal-input" placeholder="Image Title" value={galleryDraft.title} onChange={e=>setGalleryDraft({...galleryDraft,title:e.target.value})}/>
              <select className="modal-input" value={galleryDraft.category} onChange={e=>setGalleryDraft({...galleryDraft,category:e.target.value})}>
                {GALLERY_CATEGORIES.filter(c=>c!=='All').map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <input className="modal-input" type="date" value={galleryDraft.date} onChange={e=>setGalleryDraft({...galleryDraft,date:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveGallery} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowGalleryModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE GALLERY CONFIRM (unchanged) ── */}
      {delGalleryConfirm&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setDelGallery(null)}}>
          <div className="admin-box"><div style={{fontSize:'44px',marginBottom:'16px'}}>⚠️</div><h3 style={{color:'#fff',marginBottom:'12px'}}>Delete Image?</h3><p style={{color:'rgba(255,255,255,.4)',fontSize:'13px',marginBottom:'24px'}}>This cannot be undone.</p><div style={{display:'flex',gap:'12px'}}><button onClick={()=>deleteGallery(delGalleryConfirm)} style={{flex:1,padding:'12px',background:'#f44336',color:'#fff',border:'none',borderRadius:'12px',cursor:'pointer',fontWeight:700}}>DELETE</button><button onClick={()=>setDelGallery(null)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div></div>
        </div>
      )}

      {/* ── ACHIEVEMENT MODAL (unchanged) ── */}
      {showAchModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowAchModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingAch?'Edit Achievement':'Add Achievement'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div style={{display:'grid',gridTemplateColumns:'80px 1fr',gap:'12px'}}>
                <input className="modal-input" placeholder="Year" value={achDraft.year} onChange={e=>setAchDraft({...achDraft,year:e.target.value})} style={{textAlign:'center'}}/>
                <input className="modal-input" placeholder="Achievement Title *" value={achDraft.title} onChange={e=>setAchDraft({...achDraft,title:e.target.value})}/>
              </div>
              <textarea className="modal-input" rows={3} placeholder="Description" value={achDraft.description} onChange={e=>setAchDraft({...achDraft,description:e.target.value})}/>
              <div><label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Icon (emoji):</label>
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                  {['🏆','🎯','🌟','💡','🚀','⚡','🏅','🎖️','📜','🔒','🌐','🤝','🇮🇳','🛡️','🔬'].map(icon=>(
                    <button key={icon} className={`emoji-btn${achDraft.icon===icon?' sel':''}`} onClick={()=>setAchDraft({...achDraft,icon})}>{icon}</button>
                  ))}
                </div>
              </div>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveAch} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowAchModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE ACHIEVEMENT CONFIRM (unchanged) ── */}
      {delAchConfirm&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setDelAch(null)}}>
          <div className="admin-box"><div style={{fontSize:'44px',marginBottom:'16px'}}>⚠️</div><h3 style={{color:'#fff',marginBottom:'12px'}}>Delete Achievement?</h3><p style={{color:'rgba(255,255,255,.4)',fontSize:'13px',marginBottom:'24px'}}>This cannot be undone.</p><div style={{display:'flex',gap:'12px'}}><button onClick={()=>deleteAch(delAchConfirm)} style={{flex:1,padding:'12px',background:'#f44336',color:'#fff',border:'none',borderRadius:'12px',cursor:'pointer',fontWeight:700}}>DELETE</button><button onClick={()=>setDelAch(null)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div></div>
        </div>
      )}

      {/* ── COLLABORATION MODAL (unchanged) ── */}
      {showCollabModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowCollabModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>{editingCollab?'Edit Collaboration':'Add Collaboration'}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Organization Name" value={collabDraft.name} onChange={e=>setCollabDraft({...collabDraft,name:e.target.value})}/>
              <div style={{display:'grid',gridTemplateColumns:'80px 1fr',gap:'12px'}}>
                <input className="modal-input" placeholder="Logo emoji" value={collabDraft.logo} onChange={e=>setCollabDraft({...collabDraft,logo:e.target.value})} style={{textAlign:'center',fontSize:'24px'}}/>
                <input className="modal-input" placeholder="Website URL" value={collabDraft.url} onChange={e=>setCollabDraft({...collabDraft,url:e.target.value})}/>
              </div>
              <textarea className="modal-input" rows={2} placeholder="Short description" value={collabDraft.description} onChange={e=>setCollabDraft({...collabDraft,description:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveCollab} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowCollabModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE COLLABORATION CONFIRM (unchanged) ── */}
      {delCollabConfirm&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setDelCollab(null)}}>
          <div className="admin-box"><div style={{fontSize:'44px',marginBottom:'16px'}}>⚠️</div><h3 style={{color:'#fff',marginBottom:'12px'}}>Delete Collaboration?</h3><p style={{color:'rgba(255,255,255,.4)',fontSize:'13px',marginBottom:'24px'}}>This cannot be undone.</p><div style={{display:'flex',gap:'12px'}}><button onClick={()=>deleteCollab(delCollabConfirm)} style={{flex:1,padding:'12px',background:'#f44336',color:'#fff',border:'none',borderRadius:'12px',cursor:'pointer',fontWeight:700}}>DELETE</button><button onClick={()=>setDelCollab(null)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div></div>
        </div>
      )}

      {/* ── TICKER EDIT MODAL (unchanged) ── */}
      {showTickerModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowTickerModal(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>✏ Edit Ticker Items</h2>
            <p style={{color:'rgba(255,255,255,.5)',fontSize:'12px',marginBottom:'16px'}}>Edit the scrolling ticker items that appear below the hero section.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',maxHeight:'400px',overflowY:'auto'}}>
              {tickerDraft.map((item,i)=>(
                <div key={i} style={{display:'flex',gap:'8px'}}>
                  <input className="modal-input" value={item} onChange={e=>{const nt=[...tickerDraft];nt[i]=e.target.value;setTickerDraft(nt);}} placeholder={`Ticker item ${i+1}`}/>
                  <button onClick={()=>setTickerDraft(tickerDraft.filter((_,idx)=>idx!==i))} style={{background:'rgba(244,67,54,.2)',border:'none',borderRadius:'8px',color:'#f44336',padding:'0 14px',cursor:'pointer',fontSize:'16px',flexShrink:0,height:'42px'}}>✕</button>
                </div>
              ))}
            </div>
            <button onClick={()=>setTickerDraft([...tickerDraft,''])} className="btn-secondary" style={{padding:'6px 14px',fontSize:'10px',marginTop:'12px'}}>+ Add Item</button>
            <div style={{display:'flex',gap:'12px',marginTop:'16px'}}>
              <button onClick={()=>{setTickerItems(tickerDraft.filter(t=>t.trim()));setShowTickerModal(false);}} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button>
              <button onClick={()=>setShowTickerModal(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MEMBER BIO EDITOR (unchanged) ── */}
      {showMemberBioEditor&&isMember&&memberBioDraft&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowMemberBio(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'24px'}}>✏ Edit Your Profile</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Name" value={memberBioDraft.name} onChange={e=>setMemberBioDraft({...memberBioDraft,name:e.target.value})}/>
              <textarea className="modal-input" rows={4} placeholder="Bio / Description" value={memberBioDraft.desc} onChange={e=>setMemberBioDraft({...memberBioDraft,desc:e.target.value})}/>
              <input className="modal-input" placeholder="Location" value={memberBioDraft.location} onChange={e=>setMemberBioDraft({...memberBioDraft,location:e.target.value})}/>
              <input className="modal-input" placeholder="Photo URL" value={memberBioDraft.photo||''} onChange={e=>setMemberBioDraft({...memberBioDraft,photo:e.target.value})}/>
              <input className="modal-input" placeholder="LinkedIn URL" value={memberBioDraft.linkedin||''} onChange={e=>setMemberBioDraft({...memberBioDraft,linkedin:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={saveMemberBio} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>💾 SAVE</button><button onClick={()=>setShowMemberBio(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── MEMBER BLOG EDITOR (unchanged) ── */}
      {showMemberBlogEditor&&isMember&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowMemberBlog(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'8px'}}>✍️ Write a Blog Post</h2>
            <p style={{color:'rgba(255,255,255,.4)',fontSize:'12px',marginBottom:'24px'}}>Your post will be submitted for admin review before going live.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <input className="modal-input" placeholder="Post Title *" value={memberBlogDraft.title} onChange={e=>setMemberBlogDraft({...memberBlogDraft,title:e.target.value})}/>
              <textarea className="modal-input" rows={3} placeholder="Excerpt / Summary *" value={memberBlogDraft.excerpt} onChange={e=>setMemberBlogDraft({...memberBlogDraft,excerpt:e.target.value})}/>
              <input className="modal-input" placeholder="Featured Image URL (optional)" value={memberBlogDraft.featuredImage} onChange={e=>setMemberBlogDraft({...memberBlogDraft,featuredImage:e.target.value})}/>
              <textarea className="modal-input" rows={8} placeholder="Full article content..." value={memberBlogDraft.content} onChange={e=>setMemberBlogDraft({...memberBlogDraft,content:e.target.value})}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <input className="modal-input" placeholder="Read Time (e.g., 5 min)" value={memberBlogDraft.readTime} onChange={e=>setMemberBlogDraft({...memberBlogDraft,readTime:e.target.value})}/>
                <input className="modal-input" placeholder="Author Name" value={memberBlogDraft.author} onChange={e=>setMemberBlogDraft({...memberBlogDraft,author:e.target.value})}/>
              </div>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={submitMemberBlog} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>📤 SUBMIT FOR APPROVAL</button><button onClick={()=>setShowMemberBlog(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── MEMBER GALLERY UPLOAD (unchanged) ── */}
      {showMemberGallery&&isMember&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowMemberGallery(false)}}>
          <div className="modal-box">
            <h2 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'8px'}}>📸 Submit Gallery Image</h2>
            <p style={{color:'rgba(255,255,255,.4)',fontSize:'12px',marginBottom:'24px'}}>Your image will be reviewed by admin before being added to the gallery.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={{color:'rgba(255,255,255,.4)',fontSize:'11px',display:'block',marginBottom:'8px'}}>Upload Image (max 5MB):</label>
                <input type="file" accept="image/*" onChange={e=>e.target.files?.[0]&&handleMemberGalleryFile(e.target.files[0])} style={{color:'rgba(255,255,255,.6)',fontSize:'12px'}}/>
              </div>
              {uploadPreview&&<img src={uploadPreview} alt="Preview" style={{maxHeight:'150px',objectFit:'cover',borderRadius:'8px'}}/>}
              <div style={{textAlign:'center',color:'rgba(255,255,255,.3)',fontSize:'11px'}}>— OR —</div>
              <input className="modal-input" placeholder="Image URL" value={memberGalleryDraft.url} onChange={e=>setMemberGalleryDraft({...memberGalleryDraft,url:e.target.value})}/>
              <input className="modal-input" placeholder="Image Title *" value={memberGalleryDraft.title} onChange={e=>setMemberGalleryDraft({...memberGalleryDraft,title:e.target.value})}/>
              <select className="modal-input" value={memberGalleryDraft.category} onChange={e=>setMemberGalleryDraft({...memberGalleryDraft,category:e.target.value})}>
                {GALLERY_CATEGORIES.filter(c=>c!=='All').map(c=><option key={c} value={c}>{c}</option>)}
              </select>
              <input className="modal-input" type="date" value={memberGalleryDraft.date} onChange={e=>setMemberGalleryDraft({...memberGalleryDraft,date:e.target.value})}/>
              <div style={{display:'flex',gap:'12px',marginTop:'8px'}}><button onClick={submitMemberGallery} className="btn-primary" style={{flex:1,padding:'12px',animation:'none',justifyContent:'center'}}>📤 SUBMIT FOR APPROVAL</button><button onClick={()=>setShowMemberGallery(false)} className="btn-secondary" style={{flex:1,padding:'12px',justifyContent:'center'}}>CANCEL</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADMIN BOTTOM TOOLBAR (unchanged) ── */}
      {isAdmin&&(
        <div style={{position:'fixed',bottom:'20px',left:'50%',transform:'translateX(-50%)',zIndex:9999,background:'rgba(0,0,0,.88)',backdropFilter:'blur(16px)',border:'1px solid rgba(212,160,23,.25)',padding:'8px 20px',borderRadius:'50px',display:'flex',gap:'10px',fontSize:'10px',fontFamily:"'Space Mono',monospace",flexWrap:'wrap',justifyContent:'center'}}>
          <button onClick={openEditGa} style={{background:'none',border:'none',color:'#D4A017',cursor:'pointer',padding:'2px 4px'}}>📊 GA4</button>
          <span style={{color:'rgba(255,255,255,.15)'}}>|</span>
          <button onClick={openAddAnn} style={{background:'none',border:'none',color:'#D4A017',cursor:'pointer',padding:'2px 4px'}}>📢 +Ann</button>
          <button onClick={()=>setShowAnnModal(true)} style={{background:'none',border:'none',color:'#D4A017',cursor:'pointer',padding:'2px 4px'}}>✏ Announcements</button>
          <span style={{color:'rgba(255,255,255,.15)'}}>|</span>
          <button onClick={()=>setShowCookieLogs(true)} style={{background:'none',border:'none',color:'#D4A017',cursor:'pointer',padding:'2px 4px'}}>🍪 Cookie Logs</button>
          <span style={{color:'rgba(255,255,255,.15)'}}>|</span>
          <button onClick={()=>setShowPending(true)} style={{background:'none',border:'none',color:pendingQueue.length>0?'#f44336':'#D4A017',cursor:'pointer',padding:'2px 4px'}}>📋 Pending ({pendingQueue.length})</button>
          <span style={{color:'rgba(255,255,255,.15)'}}>|</span>
          <button onClick={()=>setShowDashboard(true)} style={{background:'none',border:'none',color:'#D4A017',cursor:'pointer',padding:'2px 4px'}}>📊 Dashboard</button>
        </div>
      )}

      {/* After the ticker section */}
      <ROICalculator />
      <ServiceQuiz />
      <TechStackShowcase isAdmin={isAdmin} isMember={isMember} />
      <EventsSection isAdmin={isAdmin} />
      <CaseStudyDownload isAdmin={isAdmin} />
      <ProposalGenerator isAdmin={isAdmin} />
      <ReferralSystem isAdmin={isAdmin} />
      <SocialProof />
      <ExitIntent contactEmail="contact@togetherprosperity.com" whatsapp="919845618859" />
      <AIChatbot />
      <LiveVisitorCounter />
      <WhatsAppBubble />

    </main>
   
  );
}