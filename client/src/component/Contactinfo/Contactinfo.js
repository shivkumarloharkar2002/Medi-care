import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import hospital from '../Contactinfo/hospital.jpg';
import {
  faMapMarkerAlt,
  faPhone,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const ContactInfo = () => {
  const infoBoxStyle = (bgColor) => ({
    background: bgColor,
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
  });

  return (
    <>


    
{/* <img src={hospital} style={{height:"200px", marginTop:"20px"}}/> */}
    <div className="md:w-1/3 p-4">
      <div className="bg-gray-100 p-5 mb-5 rounded-lg">
        <h4 className="text-lg font-semibold mb-200 ">
          <FontAwesomeIcon icon={faMapMarkerAlt} /> OUR LOCATIONS
        </h4>
        <p>
        Sai Multispeciality Hospital , Sai Hights, Bhairavnath Chawk, Daund-Jamkhed Road,
              Shrigonda,  Ahmednagar.
              Pin code : 413 701
        </p>
      </div>
      <div className="bg-blue-100 p-5 mb-5 rounded-lg">
        <h4 className="text-lg font-semibold mb-2">
          <FontAwesomeIcon icon={faPhone} /> CONNECT WITH US
        </h4>
        <p>
          CALL: +91 7588694436
          <br />
          +91 9764732525
        </p>
      </div>
      <div className="bg-teal-100 p-5 mb-5 rounded-lg">
        <h4 className="text-lg font-semibold mb-2">
          <FontAwesomeIcon icon={faClock} /> VISITING HOURS
        </h4>
        <p>
        Monday to Saturday: 08:00 AM - 8:00 PM
        
         
         
         
        </p>
      </div>
    </div>
    </>

  );
};

export default ContactInfo;
