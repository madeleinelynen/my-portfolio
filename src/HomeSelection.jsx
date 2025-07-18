import { useRef, useState, useLayoutEffect } from 'react';
import { useLanguage } from './LanguageContext';
import './HomeSelection.css';

function HomeSelection({ onClickAbout, onClickProjekte }) {
  const { t } = useLanguage();
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const containerRef = useRef(null);
  const testRef = useRef(null);

const selections = [
  t('homeselection', 'projects'),
  t('homeselection', 'about'),
];
  const [fontSize, setFontSize] = useState(0);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(null);

  const lineWidth = 2;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const test = testRef.current;
    if (!container || !test) return;

    const calculate = () => {
      const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const isMobile = window.innerWidth < 1200;
      const gapPx = isMobile ? remToPx : 1.5 * remToPx;

      const { width: availW, height: fullAvailH } = container.getBoundingClientRect();
      // Limit the usable height on mobile to avoid tiny fonts when container is too tall
      const maxMobileH = window.innerHeight * 0.4; // use up to 40vh
      const usableH = isMobile ? Math.min(fullAvailH, maxMobileH) : fullAvailH;

      let perLinkH = (usableH - gapPx) / selections.length;
      const SAFETY = isMobile ? 0.15 : 0.05;
      perLinkH *= 1 - SAFETY;

      // Prepare test element
      const longest = selections.reduce((a, b) => (a.length > b.length ? a : b));
      test.textContent = longest;
      test.style.whiteSpace = 'nowrap';

      let min = 8;
      let max = 1000;
      let best = min;
      while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        test.style.fontSize = mid + 'px';
        const { width: w, height: h } = test.getBoundingClientRect();
        if (w <= availW - gapPx - lineWidth && h <= perLinkH) {
          best = mid;
          min = mid + 1;
        } else {
          max = mid - 1;
        }
      }


      const minMobileFont = isMobile ? Math.round(remToPx * 1.5) : 0; // 1.5rem
      setFontSize(isMobile ? Math.max(best, minMobileFont) : best);
      setReady(true);
    };

    const observer = new ResizeObserver(() => requestAnimationFrame(calculate));
    observer.observe(container);
    window.addEventListener('resize', calculate);

    const retries = [0, 50, 200, 500];
    const timers = retries.map(delay => setTimeout(calculate, delay));

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(calculate));
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculate);
      timers.forEach(clearTimeout);
    };
  }, [selections]);

  return (
    <div ref={containerRef} className="hero-nav">

      <span
        ref={testRef}
        className="hero-nav-test nav-link"
        style={{ fontSize: fontSize + 'px', visibility: 'hidden', position: 'absolute' }}
      />

      <div className="hero-nav-content">
    {ready && (
    <div className="hero-nav-links">
      <span
        ref={projectsRef}
        className={`nav-link projects-text ${hovered === 'projekte' ? 'hovered' : ''}`}
        onClick={onClickProjekte}
        onMouseEnter={() => setHovered('projekte')}
        onMouseLeave={() => setHovered(null)}
        style={{ fontSize: fontSize + 'px' }}
      >
        {selections[0]}
      </span>

      <span
        ref={aboutRef}
        className={`nav-link about-text ${hovered === 'about' ? 'hovered' : ''}`}
        onClick={onClickAbout}
        onMouseEnter={() => setHovered('about')}
        onMouseLeave={() => setHovered(null)}
        style={{ fontSize: fontSize + 'px' }}
      >
        {selections[1]}
      </span>
    </div>
  )}

        <div className="hero-nav-divider" />
      </div> 
    </div>
  );
}

export default HomeSelection;
