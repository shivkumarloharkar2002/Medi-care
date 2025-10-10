import React from 'react';
import './Services.css'; // Adjust path if necessary

// Import images with the correct relative paths
import serviceImg1 from '../../assets/images/Services images/services.1.jpeg';
import serviceImg2 from '../../assets/images/Services images/services.2.jpg';
import serviceImg3 from '../../assets/images/Services images/services.3.jpg';
import serviceImg4 from '../../assets/images/Services images/services.4.jpeg';
import serviceImg5 from '../../assets/images/Services images/services.5.jpg';
import serviceImg6 from '../../assets/images/Services images/services.6.jpg';
import serviceImg7 from '../../assets/images/Services images/services.7.png';
import serviceImg8 from '../../assets/images/Services images/services.8.jpg';
import serviceImg9 from '../../assets/images/Services images/services.9.webp';
import serviceImg10 from '../../assets/images/Services images/services.10.jpg';

const Services = () => {
  return (
    <>
    
    <div className="services-container">
      <div className="service">
        <img src={serviceImg1} alt="Service 1" />
        <p>ICU</p>
      </div>
      <div className="service">
        <img src={serviceImg2} alt="Service 2" />
        <p>VIP/DELUX ROOM</p>
      </div>
      <div className="service">
        <img src={serviceImg3} alt="Service 3" />
        <p>OPERATION THEATRE</p>
      </div>
      <div className="service">
        <img src={serviceImg4} alt="Service 4" />
        <p>GENERAL WARD</p>
      </div>
      <div className="service">
        <img src={serviceImg5} alt="Service 5" />
        <p>ORTHOLOGY</p>
      </div>
      <div className="service">
        <img src={serviceImg6} alt="Service 6" />
        <p>CARDIOLOGY</p>
      </div>
      <div className="service">
        <img src={serviceImg7} alt="Service 7" />
        <p>NEUROLOGY</p>
      </div>
      <div className="service">
        <img src={serviceImg8} alt="Service 8" />
        <p>NEPHROLOGY</p>
      </div>
      <div className="service">
        <img src={serviceImg9} alt="Service 9" />
        <p>GASTROLOGY</p>
      </div>
      <div className="service">
        <img src={serviceImg10} alt="Service 10" />
        <p>GYNAECOLOGY</p>
      </div>
    </div>

    </>

  );
};

export default Services;
