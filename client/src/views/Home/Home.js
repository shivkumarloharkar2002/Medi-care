import React from "react";
import "./Home.css"
import Navbar from "../../component/Navbar/Navbar";
import HeroSection from "../../component/HeroSection/HeroSection";
import MedicalFacility from "../../component/MedicalFacility/MedicalFacility";
import Footer from "../../component/Footer/Footer";
import NewLester from "../../component/NewLester/NewLester";
import CaseStudies from "../../component/CaseStudy/CaseStudy";
import ExpertTeam from "../../component/Team/Team";
import FAQComponent from "../../component/FAQ/FAQ";
import Testimonials from "../../component/testimonialData/testimonialData";
import WhyPeopleTrustUs from "../../component/WhyTrustPeople/WhyTrustPeople";
import RatingCard from "../../component/StarReting/StarReting";


function Home() {
  return (
    <div>
    <Navbar/>
      <HeroSection /> 
      <MedicalFacility />
      <RatingCard/>
      <WhyPeopleTrustUs/>
      <CaseStudies />
      <ExpertTeam />
      <Testimonials/> 
      <FAQComponent />
      <NewLester />
      <Footer />
      

    </div> 
  );
}

export default Home;
