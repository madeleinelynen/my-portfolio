import ProjectPage from '../components/ProjectPage';
import titleImage from '../assets/images/Flamecoach/Title.png';
import extinguisherCollection from '../assets/images/Flamecoach/FC_Extinguisher.jpg';

function FlamecoachPage() {
    const hardware = [
    'Inhouse entwickelter Feuerlöscher Controller',
    'Windows Laptop',
    'VR-Brille mit Outside-in Tracking (Valve Index, ab 2023 Pimax Crystal)',
    'Multisensorische Integration (Duft, Hitze), schaltbar über LAN-Steckdosen',
    'Hand-Tracking-Technologie (Leap, Ultraleap)',
    'CodeMeter Lizenzstick',
    ];
  
    const software = [
    'Unity Engine 2019.4',
    'Visual Studio (C#)',
    'CodeMeter License Editor',
    'Wibu',
    'Leap Motion Software / Ultraleap',
    ];
  
    // const [code1, setCode1] = useState('');
    // const [code2, setCode2] = useState('');
  
    // useEffect(() => {
    //   fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/Extinguisher/ExtinguisherInputManager.cs')
    //     .then(res => res.text())
    //     .then(setCode1)
    //     .catch(err => console.error('Fehler beim Laden von code1:', err));
  
    //   fetch(process.env.PUBLIC_URL + '/code/Flamecoach2/ExtinguisherTrackerIdManager.cs')
    //     .then(res => res.text())
    //     .then(setCode2)
    //     .catch(err => console.error('Fehler beim Laden von code2:', err));
    // }, []);

  return (
    <>
    <ProjectPage
    title ="Flamecoach"
      image={titleImage}
      description="VR-Simulation zur Brandbekämpfung in verschiedenen Szenarien.
      Ein realer Feuerlöscher wird mit firmeneigener Hardware und Trackern ausgestattet, 
      sodass er in der virtuellen Umgebung ebenso sichtbar und steuerbar ist wie in der realen Welt. 
      Das System wurde bereits an mehr als 30 Kunden verkauft, darunter BMW, Daimler, Securitas und Commerzbank."
      role="Programmierung, UX/UI-Entwicklung und -Integration, Erstellung von Animationen innerhalb der 
      Engine, Integration von Hardware (einschließlich firmeneigener Entwicklungen), Implementierung von 
      Hand-Tracking-Interaktionen, Einrichtung für Neukunden und Versionsverwaltung mit regelmäßigen Updates 
      für Bestandskunden"
      infoTexts={["10", "2019 - heute", "Unity Engine"]}
      hardware={hardware}
      software={software}
      sideImage={extinguisherCollection}
    />
    </> 
  );
}

export default FlamecoachPage;
