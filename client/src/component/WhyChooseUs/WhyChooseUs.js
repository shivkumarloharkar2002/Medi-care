import React from 'react';

const sharedClasses = {
  flexCenter: 'flex justify-center items-center',
  roundedFull: 'rounded-full',
  mxAuto: 'mx-auto',
  mb4: 'mb-4',
  textCenter: 'text-center',
  textLg: 'text-lg',
  fontSemibold: 'font-semibold',
  mt2: 'mt-2',
  bgAccent: 'bg-green-500', // Accent color for icons
  textForeground: 'text-gray-800 text-xl',
  textMutedForeground: 'text-gray-500',
};

const WhyChooseUs = () => {
  return (
    <div className="bg-gray-100 py-24"> {/* Increased padding on the y-axis */}
      <div className="max-w-7xl mx-auto text-center">
        <p className={`${sharedClasses.textLg} font-extrabold text-[30px] pb-3 mt-[10px] ${sharedClasses.textForeground}`}>
        Why Choose Us
        </p>
        <p className={`${sharedClasses.mt2} ${sharedClasses.textMutedForeground}`}>
        Discover the reasons why our patients choose us for their healthcare needs.<br/> From advanced technology to compassionate care, we provide the best services to ensure your health and well-being.<br/>Choose excellence in healthcare with us. 
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <WhyChooseUsItem
          iconUrl="https://openui.fly.dev/openui/48x48.svg?text=🔬"
          title="High-Quality Lab"
          description="Our state-of-the-art laboratories are equipped with the latest technology to ensure precise diagnostics and superior care for every patient. "
        />
        <WhyChooseUsItem
          iconUrl="https://openui.fly.dev/openui/48x48.svg?text=👥"
          title="Unmatched Expertise"
          description="Our team of experienced professionals brings together decades of knowledge in various medical fields to provide comprehensive care."
        />
        <WhyChooseUsItem
          iconUrl="https://openui.fly.dev/openui/48x48.svg?text=📄"
          title="Precise Results"
          description="We pride ourselves on delivering accurate and timely results, enabling you to make informed decisions about your health."
        />
        <WhyChooseUsItem
          iconUrl="https://openui.fly.dev/openui/48x48.svg?text=👨‍⚕️"
          title="Qualified Staff"
          description="Our medical staff comprises highly qualified and certified professionals dedicated to offering the best possible care."
        />
      </div>
    </div>
  );
};

const WhyChooseUsItem = ({ iconUrl, title, description }) => {
  return (
    <div className={sharedClasses.textCenter}>
      <div className={`${sharedClasses.flexCenter} w-20 h-20 ${sharedClasses.bgAccent} ${sharedClasses.roundedFull} ${sharedClasses.mxAuto} ${sharedClasses.mb4} py-6`}>
        <img aria-hidden="true" alt={title} src={iconUrl} className="w-12 h-12" />
      </div>
      <h3 className={`${sharedClasses.textLg} ${sharedClasses.fontSemibold} ${sharedClasses.textForeground}`}>{title}</h3>
      <p className={`${sharedClasses.mt2} ${sharedClasses.textMutedForeground}`}>{description}</p>
    </div>
  );
};

export default WhyChooseUs;
