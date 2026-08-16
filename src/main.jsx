import React,{useEffect,useRef,useState}from'react';
import{createRoot}from'react-dom/client';
import'./site.css';

const PHOTO='https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';
const projects=[
 {n:'01',title:'CANBOOK',type:'PRODUCT / WEB',copy:'A real-world canteen problem turned into a product.',href:'https://canbook.vercel.app/',tone:'red'},
 {n:'02',title:'BRIDGEAI',type:'AI / ACCESSIBILITY',copy:'Exploring how AI can make difficult information easier to understand.',href:'https://bridge-ai-research--raevn.replit.app/',tone:'blue'},
 {n:'03',title:'RESEARCH',type:'AI / ML / QUESTIONS',copy:'Following questions after the obvious answers stop being interesting.',href:'https://bridge-ai-research--raevn.replit.app/',tone:'yellow'}
];
const tabs=['AI','MUN','TEDx','HORROR','FASHION','MAKEUP','PEOPLE','STORIES','DESIGN','RESEARCH','QUESTIONS','BUILDING'];

function App(){
 const[menu,setMenu]=useState(false),[active,setActive]=useState('HOME'),[mouse,setMouse]=useState({x:-100,y:-100}),[hover,setHover]=useState('');
 const drag=useRef(null);
 useEffect(()=>{const onMove=e=>setMouse({x:e.clientX,y:e.clientY});addEventListener('pointermove',onMove,{passive:true});return()=>removeEventListener('pointermove',onMove)},[]);
 useEffect(()=>{const sections=[...document.querySelectorAll('[data-section]')];const io=new IntersectionObserver(es=>{const hit=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(hit)setActive(hit.target.dataset.section)},{threshold:.45});sections.forEach(s=>io.observe(s));return()=>io.disconnect()},[]);
 const go=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})};
 const startDrag=(e,i)=>{drag.current={i,dx:e.clientX,dy:e.clientY,el:e.currentTarget};e.currentTarget.setPointerCapture?.(e.pointerId)};
 const dragMove=e=>{if(!drag.current)return;const d=drag.current;d.el.style.setProperty('--dx',`${e.clientX-d.dx}px`);d.el.style.setProperty('--dy',`${e.clientY-d.dy}px`)};
 const endDrag=()=>{if(drag.current){drag.current.el.style.setProperty('--dx','0px');drag.current.el.style.setProperty('--dy','0px');drag.current=null}};
 return <div className="app" onPointerMove={dragMove} onPointerUp={endDrag}>
  <div className="grain"/><div className="cursor" style={{left:mouse.x,top:mouse.y}}><span>{hover||'MOVE'}</span></div>
  <header className="topbar"><button className="logo" onClick={()=>go('home')} onMouseEnter={()=>setHover('HOME')} onMouseLeave={()=>setHover('')}><b>PS</b><span>PRESHITA<br/>SHINDE</span></button><div className="ticker">PERSONAL WEBSITE / 2026 / ABU DHABI / <i>STAY CURIOUS</i></div><button className="menu-btn" onClick={()=>setMenu(true)} onMouseEnter={()=>setHover('INDEX')} onMouseLeave={()=>setHover('')}>INDEX <b>+</b></button></header>
  <div className={`index-panel ${menu?'is-open':''}`}><button className="close" onClick={()=>setMenu(false)}>CLOSE ×</button><div className="index-intro">YOU ARE INSIDE<br/><strong>PRESHITA'S<br/>INTERNET.</strong></div><nav>{[['01','HOME','home'],['02','ABOUT','about'],['03','BUILT','work'],['04','OTHER TABS','life'],['05','NOW','now'],['06','CONTACT','contact']].map(x=><button key={x[2]} onClick={()=>go(x[2])}><small>{x[0]}</small><span>{x[1]}</span><i>↗</i></button>)}</nav><div className="index-foot"><span>SCROLL IS THE INTERFACE.</span><a href="mailto:preshitashinde09@gmail.com">EMAIL ↗</a></div></div>
  <main>
   <section id="home" data-section="HOME" className="scene hero">
    <div className="hero-orbit orbit-a"/><div className="hero-orbit orbit-b"/><div className="hero-star">✳</div>
    <div className="hero-stamp">PERSONAL<br/>INTERNET<br/><small>EST. 2026</small></div>
    <div className="hero-copy"><p className="eyebrow">HELLO, I'M</p><h1>PRESHITA<br/><em>SHINDE.</em></h1><p className="hero-line">I build things, ask too many questions,<br/>and follow interesting rabbit holes.</p></div>
    <figure className="hero-photo" onMouseEnter={()=>setHover('LOOK')} onMouseLeave={()=>setHover('')}><div className="photo-frame"><img src={PHOTO} alt="Preshita Shinde"/><span>THAT'S ME →</span></div><figcaption>01 / human behind the tabs</figcaption></figure>
    <div className="hero-foot"><span>AI / PEOPLE / PRODUCTS / QUESTIONS</span><b>SCROLL ↓</b></div>
    <div className="side-note">NOT A RESUME<br/>NOT A BRAND<br/><strong>JUST ME.</strong></div>
   </section>

   <section className="transition transition-one" aria-hidden="true"><div className="portal"><span>KEEP GOING</span><b>↓</b></div><div className="giant-word">CURIOUS</div></section>

   <section id="about" data-section="ABOUT" className="scene about">
    <div className="section-head"><span>02</span><b>ABOUT / NOT THE LINKEDIN VERSION</b><span>SCROLL + LOOK</span></div>
    <div className="about-layout"><div className="about-big">I LIKE<br/><em>QUESTIONS.</em></div><div className="about-copy"><p className="huge">Curious about AI, people, products, research, stories, fashion, horror movies and whatever weird thing catches my attention next.</p><p>CS is one part of it. Building is another. People are another. I don't want to reduce all of that to one job title.</p><div className="hand-note">← THIS IS PROBABLY<br/>WHY I HAVE SO MANY TABS OPEN.</div></div></div>
    <div className="about-strip"><span>CURIOUS</span><span>HUMAN</span><span>EXPERIMENTAL</span><span>STILL FIGURING IT OUT</span></div>
    <div className="about-number">02</div>
   </section>

   <section className="transition transition-paper" aria-hidden="true"><div className="paper-lines"/><div className="falling">THINGS<br/><i>START<br/>HERE.</i></div></section>

   <section id="work" data-section="BUILT" className="scene work">
    <div className="section-head"><span>03</span><b>THINGS I BUILT</b><span>OPEN A PROJECT ↗</span></div>
    <div className="work-intro"><div><span>NO GIANT LIST.</span><h2>I<br/><em>BUILD.</em><br/>THINGS.</h2></div><p>Small problems. Weird ideas. Lots of trying. These are the things that made it out of my head and onto the internet.</p></div>
    <div className="projects">{projects.map(p=><a className={`project ${p.tone}`} key={p.n} href={p.href} target="_blank" rel="noreferrer" onMouseEnter={()=>setHover('OPEN')} onMouseLeave={()=>setHover('')}><span className="project-no">{p.n}</span><div className="project-info"><small>{p.type}</small><h3>{p.title}</h3><p>{p.copy}</p></div><div className="project-shape"><i/><b>↗</b></div></a>)}</div>
    <div className="work-footer">THE LINKS ABOVE LEAVE THIS SITE.<span>THAT'S THE POINT.</span></div>
   </section>

   <section className="transition transition-color" aria-hidden="true"><div className="spin-copy">OPEN<br/><em>OTHER<br/>TABS.</em></div><div className="ticker-big">MUN / TEDx / HORROR / FASHION / MAKEUP / PEOPLE / STORIES / DESIGN / AI / RESEARCH /</div></section>

   <section id="life" data-section="OTHER TABS" className="scene life">
    <div className="section-head"><span>04</span><b>THE OTHER TABS</b><span>DRAG THEM</span></div><div className="life-title"><span>MY BRAIN IS</span><h2>OPEN<br/><em>24/7.</em></h2></div>
    <div className="tab-cloud">{tabs.map((t,i)=><button key={t} className={`tab t${i}`} onPointerDown={e=>startDrag(e,i)} onMouseEnter={()=>setHover('DRAG')} onMouseLeave={()=>setHover('')}><span>{String(i+1).padStart(2,'0')}</span>{t}</button>)}</div>
    <div className="life-center">NONE OF THESE ARE<br/><strong>SKILLS.</strong><small>THEY'RE RABBIT HOLES.</small></div>
    <div className="life-rail">MUN → TEDx → HEAD GIRL → BUILDING → RESEARCH → PEOPLE → STORIES →</div>
   </section>

   <section className="transition transition-night" aria-hidden="true"><div className="night-grid"/><div className="night-line">RIGHT NOW / RIGHT HERE / KEEP SCROLLING</div><div className="night-star">✦</div></section>

   <section id="now" data-section="NOW" className="scene now">
    <div className="section-head"><span>05</span><b>RIGHT NOW</b><span>LIVE / 2026</span></div><div className="now-wrap"><div className="now-title"><span>CURRENTLY SOMEWHERE BETWEEN</span><h2>BUILDING<br/><em>AND</em><br/>FIGURING<br/>IT OUT.</h2></div><div className="now-cards"><div><small>BUILDING</small><b>CANBOOK</b><p>product / web</p></div><div><small>EXPLORING</small><b>AI + HUMAN SYSTEMS</b><p>research / questions</p></div><div><small>DOING</small><b>MUN / TEDx / PEOPLE</b><p>leading / listening</p></div><div><small>WATCHING</small><b>HORROR MOVIES</b><p>excellent decisions</p></div></div></div>
   </section>

   <section className="transition transition-final" aria-hidden="true"><div className="final-orbit"/><span>ONE LAST THING →</span></section>

   <footer id="contact" data-section="CONTACT" className="scene contact"><div className="contact-top"><span>06 / END</span><span>YOU MADE IT.</span><span>PS / 2026</span></div><div className="contact-body"><div><span>IF YOU MADE IT THIS FAR,</span><h2>LET'S<br/><em>TALK.</em></h2></div><a className="email" href="mailto:preshitashinde09@gmail.com" onMouseEnter={()=>setHover('EMAIL')} onMouseLeave={()=>setHover('')}>preshitashinde09@gmail.com <b>↗</b></a></div><div className="contact-bottom"><span>ABU DHABI / UAE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>COME BACK SOON.</span></div></footer>
  </main>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
