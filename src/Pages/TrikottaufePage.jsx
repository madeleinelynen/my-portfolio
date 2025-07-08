import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Trikottaufe/Banner.png';
import sideImage from '../assets/images/Trikottaufe/sideImage.png';
import YoutubeEmbed from '../components/YoutubeEmbed';

function TrikottaufePage() {
    const hardware = [
    'Smartphone (Android & iOS)',
    ];
  
    const software = [
    'Unity 2018.1.0f2',
    'Vuforia Augmented Reality SDK',
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
      role = {[
      "Programmierung der Trikot-Animation und der UI-Funktionen",
      "Fristgerechte Veröffentlichung der App im Apple App Store",
      ]}
      infoTexts={["3", "Juni 2018 - Juli 2018", "Unity Engine"]}
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
