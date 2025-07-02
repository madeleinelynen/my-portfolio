import { useRef, useState, useEffect } from 'react';
import './HomeSelection.css';

function HomeSelection({ onClickAbout, onClickProjekte }) {
  const projekteRef = useRef(null);
  const aboutRef = useRef(null);
  const containerRef = useRef(null);
  const testRef = useRef(null);

  const selections = ['projekte', 'about'];

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
    const test = testRef.current;
    if (!container || !test || container.clientWidth === 0) return;

    const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const gapInPx = 1.5 * remToPx;

    const availableWidth = container.getBoundingClientRect().width - gapInPx - lineWidth;

    const style = window.getComputedStyle(container);
    const longest = selections.reduce((a, b) => (a.length > b.length ? a : b), '');
    test.textContent = longest;

    test.style.fontFamily = style.fontFamily;
    test.style.fontWeight = style.fontWeight;
    test.style.letterSpacing = style.letterSpacing;
    test.style.textTransform = style.textTransform;
    test.style.lineHeight = style.lineHeight;
    test.style.whiteSpace = 'nowrap';

    let min = 8;
    let max = 1000;
    let best = min;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      test.style.fontSize = `${mid}px`;
      if (test.getBoundingClientRect().width <= availableWidth) {
        best = mid;
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    setFontSize(best - 1);
  }, [selections, windowWidth]);

  return (
    <div ref={containerRef} className="hero-nav">
      <span
        ref={testRef}
        className="hero-nav-test"
        style={{ fontSize }}
      />

      <div className="hero-nav-content">
        <div className="hero-nav-links" style={{ fontSize }}>
          <span
            ref={projekteRef}
            onClick={onClickProjekte}
            onMouseEnter={() => setHovered('projekte')}
            onMouseLeave={() => setHovered(null)}
            className={`nav-link ${hovered === 'projekte' ? 'hovered' : ''}`}
          >
            {selections[0]}
          </span>

          <span
            ref={aboutRef}
            onClick={onClickAbout}
            onMouseEnter={() => setHovered('about')}
            onMouseLeave={() => setHovered(null)}
            className={`nav-link ${hovered === 'about' ? 'hovered' : ''}`}
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
