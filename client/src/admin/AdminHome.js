import React, { useEffect, useState } from "react";
import Sidebar from "./components/global/Sidebar";
import Dash from "./components/global/Dash";
import Appointments from "./components/global/Appointments";

export default function AdminHome({ main, heading }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const load = () => {
    if (window.innerWidth < 620) {
      setIsOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setIsOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  useEffect(() => {
    // Check initial screen size and load accordingly
    if (window.innerWidth < 970) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    // Listen to resize events to adjust isOpen state
    const handleResize = () => {
      if (window.innerWidth < 970) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`content transition-all duration-300 ${
          isOpen ? "ml-64 " : "ml-16 "
        } `}
      >
        <h2 className="p-6 text-3xl font-bold">{heading}</h2>
        {main}
      </main>
    </div>
  );
}
