import { FormEvent, useEffect, useRef, useState } from 'react'
import Background from './Background'
import { CERTS, EMAIL, LINKS, PHONE, PROJECTS, ROLES, SKILLS, Project } from './data'

const NAV = ['about', 'skills', 'experience', 'projects', 'education', 'certs', 'contact']
const LABEL: Record<string, string> = { certs: 'Certifications' }

function useTyping(words: string[]) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) { setText(words.join(' · ')); return }
    let wi = 0, ci = 0, del = false, t: number
    const tick = () => {
      const w = words[wi]; ci += del ? -1 : 1; setText(w.slice(0, ci))
      let d = del ? 35 : 80
      if (!del && ci === w.length) { del = true; d = 1400 } else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; d = 350 }
      t = window.setTimeout(tick, d)
    }
    tick(); return () => clearTimeout(t)
  }, [words])
  return text
}

function ProjectCard({ p, id }: { p: Project; id: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button className="card proj" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
      <h3>{p.name}</h3>
      <p style={{ margin: '0 0 10px', color: 'var(--muted)', fontSize: 14 }}>{p.tech}</p>
      <p style={{ margin: 0, color: 'var(--muted)' }}>{p.desc}</p>
      {p.stat && <span className="stat">{p.stat}</span>}
      <span className="hint">{open ? 'Hide details' : 'View details'}</span>
      <div className="more" id={id}>
        <p><b>Problem it solves:</b> {p.problem}</p>
        <p><b>My contribution:</b> {p.role}</p>
        {p.github && <p><a href={p.github} target="_blank" rel="noreferrer">GitHub repository</a></p>}
        {p.live && <p><a href={p.live} target="_blank" rel="noreferrer">Live project</a></p>}
      </div>
    </button>
  )
}

export default function App() {
  const role = useTyping(ROLES)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('')
  const [showTop, setShowTop] = useState(false)
  const [photoOk, setPhotoOk] = useState(true)
  const [msg, setMsg] = useState('This opens your email app with the message filled in. Nothing is sent from this page.')
  const bar = useRef<HTMLDivElement>(null)
  const cur = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .1 })
    document.querySelectorAll('.rv').forEach(e => io.observe(e))
    const onScroll = () => {
      const h = document.documentElement
      if (bar.current) bar.current.style.width = (scrollY / (h.scrollHeight - innerHeight)) * 100 + '%'
      setShowTop(scrollY > 600)
      let c = ''; document.querySelectorAll('main section[id]').forEach(s => { if (s.getBoundingClientRect().top < 200) c = s.id }); setActive(c)
    }
    const onMove = (e: MouseEvent) => { if (cur.current) { cur.current.style.left = e.clientX + 'px'; cur.current.style.top = e.clientY + 'px' } }
    const onOver = (e: MouseEvent) => cur.current?.classList.toggle('big', !!(e.target as Element).closest('a,button,.card'))
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('mousemove', onMove); document.addEventListener('mouseover', onOver)
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver) }
  }, [])

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const n = String(f.get('name') || '').trim(), em = String(f.get('email') || '').trim(), m = String(f.get('message') || '').trim()
    if (!n || !m || !/^\S+@\S+\.\S+$/.test(em)) { setMsg('Please enter your name, a valid email and a message.'); return }
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio message from ' + n)}&body=${encodeURIComponent(m + '\n\nReply to: ' + em)}`
    setMsg('Your email app should open now. Send the message from there.')
  }

  return (
    <>
      <Background /><div id="bar" ref={bar} /><div id="cur" ref={cur} />
      <header>
        <a className="logo" href="#home">Tejus.</a>
        <button id="burger" aria-expanded={menu} aria-controls="menu" onClick={() => setMenu(!menu)}>Menu</button>
        <nav aria-label="Main"><ul id="menu" className={menu ? 'open' : ''}>
          {NAV.map(n => <li key={n}><a href={'#' + n} className={active === n ? 'on' : ''} onClick={() => setMenu(false)}>{LABEL[n] || n[0].toUpperCase() + n.slice(1)}</a></li>)}
        </ul></nav>
      </header>
      <main id="home">
        <section className="hero">
          <div className="hero-text">
            <p className="hello">Hi, I'm</p>
            <h1>Tejus Kumar Verma</h1>
            <p className="role">{role}</p>
            <p className="lead">Third-year B.Tech student specialising in AI and Machine Learning. I build Python applications, machine learning pipelines and web projects, and I have completed internships in both AI and web development.</p>
            <p className="meta">Gorakhpur, Uttar Pradesh, India</p>
            <div className="btns">
              <a className="btn pri" href="#projects">Explore projects</a>
              <a className="btn" href="/resume.pdf" download="Tejus_Kumar_Verma_Resume.pdf">Download resume</a>
              {LINKS.github && <a className="btn" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>}
              {LINKS.linkedin && <a className="btn" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            </div>
          </div>
          <div className="photo">
            {photoOk ? <img src="/photo.jpg" alt="Tejus Kumar Verma" onError={() => setPhotoOk(false)} /> : <><span>TV</span><small>Add public/photo.jpg</small></>}
          </div>
        </section>

        <section id="about" className="rv">
          <h2>About me</h2>
          <div className="about">
            <div>
              <p>I'm a Computer Science and Engineering student at Roorkee Institute of Technology, specialising in Artificial Intelligence and Machine Learning. I enjoy turning data into working predictions and turning ideas into usable software.</p>
              <p>My experience covers a machine learning internship at Codec Technologies, where I built a customer churn prediction model, and a web development internship at Thiranex EduTech, where I built e-commerce and portfolio sites and a billing application.</p>
              <p>I'm looking for opportunities in software development, Python, and applied AI and machine learning, where I can keep learning while contributing to real projects.</p>
            </div>
            <div className="card">
              <h3>Strengths</h3>
              <ul className="tags c">{['Analytical thinking', 'Problem solving', 'Team collaboration', 'Communication', 'Adaptability'].map(s => <li key={s}>{s}</li>)}</ul>
              <h3 style={{ marginTop: 20 }}>Languages</h3>
              <ul className="tags"><li>English</li><li>Hindi</li></ul>
            </div>
          </div>
        </section>

        <section id="skills" className="rv">
          <h2>Technical skills</h2>
          <div className="grid">{Object.entries(SKILLS).map(([k, v]) => <div className="card" key={k}><h3>{k}</h3><ul className="tags c">{v.map(x => <li key={x}>{x}</li>)}</ul></div>)}</div>
        </section>

        <section id="experience" className="rv">
          <h2>Internship experience</h2>
          <div className="tl">
            <article className="card">
              <p className="when">13 Jul – 14 Aug 2026</p><h3>Artificial Intelligence Intern</h3>
              <p className="org">Codec Technologies Pvt. Ltd. (AICTE &amp; ICAC approved programme)</p>
              <ul><li>Completed a one-month AI internship under an AICTE and ICAC approved programme.</li><li>Developed a Customer Churn Prediction project using Python and machine learning.</li><li>Performed data preprocessing, exploratory data analysis, model training and performance evaluation.</li></ul>
              <ul className="tags c">{['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit'].map(t => <li key={t}>{t}</li>)}</ul>
            </article>
            <article className="card">
              <p className="when">Jul – Aug 2026</p><h3>Web Development Intern</h3>
              <p className="org">Thiranex EduTech LLP</p>
              <ul><li>Worked on portfolio and e-commerce website development, focusing on user interface and functionality.</li><li>Developed billing software for SD Wellers.</li><li>Applied web development and software engineering concepts to practical applications.</li></ul>
              <ul className="tags c">{['HTML', 'CSS', 'JavaScript'].map(t => <li key={t}>{t}</li>)}</ul>
            </article>
          </div>
        </section>

        <section id="projects" className="rv">
          <h2>Projects</h2>
          <div className="grid">{PROJECTS.map((p, i) => <ProjectCard key={p.name} p={p} id={'d' + i} />)}</div>
          <p className="note" style={{ marginTop: 16 }}>Add repository and live links in src/data.ts (github / live fields).</p>
        </section>

        <section id="education" className="rv">
          <h2>Education</h2>
          <div className="tl"><article className="card">
            <p className="when">2024 – 2028 · Currently in 3rd year</p>
            <h3>Bachelor of Technology, Computer Science and Engineering</h3>
            <p className="org">Specialisation: Artificial Intelligence &amp; Machine Learning<br />Roorkee Institute of Technology, Roorkee</p>
            <span className="stat">CGPA: 6.5 / 10</span>
          </article></div>
        </section>

        <section id="certs" className="rv">
          <h2>Certifications</h2>
          <div className="grid">{CERTS.map(([n, o]) => <div className="card cert" key={n}><h3>{n}</h3><p>{o}</p></div>)}</div>
        </section>

        <section id="contact" className="rv">
          <h2>Contact</h2>
          <div className="contact">
            <div>
              <p>Email: <a href={'mailto:' + EMAIL}>{EMAIL}</a></p>
              <p>Phone: <a href={'tel:' + PHONE.replace(/\s/g, '')}>{PHONE}</a></p>
              <p>Location: Gorakhpur, Uttar Pradesh, India</p>
            </div>
            <form onSubmit={submit} noValidate>
              <label>Name<input name="name" required autoComplete="name" /></label>
              <label>Email<input name="email" type="email" required autoComplete="email" /></label>
              <label>Message<textarea name="message" required /></label>
              <button className="btn pri" type="submit">Open in email app</button>
              <p className="note" role="status">{msg}</p>
            </form>
          </div>
        </section>
      </main>
      <footer>Designed and built for Tejus Kumar Verma · 2026</footer>
      <button id="top" className={showTop ? 'show' : ''} aria-label="Back to top" onClick={() => scrollTo({ top: 0 })}>↑</button>
    </>
  )
}
