import "./About.css";

const About = () => {
  return (
<div className="about-section">
  <h1 className="about-heading">ABOUT</h1>
  <div className="about-grid">
    
          <section>
            <h2 className="about-subheading">Über mich</h2>
            <p>
              Über fünf Jahre Erfahrung in der Softwareentwicklung mit fundierter Expertise in C# und C++, spezialisiert auf XR, App-Entwicklung und Games.
            </p>
          </section>

          <section>
            <h2 className="about-subheading">Kompetenzen</h2>
            <ul>
              <li>C#, C++, Python, Dart</li>
              <li>Unity, Unreal, Visual Studio</li>
              <li>GitHub, SourceTree, Perforce</li>
              <li>Android & iOS (Flutter, Unity)</li>
              <li>VR/AR: SteamVR, Varjo, Pico, Meta, Vuforia</li>
              <li>SDK & Hardwareintegration</li>
            </ul>
          </section>

          <section>
            <h2 className="about-subheading">Schlüsselerfolge</h2>
            <ul>
              <li>Zentrale Rolle bei der Entwicklung eines VR-Feuerlöschtrainingssystems (seit 2019)</li>
              <li>Zentrale Rolle bei der Entwicklung öffentlich zugänglicher VR-Erlebnisse (seit 2021)</li>
              <li>Lead Programmierer für ein Puzzle-basiertes Multiplayer-Spiels (2021–2024)</li>
            </ul>
          </section>

          <section>
            <h2 className="about-subheading">Kooperationsfähigkeiten</h2>
            <ul>
              <li>Multitasking & Teamarbeit</li>
              <li>Verantwortungsübernahme</li>
              <li>Kontinuierliche Weiterbildung</li>
              <li>Mentoring & Leadership</li>
            </ul>
          </section>

          <section>
            <h2 className="about-subheading">Berufserfahrung</h2>
            <p className="font-semibold">
              Software Developer<br />A4VR GmbH | Mai 2019 – heute
            </p>
            <ul>
              <li>Unity/C# für interaktive VR/AR-Projekte</li>
              <li>Unreal Engine & C++ Grundlagen</li>
              <li>App-Entwicklung Android/iOS</li>
              <li>UI/UX-Konzeption & Integration</li>
              <li>SDK/Hardware-Einbindung</li>
              <li>Technischer Messe-Support</li>
            </ul>
          </section>

          <section>
            <h2 className="about-subheading">Ausbildung</h2>
            <p className="font-semibold">
              Game Design B.Sc.<br />Mediadesign Hochschule, Düsseldorf (2015–2019)
            </p>
            <ul>
              <li>Abschluss in Regelstudienzeit</li>
              <li>Schwerpunkt: Programmierung</li>
              <li>Bachelorarbeit: Experimentelles Game Design: Zum Einsatz von Augmented Reality als
medizinische Behandlungsform | Note: 1.0 </li>
            </ul>
          </section>

    </div>
  </div>
  );
};

export default About;



