import { useRef, useState, useEffect } from 'react';

function HomeTitle() {
  const nameRef = useRef(null);
  const jobRef = useRef(null);

  const selections = ['Madeleine Lynen', 'Software Developer' ];

  const containerRef = useRef(null);
  const testRef = useRef(null);

  const [fontSize, setFontSize] = useState(10);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const gapInPx = 15.5 * remToPx;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const availableWidth = container.getBoundingClientRect().width - gapInPx;
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

      if (test.getBoundingClientRect().width <= availableWidth) 
        {
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
        fontSize,
        color: 'black',
        textAlign: 'left',
        fontFamily: 'Inter',
        fontWeight: '300',
        // textTransform: 'uppercase',
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
        }}
      />

      <ul
        className={`hero-list 'hover-disabled`}
        style={{
        padding: 0,
          margin: 0,
          listStyle: 'none',
          textAlign: 'left',
        }}
      >
        <li
          className={`hero-nav 'hover-disabled`}
          style={{ width: '100%', textAlign: 'left' }}
        >
          <span
            ref={nameRef}
            style={{
              fontWeight: 'normal',
              cursor: 'default',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'visible',
              textOverflow: 'clip',
              width: '100%',
              fontSize,
            }}
          >
            {selections[0]}
          </span>
        </li>

        <li
          className={`hero-nav 'hover-disabled`}
          style={{ width: '100%', textAlign: 'left' }}
        >
          <span
            ref={jobRef}
            style={{
              fontWeight: 'normal',
              cursor: 'default',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'visible',
              textOverflow: 'clip',
              fontSize,
            }}
          >
            {selections[1]}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default HomeTitle;
