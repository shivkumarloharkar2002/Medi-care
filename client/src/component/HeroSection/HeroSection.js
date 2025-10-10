import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate(); 

  // Check if user is log in 
  const isLoggedIn = localStorage.getItem("token"); 

  // Redirec  if user is not logged in
  const handleMakeAppointmentClick = () => {
    if (!isLoggedIn) {
      alert("You need to be logged in to make an appointment.");
      navigate("/login"); // Redirect to login page
    } 
  };

  return (
    <div className="relative h-[110vh] sm:h-[100vh]  flex flex-col md:flex-row justify-start  bg-gray-100 z-8">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden  mt-[100px] z-0">
        <img
          src="https://video.lovepik.com/video_cover/2022/03/18/hospital-nurse-station-sketch-background-video-4k-video-template_84263.jpg"
          alt="Diagnostic Lab"
          className="w-[100vw] h-[100vh] border-2 sm:h-[90vh]  opacity-80 object-cover mt-300 z-7 overflow-hidden"
        />
      </div>

      <div className="relative flex flex-col md:flex-col lg:flex-row w-full justify-between items-center  mt-20 z-8 p-8 text-white text-left">
        <div className="w-full mt-[30px] md:w-1/2 px-4 mb-8 md:mb-0">
          <h1 className="text-3xl mt-[-10px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold leading-tight" style={{fontFamily:"auto"}} data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="3000">
            Welcome to Sai Hospital
          </h1>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center px-4">
          <div>
            <p className="text-xl md:text-right mt-50 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl  text-black font-bold leading-tight mt-4 text-align:center" style={{fontFamily:"auto"}}>
              We’ll Ensure You Always Get The Best Doctors and Best Results.
            </p>
            <p className="text-base sm:text-lg md:text-xl md:text-center mt-6 md:mt-8 lg:text-right text-justify font-serif">
              Welcome to Sai Multispeciality Hospital in Shrigonda, Ahmednagar,
              the original and largest Sai Multispeciality Hospital campus.
              Located in the heart of Shrigonda, Ahmednagar — a dynamic city
              just 90 minutes East of Pune, Sai Multispeciality Hospital has
              been safely caring for patients from around the world for more
              than 10 years.
              <span className="block text-blue-800 font-semibold font-serif mt-2">
                Sai Multispeciality Hospital will always be your safe care
                destination.
              </span>
            </p>
         <div className="mt-6 md:mt-8 sm:w-[30] flex justify-center">
  {isLoggedIn ? (
    <Link
      to="/appointment"
      className="text-gray-800 hover:text-gray-600 text-center font-semibold"
    >
      <button className="px-6 py-3 font-bold text-base md:text-lg lg:text-xl bg-blue-500 text-white rounded-lg">
        Make An Appointment
      </button>
    </Link>
  ) : (
    <button
      onClick={handleMakeAppointmentClick}
      className="px-6 py-3 font-bold text-base md:text-lg lg:text-xl bg-blue-500 text-white rounded-lg"
    >
      Make An Appointment
    </button>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
