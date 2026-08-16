import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'motion/react';
import './styles.css';
import './immersive.css';
import './final.css';
import './experience.css';
import './signature.css';
import './world.css';

const PHOTO = 'https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';
const projects = [
  { id: '01', title: 'CANBOOK', label: 'PRODUCT / WEB', text: 'school canteen · ordering · demand', href: 'https://github.com/raevn45/CanBook', tone: 'lime', glyph: 'CB' },
  { id: '02', title: 'BRIDGEAI', label: 'AI / PRODUCT', text: 'accessibility · comprehension · human-AI', href: 'https://github.com/raevn45/BridgeAI', tone: 'blue', glyph: 'BA' },
  { id: '03', title: 'RESEARCH', label: 'RESEARCH / ML', text: 'models · experiments · questions', href: 'https://github.com/raevn45/BridgeAI-Research', tone: 'pink', glyph: 'R' }
];
const tabs = ['AI','MUN','TEDx','HORROR','FASHION','MAKEUP','PEOPLE','STORIES','RESEARCH','DESIGN','QUESTIONS','BUILDING'];

function PointerField(){
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current,ctx=c.getContext('2d'),p={x:-999,y:-999},trail=[];
    const dots=Array.from({length:95},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0003,vy:(Math.random()-.5)*.0003,r:Math.random()*1.7+.5}));
    let raf;
    const resize=()=>{const d=Math.min(devicePixelRatio||1,2);c.width=innerWidth*d;c.height=innerHeight*d;ctx.setTransform(d,0,0,d,0,0)};
    const move=e=>{p.x=e.clientX;p.y=e.clientY;trail.push({x:p.x,y:p.y,a:1});if(trail.length>28)trail.shift()};
    const draw=()=>{const w=innerWidth,h=innerHeight;ctx.clearRect(0,0,w,h);const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,360);g.addColorStop(0,'rgba(255,255,255,.12)');g.addColorStop(.35,'rgba(67,88,255,.12)');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);trail.forEach((q,i)=>{q.a*=.93;ctx.beginPath();ctx.arc(q.x,q.y,1+i*.12,0,7);ctx.fillStyle=`rgba(211,255,42,${q.a*.25})`;ctx.fill()});dots.forEach(d=>{d.x+=d.vx;d.y+=d.vy;if(d.x<0||d.x>1)d.vx*=-1;if(d.y<0||d.y>1)d.vy*=-1;const x=d.x*w,y=d.y*h,dist=Math.hypot(p.x-x,p.y-y);ctx.beginPath();ctx.arc(x,y,d.r,0,7);ctx.fillStyle=`rgba(255,255,255,${dist<150?.55:.16})`;ctx.fill()});raf=requestAnimationFrame(draw)};
    resize();draw();addEventListener('resize',resize);addEventListener('pointermove',move);return()=>{cancelAnimationFrame(raf);removeEventListener('resize',resize);removeEventListener('pointermove',move)};
  },[]);
  return <canvas ref={ref} className="world-field" aria-hidden="true"/>;
}

function App(){
  const [menu,setMenu]=useState(false),[hover,setHover]=useState(null),[clock,setClock]=useState('');
  useEffect(()=>{const tick=()=>setClock(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Dubai',hour:'2-digit',minute:'2-digit'}).format(new Date()));tick();const id=setInterval(tick,30000);return()=>clearInterval(id)},[]);
  const go=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})};
  return <div className="world-site">
    <PointerField/>
    <div className="world-grid" aria-hidden="true"/>
    <header className="world-header"><button className="world-logo" onClick={()=>go('home')}><span>P</span><i>S</i></button><div className="world-hud">PRESHITA SHINDE <span>·</span> {clock} GST</div><button className="world-index" onClick={()=>setMenu(true)}>INDEX <b>↗</b></button></header>
    {menu&&<motion.div className="world-menu" initial={{y:'-100%'}} animate={{y:0}} exit={{y:'-100%'}} transition={{duration:.8,ease:[.76,0,.24,1]}}><div className="menu-close"><span>PS / 2026</span><button onClick={()=>setMenu(false)}>CLOSE ×</button></div><nav>{[['01','HOME','home'],['02','ME','me'],['03','WORK','work'],['04','TABS','tabs'],['05','NOW','now']].map(([n,t,id])=><button key={id} onClick={()=>go(id)}><small>{n}</small><strong>{t}</strong><span>↗</span></button>)}</nav><a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a></div>}
    <main>
      <section className="world world-hero" id="home">
        <div className="world-corner">01 / PERSONAL WEBSITE<br/>NOT A RESUME</div><div className="world-coords">24°28' N<br/>54°22' E</div>
        <div className="hero-giant"><span>HELLO</span><strong>PRESHITA</strong><em>SHINDE</em></div>
        <motion.div className="hero-image" initial={{opacity:0,scale:.65,rotate:10}} animate={{opacity:1,scale:1,rotate:-7}} transition={{duration:1.2,type:'spring'}}><div className="image-frame"><img src={PHOTO} alt="Preshita Shinde"/></div><small>THAT'S ME / 01</small></motion.div>
        <div className="hero-bubble">CURIOUS<br/><b>BY DEFAULT</b></div><div className="scroll-cue">SCROLL TO ENTER →</div><div className="world-number">00—01</div>
      </section>

      <section className="world world-me" id="me">
        <div className="section-top"><span>02 / ME</span><span>ANOTHER WORLD</span></div>
        <div className="me-title"><small>things that make the brain go</small><h2>OH.</h2><h3>INTERESTING.</h3></div>
        <div className="me-copy"><p>CS is one thread. AI is another. Then there are people, products, research, MUN, TEDx, fashion, horror movies, stories, questions and whatever rabbit hole wins next.</p><p>I like following the interesting thing until it becomes something real.</p></div>
        <div className="me-orbit o1">AI</div><div className="me-orbit o2">PEOPLE</div><div className="me-orbit o3">QUESTIONS</div><div className="me-stamp">NO<br/>PERFECT<br/>LABEL<br/><b>YET.</b></div>
      </section>

      <section className="world world-work" id="work">
        <div className="section-top"><span>03 / THINGS I MADE</span><span>HOVER / FEEL / OPEN</span></div>
        <div className="work-intro"><div><small>RABBIT HOLES</small><h2>MADE<br/><i>REAL.</i></h2></div><p>Projects shouldn't sit inside cards.<br/>They should have a little life of their own.</p></div>
        <div className="project-list">{projects.map((p,i)=><a className={`world-project ${p.tone}`} key={p.id} href={p.href} target="_blank" rel="noreferrer" onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)}><span className="project-id">{p.id}</span><div className="project-name"><h3>{p.title}</h3><p>{p.text}</p></div><span className="project-tag">{p.label}</span><b>↗</b>{hover===i&&<motion.div className="project-world" initial={{scale:.4,opacity:0,rotate:-12}} animate={{scale:1,opacity:1,rotate:i===1?6:-5}} transition={{type:'spring',stiffness:170,damping:15}}><div className="project-glyph">{p.glyph}</div><small>{p.id} / LIVE OBJECT</small><strong>{p.title}</strong><i>OPEN ↗</i></motion.div>}</a>)}</div>
      </section>

      <section className="world world-tabs" id="tabs">
        <div className="section-top"><span>04 / OTHER TABS</span><span>DRAG THE WORDS</span></div><div className="tabs-heading"><small>my brain</small><h2>HAS<br/><i>TABS.</i></h2></div><div className="tab-field">{tabs.map((t,i)=><motion.button key={t} className={`tab tab-${i}`} drag dragElastic={.28} whileHover={{scale:1.12}} whileDrag={{scale:1.2,rotate:i%2?7:-7}}>{t}</motion.button>)}<div className="tab-note">not skills.<br/>not keywords.<br/><b>just interests.</b></div></div>
      </section>

      <section className="world world-now" id="now">
        <div className="section-top"><span>05 / NOW</span><span>LIVE STATE</span></div><div className="now-title"><small>what's happening</small><h2>RIGHT<br/><i>NOW.</i></h2></div><div className="now-list"><div><small>BUILDING</small><b>CANBOOK</b><span>product / web</span></div><div><small>EXPLORING</small><b>AI + HUMAN SYSTEMS</b><span>research / questions</span></div><div><small>DOING</small><b>MUN / TEDx / PEOPLE</b><span>organising / leading / listening</span></div><div><small>WATCHING</small><b>HORROR MOVIES</b><span>excellent decisions</span></div></div>
      </section>

      <footer className="world world-end"><div className="end-mark">PS ✦</div><div className="end-title"><small>06 / END OF INTERNET</small><h2>COME<br/><i>BACK.</i></h2></div><a className="end-mail" href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a><div className="end-bottom"><span>© 2026 PRESHITA SHINDE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>ABU DHABI</span></div></footer>
    </main>
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);