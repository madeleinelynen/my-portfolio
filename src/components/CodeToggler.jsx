import './CodeToggler.css';
import { useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeToggler({ code, label = 'Codeblock' }) {
  const [visible, setVisible] = useState(false);
  const codeWrapperRef = useRef(null);

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

  return (
    <div className="code-toggler">
      <div className="code-header">
        <span className="code-label">{label}</span>

        <button
          className="code-toggler__button"
          onClick={() => setVisible(!visible)}
        >
          {visible ? 'Code ausblenden' : 'Code anzeigen'}
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
            
          <div className="code-scrollbutton"> 
            <button
              onClick={()=> scrollTo('up')}
              aria-label="Scroll Up"
              className="scoll-button"
            >
              ↑
            </button>
            <button
              onClick={()=> scrollTo('down')}
              aria-label="Scroll Down"
              className="scroll-button"
            >
              ↓
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default CodeToggler;

