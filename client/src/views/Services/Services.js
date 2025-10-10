import React from 'react';
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import NewLester from '../../component/NewLester/NewLester';
import CaseStudies from '../../component/CaseStudy/CaseStudy';
import SevivesComponent from '../../component/Services/Services';
import ExpertiseComponent from '../../component/OurExpertize/OurExpertize';
import './Services.css'; // Import the CSS file

function Services() {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <SevivesComponent />
        <ExpertiseComponent /> 
        <CaseStudies />
        <NewLester />
      </div>
      <Footer />
    </div>
  );
}

export default Services;
