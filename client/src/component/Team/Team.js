import React from "react";
import Doctor1 from "./../../assets/images/doctor images/doctor5.jpg";
import Doctor from "./../../assets/images/doctor images/doctor.jpg";

const sharedClasses = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  card: "overflow-hidden shadow-lg", // Added shadow-lg for box shadow
  textForeground: "text-foreground",
  textMutedForeground: "text-muted-foreground",
  textCardForeground: "text-card-foreground",
};

const ExpertCard = ({ name, role, imageUrl }) => (
  <div className="flex flex-col items-center font-bold">
    <img
      className="w-[350px] h-[350px] sm:h-[400px] object-cover rounded-t-lg shadow-xl hover:shadow-2xl rounded-br-lg  mb-4" // Adjusted height and applied rounded corners
      src={imageUrl}
      alt={name}
    />
    <h3 className="text-lg text-primary mt-4 font-bold">{name}</h3>
    <p className="mt-2 text-sm text-muted-foreground">{role}</p>
  </div>
);

const ExpertTeam = () => {
  return (
    <div className="bg-background py-12 md:w-full w-[95vw] pl-2 overflow-hidden" >
      <div className={sharedClasses.container + " text-center"}>
        <h2 className="text-3xl font-semibold md:font-extrabold text-primary">
          Our Special Doctors
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Every heartbeat whispers a story of resilience, guided by the hands of
          our special doctors.
        </p>
      </div>
      <div className="mt-10 flex justify-center" 
       data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
          <ExpertCard
            name="Dr. Shraddha Dhawale "
            role="BHMS, PGDEMS, Cosmetic Care and Tricology"
            imageUrl={Doctor1}
          />
          <ExpertCard
            name="Dr. Arun Dhawale"
            role="BHMS"
            imageUrl={Doctor}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpertTeam;
