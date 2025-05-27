import React from 'react';
import titleImg from '../assets/images/Flamecoach2/FC2_Title.jpg';

function Flamecoach2ProjectCard() {
  return (
    <div style={{
      padding: '1rem',
      margin: '0 auto',
      marginBottom: '1rem',
      maxWidth: '1000px'
    }}>
      <img src={titleImg} alt="Title Image" style={{ maxWidth: '100%' }} />
      <h2>VR-Simulation zur Brandbekämpfung in verschiedenen Szenarien</h2>
      <p>       
        Ein realer Feuerlöscher wird mit firmeneigener Hardware und Trackern ausgestattet, 
        sodass er in der virtuellen Umgebung ebenso sichtbar und steuerbar ist wie in der 
        realen Welt. Das System wird regelmäßig an große Kunden verkauft, darunter BMW, Daimler, 
        Securitas und Commerzbank.
      </p>
    </div>
  );
}

export default Flamecoach2ProjectCard;