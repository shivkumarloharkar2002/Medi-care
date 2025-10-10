import React from "react";
import Logo from "./logo.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="bg-white text-black border-4 pt-12 md:w-[100%]">
      <div className="md:container md:mx-auto md:justify-around flex flex-row">
        <div className=" lg:flex lg:w-[50%] ">
          {/* Logo Section */}
          <div className="w-full ml-[20px] md:ml-[0px] lg:w-[50%] p-4 flex flex-col items-start lg:mt-[-50px]">
            <div>
              {" "}
              <img
                src={Logo}
                alt="Sai Multispeciality Hospital Logo"
                className="mb-4 md:w-48 w-auto h-32 md:h-auto"
              />
            </div>
            <p className="text-base text-gray-800 max-w-60">
              Providing top-notch healthcare services with a focus on quality
              and patient satisfaction.
            </p>
          </div>
      

             {/* Useful Links Section */}
             <div className="w-full p-4  lg:w-[50%] ">
            <h3 className="font-bold mb-4 text-xl ">Useful Links</h3>
            <ul className="text-base text-gray-800">
              <li className="mb-2">
                <a href="/about"  className=" text-blue-500 hover:text-blue-600 hover:border-b-2 border-blue-950">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact"  className=" text-blue-500 hover:text-blue-600">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/"  className=" text-blue-500 hover:text-blue-600">
                  Meet Our Team
                </a>
              </li>
              <li className="mb-2">
                <a href="/services"  className=" text-blue-500 hover:text-blue-600">
                  Our Services
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="lg:flex mt-[64px]  lg:w-[50%] lg:mt-0 gap-10 ">

              {/* Main Services Section */}
              <div className="w-full   lg:w-[50%] p-4">
            <h3 className="font-bold mb-4 text-xl">Our Main Services</h3>
            <ul className="text-base text-gray-800">
              <li className="mb-2 hover:text-black">Sample Preparations</li>
              <li className="mb-2 hover:text-black">Healthcare Labs</li>
              <li className="mb-2 hover:text-black">Advanced Microscopy</li>
              <li className="mb-2 hover:text-black">Chemical Research</li>
              <li className="mb-2 hover:text-black">Pathology Testing</li>
            </ul>
          </div>
          {/* Contact Section */}
          <div className="w-full  lg:w-[50%] p-4">
            <h3 className="font-bold mb-4 text-xl">Contact</h3>
            <p className="text-base text-gray-800 mb-4 w-full">
              Sai Multispeciality Hospital , Sai colony, <br></br>Bhairavnath
              Chawk, Daund-Jamkhed Road,
              <br /> Shrigonda, Ahmednagar , Pin code - 413701
            </p>
          </div>

       
        </div>

    
      </div>
     
      {/* Footer Bottom Section */}
      <div className="text-center py-4 border-t border-gray-300">
      <div className=" "> <p className="text-center md:text-lg text-sm mb-6">
          Email:<a href="mailto:saimulti-specialityhospital26@gmail.com" className="mr-2 text-blue-500 hover:text-blue-600">saimulti-specialityhospital26@gmail.com</a>
          
          </p></div>
        {/* <p className="text-lg">© 2024 Sai Hospital. All rights reserved.</p> */}
        <marquee>© 2025 Sai Multispeciality Hospital. All rights reserved.</marquee>
      </div>
    </footer>
  );
};

export default Footer;
