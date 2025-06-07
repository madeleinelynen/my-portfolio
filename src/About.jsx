import './Header.css';

import AnimatedHighlightList from './components/AnimatedHighlightList';

function About() {

    const description = [
    'Kernkompetenz in der Programmierung in C#',
    'Erste Erfahrungen in C++, Python, Dart, HTML',
    'Kompetenz in der Entwicklung von VR/AR-Projekten',
    'Erfahrung in der Mobile-Entwicklung auf Android & iOS Systemen (Flutter, React, Unity)',
    'Sicherer Umgang mit der Unity Engine und Erfahrung mit der Unreal Engine',
    'Versionskontrolle mit GitHub, SourceTree, Git Extensions, oder Perforce',
    'Zusätzliche Erfahrung im Bereich UI/UX-Konzeption, Game Design, Level Design',
  ];

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="hero-list-wrapper"> 
            <AnimatedHighlightList content={description} />
          </div>
      </div>
    </header>
  );
}

export default About;
