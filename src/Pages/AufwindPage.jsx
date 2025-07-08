import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';

import banner from '../assets/images/Aufwind/Banner.png';
import sideImage from '../assets/images/Aufwind/Aufwind_keyvisual_Poster.jpg';

import img1 from '../assets/images/Aufwind/Aufwind_keyvisual_Poster.jpg';
import img2 from '../assets/images/Aufwind/Planetoy_Editor_2.png';
import img3 from '../assets/images/Flamecoach2/Flamecoach2HoveringTile.png';

function AufwindPage() {
  const hardware = [
  'Varjo Aero',
  'Yaw Motion Seat',
  'Game Controller Lenkrad',
  'Hand-Tracking-Technologie (Ultraleap)',
  'Multisensorische Integration (Duft, Hitze), schaltbar über LAN-Steckdosen'
  ];

  const software = [
  'Unity Engine 2021.3',
  'Visual Studio 2022',
  ];

  return (
    <>
    <ProjectPage
      title ="Aufwind"
      image={banner}
      description="Multisensorisches, immersives VR-Erlebnis. In diesem Projekt wird die Geschichte der ersten deutschen Pilotinnen erzählt, 
      dauerhaft für Besucher ausgestellt in Essen."
      role = {[
      "Programmierung",
      "Erstellung von Animationen innerhalb der Engine",
      "Implementierung von Hand-Tracking-Interaktionem",
      ]}
      infoTexts={["22", "2021 - 2024", "Unity Engine"]}
      software={software}
      hardware={hardware}
      sideImage={sideImage}
      websiteLink='https://www.aufwindvr.com/'
    />

      <ImageCarousel images={[img1, img2, img3]} maxWidth="1000px" />;

     <div style={{ maxWidth: '1000px', margin: '2rem auto', fontFamily: "'Montserrat', sans-serif", textAlign:'center', }}>
      <h2 style={{ fontSize: '40px', marginBottom: '0.5rem' }}>Hand-Tracking Interaktionen</h2>

      <h3 style={{ fontSize: '28px', color: '#888',textAlign:'center', }}>Custom Greifpositionen</h3>
      <p>
        Das Balsaflugzeug auf dem Tisch kann mit der getrackten Hand in Unity aufgenommen, in der Hand gewechselt,
        und geworfen werden. Beim Wurf fliegt das Flugzeug eine bestimmte Strecke ab. Dei Strecke richet sich nach
        der Wurf- Richtung und Winkel. 
        //hier script 
      </p>

      <h3 style={{ fontSize: '28px', color: '#888',textAlign:'center', }}>Balsa-Spielflugzeug</h3>
      <p>
        Das Balsaflugzeug auf dem Tisch kann mit der getrackten Hand in Unity aufgenommen, in der Hand gewechselt,
        und geworfen werden. Beim Wurf fliegt das Flugzeug eine bestimmte Strecke ab. Dei Strecke richet sich nach
        der Wurf- Richtung und Winkel. 
        //hier script 
      </p>
    
     </div>
    </>   

  );
}

export default AufwindPage;
