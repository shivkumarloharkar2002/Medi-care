import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhone, faEnvelope, faPaperPlane, faNewspaper } from "@fortawesome/free-solid-svg-icons";

function NewLester() {
  return (
    <div>
  <div className="h-auto bg-blue-500 text-white mt-10 mb-5 py-10 px-4 md:py-20 md:px-0 overflow-hidden">
  <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 items-center text-center">
    <div className="flex items-center mb-4 md:mb-0">
      <FontAwesomeIcon icon={faNewspaper} className="mr-5 text-white h-10" />
      <div>
        <p className="text-2xl font-bold mb-2 text-white">
          Subscribe To Our Newsletter
        </p>
        <p className="text-lg">
          Stay in touch with us to get the latest news and special offers.
        </p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center justify-center">
      <input
        type="text"
        placeholder="Enter Your Email"
        className="border-2 mb-4 md:mb-0 md:mr-5 w-full md:w-72 p-2"
      />
      <button className="text-lg hover:bg-white hover:text-black p-2 rounded-md px-3 font-semibold flex items-center">
        Subscribe
        <FontAwesomeIcon icon={faPaperPlane} className="ml-2 text-white-500" />
      </button>
    </div>
  </div>

  {/* second main div */}
  <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 lg:gap-44 pt-10 md:pt-20 text-center">
    <div className="flex flex-col items-center md:items-start">
      <h2 className="text-2xl font-semibold mb-2 flex items-center text-white">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-4 bg-white-500 h-7" />
        Address
      </h2>
      <p className="text-lg">
        Sai Multispeciality Hospital, Sai Colony, <br /> Bhairavnath Chawk, Daund-Jamkhed Road,
        <br /> Shrigonda, Ahmednagar
      </p>
    </div>

    <div className="flex flex-col items-center md:items-start">
      <h2 className="text-2xl font-semibold mb-2 flex items-center text-white">
        <FontAwesomeIcon icon={faPhone} className="mr-4 text-white-500 h-7" />
        Call Us
      </h2>
      <p className="text-lg">+91 7588694436</p>
      <p className="text-lg">+91 9764732525</p>
    </div>

    <div className="flex flex-col items-center md:items-start">
      <h2 className="text-2xl font-semibold mb-2 flex items-center text-white">
        <FontAwesomeIcon icon={faEnvelope} className="mr-4 text-white-500 h-7" />
        Email Us
      </h2>
      <a href="mailto:saimulti-specialityhospital26@gmail.com" className="text-black hover:text-black">
        saihospitalshrigonda@gmail.com
      </a>
    </div>
  </div>
</div>

    </div>
  );
}

export default NewLester;
