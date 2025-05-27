import React from 'react';
import './FlamecoachProjectCard.css';
import projektBild from '../assets/images/Flamecoach/FC_Title.jpg';

function FlamecoachProjectCard() {
  return (
    <div style={{
      margin: '0 auto',
      marginBottom: '1rem',
      // maxWidth: '1000px',
    }}>
      <img src={projektBild} alt="Screenshot vom Projekt 1" className="responsive-img" />
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

export default FlamecoachProjectCard;