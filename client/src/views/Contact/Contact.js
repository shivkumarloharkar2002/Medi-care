import React from "react";
import "./Contact.css";
import Header from "../Header";
import ContactInfo from "../../component/Contactinfo/Contactinfo";
import ContactForm from "../../component/ContactForm/ContactForm";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
function Contact() {
  return (
    <>
      <Navbar />
      <div>
        <Header />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row my-5">
            <ContactInfo />
            <ContactForm />
           
           
          </div>
        </div>
        {/* <div className="mt-100 ml-40">

<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4373.905179179158!2d74.69367701653847!3d18.614694350143154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc343bafff8e581%3A0x2b93eb8fa6321e4f!2sSai%20Multispeciality%20Hospital%2C%20Shrigonda!5e0!3m2!1sen!2sin!4v1726660453553!5m2!1sen!2sin" 
  width="1200" 
  height="300" 
  style={{ border: 0 }} 
  allowFullScreen="" 
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade"
/>

</div> */}

        <div className="mt-16 mx-auto" style={{ maxWidth: '1200px' }}>
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4373.905179179158!2d74.69367701653847!3d18.614694350143154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc343bafff8e581%3A0x2b93eb8fa6321e4f!2sSai%20Multispeciality%20Hospital%2C%20Shrigonda!5e0!3m2!1sen!2sin!4v1726660453553!5m2!1sen!2sin" 
    width="100%" 
    height="300" 
    style={{ border: 0 }} 
    allowFullScreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>

        
        <Footer/>
      </div>
    </>
  );
}

export default Contact;
