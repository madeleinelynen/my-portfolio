import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Trikottaufe/Banner.png';
import sideImage from '../assets/images/Trikottaufe/sideImage.jpg';
import YoutubeEmbed from '../components/YoutubeEmbed';

function TrikottaufePage() {
    const hardware = [
    'Android Smartphone / Apple iPhone',
    ];
  
    const software = [
    'Unity Engine 2017.???',
    'Vuforia',
    'Xcode'
    ];

    const myVideoId = "_j4HP0J4nxM";

  return (
    <>
    <ProjectPage
      title ="Fortuna Trikottaufe"
      image={titleImage}
      description="Eine AR-Erlebnis-App, die zur Rheinkirmes Düsseldorf 2018 punktgenau zum Start des 
      Feuerwerks das neue Trikotdesign von Fortuna Düsseldorf enthüllte, inszeniert durch 
      ein riesiges Trikot, das in Augmented Reality aus dem Rhein hochstieg."
      role="Mein erster Berührungspunkt mit App-Entwicklung. Ich war verantwortlich für die Programmierung der 
      Trikot-Animation und der UI-Funktionen sowie für die fristgerechte Veröffentlichung der App im Apple App Store."
      infoTexts={["3", "Juni - Juli 2018", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={sideImage}
    />

    <div style={{ marginTop: "5rem" }}></div>
    <YoutubeEmbed videoId={myVideoId} />

    </>
  );
}

export default TrikottaufePage;
