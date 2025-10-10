import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from "react-toastify";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const getUserInfoFromToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsLoggedIn(false);
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      return decodedToken;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };

  useEffect(() => {
    const userData = getUserInfoFromToken();
    setUserInfo(userData);
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
      localStorage.removeItem('token');
      toast.success("Logout Successful!");
      setIsLoggedIn(false);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white bg-opacity-500 shadow-md fixed top-0 w-full z-20">
      <ToastContainer />
      <div className=" mx-auto px-4 flex justify-between items-center h-[98px]">
        <a href="#home">
          <img src={logo} alt="Logo" className="w-36 h-28" />
        </a>

        {/* Menu for Desktop and Tablet */}
        <div className="hidden lg:flex md:w-[90vw] space-x-6 justify-end text-lg font-bold">
          <a href="/" className="text-gray-800 hover:text-gray-600">Home</a>
          <a href="/doctor" className="text-gray-800 hover:text-gray-600">Doctors List</a>
          <a href="/glam" className="text-gray-800 hover:text-gray-600">Glam</a>
          <a href="/services" className="text-gray-800 hover:text-gray-600">Services</a>
          <a href="/about" className="text-gray-800 hover:text-gray-600">About</a>
          

          <a href="/contact" className="text-gray-800 hover:text-gray-600">Contact</a>
          {isLoggedIn && (
            <a href="/appointment" className="text-gray-800 hover:text-gray-600">Appointment</a>
          )}
          {isLoggedIn && userInfo?.role === 'Admin' ? (
            <a href="/admin" className="text-gray-800 hover:text-gray-600">Admin</a>
          ) : isLoggedIn ? (
            <a href="/patientdashboard" className="text-gray-800 hover:text-gray-600">Dashboard</a>
          ) : null}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-gray-800 ">Logout</button>
          ) : (
            <a href="/login" className="text-gray-800 hover:text-gray-600">Login</a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden w-[90vw] flex justify-end">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-white transition-all duration-300 ease-in-out z-20`}>
        <div className="flex flex-col space-y-2 px-4 py-2">
          <a href="/" className="block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">Home</a>
          <a href="/doctor" className="block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">Doctors List</a>
          <a href="/glam" className="block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">Glam</a>

          <a href="/services" className="block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">Services</a>
          <a href="/about" className="block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">About</a>

          <a href="/contact" className="block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">Contact</a>
          {isLoggedIn && (
            <a href="/appointment" className="block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">Appointment</a>
          )}
          {isLoggedIn && userInfo?.role === 'Admin' ? (
            <a href="/admin" className="block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">Admin</a>
          ) : isLoggedIn ? (
            <a href="/patientdashboard" className="block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">Dashboard</a>
          ) : null}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="block w-full text-left text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">Logout</button>
          ) : (
            <a href="/login" className="block text-gray-800 hover:bg-gray-200 rounded-md px-3 py-2 text-lg">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
