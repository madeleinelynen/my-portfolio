import './CodeToggler.css';
import { useRef, useState, useEffect   } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useLanguage } from '../LanguageContext';

function CodeToggler({ code, label = 'Codeblock' }) {
  const [visible, setVisible] = useState(false);
  const codeWrapperRef = useRef(null);
  const [inView, setInView] = useState(false);

  const {t} = useLanguage();
  const langKey = 'codeToggler';

  const scrollTo = (direction) => {
    if(codeWrapperRef.current) {
      const rect = codeWrapperRef.current.getBoundingClientRect();
      const scrollTargetY =
        direction === 'down'
        ? window.scrollY + rect.bottom - window.innerHeight
        : window.scrollY + rect.top;
      window.scrollTo({
        top:scrollTargetY,
        behavior: 'smooth',
      });
    }
  };

useEffect(() => {
  if (!visible) {
    setInView(false);
    return;
  }

  const handler = () => {
    if (!codeWrapperRef.current) 
      return;

    const rect = codeWrapperRef.current.getBoundingClientRect();
    const isInViewport = rect.bottom > 0 && rect.top < window.innerHeight;
    const visibleHeight = rect.height;
    const meetsHeightCondition = visibleHeight >= window.innerHeight * 0.8;

    setInView(isInViewport && meetsHeightCondition);
  };

  handler();
  window.addEventListener('scroll', handler, { passive: true });
  window.addEventListener('resize', handler);

  return () => {
    window.removeEventListener('scroll', handler);
    window.removeEventListener('resize', handler);
  };
}, [visible]);

  return (
     <>
    <div className="code-toggler">
      <div className="code-header">
        <span className="code-label">{label}</span>

        <button
          className="code-toggler__button"
          onClick={() => setVisible(!visible)}
        >
          {visible ? t(langKey, 'hideCode') : t(langKey, 'showCode')}
        </button>
      </div>

      {visible && (

  <div className="code-content">
    <div className="code-toggler__code-wrapper" ref={codeWrapperRef}>
          <SyntaxHighlighter
            language="csharp"
            style={atomDark}
            showLineNumbers
            wrapLines
            className="code-toggler__code-block"
          >
            {code}
          </SyntaxHighlighter>
    </div>
  </div>

  )}
    </div>

       {visible && inView && (
        <div className="code-scrollbutton">
              <button onClick={() => scrollTo('up')}   aria-label="Scroll Up">↑</button>
              <button onClick={() => scrollTo('down')} aria-label="Scroll Down">↓</button>
            </div>
          )}

          </>
  );
}

export default CodeToggler;

