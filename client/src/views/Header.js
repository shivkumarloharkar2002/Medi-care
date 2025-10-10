import React from 'react';
import 'tailwindcss/tailwind.css';


const Header = () => {
  return (
  <>
    
    <header className="relative bg-cover bg-center h-72 text-white flex items-center justify-center text-center font-sans" style={{ backgroundImage: 'url( http://localhost:3000/static/media/hospital.8f2d1054223ac779c03f.jpg)',marginTop:"104px", height:"700px" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
      <div className="relative z-20 p-5">
        <h1 className="mt-5 text-4xl font-bold tracking-wide text-white animate-fadeInDown">Contact Us</h1>
        <p className="  text-white text-3xl font-semibold  animate-fadeInUp">We are here to help you with any questions or concerns</p>
      </div>
    </header>

    <div>

    </div>
      </>

  );
};


export default Header;
