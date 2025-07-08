import ProjectPage from '../components/ProjectPage';
import ImageCarousel from '../components/ImageCarousel';

import titleImage from '../assets/images/5GCar/Banner.png';
import sideImage from '../assets/images/5GCar/Bildschirmfoto 2020-01-30 um 12.24.14.png';

function VodafoneGigacar() {
    const hardware = [
    'Valve Index',
    'Motion Seat',
    'Multisensorische Integration (Duft), schaltbar über LAN-Steckdosen',
    ];
  
    const software = [
    'SteamVR',
    'Unity 2018.4 LTS',
    'Visual Studio 2017',
    ];

  return (
    <>
    <ProjectPage
      title ="Vodafone 5G Car"
      image={titleImage}
      description="VR-Experience für Vodafone, in der Nutzer eine autonome Autofahrt erleben. 
      Innerhalb des Autos liefert ein Display Echtzeitdaten, zielgerichtete Werbung und Sicherheitswarnungen. 
      Zum Ende der Experience wird der Nutzer per Drohne in die Luft befördert und steuert ein Minispiel, bei dem er durch Ringe 
      navigiert und Punkte sammeln kann."
           role = {[
            "Programmierung",
            "Highscore-System",
            "UX/UI-Entwicklung und -Integration",
            "Implementierung von Hand-Tracking-Interaktionen",
            "Technischer Support auf den fünf Roadshow-Messe-Terminen",
            ]}
      infoTexts={["7", "März 2019 - September 2019", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />
    {/* <ImageCarousel images={[img1, img2, img3, img4]} maxWidth="1000px" />; */}
    </>
  );
}

export default VodafoneGigacar;
