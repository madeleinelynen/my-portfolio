import { useRef, useState, useEffect } from 'react';

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
  const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const gapInPx = 1.5 * remToPx;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {

    const container = containerRef.current;
    const availableWidth = container.getBoundingClientRect().width - gapInPx - lineWidth;
    const test = testRef.current;
    
    if (!container || !test || container.clientWidth === 0) 
      return;

    const style = window.getComputedStyle(container);
    const longest = selections.reduce((a, b) => (a.length > b.length ? a : b), '');
    test.textContent = longest;

    test.style.fontFamily = style.fontFamily;
    test.style.fontWeight = style.fontWeight;
    test.style.letterSpacing = style.letterSpacing;
    test.style.textTransform = style.textTransform;
    test.style.lineHeight = style.lineHeight;
    test.style.whiteSpace = 'nowrap';

    let min = 10;
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
 <div
      ref={containerRef}
      className="hero-nav"
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        height: 'auto',
        color: '#1f1f1f',
        textTransform: 'uppercase',
        fontFamily: 'Grayson',
      }}
    >

      <span
        ref={testRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          height: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          fontSize,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.5rem',
            marginRight: `${gapInPx}px`,
    }}

        >
      <div 
      style={{
        display: 'flex',
        alignItems: 'end',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        cursor: 'pointer',
        height: 'auto',
          }}
      >
        <span
              
          onMouseEnter={() => setHovered('projekte')}
          onMouseLeave={() => setHovered(null)}
          ref={projekteRef}
          onClick={onClickProjekte}
          style={{
            color: hovered === 'projekte' ? '#1a3b2a' : '#1f1f1f',
              //  'projekte' ? '#112A51' : '#1f1f1f',
            letterSpacing: hovered === 'projekte' ? '-0.01em' : 'normal',
            transition: 'color 0.2s ease, letter-spacing 0.3s ease',
            fontSize,
            outlineColor: '2px',
            fontWeight: 'normal',
            position: 'absolut',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            justifyContent: 'flex-end',
            alignItems: 'end',
            alignSelf: 'flex-end',
          }}
        >
          {selections[0]}
        </span>
      </div>

          <span
            onMouseEnter={() => setHovered('about')}
            onMouseLeave={() => setHovered(null)}
            ref={aboutRef}
            onClick={onClickAbout}
            style={{
            color: hovered === 'about' ? '#1a3b2a' : '#1f1f1f',
              //  'about' ? '#112A51' : '#1f1f1f',
              letterSpacing: hovered === 'about' ? '-0.1rem' : 'normal',
              transition: 'color 0.2s ease, letter-spacing 0.3s ease',
              fontSize,
              lineHeight: 1,
              fontWeight: 'normal',
              cursor: 'pointer',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              verticalAlign: 'middle',
              height:'100%',
              marginBottom: '8rem',
            }}
          >
            {selections[1]}
          </span>
        </div>

        <div
      style={{
        width: `${lineWidth}px`,
        backgroundColor: '#1f1f1f',
        alignSelf: 'stretch',
        }}
        />
      </div>
    </div>

    
  );
}

export default HomeSelection;
