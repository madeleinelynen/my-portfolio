import ProjectPage from '../components/ProjectPage';
import flamecoachBild from '../assets/images/Flamecoach/FC_Title_Text.png';

function FlamecoachPage() {
  return (
    <ProjectPage
      title="VR-Simulation zur Brandbekämpfung in verschiedenen Szenarien"
      image={flamecoachBild}
      description="Ein realer Feuerlöscher wird mit firmeneigener Hardware und Trackern ausgestattet, 
      sodass er in der virtuellen Umgebung ebenso sichtbar und steuerbar ist wie in der realen Welt. 
      Das System wurde bereits an mehr als 30 Kunden verkauft, darunter BMW, Daimler, Securitas und Commerzbank."
      // projectPeriod="2019 - heute"
    />
  );
}

export default FlamecoachPage;
