import React, {useEffect, useRef, useState} from 'react';
import {assets as a} from './assets.js';
import Awards from './Awards.jsx';

const features = [
  ['Role system', 'A role-based system divided between VR and the website, allowing both players to experience different perspectives.'],
  ['Tutorial', 'A tutorial system that guides players to understand the mechanics and play through the entire game.'],
  ['Difficulty level', 'There are three difficulty levels, each containing 5 seeds, allowing players to choose the level that best suits their abilities.'],
  ['Mini-games', 'Mini-games are themed around The Leader, where players receive information to assist The Caretaker.'],
  ['SEED System', 'A system that connects VR and the website, enabling both platforms to interact and play together.'],
  ['Missions', 'A mission system where both roles must cooperate to survive. It consists of BLACKOUT, BREATH, and DROUGHT.'],
];

function Logo({className = ''}) {
  return <span className={`logo ${className}`}><img src={a.imgImg4603} alt="AfterDay Horizon" /></span>;
}

function Pill({href, children, icon, className = '', ...props}) {
  const Tag = href ? 'a' : 'button';
  return <Tag {...props} href={href} className={`pill ${className}`}>{icon && <img src={icon} alt="" />}{children}</Tag>;
}

function SectionTitle({children, eyebrow = 'AfterDay Horizon', className = ''}) {
  return <header className={`section-title ${className}`}>
    {eyebrow && <p className="section-eyebrow"><span aria-hidden="true" />{eyebrow}</p>}
    <h2>{children}<span className="title-dot" aria-hidden="true">.</span></h2>
  </header>;
}

function Gallery({initial, label, openImage}) {
  const [index, setIndex] = useState(0);
  const pictures = initial === a.imgContainer1 ? [a.imgContainer1, a.imgContainer] : [a.imgContainer, a.imgContainer1];
  function step(amount) {setIndex(n => (n + amount + 9) % 9);}
  const picture = pictures[index % pictures.length];
  return <div className="gallery" role="region" aria-label={label} tabIndex="0" onKeyDown={e => {if(e.key === 'ArrowRight') step(1); if(e.key === 'ArrowLeft') step(-1);}}>
    <button className="gallery-image" onClick={() => openImage(picture, label)} aria-label={`Enlarge ${label}`}>
      {index === 0 && initial === a.imgContainer1 && <img className="gallery-underlay" src={a.imgContainer} alt="" />}
      <img src={picture} alt={label} />
    </button>
    <button className="gallery-arrow previous" onClick={() => step(-1)} aria-label={`Previous ${label}`}><img src={a.imgIcon} alt="" /></button>
    <button className="gallery-arrow next" onClick={() => step(1)} aria-label={`Next ${label}`}><img src={a.imgIcon1} alt="" /></button>
    <div className="gallery-dots" aria-label={`${label} slides`}>{Array.from({length: 9}, (_, i) => <button key={i} className={i === index ? 'selected' : ''} aria-label={`Show ${label} view ${i + 1}`} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)} />)}</div>
  </div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const dialog = useRef(null);
  const language = useRef(null);
  useEffect(() => {
    const close = e => {if(e.key === 'Escape'){setLanguageOpen(false); setMenuOpen(false);}};
    const outside = e => {if(language.current && !language.current.contains(e.target)) setLanguageOpen(false);};
    document.addEventListener('keydown', close); document.addEventListener('pointerdown', outside);
    return () => {document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside);};
  }, []);
  useEffect(() => {if(lightbox) dialog.current?.showModal(); else dialog.current?.close();}, [lightbox]);
  const openImage = (src, alt) => setLightbox({src, alt});
  const links = [['About', '#about'], ['Design', '#design'], ['certificate', '#certificate'], ['Demo', '#demo']];
  return <>
    <header className="header" id="home">
      <a href="#home" aria-label="AfterDay Horizon home"><Logo className="nav-logo" /></a>
      <nav className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation">{links.map(([text, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{text}</a>)}</nav>
      <div className="header-actions">
        <Pill href="#contact" className="contact-button">Contact Us</Pill>
        <div className="language-control" ref={language}>
          <button className="language-button" aria-label="Select language" aria-expanded={languageOpen} aria-controls="language-menu" onClick={() => setLanguageOpen(!languageOpen)}><img src={a.imgLanguage} alt="" /></button>
          {languageOpen && <div id="language-menu" className="language-menu"><button lang="en" onClick={() => setLanguageOpen(false)} aria-current="true">English</button></div>}
        </div>
        <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      </div>
    </header>
    <main className="site-main">
      <section className="hero" aria-label="AfterDay Horizon">
        <div className="hero-background"><img src={a.imgImgVr15} alt="" /></div>
        <div className="hero-shell">
          <div className="hero-copy">
            <p className="hero-eyebrow"><span aria-hidden="true" />AfterDay Horizon</p>
            <Logo className="hero-logo" />
            <h1>A Cross-Platform Co-op Game<br />for Communication and Strategic Skills</h1>
            <Pill href="#about" icon={a.imgEmojiFunnySquareBold1}>See More</Pill>
          </div>
          <div className="hero-stage">
            <div className="hero-device"><img src={a.imgPortfolioV2201} alt="AfterDay Horizon on a laptop" /></div>
            <div className="platform-card">
              <div className="platform-heading">
                <div><span className="platform-label">PLATFORM</span><h2>CROSS-PLATFORM</h2></div>
                <img className="vr-symbol" src={a.imgVector} alt="VR" />
              </div>
              <p>PLAY BETWEEN WEB BROWSERS AND VR DEVICES.</p>
              <div className="platform-footer"><span>WEB + VR</span><img className="web-symbol" src={a.imgGlobe162379261} alt="Web" /></div>
            </div>
          </div>
        </div>
      </section>
      <section className="site-section about" id="about">
        <div className="about-background"><img src={a.imgFrame1000005479} alt="" /></div>
        <div className="section-shell">
          <SectionTitle>About project</SectionTitle>
          <div className="about-card">
            <div className="about-banner">
              <div className="banner-art"><img src={a.imgGroup} alt="" /><img src={a.imgGroup1} alt="" /><img src={a.imgGroup2} alt="" /></div>
              <h3>AfterDay Horizon</h3>
            </div>
            <div className="about-copy">
              <p>AfterDay Horizon is a survival game for two players that utilizes VR and a website as its main platforms, focusing on cooperation and teamwork.</p>
              <p>Players find themselves in a world where civilization has collapsed due to environmental issues and must work together to complete missions that ensure the survival of people in the bunker.</p>
            </div>
          </div>
          <div className="benefits">
            {[[a.imgPeopleTeam16Filled1, 'Encourage cooperation among players.'], [a.imgEmojiFunnySquareBold2, 'Provide an engaging and enjoyable experience.'], [a.imgStrategy1, 'Improve strategy skills.']].map(([icon, text], index) => <article key={text}><span className="benefit-number">0{index + 1}</span><img src={icon} alt="" /><p>{text}</p></article>)}
          </div>
        </div>
      </section>
      <section className="site-section roles" id="roles">
        <div className="section-shell">
          <SectionTitle>Role in game</SectionTitle>
          <div className="role-grid">
            <article className="role-card">
              <div className="role-meta"><span>01</span><span>VR PLAYER</span></div>
              <h3>The Caretaker</h3>
              <div className="role-visual"><img className="caretaker" src={a.imgAfterDayCdve1} alt="The Caretaker wearing a VR headset" /></div>
              <p><strong>Performs missions</strong> outside the bunker using a VR device, helping ensure the survival of those inside.</p>
            </article>
            <article className="role-card">
              <div className="role-meta"><span>02</span><span>WEBSITE PLAYER</span></div>
              <h3>The Leader</h3>
              <div className="role-visual"><img className="leader" src={a.imgAfterDayCdve2} alt="The Leader at a computer" /></div>
              <p>Responsible for searching and <strong>analyzing information</strong> to help the Caretaker complete missions.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="site-section how-to" id="design">
        <div className="section-shell">
          <SectionTitle>How to play</SectionTitle>
          <div className="how-to-panel">
            <div className="how-to-background"><img src={a.imgFrame1000005467} alt="" /></div>
            <button onClick={() => openImage(a.imgAfterDayCdve31, 'How to play AfterDay Horizon')} aria-label="Enlarge how to play diagram"><img src={a.imgAfterDayCdve31} alt="How to play: The Caretaker and The Leader cooperate between VR and the website" /><span className="image-action" aria-hidden="true">↗</span></button>
          </div>
        </div>
      </section>
      <section className="site-section features" id="features">
        <div className="section-shell">
          <SectionTitle>Game features</SectionTitle>
          <div className="features-grid">
            <div className="galleries"><Gallery initial={a.imgContainer1} label="VR gameplay" openImage={openImage} /><Gallery initial={a.imgContainer} label="Website gameplay" openImage={openImage} /></div>
            <div className="feature-copy">{features.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
          </div>
        </div>
      </section>
      <Awards />
      <section className="site-section demo" id="demo">
        <div className="section-shell">
          <SectionTitle>My demo</SectionTitle>
          <div className="demo-space"><Logo className="demo-logo" /><span className="demo-ring" aria-hidden="true" /></div>
        </div>
      </section>
      <section className="site-section stay-tuned">
        <div className="section-shell">
          <div className="stay-card">
            <div className="stay-background"><img src={a.imgFrame2095585477} alt="" /></div>
            <p className="section-eyebrow"><span aria-hidden="true" />AfterDay Horizon</p>
            <h2>Stay tuned—the world of<br />AfterDay Horizon is just beginning.</h2>
            <Pill href="#demo" icon={a.imgEmojiFunnySquareBold3}>See More Soon</Pill>
          </div>
        </div>
      </section>
    </main>
    <footer id="contact">
      <div className="footer-background"><img src={a.imgBackground} alt="" /></div>
      <div className="footer-inner">
        <a href="#home" aria-label="Back to AfterDay Horizon home"><Logo className="footer-logo" /></a>
        <div className="social-links">
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><img src={a.imgSvg} alt="" /></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><img src={a.imgSvg1} alt="" /></a>
          <a href="https://line.me/" target="_blank" rel="noreferrer" aria-label="LINE"><span className="line-icon"><img src={a.imgGroup3} alt="" /><img src={a.imgGroup4} alt="" /></span></a>
          <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X"><img src={a.imgRiTwitterXLine} alt="" /></a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><img src={a.imgSvg2} alt="" /></a>
        </div>
      </div>
    </footer>
    <dialog ref={dialog} className="lightbox" onClose={() => setLightbox(null)} onClick={e => {if(e.target === dialog.current) setLightbox(null);}}>
      <button className="close-lightbox" onClick={() => setLightbox(null)} aria-label="Close image">×</button>
      {lightbox && <img src={lightbox.src} alt={lightbox.alt} />}
    </dialog>
  </>;
}
