import React,{useEffect,useRef,useState}from'react';
import{createRoot}from'react-dom/client';
import'./experience.css';

const PHOTO='https://drive.google.com/thumbnail?id=1dqoD_71QrvzLj8SpuukZhQsBSvtXtzqe&sz=w1600';
const projects=[
 {id:'01',title:'CanBook',tag:'PRODUCT / WEB',desc:'A canteen problem turned into something people can actually use.',href:'https://canbook.vercel.app/',tone:'orange',label:'OPEN CANBOOK'},
 {id:'02',title:'BridgeAI',tag:'AI / ACCESSIBILITY',desc:'Researching how AI can make difficult information easier to understand.',href:'https://bridge-ai-research--raevn.replit.app/',tone:'violet',label:'OPEN BRIDGEAI'},
 {id:'03',title:'Research',tag:'AI / ML / QUESTIONS',desc:'Following questions after the obvious answers stop being interesting.',href:'https://bridge-ai-research--raevn.replit.app/',tone:'lime',label:'EXPLORE'}
];
const interests=['AI','MUN','TEDx','HORROR','FASHION','MAKEUP','PEOPLE','STORIES','DESIGN','RESEARCH','QUESTIONS','BUILDING'];

function App(){
 const[menu,setMenu]=useState(false),[cursor,setCursor]=useState({x:-100,y:-100}),[cursorText,setCursorText]=useState('MOVE'),[active,setActive]=useState('01');
 const scrollRef=useRef(0);
 useEffect(()=>{
  const move=e=>setCursor({x:e.clientX,y:e.clientY});
  const scroll=()=>{scrollRef.current=window.scrollY;document.documentElement.style.setProperty('--scroll',`${window.scrollY}px`)};
  addEventListener('pointermove',move,{passive:true});addEventListener('scroll',scroll,{passive:true});scroll();
  const els=[...document.querySelectorAll('[data-id]')];
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('seen')}),{threshold:.18});els.forEach(e=>io.observe(e));
  return()=>{removeEventListener('pointermove',move);removeEventListener('scroll',scroll);io.disconnect()};
 },[]);
 const go=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'});};
 return <div className="site">
  <div className="noise"/><div className="cursor" style={{left:cursor.x,top:cursor.y}}><span>{cursorText}</span></div>
  <div className="progress"><i/></div>
  <header className="nav">
   <button className="brand" onClick={()=>go('home')} onMouseEnter={()=>setCursorText('HOME')} onMouseLeave={()=>setCursorText('MOVE')}><strong>PS</strong><span>PRESHITA<br/>SHINDE</span></button>
   <div className="nav-center">A PERSONAL INTERNET / 2026</div>
   <button className="index" onClick={()=>setMenu(true)} onMouseEnter={()=>setCursorText('OPEN')} onMouseLeave={()=>setCursorText('MOVE')}>INDEX <b>+</b></button>
  </header>
  <aside className={`drawer ${menu?'open':''}`}><button onClick={()=>setMenu(false)}>CLOSE <b>×</b></button><p>YOU ARE HERE.</p><h2>PRESHITA'S<br/><em>INTERNET.</em></h2><nav>{[['01','HOME','home'],['02','ABOUT','about'],['03','BUILT','work'],['04','TABS','tabs'],['05','NOW','now'],['06','CONTACT','contact']].map(x=><button key={x[2]} onClick={()=>go(x[2])}><small>{x[0]}</small><span>{x[1]}</span><i>↗</i></button>)}</nav><a href="mailto:preshitashinde09@gmail.com">preshitashinde09@gmail.com ↗</a></aside>

  <main>
   <section id="home" data-id="01" className="world world-home">
    <div className="home-grid"/><div className="home-sun"/><div className="home-orbit o1"/><div className="home-orbit o2"/>
    <div className="home-meta"><span>ABU DHABI, UAE</span><span>12°58' N / 77°35' E</span></div>
    <div className="home-copy"><div className="tiny">WELCOME TO MY SIDE OF THE INTERNET</div><h1>PRESHITA<br/><em>SHINDE</em></h1><p>I build things.<br/>I ask questions.<br/>I get distracted beautifully.</p></div>
    <figure className="portrait" onMouseEnter={()=>setCursorText('THAT’S ME')} onMouseLeave={()=>setCursorText('MOVE')}><div><img src={PHOTO} alt="Preshita Shinde"/><b>PS / 01</b></div><figcaption>human / curious / currently online</figcaption></figure>
    <div className="home-bottom"><span>AI · PEOPLE · PRODUCTS · QUESTIONS</span><b>SCROLL TO ENTER ↓</b></div>
    <div className="home-sticker">NOT A RESUME<br/><em>AN EXPERIENCE.</em></div>
   </section>

   <section className="portal portal-blue"><div className="portal-ring r1"/><div className="portal-ring r2"/><div className="portal-word">ABOUT<br/><em>ME</em></div><span>KEEP SCROLLING / YOU'RE MOVING THROUGH THE SITE</span></section>

   <section id="about" data-id="02" className="world about-world">
    <div className="label"><span>02</span><b>ABOUT.TXT</b><span>READ / LOOK / MOVE</span></div>
    <div className="about-map"><div className="map-line l1"/><div className="map-line l2"/><div className="map-dot d1"/><div className="map-dot d2"/><div className="map-dot d3"/></div>
    <div className="about-title"><span>THE SHORT VERSION</span><h2>I LIKE<br/><em>QUESTIONS.</em></h2></div>
    <div className="about-note note-one">CS is one part.<br/>Building is another.</div>
    <div className="about-copy"><p>I'm curious about AI, people, products, research, stories, fashion, horror movies and whatever weird thing catches my attention next.</p><p>I care more about <em>what could be</em> than having the perfect label for what I am.</p></div>
    <div className="about-tape">CURIOUS / HUMAN / EXPERIMENTAL / A LITTLE CHAOTIC</div>
   </section>

   <section className="portal portal-paper"><div className="paper-window"><span>loading://things-i-built</span><b>×</b><i/><i/><i/></div><strong>THINGS<br/><em>I BUILD.</em></strong></section>

   <section id="work" data-id="03" className="world work-world">
    <div className="label"><span>03</span><b>WORK / CLICK TO OPEN</b><span>03 OBJECTS</span></div>
    <div className="work-head"><span>MADE IT OUT OF MY HEAD.</span><h2>I BUILD<br/><em>THINGS.</em></h2><p>Real projects, not project-shaped paragraphs. Click one and leave this site.</p></div>
    <div className="project-stack">{projects.map((p,i)=><a key={p.id} href={p.href} target="_blank" rel="noreferrer" className={`project-window ${p.tone}`} style={{'--i':i}} onMouseEnter={()=>setCursorText('OPEN')} onMouseLeave={()=>setCursorText('MOVE')}>
      <div className="window-bar"><span><i/><i/><i/></span><small>{p.id} / {p.tag}</small><b>↗</b></div><div className="window-body"><div className="project-num">{p.id}</div><div><h3>{p.title}</h3><p>{p.desc}</p><span>{p.label} ↗</span></div><div className="project-art"><div className="art-orbit"/><strong>{p.title.slice(0,2).toUpperCase()}</strong></div></div>
    </a>)}</div>
   </section>

   <section className="portal portal-pink"><div className="pink-type">OTHER<br/><em>TABS.</em></div><div className="pink-marquee">MUN · TEDx · HORROR · FASHION · MAKEUP · PEOPLE · STORIES · DESIGN · AI · RESEARCH ·</div></section>

   <section id="tabs" data-id="04" className="world tabs-world">
    <div className="label"><span>04</span><b>MY OTHER TABS</b><span>MOVE YOUR CURSOR</span></div><div className="tabs-heading"><span>MY BRAIN IS</span><h2>OPEN<br/><em>24/7.</em></h2></div>
    <div className="interest-orbit">{interests.map((x,i)=><span key={x} style={{'--n':i}} onMouseEnter={()=>setCursorText(x)} onMouseLeave={()=>setCursorText('MOVE')}>{x}</span>)}</div>
    <div className="tabs-center"><small>NONE OF THESE ARE SKILLS.</small><strong>THEY'RE<br/>RABBIT HOLES.</strong><span>01 — 12</span></div>
    <div className="tabs-bottom">MUN → TEDx → HEAD GIRL → BUILDING → RESEARCH → PEOPLE → STORIES →</div>
   </section>

   <section className="portal portal-night"><div className="night-floor"/><div className="night-copy">RIGHT NOW<br/><em>→</em></div><span>SCROLL / CONTINUE</span></section>

   <section id="now" data-id="05" className="world now-world">
    <div className="label"><span>05</span><b>NOW / LIVE</b><span>2026</span></div><div className="now-title"><span>CURRENTLY SOMEWHERE BETWEEN</span><h2>BUILDING<br/><em>AND</em><br/>FIGURING<br/>IT OUT.</h2></div>
    <div className="now-list"><div><small>BUILDING</small><b>CANBOOK</b><span>product / web</span></div><div><small>EXPLORING</small><b>AI + HUMAN SYSTEMS</b><span>research / questions</span></div><div><small>DOING</small><b>MUN / TEDx / PEOPLE</b><span>leading / listening</span></div><div><small>WATCHING</small><b>HORROR MOVIES</b><span>excellent decisions</span></div></div>
   </section>

   <section className="portal portal-final"><div className="final-window"><span>preshita@internet:~$</span><strong>./say-goodbye</strong><i>thanks for visiting.</i></div></section>

   <footer id="contact" data-id="06" className="world contact-world">
    <div className="label"><span>06</span><b>CONTACT / END</b><span>PS / 2026</span></div><div className="contact-wrap"><div><span>YOU FOUND ME.</span><h2>LET'S<br/><em>TALK.</em></h2></div><a href="mailto:preshitashinde09@gmail.com" onMouseEnter={()=>setCursorText('EMAIL')} onMouseLeave={()=>setCursorText('MOVE')}>preshitashinde09@gmail.com <b>↗</b></a></div><div className="contact-foot"><span>ABU DHABI / UAE</span><a href="https://github.com/raevn45" target="_blank" rel="noreferrer">GITHUB ↗</a><span>END OF INTERNET.</span></div>
   </footer>
  </main>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
