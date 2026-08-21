import { useEffect, useRef, useState } from 'react'
import './haoqi-preshtia.css'

const projects = [
  { name: 'CANBOOK', type: 'PRODUCT / BUILD', year: '2026', url: 'https://canbook.vercel.app/', note: 'Canteen pre-ordering and demand management.' },
  { name: 'BRIDGEAI', type: 'RESEARCH / BUILD', year: '2026', url: 'https://bridge-ai-research--raevn.replit.app/', note: 'Independent study of AI text simplification, comprehension and confidence.' },
  { name: 'TEDxGIIS ABU DHABI YOUTH', type: 'EVENT / CURATION', year: '2026', url: '#', note: 'Speaker curation and experience design for Beyond the Obvious.' },
]

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()))
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])
  return <span>GST · ABU DHABI · {time}</span>
}

function App() {
  const root = useRef(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [progress, setProgress] = useState(0)
  const [sound, setSound] = useState(false)
  const [theme, setTheme] = useState(false)

  useEffect(() => {
    const move = e => setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY + window.scrollY) })
    const scroll = () => setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))
    window.addEventListener('pointermove', move); window.addEventListener('scroll', scroll, { passive: true }); scroll()
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('scroll', scroll) }
  }, [])

  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]')]
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-in')), { threshold: .15 })
    els.forEach(el => io.observe(el)); return () => io.disconnect()
  }, [])

  return <div ref={root} className={`site ${theme ? 'theme-alt' : ''}`}>
    <div className="flower-field" aria-hidden="true">
      <i className="flower f1"/><i className="flower f2"/><i className="flower f3"/><i className="flower f4"/>
      <div className="grain"/>
    </div>

    <header className="hud">
      <a className="brand" href="#top" aria-label="Preshita home"><span className="mark">P</span><span>PRESHITA©2026</span></a>
      <nav><a href="#work">WORK</a><a href="#contact">CONTACT</a></nav>
      <div className="utilities"><button onClick={() => setTheme(v => !v)}>THEME[{theme ? 'B' : 'A'}]</button><button onClick={() => setSound(v => !v)}>SOUND[{sound ? '●' : '|'}]</button></div>
      <div className="telemetry"><Clock/><br/>{String(coords.x).padStart(4,'0')} X {String(coords.y).padStart(4,'0')} Y</div>
    </header>

    <main id="top">
      <section className="hero world" data-world="01">
        <div className="world-index">01 / 04<br/>ABU DHABI, UAE</div>
        <div className="hero-copy">
          <p className="eyebrow">STUDENT · BUILDER · RESEARCHER</p>
          <h1>I LIKE MAKING<br/><span>THINGS HAPPEN.</span></h1>
          <p className="intro">I’m Preshita — a student in Abu Dhabi building, researching and organizing things across technology, design and people.</p>
        </div>
        <div className="floating-word word-a">CURIOUS</div><div className="floating-word word-b">BUILD</div><div className="floating-word word-c">WHY?</div>
        <div className="scroll-cue">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="manifesto world" data-world="02">
        <div className="world-index">02 / 04<br/>THE RABBIT HOLE</div>
        <div className="manifesto-line" data-reveal><span>I SEE</span><strong>A PROBLEM.</strong></div>
        <div className="manifesto-line offset" data-reveal><span>THEN I ASK</span><strong>WHY?</strong></div>
        <div className="manifesto-line" data-reveal><span>THEN, USUALLY,</span><strong>I BUILD.</strong></div>
        <div className="orbit"><b>AI</b><b>RESEARCH</b><b>DESIGN</b><b>MUN</b><b>TEDx</b><b>PRODUCT</b><b>QUESTIONS</b></div>
      </section>

      <section className="work world" id="work" data-world="03">
        <div className="world-index">03 / 04<br/>SELECTED WORK</div>
        <div className="work-head"><span>THINGS I MADE / HELPED MAKE</span><span>2026—</span></div>
        <div className="project-list">
          {projects.map((p, i) => <a data-reveal className={`project p${i}`} href={p.url} target={p.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer" key={p.name}>
            <div className="project-title"><small>{p.type}</small><h2>{p.name}</h2></div>
            <div className="project-note">{p.note}</div><div className="project-year">{p.year} ↗</div>
          </a>)}
        </div>
      </section>

      <section className="now world" data-world="04">
        <div className="world-index">04 / 04<br/>CURRENTLY</div>
        <div className="now-grid"><span>BUILDING</span><strong>CANBOOK</strong><span>RESEARCHING</span><strong>BRIDGEAI</strong><span>CURATING</span><strong>TEDxGIIS</strong><span>LEARNING</span><strong>WHATEVER'S NEXT</strong></div>
        <div className="marquee">CURIOUS · BUILDING · RESEARCHING · ORGANIZING · QUESTIONING · CURIOUS · BUILDING · RESEARCHING ·</div>
      </section>
    </main>

    <footer id="contact" className="footer">
      <p>ANYWAY. HI.</p><h2>LET'S MAKE<br/>SOMETHING<br/><em>INTERESTING.</em></h2>
      <a href="mailto:preshita.shinde@gmail.com">preshita.shinde@gmail.com ↗</a>
      <div className="footer-bottom"><span>© PRESHITA SHINDE 2026</span><span>ABU DHABI · UAE</span></div>
    </footer>
    <div className="progress"><span style={{ transform: `scaleY(${Math.max(.04, progress)})` }}/></div>
  </div>
}
export default App
