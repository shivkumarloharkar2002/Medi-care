import React from "react";
import Imgages from "./opdimage.jpg";
import { Link, useNavigate } from 'react-router-dom';

function MedicalFacility() {
  const navigate = useNavigate();

  // Check if user is logged in 
  const isLoggedIn = localStorage.getItem("token");

  // Handle click on "Start Now" button
  const handleStartNowClick = () => {
    if (!isLoggedIn) {
      alert("You need to be logged in to make an appointment.");
      navigate("/login"); // Redirect to login page
    } else {
      navigate("/appointment"); // If logged in, proceed to appointment page
    }
  };

  return (
    <div className="w-full min-h-screen pt-20 mb-6 overflow-hidden  ">
      <div className="w-[85%] mx-auto flex flex-col lg:flex-row rounded-lg relative">
        {/* Image Section */}
        <div className="w-full lg:w-[50%] bg-green-600">
          <img src={Imgages} alt="myImages" className="w-full h-full object-cover" />
        </div>

        {/* Facility Information Section */}
        <div className="w-full lg:w-[50%] flex flex-col bg-red-400">
          <div className="flex flex-col lg:flex-row">
            {/* Facilities */}
            <div className="text-black p-6 bg-white flex-1">
              <h2 className="text-[1.5rem] sm:text-[1.7rem] font-semibold overflow-hidden">Our Facilities</h2>
              <p className="text-sm sm:text-base mt-4">
                Our Sai Multispeciality Hospital provides advanced infrastructure, specialized departments, 24/7 emergency services, and modern ICUs.
              </p>
              <div className="mt-6">
                <a href="/services" className="text-black underline">Learn more</a>
              </div>
            </div>

            {/* Location */}
            <div className="text-white bg-green-500 p-6 lg:p-7 flex-1">
              <h2 className="text-[1.5rem] sm:text-[1.7rem] font-semibold">Our Location</h2>
              <p className="text-sm sm:text-base mt-4">
                Sai Multispeciality Hospital, Sai Hights, Shrigonda, Ahmednagar, India
              </p>
              <div className="mt-6">
                <a href="/contact" className="text-white underline">Get Direction</a>
              </div>
            </div>
          </div>

          {/* Appointment Section */}
          <div className="text-white bg-blue-500 p-6 lg:p-7 flex-1">
            <h2 className="text-[1.5rem] sm:text-[1.7rem] font-semibold text-white">Make an appointment</h2>
            <p className="text-sm sm:text-white mt-4">
              Scheduling your appointment with us is simple and hassle-free. Whether online, by phone, or in person, our team is ready to assist you. Choose a time that suits you, and let us take care of the rest. Your health is our priority—book today and experience seamless care!
            </p>
            <div className="flex flex-col sm:flex-row text-blue gap-5 justify-center items-center  mt-6">
            <button
    className="text-blue-700 h-[10vw] sm:h-[8vh] w-fit md:w-[12vw]  bg-white hover:bg-blue-700 hover:text-white transition-colors duration-300 text-center px-8 py-2"
    onClick={handleStartNowClick}
  >
    Start Now
  </button>

  <div className="w-full sm:w-auto flex justify-center items-center">
    <div className="h-[1px] sm:h-auto sm:w-[1px] bg-white"></div>
  </div>

  <div className="text-center sm:text-left sm:pl-6">
    <p className="text-sm text-white hover:text-blue-700 transition-colors duration-300">
      Book an appointment
    </p>
    <p className="text-[1.2rem] sm:text-[1.4rem] mt-2 text-white hover:text-blue-700 transition-colors duration-300">
      +91 7588694436
    </p>
  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalFacility;
