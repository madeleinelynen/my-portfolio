// components/CodeToggle.jsx
import React, { useState } from 'react';
import './CodeToggler.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeToggler({ code }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Code ausblenden' : 'Code anzeigen'}
      </button>

      {visible && (
        <SyntaxHighlighter
          language="csharp"   // hier "csharp" für C# Syntax-Highlighting
          style={atomDark}          // VS Code Stil
          showLineNumbers     // Zeilennummern an
          wrapLines           // Zeilen umbrechen
          customStyle={{
            borderRadius: '6px',
            padding: '1rem',
            fontSize: '14px',
          }}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </div>
  );
}

export default CodeToggler;
