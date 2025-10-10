import React, { useState, useEffect } from "react";
import axiosInstance from "./../../axiosConfig.js";

const sharedClasses = {
  primaryColor: "bg-primary",
  primaryTextColor: "text-primary-foreground",
  accentColor: "text-[var(--accent)]",
  mutedTextColor: "text-[var(--muted-foreground)]",
  foregroundColor: "text-[var(--foreground)]",
};

const ExpertiseItem = ({ title, description }) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h3 className={`text-lg font-semibold ${sharedClasses.accentColor}`}>
      {title}
    </h3>
    <p className={`mt-2 text-base ${sharedClasses.mutedTextColor}`}>
      {description}
    </p>
  </div>
);

const ExpertiseSection = () => (
  <div className="mt-8 space-y-6">
    <ExpertiseItem
      title="01. Blood Bank & Chemistry"
      description="Our state-of-the-art Blood Bank is equipped to handle all types of blood tests and provide safe, reliable blood transfusions. Our chemistry lab supports comprehensive diagnostic testing for various conditions, ensuring accurate and timely results."
    />
    <ExpertiseItem
      title="02. Coagulation & Cytology"
      description="We specialize in coagulation studies to assess blood clotting disorders, and our cytology department provides detailed analysis of cell samples to detect abnormalities and diseases at the cellular level."
    />
    <ExpertiseItem
      title="03. Hematology & Histology"
      description="Our hematology department focuses on diagnosing blood-related disorders and conditions, while our histology lab examines tissue samples to identify diseases and monitor treatment progress."
    />
  </div>
);

const ExpertiseComponent = () => {
  const [videosData, setVideosData] = useState([]); // State to hold videos
  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/video/allvideo`);

      setVideosData(response.data.data); // Store filtered doctor data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(videosData);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-[var(--background)] p-8 md:p-12 rounded-lg shadow-lg">
      <div className="lg:w-1/2  mb-8 md:mb-0">
        <div className="relative">
          {videosData.map((video, index) => {
            if (video.section === "Service Section") {
              return (
                <video
                  src={video.videourl}
                  autoPlay
                  muted
                  loop
                  controls
                  className="rounded-lg md:w-[85vw] w-[100vw] h-[60vh] md:h-[90vh] object-cover mt-10"
                ></video>
              );
            }
          })}
          <button className="absolute bottom-4 left-4 bg-primary text-primary-foreground py-2 px-4 rounded-lg flex items-center space-x-2 shadow-md hover:bg-primary-dark transition">
            <img
              aria-hidden="true"
              alt="play-icon"
              src="https://openui.fly.dev/openui/24x24.svg?text=▶️"x
            />
            <span>Play The Video</span>
          </button>
        </div>

      </div>
      <div className="md:w-1/2 md:pl-8 ">
        <h2 className={`text-3xl font-bold ${sharedClasses.foregroundColor}`}>
          Our Expertise
        </h2>
        <p className={`mt-4 text-lg ${sharedClasses.mutedTextColor}`}>
          Our medical facility is dedicated to providing exceptional care
          through our specialized departments. Each area of expertise is
          equipped with advanced technology and staffed by highly skilled
          professionals, ensuring top-notch diagnostics and treatment for our
          patients. From comprehensive blood analysis to advanced cytology and
          histology, we are committed to excellence in every aspect of our
          services.
        </p>
        <ExpertiseSection />
      </div>
    </div>
  );
};

export default ExpertiseComponent;
