import React, { useRef, useState, useEffect } from 'react';

const AutoResizingText = ({ words, textalign = 'right', projekteRef, aboutRef, onClickProjekte, onClickAbout, enableHover = false }) => 
{
    const containerRef = useRef(null);
    const testRef = useRef(null);
    const [fontSize, setFontSize] = useState(10);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const test = testRef.current;
    
    if (!container || !test) 
        return;

    const style = window.getComputedStyle(container);
    const longest = words.reduce((a, b) => (a.length > b.length ? a : b), '');
    test.textContent = longest;

    test.style.fontFamily = style.fontFamily;
    test.style.fontWeight = style.fontWeight;
    test.style.letterSpacing = style.letterSpacing;
    test.style.textTransform = style.textTransform;
    test.style.lineHeight = style.lineHeight;
    test.style.whiteSpace = 'nowrap';

    const containerWidth = container.clientWidth;
    let min = 10;
    let max = 1000;
    let best = min;

    while (min <= max) 
    {
        const mid = Math.floor((min + max) / 2);
        test.style.fontSize = `${mid}px`;

        if (test.offsetWidth <= containerWidth) 
        {
            best = mid;
            min = mid + 1;
        } 
        else
            max = mid - 1;
    }

        setFontSize(best);

    }, [words, windowWidth]);

  return (
    <div
      ref={containerRef}
      className="hero-nav"
      style={{
        fontSize,
        color: 'black',
        textAlign: textalign, 
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
  className={`hero-list ${enableHover ? 'hover-active' : 'hover-disabled'}`}
  style={{
    padding: 0,
    margin: 0,
    listStyle: 'none',
    textAlign: textalign,
  }}
>
  <li className={`hero-nav ${enableHover ? 'hover-active' : 'hover-disabled'}`} 
  onClick={onClickProjekte} style={{ width: '100%', textAlign: textalign }}>
    <span
      ref={projekteRef}
      style={{
        fontWeight: 'normal',
        cursor: enableHover ? 'pointer' : 'default',
      }}
    >
      {words[0]}
    </span>
  </li>
  <li className={`hero-nav ${enableHover ? 'hover-active' : 'hover-disabled'}`} 
  onClick={onClickAbout} style={{ width: '100%', textAlign: textalign }}>
    <span
      ref={aboutRef}
      style={{
        fontWeight: 'normal',
        cursor: enableHover ? 'pointer' : 'default',
      }}
    >
      {words[1]}
    </span>
  </li>
</ul>

      {/* <ul className={`hero-nav ${enableHover ? 'hover-active' : 'hover-disabled'}`} 
      style={{ padding: 0, margin: 0, listStyle: 'none' }}>
        <li onClick={onClickProjekte}>
          <span ref={projekteRef} 
          style={{ fontWeight: 'normal', cursor: enableHover ? 'pointer' : 'default', }}>
            {words[0]}
          </span>
        </li>
        <li className={`hero-nav ${enableHover ? 'hover-active' : 'hover-disabled'}`}
        onClick={onClickAbout}>
          <span ref={aboutRef} 
          style={{ fontWeight: 'normal',cursor: enableHover ? 'pointer' : 'default',  }}>
            {words[1]}
          </span>
        </li>
      </ul> */}
    </div>
  );
};

export default AutoResizingText;
