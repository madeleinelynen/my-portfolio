import React from "react";
import "./AnimatedHighlightList.css";

export default function AnimatedHighlightList({ content = [''] }) {

  return (
<div className="highlight-list-wrapper">
  <ul className="highlight-list">
    {content.map((text, index) => (
      <React.Fragment key={index}>
        <li
          className="highlight-item"
          style={{ animationDelay: `${index * 0.3}s` }}
        >
          {text.includes("C#") ? (
            <>
              Kernkompetenz in der Programmierung in <i>C#</i>
            </>
          ) : (
            text
          )}
        </li>
        {index < content.length - 1 && (
          <li
            className="animated-separator-li"
            aria-hidden="true"
            style={{ listStyle: "none" }}
          />
        )}
      </React.Fragment>
    ))}
  </ul>
</div>
  );
}