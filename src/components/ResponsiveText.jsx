import React from 'react';

const ResponsiveText = ({
  words = [],
  textalign = 'right',
  projekteRef,
  aboutRef,
  onClickProjekte,
  onClickAbout,
  enableHover = false,
}) => {
  return (
    <div
      className="hero-nav"
      style={{
        width: '100%',
        textAlign: textalign,
      }}
    >
      <ul
        className={`hero-list ${enableHover ? 'hover-active' : 'hover-disabled'}`}
        style={{
          padding: 0,
          margin: 0,
          listStyle: 'none',
          textAlign: textalign,
        }}
      >
        <li onClick={onClickProjekte}>
          <span
            ref={projekteRef}
            style={{
              fontSize: 'clamp(2rem, 8vw, 10rem)',
              fontWeight: 'normal',
              cursor: enableHover ? 'pointer' : 'default',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'visible',
              textOverflow: 'clip',
            }}
          >
            {words[0]}
          </span>
        </li>

        <li onClick={onClickAbout}>
          <span
            ref={aboutRef}
            style={{
              fontSize: 'clamp(2rem, 8vw, 10rem)',
              fontWeight: 'normal',
              cursor: enableHover ? 'pointer' : 'default',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              overflow: 'visible',
              textOverflow: 'clip',
            }}
          >
            {words[1]}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ResponsiveText;
