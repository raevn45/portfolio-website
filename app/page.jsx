'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import('../components/scene'), { ssr: false });

const projects = [
  ['01', 'CANBOOK', 'SOFTWARE / PRODUCT', 'A canteen pre-order and demand system built around a problem that should have been easier to solve.', 'https://canbook.vercel.app/', 'lime'],
  ['02', 'BRIDGEAI', 'AI / RESEARCH', 'An independent study on whether AI-generated simplification can change comprehension and confidence.', 'https://bridge-ai-research--raevn.replit.app/', 'blue'],
  ['03', 'TEDxGIIS', 'CURATION / EVENT', 'A student-led TEDx built around ideas that sit one layer beyond the obvious.', '#contact', 'paper'],
];
const fixations = ['AI', 'INTERFACES', 'SYSTEMS', 'PEOPLE', 'WHY', 'WHAT IF', 'RABBIT HOLES', 'BUILDING'];
const tabs = ['MUN', 'DESIGN', 'WRITING', 'UI/UX', 'RESEARCH', 'EVENTS'];
const states = ['BUILDING', 'READING', 'TESTING', 'PLANNING', 'RETHINKING'];

function Magnetic({ children, href, external }) {
  const ref = useRef(null);
  return <a ref={ref} className="magnetic" href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}
    onPointerMove={(e) => { const r = ref.current.getBoundingClientRect(); ref.current.style.setProperty('--tx', `${(e.clientX-r.left-r.width/2)*.14}px`); ref.current.style.setProperty('--ty', `${(e.clientY-r.top-r.height/2)*.14}px`); }}
    onPointerLeave={() => { ref.current.style.setProperty('--tx','0px'); ref.current.style.setProperty('--ty','0px'); }}>{children}</a>;
}

export default function Page() {
  const root = useRef(null), pointer = useRef({x:0,y:0}), velocity = useRef(0), scroll = useRef(0);
  const [hud,setHud] = useState({x:0,y:0,v:0,p:0,time:''});
  const [cursor,setCursor] = useState({x:-100,y:-100,label:''}), [menu,setMenu] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ lerp:.075, smoothWheel:true });
    let rafId;
    const raf = (t) => { lenis.raf(t); rafId=requestAnimationFrame(raf); };
    rafId=requestAnimationFrame(raf);
    const ctx=gsap.context(() => {
      gsap.from('.hero-kicker',{y:30,opacity:0,duration:1,delay:.2,ease:'power4.out'});
      gsap.from('.hero-line .word',{yPercent:120,rotate:4,opacity:0,stagger:.06,duration:1.15,delay:.3,ease:'power4.out'});
      gsap.to('.hero-title',{yPercent:-16,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
      gsap.to('.scene',{yPercent:18,rotate:7,scale:1.1,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.2}});
      gsap.utils.toArray('.reveal').forEach(el=>gsap.fromTo(el,{y:55,opacity:0},{y:0,opacity:1,duration:.9,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
      gsap.utils.toArray('.fixation').forEach((el,i)=>gsap.to(el,{x:i%2?90:-90,rotation:i%2?-7:7,ease:'none',scrollTrigger:{trigger:'#fixations',start:'top bottom',end:'bottom top',scrub:1.3}}));
      gsap.to('.ticker-track',{xPercent:-35,ease:'none',scrollTrigger:{trigger:'#fixations',start:'top bottom',end:'bottom top',scrub:1}});
      gsap.utils.toArray('.pattern-word').forEach(el=>gsap.fromTo(el,{scale:.55,y:100,opacity:0},{scale:1,y:0,opacity:1,ease:'none',scrollTrigger:{trigger:el,start:'top 80%',end:'top 28%',scrub:1}}));
    },root);
    let lastX=0,lastY=0,lastT=performance.now();
    const move=e=>{const now=performance.now(),dt=Math.max(8,now-lastT),dx=e.clientX-lastX,dy=e.clientY-lastY;velocity.current=Math.min(90,Math.hypot(dx,dy)/dt*16);pointer.current.x+=(e.clientX/innerWidth*2-1-pointer.current.x)*.12;pointer.current.y+=(e.clientY/innerHeight*2-1-pointer.current.y)*.12;lastX=e.clientX;lastY=e.clientY;lastT=now;document.documentElement.style.setProperty('--mx',`${e.clientX}px`);document.documentElement.style.setProperty('--my',`${e.clientY}px`);setCursor(c=>({...c,x:e.clientX,y:e.clientY}));};
    const over=e=>{const t=e.target.closest('[data-cursor]');setCursor(c=>({...c,label:t?.dataset.cursor||''}));};
    const onScroll=({scroll:s,velocity:v})=>{scroll.current=s;velocity.current=Math.max(velocity.current*.82,Math.abs(v||0)*7);document.documentElement.style.setProperty('--scroll-v',String(Math.max(-2,Math.min(2,v||0))));};
    lenis.on('scroll',onScroll); window.addEventListener('pointermove',move,{passive:true});window.addEventListener('pointerover',over,{passive:true});
    const clock=setInterval(()=>{setHud({x:Math.round(lastX),y:Math.round(lastY),v:Math.round(velocity.current),p:Math.round((scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))*100),time:new Date().toLocaleTimeString('en-GB')});velocity.current*=.9;},100);
    return()=>{lenis.destroy();cancelAnimationFrame(rafId);ctx.revert();window.removeEventListener('pointermove',move);window.removeEventListener('pointerover',over);clearInterval(clock);};
  },[]);

  const split=s=>s.split(' ').map((w,i)=><span className="word" key={i}>{w}&nbsp;</span>);
  const jump=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'});};

  return <main ref={root} className="site" id="top">
    <div className="noise"/><div className="pointer-light"/><Scene pointer={pointer} velocity={velocity} progress={scroll}/>
    <header className="hud"><a href="#top" data-cursor="TOP">PRESHITA©2026</a><span className="hud-mid">ABU DHABI / 2026</span><div className="hud-right"><span>GST {hud.time}</span><span>{String(hud.x).padStart(4,'0')} × {String(hud.y).padStart(4,'0')}</span><span>VEL {String(hud.v).padStart(2,'0')}</span><button data-cursor="ENTER" onClick={()=>setMenu(true)}>INDEX <Plus size={13}/></button></div></header>
    <aside className="rail"><span>SCROLL</span><b>{String(hud.p).padStart(2,'0')}</b><i style={{transform:`scaleY(${hud.p/100})`}}/></aside>

    <section className="hero section"><div className="hero-grid"/><div className="hero-copy"><p className="hero-kicker">STUDENT / BUILDER / RESEARCHER / ORGANIZER</p><h1 className="hero-title"><span className="hero-line">{split('THINGS I CANNOT')}</span><span className="hero-line outline">{split('LEAVE ALONE.')}</span></h1><p className="hero-sub">That is way more me than “I make things happen.”</p></div><div className="hero-bottom"><span>01 / 07</span><span>MOVE · SCROLL · LOOK AROUND</span></div></section>

    <section id="fixations" className="section fixations"><p className="label">01 / CURRENT FIXATIONS</p><div className="fixation-field">{fixations.map((x,i)=><span className={`fixation fixation-${i}`} data-cursor="MOVE" key={x}>{x}</span>)}</div><div className="ticker"><div className="ticker-track">{[...fixations,...fixations].map((x,i)=><span key={i}>{x} <b>•</b></span>)}</div></div></section>

    <section id="work" className="section work"><p className="label">02 / WORK</p><div className="work-heading reveal"><span>THINGS I BUILT / ORGANIZED / COULDN'T STOP THINKING ABOUT</span><h2>WORK <em>that moves.</em></h2></div><div className="projects">{projects.map(([no,title,type,text,href,tone])=><a className={`project ${tone} reveal`} data-cursor="OPEN ↗" key={no} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer"><div className="project-no">{no}</div><div className="project-copy"><small>{type}</small><h3>{title}<sup>↗</sup></h3><p>{text}</p><span>ENTER WORLD <ArrowUpRight size={15}/></span></div><div className="project-art"><div className="art-lines"/><div className="art-ring r1"/><div className="art-ring r2"/><strong>{no}</strong></div></a>)}</div></section>

    <section id="pattern" className="pattern"><p className="label">03 / A PATTERN</p>{['NOTICE.','QUESTION.','BUILD.','REPEAT.'].map((x,i)=><div className="pattern-word" key={x}><small>0{i+1}</small>{x}</div>)}</section>

    <section id="tabs" className="section tabs"><p className="label">04 / OTHER TABS</p><div className="tabs-intro reveal"><h2>OTHER<br/><em>TABS.</em></h2><p>Things I keep open in my head.</p></div><div className="tabs-grid">{tabs.map((x,i)=><motion.a href="#contact" data-cursor="OPEN" className="tab" key={x} whileHover={{y:i%2?-18:18,rotate:i%2?-2:2,scale:1.035}} transition={{type:'spring',stiffness:280,damping:18}}><small>0{i+1}</small><strong>{x}</strong><ArrowUpRight size={17}/></motion.a>)}</div></section>

    <section id="currently" className="section currently"><p className="label">05 / CURRENTLY</p><div className="status-list">{states.map((x,i)=><div className="status reveal" key={x}><small>0{i+1}</small><strong>{x}</strong><i/><span>LIVE</span></div>)}</div></section>

    <section id="contact" className="section contact"><p className="label">06 / CONTACT</p><div className="contact-copy"><p>IF YOU HAVE AN IDEA,<br/>A QUESTION, OR A RABBIT HOLE—</p><h2>HI<span>.</span></h2><div className="actions"><Magnetic href="mailto:hello@preshitashinde.com">EMAIL <ArrowUpRight size={18}/></Magnetic><Magnetic href="https://github.com/raevn45" external>GITHUB <ArrowUpRight size={18}/></Magnetic></div></div><footer>END? <b>NOT REALLY.</b></footer></section>

    <div className={`cursor ${cursor.label?'active':''}`} style={{transform:`translate3d(${cursor.x}px,${cursor.y}px,0)`}}><span>{cursor.label||'+'}</span></div>
    <AnimatePresence>{menu&&<motion.div className="menu" initial={{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0 0)'}} exit={{clipPath:'inset(100% 0 0 0)'}} transition={{duration:.55,ease:[.76,0,.24,1]}}><button data-cursor="CLOSE" className="close" onClick={()=>setMenu(false)}>CLOSE <X size={20}/></button><h2>INDEX<span>+</span></h2><nav>{[['HOME','top'],['FIXATIONS','fixations'],['WORK','work'],['PATTERN','pattern'],['OTHER TABS','tabs'],['CURRENTLY','currently'],['CONTACT','contact']].map(([x,id],i)=><button key={id} onClick={()=>jump(id)}><small>0{i+1}</small><strong>{x}</strong><ArrowUpRight size={18}/></button>)}</nav><p>EVERYTHING IS CONNECTED.</p></motion.div>}</AnimatePresence>
  </main>;
}
