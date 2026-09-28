import React, {useEffect, useRef, useState} from 'react';
import {assets} from './assets.js';
import './awards.css';

// Photo bounds within the original, unmodified 1920 × 1080 Figma exports.
// Only these photographic regions are rendered; all section copy is HTML.
const photos = [
  {src: assets.imgPortfolioV231, crop: [108, 158, 599, 334], caption: 'CDVE 2025 conference', className: 'conference'},
  {src: assets.imgPortfolioV231, crop: [58, 528, 323, 410], caption: 'CDVE 2025 conference badge', className: 'badge'},
  {src: assets.imgPortfolioV231, crop: [407, 559, 337, 482], caption: 'Cooperative Design, Visualization, and Engineering — conference proceedings', className: 'proceedings'},
  {src: assets.imgPortfolioV221, crop: [1244, 47, 515, 287], caption: 'AfterDay Horizon at NAPROCK PROCON 2024', className: 'presentation'},
  {src: assets.imgPortfolioV221, crop: [1084, 436, 317, 455], caption: 'NAPROCK PROCON 2024 — Special Prize certificate', className: 'certificate'},
  {src: assets.imgPortfolioV221, crop: [1427, 369, 438, 319], caption: 'The AfterDay Horizon team at NAPROCK PROCON 2024', className: 'team'},
  {src: assets.imgPortfolioV221, crop: [1433, 722, 360, 325], caption: 'NAPROCK PROCON 2024 — Special Prize', className: 'prize'},
];

function Photo({photo}) {
  const [x, y, width, height] = photo.crop;
  return <span className="award-photo-viewport" style={{aspectRatio: `${width} / ${height}`}}>
    <img src={photo.src} alt={photo.caption} draggable="false" style={{width: `${1920 / width * 100}%`, height: `${1080 / height * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%`}} />
  </span>;
}

export default function Awards() {
  const [activePhoto, setActivePhoto] = useState(null);
  const dialog = useRef(null);
  const opened = activePhoto !== null;
  useEffect(() => {
    if (!opened) {dialog.current?.close(); return;}
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = previousOverflow;};
  }, [opened]);
  const move = direction => setActivePhoto(current => (current + direction + photos.length) % photos.length);
  const photoButton = index => <button key={index} type="button" className={`award-photo ${photos[index].className}`} onClick={() => setActivePhoto(index)} aria-label={`Enlarge ${photos[index].caption}`}>
    <Photo photo={photos[index]} /><span className="photo-expand" aria-hidden="true">↗</span>
  </button>;

  return <section className="awards-section" id="certificate" aria-labelledby="awards-heading">
    <div className="awards-inner">
      <header className="awards-heading">
        <p className="awards-eyebrow"><span aria-hidden="true" />AfterDay Horizon</p>
        <h2 id="awards-heading">Project awards<span aria-hidden="true">.</span></h2>
      </header>

      <article className="award-entry cdve-entry" aria-labelledby="cdve-title">
        <div className="award-gallery cdve-gallery" aria-label="CDVE 2025 photo gallery">{[0, 1, 2].map(photoButton)}</div>
        <div className="award-content">
          <div className="award-meta"><span className="award-year">2025</span><span>CDVE</span></div>
          <h3 id="cdve-title">CDVE 2025</h3>
          <p className="award-subtitle">Cooperative Design,<br className="desktop-break" /> Visualization, and Engineering</p>
          <span className="project-tag"><span aria-hidden="true" />AFTERDAY HORIZON</span>
          <div className="award-description"><p>AfterDay Horizon was also accepted for presentation and publication at CDVE 2025 (Cooperative Design, Visualization, and Engineering), an international conference in design and technology, reflecting the project's quality in UX/UI design and global-level development.</p></div>
        </div>
      </article>

      <article className="award-entry naprock-entry" aria-labelledby="naprock-title">
        <div className="award-content">
          <div className="award-meta"><span className="award-year">2024</span><span>JAPAN</span></div>
          <h3 id="naprock-title"><span>The 16th NAPROCK</span><br />PROCON 2024</h3>
          <p className="award-subtitle">Japan</p>
          <span className="project-tag"><span aria-hidden="true" />AFTERDAY HORIZON</span>
          <div className="award-description"><p>AfterDay Horizon project participated in The 16th International Programming Contest (NAPROCK PROCON 2024) in Japan, where it was presented to international participants and experts. This experience enhanced UX/UI design skills and international team collaboration.</p></div>
        </div>
        <div className="award-gallery naprock-gallery" aria-label="NAPROCK PROCON 2024 photo gallery">{[3, 4, 5, 6].map(photoButton)}</div>
      </article>
    </div>

    <dialog ref={dialog} className="award-dialog" aria-label="Project awards photo viewer" onClose={() => setActivePhoto(null)} onClick={event => {if(event.target === dialog.current) setActivePhoto(null);}} onKeyDown={event => {if(event.key === 'ArrowRight'){event.preventDefault(); move(1);} if(event.key === 'ArrowLeft'){event.preventDefault(); move(-1);}}}>
      {opened && <div className="award-viewer">
        <button className="award-viewer-close" type="button" aria-label="Close award photo" onClick={() => setActivePhoto(null)}>×</button>
        <div className="award-viewer-image" style={{'--photo-ratio': photos[activePhoto].crop[2] / photos[activePhoto].crop[3]}}><Photo photo={photos[activePhoto]} /></div>
        <div className="award-viewer-toolbar">
          <button type="button" aria-label="Previous award photo" onClick={() => move(-1)}>←</button>
          <div aria-live="polite"><p>{photos[activePhoto].caption}</p><span>{activePhoto + 1} / {photos.length}</span></div>
          <button type="button" aria-label="Next award photo" onClick={() => move(1)}>→</button>
        </div>
      </div>}
    </dialog>
  </section>;
}
