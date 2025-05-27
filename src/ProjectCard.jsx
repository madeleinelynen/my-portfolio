import React from 'react';
import projektBild from './assets/images/test.jpg';

function ProjectCard() {
  return (
    <div style={{
      padding: '1rem',
      margin: '0 auto',
      marginBottom: '1rem',
      maxWidth: '1000px'
    }}>
      <h2>VR-Simulation zur Brandbekämpfung in verschiedenen Szenarien</h2>
      <p>       
        Ein realer Feuerlöscher wird mit firmeneigener Hardware und Trackern ausgestattet, 
        sodass er in der virtuellen Umgebung ebenso sichtbar und steuerbar ist wie in der 
        realen Welt. Das System wird regelmäßig an große Kunden verkauft, darunter BMW, Daimler, 
        Securitas und Commerzbank.
      </p>
      <img src={projektBild} alt="Screenshot vom Projekt 1" style={{ maxWidth: '100%' }} />
    </div>
  );
}

export default ProjectCard;