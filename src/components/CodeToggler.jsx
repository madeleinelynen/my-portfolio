import React, { useState } from 'react';
import './CodeToggler.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeToggler({ code, label = 'Codeblock' }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="code-toggler">
      <div className="code-toggler__header">
        <span className="code-toggler__label">{label}</span>

        <button
          className="code-toggler__button"
          onClick={() => setVisible(!visible)}
        >
          {visible ? 'Code ausblenden' : 'Code anzeigen'}
        </button>
      </div>

      {visible && (
        <div className="code-toggler__code-wrapper">
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
      )}
    </div>
  );
}

export default CodeToggler;

