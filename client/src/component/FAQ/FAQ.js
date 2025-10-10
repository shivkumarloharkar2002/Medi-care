import React from 'react';
import team from './teamdoctor2.jpg';
const cardClasses = "flex flex-col md:flex-row bg-card p-6 rounded-lg shadow-lg";
const imageClasses = "rounded-lg w-[350px] sm:w-[450px] h-[350px] sm:h-[500px] m-auto mt-[30px]";
const titleClasses = "text-primary text-xl font-semibold uppercase mb-2";
const subtitleClasses = "text-3xl text-foreground mb-6 ";
const detailsClasses = "border-b border-muted pb-2";
const summaryClasses = "cursor-pointer text-lg text-foreground";

const FAQComponent = () => {
  return (
    <div className={cardClasses}>
      <div className="md:w-1/2">
        <img src={team} alt="Group of doctors in a meeting" className={imageClasses} />
      </div>
      <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
        <h2 className={titleClasses}>FAQ</h2>
        <h1 className={subtitleClasses}> <span className="font-semibold md:font-extrabold">We Are Here To Answer Your Questions</span></h1>
        <div className="space-y-4">
          <FAQItem question="How do I book an online appointment?" answer="You can book an online appointment by visiting our website and navigating to the 'Appointments' section. From there, you can select your preferred date and time." />
          <FAQItem question="How do I make a payment?" answer="Payments can be made online through our secure payment gateway using credit/debit cards, net banking, or UPI. Alternatively, you can pay at the hospital reception." />
          <FAQItem question="How do I book a cabin in the hospital?" answer="To book a cabin, please contact our reception desk directly or use the 'Cabin Booking' feature on our website. Availability will be confirmed at the time of booking." />
          <FAQItem question="How much does my insurance cover?" answer="Insurance coverage varies based on your policy. Please consult with your insurance provider or our billing department for detailed information regarding your coverage." />
          <FAQItem question="What are the visiting hours?" answer="Our visiting hours are from 10:00 AM to 8:00 PM daily. Please ensure you follow the hospital's guidelines and check with the ward for any specific restrictions." />
          <FAQItem question="Can I change or cancel my appointment?" answer="Yes, appointments can be changed or canceled through our website or by calling our reception. Please note that changes may be subject to availability." />
          <FAQItem question="Do I need to bring any documents for my appointment?" answer="Yes, please bring any relevant medical documents, identification, and your insurance card (if applicable). This helps us provide the best care during your visit." />
          <FAQItem question="How can I request a copy of my medical records?" answer="To request your medical records, please visit the 'Patient Services' section on our website or contact our medical records department directly." />
          <FAQItem question="What safety measures are in place due to COVID-19?" answer="Our hospital follows strict safety protocols, including regular sanitization, mandatory mask-wearing, and social distancing to ensure the safety of our patients and staff." />
          <FAQItem question="How can I provide feedback or file a complaint?" answer="We value your feedback. You can provide feedback or file a complaint through the 'Contact Us' section on our website, or by speaking directly to our patient care team." />
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  return (
    <details className={detailsClasses}>
      <summary className={summaryClasses}>{question}</summary>
      <p className="pt-2">{answer}</p>
    </details>
  );
};

export default FAQComponent;
