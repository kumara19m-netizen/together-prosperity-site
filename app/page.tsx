'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const ORBIT_DOTS = [0,60,120,180,240,300].map((deg,i)=>({
  top:`${parseFloat((50-47*Math.cos(deg*Math.PI/180)).toFixed(4))}%`,
  left:`${parseFloat((50+47*Math.sin(deg*Math.PI/180)).toFixed(4))}%`,
  size:i%2===0?'10px':'6px',
  color:i%3===0?'#D4A017':i%3===1?'#2196F3':'#2ECC40',
  duration:`${3+i*0.3}s`,delay:`${i*0.2}s`,
}));

const ADMIN_PASSWORD='tp2026admin';

interface TeamMember{
  id:string;name:string;role:string;tag:string;location:string;
  color:string;initial:string;desc:string;emoji:string;
}

const COLOR_OPTIONS=['#D4A017','#2196F3','#2ECC40','#F5A623','#E91E63','#9C27B0','#FF5722','#00BCD4','#FF6B6B','#4ECDC4'];
const EMOJI_OPTIONS=['🚀','💡','🔥','⚡','🎯','🛡️','🌐','🤖','🔗','💎','🏆','🌟','⚙️','📊','🎨'];

const INITIAL_TEAM:TeamMember[]=[
  {id:'1',name:'Madhu Vamshi K R',role:'Founder & CEO',tag:'FOUNDER',location:'Malur, Kolar · Karnataka',color:'#D4A017',initial:'M',emoji:'🚀',desc:"Visionary entrepreneur architecting blockchain and AI solutions for India's digital transformation. Passionate about making cutting-edge tech accessible to every institution."},
  {id:'2',name:'Junaid Khan',role:'Co-Founder & CTO',tag:'CO-FOUNDER',location:'Bangalore South · Karnataka',color:'#2196F3',initial:'J',emoji:'🛡️',desc:'Technology strategist and cybersecurity expert building zero-trust architectures and IoT ecosystems that protect critical infrastructure at national scale.'},
  {id:'3',name:'Kumara Swamy M',role:'Director & COO',tag:'DIRECTOR',location:'Karnataka, India',color:'#2ECC40',initial:'K',emoji:'🎯',desc:"Strategic operations leader overseeing governance, business development, and enterprise partnerships. Drives Together Prosperity's expansion across India and beyond."},
];

export default function Home(){
  const [formData,setFormData]=useState({name:'',email:'',phone:'',company:'',service:'',message:''});
  const [submitted,setSubmitted]=useState(false);
  const [sending,setSending]=useState(false);
  const [scrollY,setScrollY]=useState(0);
  const [team,setTeam]=useState<TeamMember[]>(INITIAL_TEAM);
  const [showModal,setShowModal]=useState(false);
  const [editingMember,setEditingMember]=useState<TeamMember|null>(null);
  const [draft,setDraft]=useState({name:'',role:'',tag:'',location:'',color:'#D4A017',initial:'',desc:'',emoji:'🚀'});
  const [deleteConfirm,setDeleteConfirm]=useState<string|null>(null);
  const [activeSection,setActiveSection]=useState('home');
  const [countersVisible,setCountersVisible]=useState(false);
  const [typedText,setTypedText]=useState('');
  const [phraseIdx,setPhraseIdx]=useState(0);
  const [charIdx,setCharIdx]=useState(0);
  const [deleting,setDeleting]=useState(false);
  const [isAdmin,setIsAdmin]=useState(false);
  const [showAdminLogin,setShowAdminLogin]=useState(false);
  const [adminPwInput,setAdminPwInput]=useState('');
  const [adminError,setAdminError]=useState(false);
  const [showAdminBadge,setShowAdminBadge]=useState(false);
  const [mousePos,setMousePos]=useState({x:0,y:0});
  const [heroVisible,setHeroVisible]=useState(false);
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const statsRef=useRef<HTMLDivElement>(null);
  const typingPhrases=['Blockchain Infrastructure','AI & ML Solutions','Cybersecurity Platforms','Gov-tech Systems','IoT Ecosystems','Smart Contracts'];

  useEffect(()=>{setTimeout(()=>setHeroVisible(true),100);},[]);

  useEffect(()=>{
    const phrase=typingPhrases[phraseIdx];
    const timer=setTimeout(()=>{
      if(!deleting&&charIdx<phrase.length){setTypedText(phrase.slice(0,charIdx+1));setCharIdx(c=>c+1);}
      else if(!deleting&&charIdx===phrase.length){setTimeout(()=>setDeleting(true),2000);}
      else if(deleting&&charIdx>0){setTypedText(phrase.slice(0,charIdx-1));setCharIdx(c=>c-1);}
      else{setDeleting(false);setPhraseIdx(p=>(p+1)%typingPhrases.length);}
    },deleting?35:75);
    return()=>clearTimeout(timer);
  },[charIdx,deleting,phraseIdx]);

  useEffect(()=>{
    const h=()=>{
      setScrollY(window.scrollY);
      setMousePos({x:0,y:0});
      ['home','about','services','process','team','faq','contact'].forEach(s=>{
        const el=document.getElementById(s);
        if(el&&el.getBoundingClientRect().top<=130)setActiveSection(s);
      });
    };
    const m=(e:MouseEvent)=>setMousePos({x:e.clientX,y:e.clientY});
    window.addEventListener('scroll',h);
    window.addEventListener('mousemove',m);
    return()=>{window.removeEventListener('scroll',h);window.removeEventListener('mousemove',m);};
  },[]);

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setCountersVisible(true);},{threshold:.3});
    if(statsRef.current)obs.observe(statsRef.current);
    return()=>obs.disconnect();
  },[]);

  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext('2d');if(!ctx)return;
    canvas.width=window.innerWidth;canvas.height=window.innerHeight;
    type P={x:number;y:number;vx:number;vy:number;size:number;color:string;alpha:number;};
    const pts:P[]=[];
    const cols=['#D4A017','#F5A623','#2196F3','#2ECC40','#ffffff'];
    for(let i=0;i<100;i++)pts.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,size:Math.random()*2+.5,color:cols[Math.floor(Math.random()*cols.length)],alpha:Math.random()*.45+.08});
    let aid:number;
    const draw=()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach((p,i)=>{
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;
        if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0;
        ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fillStyle=p.color;ctx.globalAlpha=p.alpha;ctx.fill();
        pts.slice(i+1).forEach(q=>{const d=Math.sqrt((p.x-q.x)**2+(p.y-q.y)**2);if(d<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='#D4A017';ctx.globalAlpha=(1-d/120)*.055;ctx.lineWidth=.4;ctx.stroke();}});
        ctx.globalAlpha=1;
      });
      aid=requestAnimationFrame(draw);
    };
    draw();
    const resize=()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;};
    window.addEventListener('resize',resize);
    return()=>{cancelAnimationFrame(aid);window.removeEventListener('resize',resize);};
  },[]);

  // REPLACED handleSubmit FUNCTION
  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();setSending(true);
    try{
      const res=await fetch('https://formsubmit.co/ajax/togetherprosperity4545@gmail.com',{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({
          name:formData.name,
          email:formData.email,
          phone:formData.phone||'Not provided',
          company:formData.company||'Not provided',
          service:formData.service,
          message:formData.message,
          _subject:`🚀 New Demo Request from ${formData.name} — Together Prosperity`,
          _template:'table',
          _captcha:'false',
          _replyto:formData.email,
        })
      });
      const data=await res.json();
      if(data.success==='true'||data.success===true||res.ok){
        setSubmitted(true);
        const waMsg=encodeURIComponent(
          `📩 NEW ENQUIRY - Together Prosperity\n\n`+
          `👤 Name: ${formData.name}\n`+
          `📧 Email: ${formData.email}\n`+
          `📞 Phone: ${formData.phone||'Not provided'}\n`+
          `🏢 Organization: ${formData.company||'Not provided'}\n`+
          `⚙️ Service: ${formData.service}\n`+
          `💬 Message: ${formData.message}`
        );
        window.open(`https://wa.me/919845618859?text=${waMsg}`,'_blank');
      } else {
        alert('Something went wrong. Please WhatsApp us directly.');
      }
    }catch{
      alert('Something went wrong. Please WhatsApp us directly.');
    }
    setSending(false);
  };

  const handleAdminLogin=()=>{
    if(adminPwInput===ADMIN_PASSWORD){setIsAdmin(true);setShowAdminLogin(false);setAdminPwInput('');setAdminError(false);setShowAdminBadge(true);setTimeout(()=>setShowAdminBadge(false),3500);}
    else{setAdminError(true);}
  };

  const openAdd=()=>{if(!isAdmin)return;setEditingMember(null);setDraft({name:'',role:'',tag:'',location:'',color:'#D4A017',initial:'',desc:'',emoji:'🚀'});setShowModal(true);};
  const openEdit=(m:TeamMember)=>{if(!isAdmin)return;setEditingMember(m);setDraft({name:m.name,role:m.role,tag:m.tag,location:m.location,color:m.color,initial:m.initial,desc:m.desc,emoji:m.emoji});setShowModal(true);};
  const saveMember=()=>{
    if(!draft.name.trim()||!draft.role.trim())return;
    const autoInitial=draft.initial.trim()||draft.name.trim()[0].toUpperCase();
    const autoTag=draft.tag.trim()||draft.role.trim().toUpperCase();
    if(editingMember){setTeam(t=>t.map(m=>m.id===editingMember.id?{...m,...draft,initial:autoInitial,tag:autoTag}:m));}
    else{setTeam(t=>[...t,{id:crypto.randomUUID(),...draft,initial:autoInitial,tag:autoTag}]);}
    setShowModal(false);
  };
  const deleteMember=(id:string)=>{setTeam(t=>t.filter(m=>m.id!==id));setDeleteConfirm(null);};

  const navLinks=[{name:'Home',href:'#home'},{name:'About',href:'#about'},{name:'Services',href:'#services'},{name:'Process',href:'#process'},{name:'Team',href:'#team'},{name:'FAQ',href:'#faq'},{name:'Contact',href:'#contact'}];

  return(
    <main style={{background:'#020205',color:'#fff',fontFamily:"'Sora','Segoe UI',sans-serif",overflowX:'hidden'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:2px}::-webkit-scrollbar-track{background:#020205}::-webkit-scrollbar-thumb{background:linear-gradient(#D4A017,#2196F3);border-radius:2px}

        @keyframes fadeUp{from{opacity:0;transform:translateY(70px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}33%{transform:translateY(-16px) rotate(2deg)}66%{transform:translateY(-8px) rotate(-1deg)}}
        @keyframes logoFloat{
          0%,100%{transform:translateY(0) scale(1);filter:drop-shadow(0 0 35px rgba(212,160,23,.9)) drop-shadow(0 0 70px rgba(212,160,23,.45)) drop-shadow(0 0 120px rgba(33,150,243,.25));}
          50%{transform:translateY(-22px) scale(1.03);filter:drop-shadow(0 0 60px rgba(212,160,23,1)) drop-shadow(0 0 120px rgba(212,160,23,.7)) drop-shadow(0 0 200px rgba(33,150,243,.5));}
        }
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes borderGlow{0%,100%{box-shadow:0 0 30px rgba(212,160,23,.12),0 0 80px rgba(212,160,23,.04)}50%{box-shadow:0 0 60px rgba(212,160,23,.55),0 0 150px rgba(212,160,23,.18)}}
        @keyframes ringRotate{to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes ringRotateRev{to{transform:translate(-50%,-50%) rotate(-360deg)}}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes pulseRing{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.35}50%{transform:translate(-50%,-50%) scale(1.08);opacity:.85}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(212,160,23,.4)}50%{box-shadow:0 0 0 18px rgba(212,160,23,0)}}
        @keyframes modalIn{from{opacity:0;transform:scale(.88) translateY(30px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes overlayIn{from{opacity:0}to{opacity:1}}
        @keyframes scanLine{0%{top:-100%}100%{top:200%}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes countUp{from{opacity:0;transform:scale(.3) translateY(24px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes cardReveal{from{opacity:0;transform:translateY(50px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes gradientFlow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes adminBadgeSlide{0%{opacity:0;transform:translateY(-20px)}20%,80%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-20px)}}
        @keyframes lockShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-7px)}40%,80%{transform:translateX(7px)}}
        @keyframes heroGradient{0%,100%{opacity:.6}50%{opacity:1}}
        @keyframes orbitDot{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.6);opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

        .nav-link{color:rgba(255,255,255,.28)!important;text-decoration:none;font-size:10px;letter-spacing:2.5px;font-weight:700;transition:all .3s;position:relative;font-family:'Space Mono',monospace;padding:4px 0}
        .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1.5px;background:linear-gradient(90deg,#D4A017,#F5A623);transition:width .35s;border-radius:1px}
        .nav-link:hover,.nav-link.active{color:#D4A017!important}.nav-link:hover::after,.nav-link.active::after{width:100%}

        .btn-primary{background:linear-gradient(135deg,#D4A017 0%,#F5A623 50%,#D4A017 100%);background-size:200% auto;color:#000!important;border:none;padding:15px 38px;border-radius:50px;font-weight:800;font-size:10.5px;letter-spacing:3px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .4s;cursor:pointer;animation:glowPulse 3.5s infinite;font-family:'Sora',sans-serif;white-space:nowrap}
        .btn-primary:hover{background-position:right center;transform:translateY(-4px) scale(1.05);box-shadow:0 24px 70px rgba(212,160,23,.55)}
        .btn-secondary{background:transparent;border:1px solid rgba(212,160,23,.3);color:rgba(212,160,23,.85)!important;padding:15px 38px;border-radius:50px;font-weight:600;font-size:10.5px;letter-spacing:3px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .4s;backdrop-filter:blur(10px);white-space:nowrap}
        .btn-secondary:hover{background:rgba(212,160,23,.06);border-color:#D4A017;transform:translateY(-4px) scale(1.05);box-shadow:0 0 50px rgba(212,160,23,.18)}

        .glass{background:rgba(255,255,255,.022);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.06);border-radius:20px;transition:all .4s cubic-bezier(.23,1,.32,1)}
        .glass:hover{border-color:rgba(212,160,23,.3);background:rgba(255,255,255,.038);transform:translateY(-8px);box-shadow:0 32px 80px rgba(0,0,0,.45)}

        .service-card{background:rgba(255,255,255,.016);border:1px solid rgba(255,255,255,.05);border-radius:22px;padding:38px 32px;transition:all .45s cubic-bezier(.23,1,.32,1);cursor:pointer;position:relative;overflow:hidden}
        .service-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at top left,var(--cg,rgba(212,160,23,.06)) 0%,transparent 65%);opacity:0;transition:opacity .4s}
        .service-card::after{content:'';position:absolute;top:-100%;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--cc,#D4A017),transparent);transition:all .3s}
        .service-card:hover{transform:translateY(-16px);border-color:var(--cc,#D4A017);box-shadow:0 50px 100px rgba(0,0,0,.7),0 0 80px var(--cs,rgba(212,160,23,.1));background:rgba(255,255,255,.032)}
        .service-card:hover::before{opacity:1}.service-card:hover::after{top:200%;transition:top 2.5s linear}

        .stat-card{background:rgba(255,255,255,.016);border:1px solid rgba(255,255,255,.042);border-radius:18px;padding:32px 14px;text-align:center;transition:all .38s;position:relative;overflow:hidden;cursor:default}
        .stat-card::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:0;height:2px;background:var(--sc,#D4A017);transition:width .45s;border-radius:2px}
        .stat-card:hover{border-color:var(--sc,#D4A017);transform:translateY(-10px);background:rgba(255,255,255,.032)}.stat-card:hover::after{width:70%}

        .team-card{background:rgba(255,255,255,.016);border:1px solid rgba(255,255,255,.05);border-radius:24px;padding:44px 32px;text-align:center;transition:all .5s cubic-bezier(.23,1,.32,1);position:relative;overflow:hidden}
        .team-card:hover{transform:translateY(-16px);box-shadow:0 60px 120px rgba(0,0,0,.6)}
        .team-scan{position:absolute;top:-100%;left:0;width:100%;height:50%;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.015),transparent);pointer-events:none}
        .team-card:hover .team-scan{animation:scanLine 2.8s ease-in-out}

        .process-card{background:rgba(255,255,255,.016);border:1px solid rgba(255,255,255,.05);border-radius:22px;padding:40px 28px;text-align:center;transition:all .42s;position:relative;overflow:hidden}
        .process-card:hover{border-color:rgba(212,160,23,.4);transform:translateY(-14px);box-shadow:0 40px 90px rgba(0,0,0,.55)}

        .faq-item{background:rgba(255,255,255,.016);border:1px solid rgba(255,255,255,.05);border-radius:17px;padding:28px 32px;transition:all .32s;cursor:default}
        .faq-item:hover{border-color:rgba(212,160,23,.24);background:rgba(212,160,23,.02);transform:translateX(6px)}

        .form-input{width:100%;background:rgba(255,255,255,.028);border:1px solid rgba(255,255,255,.07);border-radius:13px;padding:14px 18px;color:#fff;font-size:13px;font-family:'Sora',sans-serif;outline:none;transition:all .3s;box-sizing:border-box}
        .form-input:focus{border-color:#D4A017;background:rgba(212,160,23,.04);box-shadow:0 0 0 4px rgba(212,160,23,.08)}
        .form-input::placeholder{color:rgba(255,255,255,.16)}

        .modal-input{width:100%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:11px;padding:12px 15px;color:#fff;font-size:13px;font-family:'Sora',sans-serif;outline:none;transition:all .3s;box-sizing:border-box}
        .modal-input:focus{border-color:#D4A017;box-shadow:0 0 0 3px rgba(212,160,23,.12)}
        .modal-input::placeholder{color:rgba(255,255,255,.16)}

        .tag-chip{background:rgba(212,160,23,.07);border:1px solid rgba(212,160,23,.18);color:rgba(212,160,23,.7);padding:5px 17px;border-radius:50px;font-size:9px;letter-spacing:4px;font-weight:700;display:inline-block;transition:all .3s;font-family:'Space Mono',monospace}
        .tag-chip:hover{background:rgba(212,160,23,.14);color:#D4A017;border-color:rgba(212,160,23,.5);transform:translateY(-3px)}

        .logo-ring-1{position:absolute;width:290px;height:290px;border:1.5px solid rgba(212,160,23,.28);border-top-color:rgba(212,160,23,.95);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);animation:ringRotate 7s linear infinite}
        .logo-ring-2{position:absolute;width:360px;height:360px;border:1px dashed rgba(33,150,243,.2);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);animation:ringRotateRev 14s linear infinite}
        .logo-ring-3{position:absolute;width:230px;height:230px;border:1px solid rgba(46,204,64,.15);border-bottom-color:rgba(46,204,64,.9);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);animation:ringRotate 11s linear infinite reverse}
        .logo-ring-4{position:absolute;width:420px;height:420px;border:.5px solid rgba(212,160,23,.07);border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);animation:ringRotateRev 20s linear infinite}

        .ticker-wrap{overflow:hidden;background:rgba(212,160,23,.025);border-top:1px solid rgba(212,160,23,.09);border-bottom:1px solid rgba(212,160,23,.09);padding:13px 0}
        .ticker-content{display:flex;white-space:nowrap;animation:ticker 40s linear infinite}
        .ticker-item{padding:0 55px;color:rgba(212,160,23,.55);font-size:8.5px;letter-spacing:4.5px;font-weight:700;font-family:'Space Mono',monospace}

        .section-tag{font-family:'Space Mono',monospace;color:rgba(212,160,23,.6);font-size:8.5px;letter-spacing:7px;margin-bottom:16px;display:block;font-weight:700;text-transform:uppercase}
        .gold-text{background:linear-gradient(135deg,#9A6E00,#D4A017,#F5C842,#F5A623,#D4A017,#9A6E00);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
        .blue-text{background:linear-gradient(135deg,#0D47A1,#2196F3,#82B1FF,#2196F3);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 5s linear infinite}
        .green-text{background:linear-gradient(135deg,#1B5E20,#2ECC40,#69F0AE,#2ECC40);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 6s linear infinite}

        .gradient-border{position:relative;border-radius:20px;padding:1px;background:linear-gradient(135deg,rgba(212,160,23,.45),rgba(33,150,243,.35),rgba(46,204,64,.3),rgba(212,160,23,.45));background-size:300% 300%;animation:gradientFlow 4s ease infinite}
        .gradient-border-inner{background:#060610;border-radius:19px;padding:36px 28px;height:100%}

        .add-card{background:rgba(212,160,23,.025);border:2px dashed rgba(212,160,23,.22);border-radius:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;cursor:pointer;transition:all .4s;min-height:340px;width:100%}
        .add-card:hover{background:rgba(212,160,23,.07);border-color:#D4A017;transform:translateY(-10px);box-shadow:0 30px 70px rgba(0,0,0,.45)}

        .action-btn{border:none;background:transparent;cursor:pointer;padding:6px 14px;border-radius:8px;font-size:9.5px;font-weight:700;letter-spacing:1.5px;transition:all .2s;font-family:'Space Mono',monospace}
        .edit-btn{color:#D4A017;border:1px solid rgba(212,160,23,.2)}.edit-btn:hover{background:rgba(212,160,23,.12);border-color:#D4A017}
        .del-btn{color:#f44336;border:1px solid rgba(244,67,54,.18)}.del-btn:hover{background:rgba(244,67,54,.1);border-color:#f44336}

        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.92);backdrop-filter:blur(28px);z-index:10000;display:flex;align-items:center;justify-content:center;padding:20px;animation:overlayIn .22s ease}
        .modal-box{background:#050510;border:1px solid rgba(212,160,23,.2);border-radius:28px;padding:44px;width:100%;max-width:600px;max-height:92vh;overflow-y:auto;animation:modalIn .32s cubic-bezier(.23,1,.32,1)}
        .modal-box::-webkit-scrollbar{width:2px}.modal-box::-webkit-scrollbar-thumb{background:#D4A017}

        .admin-box{background:#050510;border:1px solid rgba(212,160,23,.28);border-radius:24px;padding:44px;width:100%;max-width:420px;animation:modalIn .3s cubic-bezier(.23,1,.32,1);text-align:center}
        .admin-pw{width:100%;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px 18px;color:#fff;font-size:15px;font-family:'Space Mono',monospace;outline:none;text-align:center;letter-spacing:5px;transition:all .3s}
        .admin-pw:focus{border-color:#D4A017;box-shadow:0 0 0 3px rgba(212,160,23,.14)}
        .admin-pw.err{border-color:#f44336;animation:lockShake .4s ease}

        .color-swatch{width:30px;height:30px;border-radius:50%;border:3px solid transparent;cursor:pointer;transition:all .22s}.color-swatch:hover{transform:scale(1.28)}.color-swatch.sel{border-color:#fff;box-shadow:0 0 0 2px rgba(255,255,255,.3)}
        .emoji-btn{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;width:42px;height:42px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:20px;transition:all .2s}
        .emoji-btn:hover,.emoji-btn.sel{background:rgba(212,160,23,.1);border-color:rgba(212,160,23,.4);transform:scale(1.18)}

        .social-pill{transition:all .3s!important}.social-pill:hover{transform:translateY(-5px) scale(1.08)!important;box-shadow:0 14px 35px rgba(0,0,0,.45)!important}
        .sector-card{background:rgba(255,255,255,.016);border:1px solid rgba(255,255,255,.042);border-radius:16px;padding:26px 12px;text-align:center;transition:all .38s}
        .sector-card:hover{border-color:rgba(212,160,23,.45);background:rgba(212,160,23,.04);transform:translateY(-10px);box-shadow:0 26px 55px rgba(0,0,0,.45)}
        .cursor-blink{display:inline-block;width:2px;height:1.1em;background:#D4A017;margin-left:3px;vertical-align:text-bottom;animation:blink 1s infinite}
        .noise{position:fixed;inset:0;opacity:.018;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none;z-index:9999}
        .admin-toast{position:fixed;top:80px;left:50%;transform:translateX(-50%);z-index:9998;background:rgba(5,5,16,.97);border:1px solid rgba(212,160,23,.55);border-radius:50px;padding:11px 26px;display:flex;align-items:center;gap:10px;font-family:'Space Mono',monospace;font-size:10.5px;color:#D4A017;letter-spacing:2px;animation:adminBadgeSlide 3.5s ease forwards;box-shadow:0 10px 50px rgba(212,160,23,.25)}
        .lock-btn{background:rgba(255,255,255,.022);border:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.24);padding:7px 17px;border-radius:50px;font-size:9px;letter-spacing:2.5px;font-family:'Space Mono',monospace;cursor:pointer;transition:all .3s}
        .lock-btn:hover{border-color:rgba(212,160,23,.38);color:#D4A017;background:rgba(212,160,23,.055)}
        .admin-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(212,160,23,.08);border:1px solid rgba(212,160,23,.32);color:#D4A017;padding:6px 16px;border-radius:50px;font-size:9px;letter-spacing:2.5px;font-weight:700;font-family:'Space Mono',monospace;cursor:pointer;transition:all .3s}
        .admin-badge:hover{background:rgba(244,67,54,.08);border-color:rgba(244,67,54,.35);color:#f44336}
        .gradient-hr{height:1px;background:linear-gradient(90deg,transparent,rgba(212,160,23,.4),rgba(33,150,243,.3),transparent);border:none;margin:0}

        /* Hero floating elements */
        .hero-stat{background:rgba(255,255,255,.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:14px 20px;display:flex;align-items:center;gap:12px;animation:float 4s ease-in-out infinite}
        .hero-stat:hover{border-color:rgba(212,160,23,.3);transform:translateY(-4px)}
        .contact-block{background:rgba(255,255,255,.016);border:1px solid rgba(255,255,255,.048);border-radius:19px;padding:28px 32px;margin-bottom:14px;transition:all .32s}
        .contact-block:hover{border-color:rgba(212,160,23,.26);background:rgba(255,255,255,.032);transform:translateX(5px)}

        .glow-line{height:1px;background:linear-gradient(90deg,transparent,rgba(212,160,23,.6) 20%,rgba(33,150,243,.5) 50%,rgba(46,204,64,.4) 80%,transparent);border:none;margin:0;animation:shimmer 4s linear infinite;background-size:200% auto}

        /* ADDED RESPONSIVE STYLES */
        @media(max-width:768px){
          nav{padding:0 18px!important;height:60px!important}
          nav div:nth-child(2){display:none!important}
          nav div:nth-child(3) a.btn-primary{padding:7px 14px!important;font-size:8px!important}
          section,footer{padding-left:20px!important;padding-right:20px!important}
          #home{padding-top:100px!important;padding-bottom:60px!important}
          #home div[style*="280px"]{width:180px!important;height:180px!important}
          .logo-ring-1{width:190px!important;height:190px!important}
          .logo-ring-2{width:230px!important;height:230px!important}
          .logo-ring-3{width:150px!important;height:150px!important}
          .logo-ring-4{width:270px!important;height:270px!important}
          h1[style*="82px"]{font-size:42px!important}
          h1[style*="60px"]{font-size:30px!important}
          div[style*="gridTemplateColumns"]{grid-template-columns:1fr!important}
          div[style*="1fr 1.6fr"]{grid-template-columns:1fr!important}
          div[style*="1fr 1fr"]{grid-template-columns:1fr!important}
          div[style*="repeat(auto-fit,minmax(350px"]{grid-template-columns:1fr!important}
          div[style*="repeat(auto-fit,minmax(240px"]{grid-template-columns:1fr 1fr!important}
          div[style*="repeat(auto-fit,minmax(210px"]{grid-template-columns:1fr 1fr!important}
          div[style*="repeat(auto-fit,minmax(200px"]{grid-template-columns:1fr 1fr!important}
          div[style*="repeat(auto-fit,minmax(138px"]{grid-template-columns:repeat(4,1fr)!important}
          div[style*="repeat(auto-fill,minmax(300px"]{grid-template-columns:1fr!important}
          .modal-box{padding:24px!important;margin:10px!important}
          .admin-box{padding:28px!important;margin:10px!important}
          div[style*="gap:'32px'"]{gap:16px!important}
          div[style*="50px"]{padding:28px 20px!important}
          h2[style*="56px"]{font-size:clamp(24px,6vw,36px)!important}
          .hero-stat{padding:10px 14px!important}
          .ticker-item{padding:0 28px!important}
          div[style*="260px"]{width:200px!important}
        }
        @media(max-width:480px){
          div[style*="repeat(auto-fit,minmax(138px"]{grid-template-columns:repeat(2,1fr)!important}
          div[style*="repeat(auto-fit,minmax(240px"]{grid-template-columns:1fr!important}
          div[style*="repeat(auto-fit,minmax(210px"]{grid-template-columns:1fr!important}
          .hero-stat{display:none!important}
          div[style*="gap:'10px'"]{gap:6px!important}
        }
      `}</style>

      <div className="noise"/>
      <canvas ref={canvasRef} style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:.5}}/>

      {/* Cursor glow */}
      <div style={{position:'fixed',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(212,160,23,.04) 0%,transparent 70%)',left:mousePos.x-200,top:mousePos.y-200,pointerEvents:'none',zIndex:1,transition:'left .1s,top .1s',mixBlendMode:'screen'}}/>

      {showAdminBadge&&<div className="admin-toast">🔐 Admin mode activated — team management unlocked</div>}

      {/* ══ NAVBAR ══ */}
      <nav style={{position:'fixed',top:0,width:'100%',zIndex:1000,background:scrollY>80?'rgba(2,2,8,.98)':'rgba(2,2,8,.4)',borderBottom:`1px solid ${scrollY>80?'rgba(212,160,23,.12)':'rgba(255,255,255,.028)'}`,padding:'0 60px',display:'flex',alignItems:'center',justifyContent:'space-between',backdropFilter:'blur(40px)',height:'70px',transition:'all .5s'}}>
        <div style={{display:'flex',alignItems:'center',gap:'13px'}}>
          <div style={{position:'relative'}}>
            <div style={{position:'absolute',inset:'-4px',borderRadius:'50%',background:'radial-gradient(circle,rgba(212,160,23,.18) 0%,transparent 70%)',animation:'heroGradient 3s ease-in-out infinite'}}/>
            <Image src="/logo.png" alt="Together Prosperity" width={42} height={42} style={{objectFit:'contain',mixBlendMode:'screen',filter:'drop-shadow(0 0 16px rgba(212,160,23,.95)) drop-shadow(0 0 32px rgba(212,160,23,.55))',background:'transparent',position:'relative',zIndex:1}}/>
          </div>
          <div>
            <div style={{fontFamily:"'Space Mono',monospace",color:'#D4A017',fontWeight:700,fontSize:'10.5px',letterSpacing:'4px',lineHeight:1}}>TOGETHER</div>
            <div style={{fontFamily:"'Space Mono',monospace",color:'#2196F3',fontWeight:400,fontSize:'7px',letterSpacing:'5.5px',marginTop:'3px'}}>PROSPERITY</div>
          </div>
        </div>
        <div style={{display:'flex',gap:'32px',alignItems:'center'}}>
          {navLinks.map(l=><a key={l.name} href={l.href} className={`nav-link${activeSection===l.name.toLowerCase()?' active':''}`}>{l.name}</a>)}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          {isAdmin
            ?<button onClick={()=>setIsAdmin(false)} className="admin-badge">🔐 ADMIN · LOGOUT</button>
            :<button onClick={()=>setShowAdminLogin(true)} className="lock-btn">🔐 ADMIN</button>
          }
          <a href="#contact" className="btn-primary" style={{padding:'9px 22px',fontSize:'9px',letterSpacing:'2.5px',animation:'none'}}>BOOK DEMO</a>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section id="home" style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'130px 24px 80px',position:'relative',overflow:'hidden',zIndex:1}}>

        {/* Grid background */}
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(212,160,23,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(212,160,23,.018) 1px,transparent 1px)',backgroundSize:'80px 80px',pointerEvents:'none',maskImage:'radial-gradient(ellipse 70% 70% at 50% 50%,black 30%,transparent 100%)'}}/>

        {/* Ambient orbs */}
        <div style={{position:'absolute',width:'700px',height:'700px',background:'radial-gradient(circle,rgba(212,160,23,.055) 0%,rgba(33,150,243,.02) 50%,transparent 75%)',top:'50%',left:'50%',transform:'translate(-50%,-50%)',animation:'pulseRing 8s ease-in-out infinite',pointerEvents:'none'}}/>
        <div style={{position:'absolute',width:'300px',height:'300px',background:'radial-gradient(circle,rgba(33,150,243,.08) 0%,transparent 70%)',top:'20%',right:'15%',pointerEvents:'none',animation:'float 6s ease-in-out infinite 1s'}}/>
        <div style={{position:'absolute',width:'200px',height:'200px',background:'radial-gradient(circle,rgba(46,204,64,.06) 0%,transparent 70%)',bottom:'20%',left:'12%',pointerEvents:'none',animation:'float 5s ease-in-out infinite 2s'}}/>

        {[340,560,780,1020].map((sz,i)=>(
          <div key={i} style={{position:'absolute',width:`${sz}px`,height:`${sz}px`,border:`1px solid rgba(212,160,23,${.038-i*.006})`,borderRadius:'50%',top:'50%',left:'50%',transform:'translate(-50%,-50%)',animation:`pulseRing ${7+i*2.5}s ease-in-out infinite ${i*1.1}s`,pointerEvents:'none'}}/>
        ))}

        <div style={{position:'relative',zIndex:2,maxWidth:'1060px',opacity:heroVisible?1:0,transform:heroVisible?'translateY(0)':'translateY(40px)',transition:'all 1.2s cubic-bezier(.23,1,.32,1)'}}>

          {/* Top badges */}
          <div style={{display:'flex',gap:'10px',justifyContent:'center',flexWrap:'wrap',marginBottom:'48px',animation:'fadeUp .8s ease both'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:'7px',background:'rgba(46,204,64,.07)',border:'1px solid rgba(46,204,64,.2)',color:'#2ECC40',padding:'6px 16px',borderRadius:'50px',fontSize:'8.5px',letterSpacing:'3px',fontWeight:700,fontFamily:"'Space Mono',monospace"}}>
              <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#2ECC40',boxShadow:'0 0 8px #2ECC40',display:'inline-block',animation:'blink 1.5s infinite'}}/>INCORPORATED 2026
            </div>
            <span className="tag-chip">KARNATAKA · INDIA</span>
            <span className="tag-chip">DIGITAL INDIA ALIGNED</span>
          </div>

          {/* Logo section */}
          <div style={{marginBottom:'48px',display:'flex',justifyContent:'center',animation:'fadeUp .8s ease .1s both'}}>
            <div style={{position:'relative',width:'280px',height:'280px',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div className="logo-ring-1"/><div className="logo-ring-2"/><div className="logo-ring-3"/><div className="logo-ring-4"/>
              {ORBIT_DOTS.map((dot,i)=>(
                <div key={i} style={{position:'absolute',top:dot.top,left:dot.left,width:dot.size,height:dot.size,background:dot.color,borderRadius:'50%',boxShadow:`0 0 20px ${dot.color},0 0 40px ${dot.color}55`,animation:`orbitDot ${dot.duration} ease-in-out infinite ${dot.delay}`}}/>
              ))}
              {/* Inner glow */}
              <div style={{position:'absolute',width:'200px',height:'200px',borderRadius:'50%',background:'radial-gradient(circle,rgba(212,160,23,.1) 0%,transparent 70%)',animation:'pulseRing 4s ease-in-out infinite'}}/>
              <Image src="/logo.png" alt="Together Prosperity" width={190} height={190} style={{objectFit:'contain',position:'relative',zIndex:2,animation:'logoFloat 5s ease-in-out infinite',mixBlendMode:'screen',background:'transparent'}}/>
            </div>
          </div>

          {/* Company name — BIGGEST, most premium */}
          <div style={{animation:'fadeUp .8s ease .2s both',marginBottom:'36px'}}>
            {/* Decorative line above */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',marginBottom:'16px'}}>
              <div style={{height:'1px',width:'80px',background:'linear-gradient(90deg,transparent,rgba(212,160,23,.5))'}}/>
              <span style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.4)',fontSize:'8px',letterSpacing:'4px'}}>EST. 2026</span>
              <div style={{height:'1px',width:'80px',background:'linear-gradient(90deg,rgba(212,160,23,.5),transparent)'}}/>
            </div>

            <h1 className="gold-text" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(32px,6vw,82px)',letterSpacing:'7px',lineHeight:1,marginBottom:'14px'}}>
              TOGETHER PROSPERITY
            </h1>
            <h1 className="gold-text" style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(24px,4.5vw,60px)',letterSpacing:'7px',lineHeight:1,marginBottom:'20px',opacity:.7}}>
              PRIVATE LIMITED
            </h1>

            {/* Decorative separator */}
            <div style={{display:'flex',justifyContent:'center',marginBottom:'8px'}}>
              <div style={{height:'2px',width:'260px',background:'linear-gradient(90deg,transparent,#D4A017 20%,#F5A623 50%,#2196F3 80%,transparent)',borderRadius:'2px',animation:'shimmer 3s linear infinite',backgroundSize:'200% auto'}}/>
            </div>

            <div style={{fontFamily:"'Space Mono',monospace",color:'rgba(255,255,255,.22)',fontSize:'8px',letterSpacing:'5px',marginTop:'8px'}}>
              OFFICIALLY REGISTERED · COMPANIES ACT 2013 · KARNATAKA, INDIA
            </div>
          </div>

          {/* Headline */}
          <h2 style={{fontSize:'clamp(20px,3.2vw,46px)',fontWeight:900,lineHeight:1.15,marginBottom:'16px',animation:'fadeUp .8s ease .3s both',letterSpacing:'-0.5px'}}>
            <span style={{color:'rgba(255,255,255,.72)'}}>Building </span>
            <span className="gold-text">Tomorrow's </span>
            <span className="blue-text">Digital India</span>
          </h2>

          {/* Typewriter */}
          <div style={{height:'30px',marginBottom:'12px',animation:'fadeUp .8s ease .35s both'}}>
            <span style={{fontFamily:"'Space Mono',monospace",color:'rgba(255,255,255,.38)',fontSize:'clamp(11px,1.4vw,16px)',letterSpacing:'1.5px'}}>
              <span style={{color:'rgba(212,160,23,.7)'}}>▸ </span>
              <span style={{color:'#D4A017',fontWeight:700}}>{typedText}</span>
              <span className="cursor-blink"/>
            </span>
          </div>

          {/* Description */}
          <p style={{color:'rgba(255,255,255,.3)',fontSize:'clamp(13px,1.3vw,15.5px)',maxWidth:'620px',margin:'12px auto 0',lineHeight:2.3,animation:'fadeUp .8s ease .4s both'}}>
            We engineer transformative digital ecosystems combining{' '}
            <span style={{color:'rgba(212,160,23,.9)',fontWeight:600}}>Blockchain</span>,{' '}
            <span style={{color:'rgba(245,166,35,.9)',fontWeight:600}}>Cybersecurity</span>,{' '}
            <span style={{color:'rgba(33,150,243,.9)',fontWeight:600}}>IoT</span>, and{' '}
            <span style={{color:'rgba(46,204,64,.9)',fontWeight:600}}>AI & ML</span>{' '}
            — empowering governments, enterprises, and communities across India and beyond.
          </p>

          {/* CTA buttons */}
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginTop:'44px',animation:'fadeUp .8s ease .5s both'}}>
            <a href="#contact" className="btn-primary">🚀 BOOK A FREE DEMO</a>
            <a href="#services" className="btn-secondary">EXPLORE SERVICES →</a>
          </div>

          {/* Tag chips */}
          <div style={{display:'flex',gap:'8px',justifyContent:'center',flexWrap:'wrap',marginTop:'36px',animation:'fadeUp .8s ease .6s both'}}>
            {['Blockchain','Cybersecurity','IoT','AI & ML','Smart Contracts','Gov-tech','Digital India','Worldwide'].map(t=>(
              <span key={t} className="tag-chip" style={{cursor:'default'}}>{t}</span>
            ))}
          </div>

          {/* Floating stat cards */}
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginTop:'48px',animation:'fadeUp .8s ease .7s both'}}>
            {[
              {icon:'🏛️',val:'Gov-Ready',sub:'Digital India'},
              {icon:'🔐',val:'Zero-Trust',sub:'Security First'},
              {icon:'⚡',val:'Scalable',sub:'Any scale'},
              {icon:'🌍',val:'Worldwide',sub:'Global vision'},
            ].map((s,i)=>(
              <div key={s.val} className="hero-stat" style={{animationDelay:`${i*0.3}s`}}>
                <span style={{fontSize:'18px'}}>{s.icon}</span>
                <div style={{textAlign:'left'}}>
                  <div style={{color:'rgba(255,255,255,.75)',fontSize:'12px',fontWeight:700,lineHeight:1}}>{s.val}</div>
                  <div style={{color:'rgba(255,255,255,.2)',fontSize:'9px',letterSpacing:'1.5px',fontFamily:"'Space Mono',monospace",marginTop:'2px'}}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{position:'absolute',bottom:'40px',left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'8px',animation:'fadeIn 2.5s ease 1.5s both'}}>
          <span style={{fontFamily:"'Space Mono',monospace",color:'rgba(255,255,255,.15)',fontSize:'7.5px',letterSpacing:'5px'}}>SCROLL</span>
          <div style={{width:'1px',height:'44px',background:'linear-gradient(to bottom,rgba(212,160,23,.7),transparent)',animation:'float 2.5s ease-in-out infinite'}}/>
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <div className="ticker-wrap" style={{position:'relative',zIndex:1}}>
        <div className="ticker-content">
          {[...Array(2)].map((_,r)=>(
            <span key={r} style={{display:'flex'}}>
              {['Blockchain Infrastructure','Cybersecurity Solutions','Internet of Things','AI & Machine Learning','Smart Contracts','Gov-tech Platforms','Digital India Mission','Karnataka HQ','Worldwide Vision','Incorporated 2026','Zero-Trust Security','Scalable Architecture','Together Prosperity Pvt Ltd'].map((t,i)=>(
                <span key={i} className="ticker-item">{t}<span style={{color:'rgba(212,160,23,.22)',margin:'0 12px'}}>◆</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <hr className="gradient-hr"/>

      {/* ══ STATS ══ */}
      <section ref={statsRef} style={{background:'rgba(255,255,255,.007)',padding:'90px 60px',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(145px,1fr))',gap:'12px'}}>
          {[
            {num:'2026',label:'Incorporated',color:'#D4A017'},
            {num:'6+',label:'Tech Domains',color:'#2196F3'},
            {num:'8+',label:'Sectors Served',color:'#2ECC40'},
            {num:String(team.length),label:'Team Members',color:'#F5A623'},
            {num:'100%',label:'Gov-Ready',color:'#D4A017'},
            {num:'∞',label:'Innovation',color:'#2196F3'},
            {num:'🌍',label:'Worldwide',color:'#2ECC40'},
          ].map((stat,i)=>(
            <div key={stat.label} className="stat-card" style={{'--sc':stat.color,animation:countersVisible?`countUp .55s ease ${i*.07}s both`:'none'} as React.CSSProperties}>
              <div style={{fontSize:'34px',fontWeight:900,color:stat.color,lineHeight:1,fontFamily:"'Space Mono',monospace"}}>{stat.num}</div>
              <div style={{color:'rgba(255,255,255,.18)',fontSize:'8px',letterSpacing:'3px',marginTop:'11px',textTransform:'uppercase',fontFamily:"'Space Mono',monospace"}}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <hr className="gradient-hr"/>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{padding:'130px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1140px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'80px'}}>
            <span className="section-tag">WHO WE ARE</span>
            <h2 style={{fontSize:'clamp(30px,4vw,56px)',fontWeight:900,color:'#fff',marginBottom:'22px',letterSpacing:'-1px'}}>About Together Prosperity</h2>
            <p style={{color:'rgba(255,255,255,.3)',fontSize:'15px',maxWidth:'680px',margin:'0 auto',lineHeight:2.3}}>
              Together Prosperity Private Limited is a Karnataka-based next-generation technology company incorporated on{' '}
              <span style={{color:'#D4A017',fontWeight:600}}>20 March 2026</span> under the Companies Act, 2013.
              We're on a mission to architect India's digital future — delivering Blockchain, Cybersecurity, IoT, and AI & ML solutions that drive the{' '}
              <span style={{color:'#2196F3',fontWeight:600}}>Digital India</span> vision forward.
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px',marginBottom:'48px'}}>
            {[
              {icon:'🎯',title:'Our Mission',desc:'Democratize advanced technology and make blockchain, AI, and IoT accessible to every Indian institution — from village panchayats to national enterprises.',color:'#D4A017'},
              {icon:'🔭',title:'Our Vision',desc:'A digitally empowered India where every government process is transparent, every enterprise is secure, and every citizen benefits from technology.',color:'#2196F3'},
              {icon:'💎',title:'Our Values',desc:'Integrity in every line of code. Innovation in every solution. Impact in every deployment. We build with trust and deliver with excellence.',color:'#2ECC40'},
              {icon:'🤝',title:'Our Promise',desc:'Government-grade security, enterprise-level scalability, and startup-speed innovation — delivered with complete transparency and accountability.',color:'#F5A623'},
            ].map(item=>(
              <div key={item.title} className="glass" style={{padding:'36px 28px',textAlign:'center'}}>
                <div style={{width:'64px',height:'64px',background:`radial-gradient(circle,${item.color}22,${item.color}06)`,border:`1px solid ${item.color}28`,borderRadius:'18px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'26px',margin:'0 auto 20px',animation:'float 4s ease-in-out infinite'}}>{item.icon}</div>
                <h3 style={{color:item.color,fontSize:'15px',fontWeight:700,marginBottom:'12px'}}>{item.title}</h3>
                <p style={{color:'rgba(255,255,255,.27)',fontSize:'12.5px',lineHeight:2}}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:'14px'}}>
            {[
              {n:'₹0',label:'Setup Cost for Pilot',sub:'Prove value first'},
              {n:'24h',label:'Response Guarantee',sub:'Every inquiry answered fast'},
              {n:'99.9%',label:'Uptime SLA Target',sub:'Enterprise-grade reliability'},
              {n:'5★',label:'Client Satisfaction',sub:'Our promise to every partner'},
            ].map(item=>(
              <div key={item.label} className="gradient-border">
                <div className="gradient-border-inner">
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'46px',color:'#D4A017',letterSpacing:'2px',lineHeight:1}}>{item.n}</div>
                  <div style={{color:'rgba(255,255,255,.75)',fontSize:'13px',fontWeight:700,marginTop:'7px'}}>{item.label}</div>
                  <div style={{color:'rgba(255,255,255,.25)',fontSize:'11px',marginTop:'4px'}}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="gradient-hr"/>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{padding:'130px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1240px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'80px'}}>
            <span className="section-tag">WHAT WE BUILD</span>
            <h2 style={{fontSize:'clamp(30px,4vw,56px)',fontWeight:900,color:'#fff',marginBottom:'14px',letterSpacing:'-1px'}}>Core Services</h2>
            <p style={{color:'rgba(255,255,255,.25)',fontSize:'14.5px',maxWidth:'430px',margin:'0 auto'}}>Six powerful technology domains. One unified vision for digital India.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(350px,1fr))',gap:'16px'}}>
            {[
              {icon:'⛓️',title:'Blockchain Infrastructure',desc:'Immutable distributed ledger systems and cryptographic verification frameworks built for Indian institutions. Tamper-proof, transparent, and fully auditable.',color:'#D4A017',cs:'rgba(212,160,23,.1)',cg:'rgba(212,160,23,.065)',tag:'CORE TECH'},
              {icon:'🔒',title:'Cybersecurity',desc:'End-to-end security protocols, real-time threat intelligence, penetration testing, and zero-trust architecture protecting critical government and enterprise infrastructure.',color:'#F5A623',cs:'rgba(245,166,35,.1)',cg:'rgba(245,166,35,.065)',tag:'PROTECTION'},
              {icon:'📡',title:'Internet of Things',desc:'Intelligent sensor networks and connected ecosystems enabling real-time monitoring for agriculture, smart cities, industrial automation, and supply chain management.',color:'#2196F3',cs:'rgba(33,150,243,.1)',cg:'rgba(33,150,243,.065)',tag:'CONNECTIVITY'},
              {icon:'🤖',title:'AI & Machine Learning',desc:'Predictive analytics, deep learning models, NLP, and intelligent automation transforming raw data into actionable business intelligence and governance insights.',color:'#2ECC40',cs:'rgba(46,204,64,.1)',cg:'rgba(46,204,64,.065)',tag:'INTELLIGENCE'},
              {icon:'📜',title:'Smart Contracts & Security',desc:'Cybersecurity-hardened smart contracts with built-in vulnerability scanning, formal verification, and tamper-proof execution for procurement and public distribution systems.',color:'#D4A017',cs:'rgba(212,160,23,.1)',cg:'rgba(212,160,23,.065)',tag:'SECURE AUTO'},
              {icon:'🏛️',title:'Gov-tech Solutions',desc:'Digital India aligned platforms for land records, subsidy distribution, academic credential verification, and transparent government operations built for scale.',color:'#2196F3',cs:'rgba(33,150,243,.1)',cg:'rgba(33,150,243,.065)',tag:'GOVERNANCE'},
            ].map(s=>(
              <div key={s.title} className="service-card" style={{'--cc':s.color,'--cs':s.cs,'--cg':s.cg} as React.CSSProperties}>
                <div style={{position:'absolute',top:'20px',right:'20px'}}>
                  <span style={{fontFamily:"'Space Mono',monospace",color:s.color,fontSize:'7.5px',letterSpacing:'2.5px',background:`${s.color}0e`,border:`1px solid ${s.color}20`,padding:'3px 12px',borderRadius:'50px'}}>{s.tag}</span>
                </div>
                <div style={{width:'60px',height:'60px',background:`radial-gradient(circle,${s.color}22,${s.color}06)`,border:`1px solid ${s.color}26`,borderRadius:'17px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',marginBottom:'22px',animation:'float 3.5s ease-in-out infinite'}}>{s.icon}</div>
                <h3 style={{color:s.color,fontSize:'17px',fontWeight:700,marginBottom:'13px'}}>{s.title}</h3>
                <p style={{color:'rgba(255,255,255,.27)',fontSize:'12.5px',lineHeight:2}}>{s.desc}</p>
                <div style={{marginTop:'28px',color:s.color,fontSize:'9.5px',letterSpacing:'2px',fontWeight:700,fontFamily:"'Space Mono',monospace",display:'flex',alignItems:'center',gap:'6px'}}>
                  <span>LEARN MORE</span><span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="gradient-hr"/>

      {/* ══ PROCESS ══ */}
      <section id="process" style={{padding:'130px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1140px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'80px'}}>
            <span className="section-tag">HOW WE WORK</span>
            <h2 style={{fontSize:'clamp(30px,4vw,56px)',fontWeight:900,color:'#fff',marginBottom:'14px',letterSpacing:'-1px'}}>Our Process</h2>
            <p style={{color:'rgba(255,255,255,.25)',fontSize:'14.5px',maxWidth:'420px',margin:'0 auto'}}>From first conversation to live deployment — four focused steps.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px'}}>
            {[
              {step:'01',icon:'🤝',title:'Discovery Call',desc:'We understand your requirements, goals, and challenges through a free consultation session with our team.'},
              {step:'02',icon:'🗺️',title:'Solution Design',desc:'Our experts architect a custom technology solution tailored specifically to your organization and goals.'},
              {step:'03',icon:'⚙️',title:'Build & Test',desc:'We develop, rigorously test, and validate the solution with your team before any live deployment.'},
              {step:'04',icon:'🚀',title:'Deploy & Support',desc:'Live deployment with full training, documentation, and ongoing technical support for your team.'},
            ].map((p,i)=>(
              <div key={p.step} className="process-card">
                <div style={{position:'absolute',top:'16px',right:'20px',fontFamily:"'Bebas Neue',sans-serif",fontSize:'80px',color:'rgba(212,160,23,.028)',lineHeight:1}}>{p.step}</div>
                <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'rgba(212,160,23,.08)',border:'1px solid rgba(212,160,23,.25)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Space Mono',monospace",fontSize:'11px',color:'#D4A017',fontWeight:700,margin:'0 auto 22px'}}>{p.step}</div>
                <div style={{fontSize:'32px',marginBottom:'20px',animation:`float ${3.2+i*.4}s ease-in-out infinite ${i*.35}s`}}>{p.icon}</div>
                <h3 style={{color:'rgba(255,255,255,.85)',fontSize:'16px',fontWeight:700,marginBottom:'12px'}}>{p.title}</h3>
                <p style={{color:'rgba(255,255,255,.27)',fontSize:'12.5px',lineHeight:2}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="gradient-hr"/>

      {/* ══ GLOBAL ══ */}
      <section style={{padding:'110px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1140px',margin:'0 auto',textAlign:'center'}}>
          <span className="section-tag">GLOBAL REACH</span>
          <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:'#fff',marginBottom:'14px',letterSpacing:'-1px'}}>
            Built for India. <span className="gold-text">Ready for the World.</span>
          </h2>
          <p style={{color:'rgba(255,255,255,.25)',fontSize:'14.5px',maxWidth:'460px',margin:'0 auto 60px'}}>Designed to scale from local government bodies to global enterprises.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'14px',marginBottom:'40px'}}>
            {[{flag:'🇮🇳',region:'India',status:'Headquarters',color:'#F5A623'},{flag:'🌏',region:'South Asia',status:'Expansion Ready',color:'#2196F3'},{flag:'🌍',region:'Middle East',status:'Target Market',color:'#2ECC40'},{flag:'🌎',region:'Global',status:'Worldwide Vision',color:'#D4A017'}].map(r=>(
              <div key={r.region} className="glass" style={{padding:'32px 18px',textAlign:'center'}}>
                <div style={{fontSize:'44px',marginBottom:'14px',animation:'float 3.5s ease-in-out infinite'}}>{r.flag}</div>
                <div style={{color:r.color,fontWeight:700,fontSize:'16px',marginBottom:'5px'}}>{r.region}</div>
                <div style={{color:'rgba(255,255,255,.2)',fontSize:'9.5px',letterSpacing:'3px',fontFamily:"'Space Mono',monospace"}}>{r.status}</div>
              </div>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'14px'}}>
            {[{icon:'🎯',title:'Government Ready',desc:'Designed for Indian regulatory frameworks and Digital India compliance standards.'},{icon:'🔐',title:'Security First',desc:'Military-grade encryption and zero-trust architecture at every layer.'},{icon:'⚡',title:'Infinitely Scalable',desc:'From village panchayats to national infrastructure without limits.'},{icon:'🌱',title:'Sustainable Tech',desc:"Energy-efficient systems aligned with India's net-zero sustainability goals."}].map(w=>(
              <div key={w.title} className="glass" style={{padding:'28px 22px',textAlign:'center'}}>
                <div style={{fontSize:'30px',marginBottom:'13px'}}>{w.icon}</div>
                <h3 style={{color:'#D4A017',fontSize:'14px',fontWeight:700,marginBottom:'10px'}}>{w.title}</h3>
                <p style={{color:'rgba(255,255,255,.25)',fontSize:'12px',lineHeight:2}}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTORS ══ */}
      <section style={{padding:'100px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1140px',margin:'0 auto',textAlign:'center'}}>
          <span className="section-tag">SECTORS WE SERVE</span>
          <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:'#fff',marginBottom:'60px',letterSpacing:'-1px'}}>Transforming Every Sector</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(138px,1fr))',gap:'12px'}}>
            {[{icon:'🏛️',name:'Government'},{icon:'🏥',name:'Healthcare'},{icon:'🎓',name:'Education'},{icon:'🌾',name:'Agriculture'},{icon:'🏭',name:'Manufacturing'},{icon:'🏦',name:'Banking & Finance'},{icon:'🚚',name:'Supply Chain'},{icon:'🏙️',name:'Smart Cities'}].map((s,i)=>(
              <div key={s.name} className="sector-card">
                <div style={{fontSize:'32px',marginBottom:'12px',animation:`float ${3+i*.2}s ease-in-out infinite ${i*.15}s`}}>{s.icon}</div>
                <div style={{color:'rgba(255,255,255,.42)',fontSize:'11.5px',fontWeight:500}}>{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="gradient-hr"/>

      {/* ══ TEAM ══ */}
      <section id="team" style={{padding:'130px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1140px',margin:'0 auto',textAlign:'center'}}>
          <span className="section-tag">THE PEOPLE</span>
          <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:'#fff',marginBottom:'12px',letterSpacing:'-1px'}}>Our Team</h2>
          <p style={{color:'rgba(255,255,255,.25)',fontSize:'14px',marginBottom:'16px'}}>The brilliant minds architecting India's digital tomorrow.</p>
          <div style={{display:'inline-flex',alignItems:'center',gap:'10px',background:'rgba(245,166,35,.06)',border:'1px solid rgba(245,166,35,.18)',borderRadius:'50px',padding:'8px 22px',marginBottom:'52px'}}>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:'22px',fontWeight:900,color:'#F5A623'}}>{team.length}</span>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:'8.5px',letterSpacing:'3.5px',color:'rgba(245,166,35,.6)'}}>TEAM MEMBERS</span>
          </div>
          {isAdmin&&(
            <div style={{display:'flex',justifyContent:'center',marginBottom:'32px'}}>
              <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(212,160,23,.07)',border:'1px solid rgba(212,160,23,.28)',borderRadius:'50px',padding:'8px 20px'}}>
                <span>🔐</span>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:'8.5px',letterSpacing:'2px',color:'#D4A017'}}>ADMIN — ADD, EDIT & REMOVE MEMBERS</span>
              </div>
            </div>
          )}
          {!isAdmin&&(
            <div style={{marginBottom:'28px'}}>
              <p style={{color:'rgba(255,255,255,.14)',fontSize:'9.5px',fontFamily:"'Space Mono',monospace",letterSpacing:'1.5px'}}>🔐 Admin login required to manage team</p>
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'22px',textAlign:'left'}}>
            {team.map((member,idx)=>(
              <div key={member.id} className="team-card" style={{borderColor:`${member.color}10`,animation:`cardReveal .6s ease ${idx*.12}s both`,textAlign:'center'}}>
                <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(90deg,transparent,${member.color},transparent)`}}/>
                <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at top,${member.color}07 0%,transparent 65%)`,pointerEvents:'none'}}/>
                <div className="team-scan"/>
                <div style={{position:'relative',zIndex:1}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',marginBottom:'26px'}}>
                    <span style={{fontSize:'22px'}}>{member.emoji}</span>
                    <span style={{fontFamily:"'Space Mono',monospace",background:`${member.color}0d`,border:`1px solid ${member.color}20`,color:member.color,fontSize:'8px',letterSpacing:'3.5px',padding:'3px 13px',borderRadius:'50px'}}>{member.tag}</span>
                  </div>
                  <div style={{width:'106px',height:'106px',background:`radial-gradient(circle,${member.color}26,${member.color}06)`,borderRadius:'50%',margin:'0 auto 22px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'42px',fontWeight:900,color:member.color,border:`2px solid ${member.color}35`,boxShadow:`0 0 60px ${member.color}1a,inset 0 0 35px ${member.color}07`,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:'2px'}}>
                    {member.initial}
                  </div>
                  <h3 style={{color:'rgba(255,255,255,.9)',fontSize:'21px',fontWeight:800,marginBottom:'5px',letterSpacing:'-0.3px'}}>{member.name}</h3>
                  <div style={{color:member.color,fontSize:'9.5px',letterSpacing:'4px',marginBottom:'15px',fontWeight:700,fontFamily:"'Space Mono',monospace"}}>{member.role}</div>
                  <p style={{color:'rgba(255,255,255,.27)',fontSize:'12.5px',lineHeight:2,marginBottom:'15px'}}>{member.desc}</p>
                  {member.location&&<div style={{color:'rgba(255,255,255,.16)',fontSize:'10px',marginBottom:'22px',fontFamily:"'Space Mono',monospace",letterSpacing:'1px'}}>📍 {member.location}</div>}
                  <div style={{display:'flex',gap:'5px',justifyContent:'center',marginBottom:'20px'}}>
                    {[...Array(5)].map((_,i)=>(
                      <div key={i} style={{width:'7px',height:'7px',borderRadius:'50%',background:i<4?member.color:'rgba(255,255,255,.08)',boxShadow:i<4?`0 0 10px ${member.color}`:'none'}}/>
                    ))}
                  </div>
                  {isAdmin&&(
                    <div style={{display:'flex',gap:'8px',justifyContent:'center',borderTop:'1px solid rgba(255,255,255,.055)',paddingTop:'18px'}}>
                      <button className="action-btn edit-btn" onClick={()=>openEdit(member)}>✏ EDIT</button>
                      <button className="action-btn del-btn" onClick={()=>setDeleteConfirm(member.id)}>✕ REMOVE</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAdmin&&(
              <button className="add-card" onClick={openAdd}>
                <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'rgba(212,160,23,.07)',border:'2px dashed rgba(212,160,23,.32)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',color:'#D4A017'}}>+</div>
                <div style={{color:'rgba(212,160,23,.85)',fontWeight:700,fontSize:'14px',letterSpacing:'1px'}}>Add Team Member</div>
                <div style={{color:'rgba(255,255,255,.2)',fontSize:'11.5px',maxWidth:'200px',lineHeight:1.9,textAlign:'center'}}>Click to add a new member to the leadership team</div>
              </button>
            )}
          </div>
        </div>
      </section>

      <hr className="gradient-hr"/>

      {/* ══ MILESTONE ══ */}
      <section style={{padding:'110px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'740px',margin:'0 auto',textAlign:'center'}}>
          <span className="section-tag">OUR JOURNEY</span>
          <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:'#fff',marginBottom:'52px',letterSpacing:'-1px'}}>Milestones</h2>
          <div style={{background:'rgba(255,255,255,.013)',border:'1px solid rgba(212,160,23,.16)',borderRadius:'26px',padding:'56px',animation:'borderGlow 5s ease-in-out infinite',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at top,rgba(212,160,23,.05) 0%,transparent 65%)',pointerEvents:'none'}}/>
            <div style={{position:'relative',zIndex:1}}>
              <div style={{width:'82px',height:'82px',background:'linear-gradient(135deg,#D4A017,#F5A623)',borderRadius:'24px',margin:'0 auto 28px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px',boxShadow:'0 0 60px rgba(212,160,23,.55)',animation:'float 4.5s ease-in-out infinite'}}>🚀</div>
              <div style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.8)',fontSize:'11px',letterSpacing:'6px',marginBottom:'14px',fontWeight:700}}>MARCH 2026</div>
              <h3 style={{color:'#fff',fontSize:'26px',fontWeight:800,marginBottom:'16px',letterSpacing:'-0.5px'}}>Company Incorporated</h3>
              <p style={{color:'rgba(255,255,255,.3)',fontSize:'14px',lineHeight:2.2}}>Together Prosperity Private Limited officially registered under Companies Act, 2013 in Karnataka, India. Our journey to transform India's digital infrastructure begins here.</p>
              <div style={{marginTop:'32px',padding:'16px 28px',background:'rgba(255,255,255,.016)',border:'1px solid rgba(255,255,255,.05)',borderRadius:'14px',color:'rgba(255,255,255,.24)',fontSize:'10.5px',letterSpacing:'1.5px',fontStyle:'italic',fontFamily:"'Space Mono',monospace"}}>🕐 More milestones coming soon — our story is just beginning...</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="gradient-hr"/>

      {/* ══ FAQ ══ */}
      <section id="faq" style={{padding:'110px 60px',background:'rgba(255,255,255,.007)',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'840px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'70px'}}>
            <span className="section-tag">FAQ</span>
            <h2 style={{fontSize:'clamp(28px,4vw,52px)',fontWeight:900,color:'#fff',marginBottom:'14px',letterSpacing:'-1px'}}>Frequently Asked Questions</h2>
            <p style={{color:'rgba(255,255,255,.25)',fontSize:'14.5px'}}>Everything you need to know about Together Prosperity.</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'11px'}}>
            {[
              {q:'What does Together Prosperity do?',a:'We build blockchain, cybersecurity, IoT, and AI & ML solutions for government institutions, enterprises, and organizations across India and globally.'},
              {q:"How do I book a demo?",a:"Click the 'Book a Demo' button, fill in the contact form, or WhatsApp us at +91 98456 18859. We'll respond within 24 hours."},
              {q:'Are your solutions suitable for government organizations?',a:'Absolutely. All our solutions are designed with government compliance, Digital India standards, and Indian regulatory frameworks in mind from day one.'},
              {q:'Do you work with startups or only large enterprises?',a:'We work with organizations of all sizes — from startups and SMEs to large enterprises and government departments. Solutions are tailored to your scale and budget.'},
              {q:'What is your technology stack?',a:'We use cutting-edge blockchain platforms, cloud-native architectures, IoT protocols, and state-of-the-art AI/ML frameworks — chosen based on your specific requirements.'},
              {q:'Where are you based?',a:'Headquartered in Karnataka, India with offices in Malur (Kolar District) and Bangalore South. We serve clients nationwide and internationally.'},
            ].map((faq,i)=>(
              <div key={i} className="faq-item">
                <div style={{color:'rgba(255,255,255,.78)',fontSize:'13.5px',fontWeight:600,marginBottom:'12px',display:'flex',gap:'16px',alignItems:'flex-start'}}>
                  <span style={{color:'#D4A017',fontFamily:"'Space Mono',monospace",fontSize:'10px',minWidth:'18px',marginTop:'2px',fontWeight:700}}>Q.</span>{faq.q}
                </div>
                <div style={{color:'rgba(255,255,255,.28)',fontSize:'12.5px',lineHeight:2,paddingLeft:'34px'}}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="gradient-hr"/>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{padding:'130px 60px',background:'transparent',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1240px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'80px'}}>
            <span className="section-tag">GET IN TOUCH</span>
            <h2 style={{fontSize:'clamp(30px,4vw,56px)',fontWeight:900,color:'#fff',marginBottom:'14px',letterSpacing:'-1px'}}>Contact Us</h2>
            <p style={{color:'rgba(255,255,255,.25)',fontSize:'14.5px'}}>Reach out for demos, partnerships, or any queries.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.6fr',gap:'40px',alignItems:'start'}}>
            <div>
              <div className="contact-block">
                <h3 style={{color:'rgba(255,255,255,.35)',fontSize:'8.5px',letterSpacing:'4px',marginBottom:'20px',fontFamily:"'Space Mono',monospace"}}>📞 CALL OR WHATSAPP</h3>
                <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                  <a href="tel:+919845618859" className="btn-primary" style={{padding:'11px 20px',fontSize:'10px',animation:'none'}}>📞 +91 98456 18859</a>
                  <a href="https://wa.me/919845618859?text=Hello%20Together%20Prosperity%2C%20I%20am%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer" style={{background:'#25D366',color:'#fff',padding:'11px 22px',borderRadius:'50px',textDecoration:'none',fontWeight:700,fontSize:'10.5px',display:'inline-block'}}>💬 WhatsApp</a>
                </div>
                <p style={{color:'rgba(255,255,255,.16)',fontSize:'9.5px',marginTop:'14px',fontFamily:"'Space Mono',monospace",letterSpacing:'1.5px'}}>Mon–Sat · 9AM – 7PM IST</p>
              </div>
              <div className="contact-block">
                <h3 style={{color:'rgba(255,255,255,.35)',fontSize:'8.5px',letterSpacing:'4px',marginBottom:'13px',fontFamily:"'Space Mono',monospace"}}>✉️ EMAIL US</h3>
                <a href="mailto:togetherprosperity4545@gmail.com" style={{color:'#2196F3',fontSize:'13px',textDecoration:'none',fontWeight:600}}>togetherprosperity4545@gmail.com</a>
                <p style={{color:'rgba(255,255,255,.16)',fontSize:'10.5px',marginTop:'5px'}}>We respond within 24 hours</p>
              </div>
              <div className="contact-block">
                <h3 style={{color:'rgba(255,255,255,.35)',fontSize:'8.5px',letterSpacing:'4px',marginBottom:'15px',fontFamily:"'Space Mono',monospace"}}>📍 OUR LOCATIONS</h3>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>
                  <div><div style={{color:'rgba(255,255,255,.65)',fontSize:'11.5px',fontWeight:600,marginBottom:'5px'}}>Kolar Office</div><div style={{color:'rgba(255,255,255,.25)',fontSize:'10.5px',lineHeight:2}}>Malur, Kolar District<br/>Karnataka — 563130</div></div>
                  <div><div style={{color:'rgba(255,255,255,.65)',fontSize:'11.5px',fontWeight:600,marginBottom:'5px'}}>Bangalore Office</div><div style={{color:'rgba(255,255,255,.25)',fontSize:'10.5px',lineHeight:2}}>Bangalore South<br/>Karnataka — 560026</div></div>
                </div>
              </div>
              <div className="contact-block">
                <h3 style={{color:'rgba(255,255,255,.35)',fontSize:'8.5px',letterSpacing:'4px',marginBottom:'16px',fontFamily:"'Space Mono',monospace"}}>🌐 FOLLOW US</h3>
                <div style={{display:'flex',gap:'9px',flexWrap:'wrap'}}>
                  <a href="https://www.instagram.com/together_prosperity" target="_blank" rel="noopener noreferrer" className="social-pill" style={{background:'linear-gradient(135deg,#833ab4,#fd1d1d,#f77737)',color:'#fff',padding:'9px 18px',borderRadius:'50px',textDecoration:'none',fontSize:'11px',fontWeight:600}}>📸 Instagram</a>
                  <a href="#" className="social-pill" style={{background:'#0077b5',color:'#fff',padding:'9px 18px',borderRadius:'50px',textDecoration:'none',fontSize:'11px',fontWeight:600}}>💼 LinkedIn</a>
                  <a href="#" className="social-pill" style={{background:'#000',border:'1px solid rgba(255,255,255,.2)',color:'#fff',padding:'9px 18px',borderRadius:'50px',textDecoration:'none',fontSize:'11px',fontWeight:600}}>𝕏 Twitter</a>
                </div>
                <p style={{color:'rgba(255,255,255,.16)',fontSize:'10.5px',marginTop:'12px',fontFamily:"'Space Mono',monospace"}}>@together_prosperity</p>
              </div>
            </div>

            {/* Form */}
            <div style={{background:'rgba(255,255,255,.012)',border:'1px solid rgba(212,160,23,.15)',borderRadius:'28px',padding:'50px',animation:'borderGlow 5s ease-in-out infinite',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at top,rgba(212,160,23,.04) 0%,transparent 60%)',pointerEvents:'none'}}/>
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1.5px',background:'linear-gradient(90deg,transparent,rgba(212,160,23,.5),rgba(33,150,243,.4),transparent)'}}/>
              <div style={{position:'relative',zIndex:1}}>
                <span className="section-tag" style={{marginBottom:'8px'}}>BOOK A DEMO</span>
                <h3 style={{color:'#fff',fontSize:'26px',fontWeight:800,marginBottom:'8px',letterSpacing:'-0.5px'}}>Let's Build Together</h3>
                <p style={{color:'rgba(255,255,255,.25)',fontSize:'13px',marginBottom:'36px',lineHeight:1.9}}>Fill in your details and our team will respond within 24 hours with a personalized plan.</p>
                
                {/* REPLACED submitted success block */}
                {submitted?(
                  <div style={{textAlign:'center',padding:'60px 20px'}}>
                    <div style={{fontSize:'64px',marginBottom:'24px',animation:'float 3s ease-in-out infinite'}}>🎉</div>
                    <h3 style={{color:'#D4A017',fontSize:'24px',fontWeight:800,marginBottom:'13px'}}>Message Sent!</h3>
                    <p style={{color:'rgba(255,255,255,.3)',fontSize:'14px',lineHeight:2}}>
                      Thank you for reaching out to Together Prosperity.<br/>
                      Our team will contact you within 24 hours.
                    </p>
                    <a href="https://wa.me/919845618859" target="_blank" rel="noopener noreferrer"
                      style={{display:'inline-block',marginTop:'24px',background:'#25D366',color:'#fff',padding:'14px 32px',borderRadius:'50px',textDecoration:'none',fontWeight:700,fontSize:'13px'}}>
                      💬 Also WhatsApp Us
                    </a>
                    <button onClick={()=>{setSubmitted(false);setFormData({name:'',email:'',phone:'',company:'',service:'',message:''});}}
                      style={{display:'block',margin:'16px auto 0',background:'transparent',border:'1px solid rgba(255,255,255,.1)',borderRadius:'50px',color:'rgba(255,255,255,.3)',padding:'10px 28px',cursor:'pointer',fontSize:'11px',fontFamily:"'Space Mono',monospace",letterSpacing:'2px'}}>
                      ↩ SEND ANOTHER MESSAGE
                    </button>
                  </div>
                ):(
                  <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                      <div>
                        <label style={{color:'rgba(255,255,255,.24)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>YOUR NAME *</label>
                        <input className="form-input" type="text" placeholder="John Doe" required value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/>
                      </div>
                      <div>
                        <label style={{color:'rgba(255,255,255,.24)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>EMAIL *</label>
                        <input className="form-input" type="email" placeholder="john@company.com" required value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/>
                      </div>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                      <div>
                        <label style={{color:'rgba(255,255,255,.24)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>PHONE</label>
                        <input className="form-input" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})}/>
                      </div>
                      <div>
                        <label style={{color:'rgba(255,255,255,.24)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>ORGANIZATION</label>
                        <input className="form-input" type="text" placeholder="Company / Institution" value={formData.company} onChange={e=>setFormData({...formData,company:e.target.value})}/>
                      </div>
                    </div>
                    <div>
                      <label style={{color:'rgba(255,255,255,.24)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>SERVICE INTERESTED IN *</label>
                      <select className="form-input" required value={formData.service} onChange={e=>setFormData({...formData,service:e.target.value})}>
                        <option value="" style={{background:'#050510'}}>Select a service...</option>
                        {['Blockchain Infrastructure','Cybersecurity','Internet of Things (IoT)','AI & Machine Learning','Smart Contracts & Security','Gov-tech Solutions','Multiple Services','General Inquiry'].map(s=><option key={s} style={{background:'#050510'}}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{color:'rgba(255,255,255,.24)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>MESSAGE *</label>
                      <textarea className="form-input" rows={5} placeholder="Tell us about your project, requirements, or any questions..." required value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} style={{resize:'vertical'}}/>
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary" style={{width:'100%',padding:'16px',fontSize:'10.5px',letterSpacing:'3px',cursor:sending?'not-allowed':'pointer',opacity:sending?.55:1,justifyContent:'center',animation:'none'}}>
                      {sending?'⏳ SENDING...':'🚀 SEND MESSAGE & BOOK DEMO'}
                    </button>
                    <p style={{color:'rgba(255,255,255,.14)',fontSize:'9px',textAlign:'center',fontFamily:"'Space Mono',monospace",letterSpacing:'1.5px'}}>We respond within 24h · Your data is safe with us</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="gradient-hr"/>

      {/* ══ FOOTER ══ */}
      <footer style={{background:'rgba(0,0,2,.9)',borderTop:'1px solid rgba(255,255,255,.028)',padding:'84px 60px 36px',position:'relative',zIndex:1}}>
        <div style={{maxWidth:'1240px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(215px,1fr))',gap:'54px',marginBottom:'54px'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'13px',marginBottom:'20px'}}>
              <Image src="/logo.png" alt="Logo" width={42} height={42} style={{objectFit:'contain',mixBlendMode:'screen',filter:'drop-shadow(0 0 14px rgba(212,160,23,.85))',background:'transparent'}}/>
              <div>
                <div style={{fontFamily:"'Space Mono',monospace",color:'#D4A017',fontWeight:700,fontSize:'10.5px',letterSpacing:'4px'}}>TOGETHER</div>
                <div style={{fontFamily:"'Space Mono',monospace",color:'#2196F3',fontWeight:400,fontSize:'7px',letterSpacing:'5.5px',marginTop:'3px'}}>PROSPERITY</div>
              </div>
            </div>
            <p style={{color:'rgba(255,255,255,.18)',fontSize:'12px',lineHeight:2.2,marginBottom:'16px'}}>Powering India's digital transformation through Blockchain, IoT, AI & ML, and Cybersecurity.</p>
            <p style={{color:'rgba(255,255,255,.1)',fontSize:'10.5px',lineHeight:2.1,fontFamily:"'Space Mono',monospace"}}>Incorporated: 20 March 2026<br/>Karnataka, India<br/>Companies Act, 2013</p>
          </div>
          <div>
            <h4 style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.5)',fontSize:'8.5px',letterSpacing:'4px',marginBottom:'24px'}}>QUICK LINKS</h4>
            {['Home','About','Services','Process','Team','FAQ','Contact'].map(item=>(
              <div key={item} style={{marginBottom:'12px'}}>
                <a href={`#${item.toLowerCase()}`} style={{color:'rgba(255,255,255,.2)',textDecoration:'none',fontSize:'12.5px',transition:'color .2s'}} onMouseEnter={e=>(e.currentTarget.style.color='#D4A017')} onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,.2)')}>{item}</a>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.5)',fontSize:'8.5px',letterSpacing:'4px',marginBottom:'24px'}}>SERVICES</h4>
            {['Blockchain Infrastructure','Cybersecurity','Internet of Things','AI & Machine Learning','Smart Contracts','Gov-tech Solutions'].map(s=>(
              <div key={s} style={{color:'rgba(255,255,255,.16)',fontSize:'11.5px',marginBottom:'12px',lineHeight:1.5}}>{s}</div>
            ))}
          </div>
          <div>
            <h4 style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.5)',fontSize:'8.5px',letterSpacing:'4px',marginBottom:'24px'}}>CONTACT</h4>
            <a href="tel:+919845618859" style={{display:'block',color:'#D4A017',fontSize:'13.5px',textDecoration:'none',fontWeight:600,marginBottom:'14px'}}>📞 +91 98456 18859</a>
            <a href="https://wa.me/919845618859" target="_blank" rel="noopener noreferrer" style={{display:'block',color:'#25D366',fontSize:'12.5px',textDecoration:'none',marginBottom:'14px'}}>💬 WhatsApp Us</a>
            <a href="mailto:togetherprosperity4545@gmail.com" style={{display:'block',color:'#2196F3',fontSize:'11px',textDecoration:'none',wordBreak:'break-word',marginBottom:'20px'}}>✉️ togetherprosperity4545@gmail.com</a>
            <div style={{display:'flex',gap:'7px',flexWrap:'wrap'}}>
              <a href="https://www.instagram.com/together_prosperity" target="_blank" rel="noopener noreferrer" style={{color:'#fff',fontSize:'9.5px',textDecoration:'none',background:'linear-gradient(135deg,#833ab4,#fd1d1d,#f77737)',padding:'5px 14px',borderRadius:'50px'}}>Instagram</a>
              <a href="#" style={{color:'#fff',fontSize:'9.5px',textDecoration:'none',background:'#0077b5',padding:'5px 14px',borderRadius:'50px'}}>LinkedIn</a>
              <a href="#" style={{color:'#fff',fontSize:'9.5px',textDecoration:'none',background:'#000',border:'1px solid rgba(255,255,255,.2)',padding:'5px 14px',borderRadius:'50px'}}>𝕏</a>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,.035)',paddingTop:'28px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
          <p style={{color:'rgba(255,255,255,.1)',fontSize:'10.5px',fontFamily:"'Space Mono',monospace"}}>© 2026 Together Prosperity Private Limited. All rights reserved.</p>
          <p style={{color:'rgba(255,255,255,.1)',fontSize:'10.5px',fontFamily:"'Space Mono',monospace"}}>Incorporated under Companies Act, 2013 · Karnataka, India</p>
        </div>
      </footer>

      {/* ══ ADMIN LOGIN ══ */}
      {showAdminLogin&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget){setShowAdminLogin(false);setAdminPwInput('');setAdminError(false);}}}>
          <div className="admin-box">
            <div style={{fontSize:'44px',marginBottom:'22px'}}>🔐</div>
            <div style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.7)',fontSize:'8.5px',letterSpacing:'6px',marginBottom:'10px'}}>ADMIN ACCESS</div>
            <h3 style={{color:'#fff',fontSize:'22px',fontWeight:800,marginBottom:'10px',letterSpacing:'-0.5px'}}>Enter Password</h3>
            <p style={{color:'rgba(255,255,255,.25)',fontSize:'12.5px',marginBottom:'30px',lineHeight:1.9}}>Admin access required to manage team members.</p>
            <input className={`admin-pw${adminError?' err':''}`} type="password" placeholder="••••••••" value={adminPwInput}
              onChange={e=>{setAdminPwInput(e.target.value);setAdminError(false);}}
              onKeyDown={e=>{if(e.key==='Enter')handleAdminLogin();}} autoFocus/>
            {adminError&&<p style={{color:'#f44336',fontSize:'10.5px',marginTop:'11px',fontFamily:"'Space Mono',monospace",letterSpacing:'1px'}}>❌ Incorrect password</p>}
            <div style={{display:'flex',gap:'11px',marginTop:'24px'}}>
              <button onClick={()=>{setShowAdminLogin(false);setAdminPwInput('');setAdminError(false);}} style={{flex:1,padding:'13px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'12px',color:'rgba(255,255,255,.4)',cursor:'pointer',fontSize:'10.5px',fontFamily:"'Space Mono',monospace",letterSpacing:'1px'}}>CANCEL</button>
              <button onClick={handleAdminLogin} style={{flex:1,padding:'13px',background:'linear-gradient(135deg,#D4A017,#F5A623)',border:'none',borderRadius:'12px',color:'#000',cursor:'pointer',fontSize:'10.5px',fontWeight:800,fontFamily:"'Sora',sans-serif",letterSpacing:'2px'}}>UNLOCK</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ ADD/EDIT MODAL ══ */}
      {showModal&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setShowModal(false)}}>
          <div className="modal-box">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'32px'}}>
              <div>
                <div style={{fontFamily:"'Space Mono',monospace",color:'rgba(212,160,23,.6)',fontSize:'8px',letterSpacing:'5px',marginBottom:'6px'}}>{editingMember?'EDIT MEMBER':'NEW MEMBER'}</div>
                <h3 style={{color:'#fff',fontSize:'22px',fontWeight:800,letterSpacing:'-0.5px'}}>{editingMember?'Update Details':'Add Team Member'}</h3>
              </div>
              <button onClick={()=>setShowModal(false)} style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.4)',width:'36px',height:'36px',borderRadius:'50%',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center'}}>✕</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div>
                <label style={{color:'rgba(255,255,255,.25)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>FULL NAME *</label>
                <input className="modal-input" type="text" placeholder="e.g. Priya Sharma" value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value,initial:e.target.value[0]?.toUpperCase()||''})}/>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={{color:'rgba(255,255,255,.25)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>ROLE / TITLE *</label>
                  <input className="modal-input" type="text" placeholder="e.g. CTO" value={draft.role} onChange={e=>setDraft({...draft,role:e.target.value})}/>
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,.25)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>BADGE LABEL</label>
                  <input className="modal-input" type="text" placeholder="Auto from role" value={draft.tag} onChange={e=>setDraft({...draft,tag:e.target.value})}/>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
                <div>
                  <label style={{color:'rgba(255,255,255,.25)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>AVATAR INITIAL</label>
                  <input className="modal-input" type="text" maxLength={2} placeholder="Auto-filled" value={draft.initial} onChange={e=>setDraft({...draft,initial:e.target.value.toUpperCase()})}/>
                </div>
                <div>
                  <label style={{color:'rgba(255,255,255,.25)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>LOCATION</label>
                  <input className="modal-input" type="text" placeholder="e.g. Bangalore" value={draft.location} onChange={e=>setDraft({...draft,location:e.target.value})}/>
                </div>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,.25)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'8px',fontFamily:"'Space Mono',monospace"}}>BIO / DESCRIPTION</label>
                <textarea className="modal-input" rows={3} placeholder="Short bio..." value={draft.desc} onChange={e=>setDraft({...draft,desc:e.target.value})} style={{resize:'vertical'}}/>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,.25)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'10px',fontFamily:"'Space Mono',monospace"}}>ICON</label>
                <div style={{display:'flex',gap:'7px',flexWrap:'wrap'}}>
                  {EMOJI_OPTIONS.map(em=><button key={em} className={`emoji-btn${draft.emoji===em?' sel':''}`} onClick={()=>setDraft({...draft,emoji:em})}>{em}</button>)}
                </div>
              </div>
              <div>
                <label style={{color:'rgba(255,255,255,.25)',fontSize:'8.5px',letterSpacing:'2.5px',display:'block',marginBottom:'10px',fontFamily:"'Space Mono',monospace"}}>ACCENT COLOR</label>
                <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'10px'}}>
                  {COLOR_OPTIONS.map(c=><div key={c} className={`color-swatch${draft.color===c?' sel':''}`} style={{background:c,borderColor:draft.color===c?'#fff':'transparent'}} onClick={()=>setDraft({...draft,color:c})}/>)}
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div style={{width:'22px',height:'22px',borderRadius:'50%',background:draft.color,border:'2px solid rgba(255,255,255,.15)',flexShrink:0}}/>
                  <input type="color" value={draft.color} onChange={e=>setDraft({...draft,color:e.target.value})} style={{background:'none',border:'1px solid rgba(255,255,255,.08)',borderRadius:'8px',padding:'2px 5px',cursor:'pointer',height:'30px'}}/>
                  <span style={{color:'rgba(255,255,255,.25)',fontSize:'10px',fontFamily:"'Space Mono',monospace"}}>custom color</span>
                </div>
              </div>
              {/* Preview */}
              <div style={{background:'rgba(255,255,255,.016)',border:`1px solid ${draft.color}22`,borderRadius:'14px',padding:'20px',display:'flex',alignItems:'center',gap:'14px'}}>
                <div style={{width:'52px',height:'52px',borderRadius:'50%',background:`radial-gradient(circle,${draft.color}26,${draft.color}06)`,border:`2px solid ${draft.color}40`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',fontWeight:900,color:draft.color,flexShrink:0,fontFamily:"'Bebas Neue',sans-serif"}}>
                  {draft.initial||(draft.name[0]?.toUpperCase())||'?'}
                </div>
                <div style={{flex:1,textAlign:'left'}}>
                  <div style={{color:'rgba(255,255,255,.8)',fontWeight:700,fontSize:'14px'}}>{draft.name||'Name Preview'}</div>
                  <div style={{color:draft.color,fontSize:'9.5px',letterSpacing:'3px',fontFamily:"'Space Mono',monospace"}}>{draft.role||'Role'}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'5px'}}>
                  <span style={{fontSize:'20px'}}>{draft.emoji}</span>
                  <span style={{background:`${draft.color}12`,border:`1px solid ${draft.color}25`,color:draft.color,fontSize:'7.5px',letterSpacing:'2px',padding:'2px 10px',borderRadius:'50px',fontFamily:"'Space Mono',monospace"}}>{draft.tag||draft.role?.toUpperCase()||'TAG'}</span>
                </div>
              </div>
            </div>
            <div style={{display:'flex',gap:'11px',marginTop:'28px'}}>
              <button onClick={()=>setShowModal(false)} style={{flex:1,padding:'14px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'12px',color:'rgba(255,255,255,.4)',cursor:'pointer',fontSize:'10.5px',letterSpacing:'2px',fontFamily:"'Space Mono',monospace"}}>CANCEL</button>
              <button onClick={saveMember} disabled={!draft.name.trim()||!draft.role.trim()} style={{flex:2,padding:'14px',background:draft.name.trim()&&draft.role.trim()?`linear-gradient(135deg,${draft.color},${draft.color}cc)`:'rgba(255,255,255,.04)',border:'none',borderRadius:'12px',color:draft.name.trim()&&draft.role.trim()?'#000':'rgba(255,255,255,.16)',cursor:draft.name.trim()&&draft.role.trim()?'pointer':'not-allowed',fontSize:'10.5px',letterSpacing:'3px',fontWeight:800,fontFamily:"'Sora',sans-serif",transition:'all .3s'}}>
                {editingMember?'✓ SAVE CHANGES':'+ ADD MEMBER'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ DELETE CONFIRM ══ */}
      {deleteConfirm&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setDeleteConfirm(null)}}>
          <div style={{background:'#050510',border:'1px solid rgba(244,67,54,.25)',borderRadius:'24px',padding:'46px',maxWidth:'420px',width:'100%',margin:'20px',textAlign:'center',animation:'modalIn .25s cubic-bezier(.23,1,.32,1)'}}>
            <div style={{fontSize:'48px',marginBottom:'20px'}}>⚠️</div>
            <h3 style={{color:'#fff',fontSize:'20px',fontWeight:800,marginBottom:'10px',letterSpacing:'-0.3px'}}>Remove Member?</h3>
            <p style={{color:'rgba(255,255,255,.3)',fontSize:'13px',lineHeight:2,marginBottom:'28px'}}>This will permanently remove <strong style={{color:'rgba(255,255,255,.7)'}}>{team.find(m=>m.id===deleteConfirm)?.name}</strong> from the team.</p>
            <div style={{display:'flex',gap:'11px'}}>
              <button onClick={()=>setDeleteConfirm(null)} style={{flex:1,padding:'13px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'12px',color:'rgba(255,255,255,.4)',cursor:'pointer',fontSize:'10.5px',fontFamily:"'Space Mono',monospace"}}>CANCEL</button>
              <button onClick={()=>deleteMember(deleteConfirm)} style={{flex:1,padding:'13px',background:'rgba(244,67,54,.1)',border:'1px solid rgba(244,67,54,.32)',borderRadius:'12px',color:'#f44336',cursor:'pointer',fontSize:'10.5px',fontWeight:700,fontFamily:"'Space Mono',monospace"}}>REMOVE</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}