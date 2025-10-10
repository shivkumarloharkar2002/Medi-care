import React, { useEffect } from 'react';
import "./About.css";
import citical from './critical-care-1.webp';
import neuro from './neuro surgeon.jpg';
import gensurger from './Gen.Surgery.jpg';
import ortho from './Ortho.jpeg';
import pediatric from './pediatric.jpg';
import ContactInfo from '../../component/Contactinfo/Contactinfo';
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';
import NewLester from '../../component/NewLester/NewLester';
import ExpertTeam from '../../component/Team/Team';
import mission from './mission.jpg';
import vision from './lamp.jpg';
import medical from './medical.jpg';
import service from './service.jpg';
import journey from './building.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css'

function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Set animation duration
    });
  }, []);
  return (
    <>
      <Navbar />

     
      <div className="App pt-20 mt-25">
        <header className="relative bg-cover bg-center h-96 text-white flex items-center justify-center text-center font-sans shadow-lg"
          style={{ backgroundImage: 'url(https://thumbs.dreamstime.com/b/doctor-medical-background-24834402.jpg)', marginTop: "23px" }}>
          <div className="absolute inset-0 bg-black bg-opacity-60 z-9"></div>
          <div className="relative z-8 p-5">
            <h1 className="mt-20 text-5xl font-extrabold tracking-wide text-white animate-fadeInDown">About Us</h1>
            <p className="text-2xl font-light animate-fadeInUp text-white">We are here to help you with any questions or concerns</p>
          </div>
        </header>
      </div>

      <div className="container mx-auto px-6 py-12 text-left bg-gray-50  mt-[5vh]  shadow-md rounded-lg overflow-hidden">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-6 text-teal-600 ">Our Journey Since 2014</h2>
          <div className="lg:flex flex-col md:flex-row items-center md:items-start justify-between">

            <p className="text-base w-full lg:w-[40vw] text-gray-800 leading-relaxed mt-6 md:mt-10 md:mr-10 ">
              Sai Multispeciality Hospital was founded in 2014 with the mission to deliver high-quality healthcare to the people of Shrigonda and surrounding regions. Initially starting as a small healthcare facility, we have grown steadily, expanding both our services and the size of the hospital. With a dedicated team of professionals and state-of-the-art medical equipment, we have served thousands of patients over the years. Our hospital was built with a vision to provide affordable yet comprehensive medical care, and we continue to advance in medical technologies to meet the evolving healthcare needs of our patients.
            </p>

            <img
              className="md:h-[350px] w-full  lg:w-[60vw]  rounded-lg mt-5" 
              src={journey}
              alt="Our Journey"  data-aos="fade-down-left" data-aos-duration="3000"
            /> </div>
        </section>
      </div>



      <h2 className="text-4xl font-bold mb-6 text-teal-600 mt-10 ">Our Expert & Excellent Physicians in Our SMH</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 overflow-hidden">
        {/* Cards */}
        <div className="flex flex-col items-center text-center about-card h-auto max-w-[350px] mx-auto p-4"
      data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
          <img src={mission} className="h-[170px] w-full rounded-lg shadow-md"  alt="Primary Health Care" aria-label="Doctor Care" />
          <h4 className="font-extrabold text-[20px] mt-4">Primary Health Care</h4>
          <p className="text-gray-500 text-[15px] p-2">  The ultimate goal of primary health care is better health for all. The aim is to provide an easily accessible route to care, whatever the patient's problem.</p>
        </div>

        <div className="flex flex-col items-center text-center about-card h-auto max-w-[350px] mx-auto p-4" data-aos="fade-up"
     data-aos-duration="3000">
          <img src={citical} className="h-[180px] w-full rounded-lg shadow-md" alt="Critical Care" aria-label="Critical Care" />
          <h4 className="font-extrabold text-[20px] mt-4">Critical Care</h4>
          <p className="text-gray-500 text-[15px] p-2"> Our hospitals have specialized critical care areas as per the specialty requirements. These areas also have the support of super specialists.</p>
        </div>

        <div className="flex flex-col items-center text-center about-card h-auto max-w-[350px] mx-auto p-4"
         data-aos="fade-left"
         data-aos-offset="300"
         data-aos-easing="ease-in-sine">
          <img src={pediatric} className="h-[180px] w-full rounded-lg shadow-md" alt="Pediatric Care" aria-label="Pediatric Care" />
          <h5 className="font-extrabold text-[20px] mt-4">Pediatric</h5>
          <p className="text-gray-500 text-[15px] p-2"> We provide comprehensive cancer care with the best treatment facilities in Lucknow. Our expert team of oncologists examines every case jointly.</p>
        </div>

        <div className="flex flex-col items-center text-center about-card h-auto max-w-[350px] mx-auto p-4"  data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine" >
          <img src={ortho} className="h-[180px] w-full rounded-lg shadow-md" alt="Ortho Care" aria-label="Ortho Care" />
          <h5 className="font-extrabold text-[20px] mt-4">Ortho</h5>
          <p className="text-gray-500 text-[15px] p-2"> Our hospital offers the latest in orthopedic treatments and surgical advancements.</p>
        </div>

        <div className="flex flex-col items-center text-center about-card h-auto max-w-[350px] mx-auto p-4" data-aos="fade-up"
     data-aos-duration="3000">
          <img src={gensurger} className="h-[180px] w-full rounded-lg shadow-md" alt="General Surgery" aria-label="General Surgery" />
          <h5 className="font-extrabold text-[20px] mt-4">General Surgery</h5>
          <p className="text-gray-500 text-[15px] p-2">  Our hospital offers a host of facilities to ensure high-quality antenatal care and treatment for expectant mothers, new mothers.</p>
        </div>

        <div className="flex flex-col items-center text-center about-card h-auto max-w-[350px] mx-auto p-4" data-aos="fade-left"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine"   >
          <img src={neuro} className="h-[180px] w-full rounded-lg shadow-md" alt="Neuro Surgery" aria-label="Neuro Surgery" />
          <h5 className="font-extrabold text-[20px] mt-4">Neuro Surgery</h5>
          <p className="text-gray-500 text-[15px] p-2"> A neurosurgeon diagnoses and treats conditions that affect your brain, spinal cord, and nerves.</p>
        </div>
      </div>

      {/* Additional sections for Mission, Vision, etc. */}
      <ExpertTeam />
      <div className="container mx-auto px-6 py-12 text-left bg-gray-50 shadow-md rounded-lg overflow-hidden  " >


        <div className="container mx-auto px-6 py-5 text-left bg-gray-50 shadow-md rounded-lg">
          <section className="mb-12">
            <h2 className="text-4xl font-bold  mb-6 text-teal-600">Our Mission</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start  justify-between">
              <img
                className="md:h-[300px] w-full md:w-[450px] rounded-lg mt-5"
                src={mission}
                alt="Our Mission"  data-aos="fade-down-right" data-aos-duration="3000"
              />
              <p className="text-base  text-gray-800 leading-relaxed mt-6 md:mt-10 md:ml-10">
                “Prevention First” is what we believe in our center with qualified professionalists and latest technologies to make you a disease preventionist.Join our “ PREVENTION CLUB.” We are committed to:

                Providing accessible, affordable, and quality healthcare for all.
                Promoting preventive care through education and regular check-ups.
                Using advanced medical technology to diagnose and treat patients efficiently.
                Upholding the highest ethical standards in patient care and safety.</p>
            </div>
          </section>
        </div>
        <div className="container mx-auto px-6 py-5 text-left bg-gray-50 shadow-md rounded-lg mt-5">
          <section className="mb-12">
            <h2 className="text-4xl font-bold  text-teal-600">Our Vision</h2>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">

              <p className="text-base  text-gray-800 leading-relaxed mt-6 md:mt-10 md:mr-10">
                To Focus to deliver high quality service to our Patient.
                Improve all our services through quality management.
                Maintain the highest ethical standard in protecting the public interest & the environment.
                To promote the continuous development of the work for to achieve the full potential of staffs at all levels with due support & investment in their trainings.
              </p>

              <img
                className="md:h-[300px] w-full md:w-[450px] rounded-lg mt-5"
                src={vision}
                alt="Our Mission" data-aos="fade-down-left"
              /> </div>
          </section>
        </div>





        {/* 
          <section className="mb-12">
            <h2 className="text-4xl font-bold mb-6 text-teal-600">Our Vision</h2>
            <div className='flex justify-content'>
            <p className="text-lg text-gray-800 leading-relaxed m-20">
              We envision a world where healthcare is not just a necessity but a right. A place where advanced medical technology meets compassionate care, ensuring the best outcomes for our patients. We strive to be a leader in the healthcare industry, setting new standards in patient care and innovation.
            </p>
            <img className="h-[350px] w-[500px]  mt-5" src={vision}/>
            </div>
          </section> */}





        <div>
          <section className="mb-12">
            <h2 className="text-4xl font-bold mb-6 text-teal-600 mt-10 ">Why Choose Us</h2>
            <p className="text-base text-gray-800 leading-relaxed mb-6 ">
              Choosing us means choosing excellence in healthcare. Our team of expert professionals is dedicated to providing you with the best medical care. We offer a wide range of services tailored to meet your specific needs. With state-of-the-art facilities and a patient-first approach, we are committed to your well-being.
            </p>
            <div className="flex flex-col md:flex-row justify-evenly  ">
              <img className=" md:h-[300px] p-1  md:w-[400px] rounded-lg " src={medical} alt="Medical Care"   data-aos="fade-down-right" data-aos-duration="3000" />
              <img className=" md:h-[300px] p-1 md:w-[400px] rounded-lg " src={service} alt="Our Services"  data-aos="fade-down-left" data-aos-duration="3000"  />
            </div>
          </section>



          <section>
            <h2 className="text-4xl  font-bold mb-6 text-teal-600 mt-10">Our Values</h2>
            <ul className="list-disc list-inside text-base  text-gray-800 leading-relaxed">
              <li>Integrity: Upholding the highest standards of professionalism and ethics in all our actions.</li>
              <li>Compassion: Treating every patient with empathy, kindness, and respect.</li>
              <li>Innovation: Constantly evolving and adopting the latest medical advancements.</li>
              <li>Excellence: Striving for the highest quality in every aspect of our work.</li>
              <li>Collaboration: Working together with patients, families, and healthcare professionals to achieve the best outcomes.</li>
            </ul>
          </section>
        </div>


      </div>
      {/* <div className="container mx-auto px-6 py-12 text-left bg-gray-50  shadow-md rounded-lg mt-5">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-6 text-teal-600">Our Journey Since 2014</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">

            <p className="text-base text-gray-800 leading-relaxed mt-6 md:mt-10 md:mr-10 ">
              Sai Multispeciality Hospital was founded in 2014 with the mission to deliver high-quality healthcare to the people of Shrigonda and surrounding regions. Initially starting as a small healthcare facility, we have grown steadily, expanding both our services and the size of the hospital. With a dedicated team of professionals and state-of-the-art medical equipment, we have served thousands of patients over the years. Our hospital was built with a vision to provide affordable yet comprehensive medical care, and we continue to advance in medical technologies to meet the evolving healthcare needs of our patients.
            </p>

            <img
              className="md:h-[350px] w-full md:w-[450px] rounded-lg mt-5"
              src={journey}
              alt="Our Journey"
            /> </div>
        </section>
      </div> */}
      <NewLester />
      <Footer />
    </>
  );
}

export default Contact;




