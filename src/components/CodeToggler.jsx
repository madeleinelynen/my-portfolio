// components/CodeToggle.jsx
import React, { useState } from 'react';
import './CodeToggler.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeToggler({ code, label = "Codeblock" }) {
  const [visible, setVisible] = useState(false);

  return (
  <div style={{ marginBottom: '1rem' }}>
    {/* Zentrierte Zeile */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',      // <- hier wird zentriert
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem'
    }}>
      <span style={{ fontFamily: "'Montserrat', sans-serif", color: 'white', lineHeight: '1' }}>
        {label}
      </span>
      <button
        onClick={() => setVisible(!visible)}
        style={{
          padding: '0.4rem 0.8rem',
          fontSize: '0.9rem',
          lineHeight: '1',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          backgroundColor: '#444',
          color: 'white',
        }}
      >
        {visible ? 'Code ausblenden' : 'Code anzeigen'}
      </button>
    </div>

    {visible && (
      <div style={{ 
            width: '100vw',               // Volle Fensterbreite
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',         // Trick: zentriert auf Viewport
            marginRight: '-50vw',
            padding: '2rem 0',           // etwas Abstand
        }}>
        <SyntaxHighlighter
          language="csharp"
          style={atomDark}
          showLineNumbers
          wrapLines
          customStyle={{
            borderRadius: '6px',
            width: '100%',
            padding: '1rem',
            fontSize: '14px',
            fontSize: '14px',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    )}
  </div>
);

}

export default CodeToggler;
