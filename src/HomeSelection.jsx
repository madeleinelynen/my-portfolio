import React, { useRef, useState, useEffect } from 'react';
import './HomeSelection.css';

function HomeSelection({ onClickAbout, onClickProjekte }) {
  const projekteRef = useRef(null);
  const aboutRef = useRef(null);
  const containerRef = useRef(null);
  const testRef = useRef(null);

  const selections = ['PROJEKTE', 'ABOUT'];
  const [fontSize, setFontSize] = useState(10);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hovered, setHovered] = useState(null);

  const lineWidth = 2;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const resize = () => {
  const container = containerRef.current;
  const test = testRef.current;
  if (!container || !test) return;

  const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const isMobile = window.innerWidth < 1200;
  const gapPx = isMobile ? 0 : 1.5 * remToPx;
  const { width: availW, height: availH } = container.getBoundingClientRect();

  if (availW === 0 || availH === 0) {
    // Noch keine gültige Größe – nochmal in 50ms probieren
    setTimeout(resize, 50);
    return;
  }

  // Dein bestehender resize-Code hier, z.B. Berechnung Font-Size
  let perLinkH = (availH - gapPx) / selections.length;
  const SAFETY = isMobile ? 0.10 : 0.05;
  perLinkH *= (1 - SAFETY);

  const style = getComputedStyle(container);
  const longest = selections.reduce((a, b) => (a.length > b.length ? a : b));
  test.textContent = longest;
  ['fontFamily','fontWeight','letterSpacing','textTransform','lineHeight'].forEach(prop => {
    test.style[prop] = style[prop];
  });
  test.style.whiteSpace = 'nowrap';

  let min = 8, max = 1000, best = min;
  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    test.style.fontSize = `${mid}px`;
    const { width: w, height: h } = test.getBoundingClientRect();
    if (w <= availW - gapPx - lineWidth && h <= perLinkH) {
      best = mid;
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  setFontSize(best);
};


  const observer = new ResizeObserver(resize);
  observer.observe(container);

  resize(); // initial

  return () => observer.disconnect();
}, [selections]);


  return (
    <div ref={containerRef} className="hero-nav">

      <span
        ref={testRef}
        className="hero-nav-test"
        style={{ fontSize: `${fontSize}px`, visibility: 'hidden', position: 'absolute' }}
      />

      <div className="hero-nav-content">
        <div className="hero-nav-links">
          <span
            ref={projekteRef}
            onClick={onClickProjekte}
            onMouseEnter={() => setHovered('projekte')}
            onMouseLeave={() => setHovered(null)}
            className={`nav-link ${hovered === 'projekte' ? 'hovered' : ''}`}
            {...(windowWidth < 1200 ? { } : {style: { fontSize }})}
          >
            {selections[0]}
          </span>

          <span
  ref={aboutRef}
  onClick={onClickAbout}
  onMouseEnter={() => setHovered('about')}
  onMouseLeave={() => setHovered(null)}
  className={`nav-link ${hovered === 'about' ? 'hovered' : ''}`}
  style={
    windowWidth > 1200
      ? {
          fontSize: `${fontSize}px`,
          paddingBottom: '3rem'
        }
      : undefined
  }
>
  {selections[1]}
</span>
        </div>

        <div className="hero-nav-divider" />
      </div>
    </div>
  );
}

export default HomeSelection;
