import React, { useState } from 'react';
import hospital from '../ContactForm/hospital.jpg';

const ContactForm = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "051acfb0-80f4-469d-835a-587e41f68e3b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        setResult(data.message);
      }
    } catch (error) {
      setResult("An error occurred. Please try again.");
      console.error("Error:", error);
    }

  };

  return (
    <>
      {/* <img src={arrow} className='h-20 w-30 mt-30'/> */}
  


     <div className="md:w-2/3 p-4 shadow-lg bg-gray-100">
      <h2 className="text-gray-600 text-3xl font-bold ">Send Us A Message Anytime</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="formMessage" className="block text-gray-700">
            Your Message
          </label>
          <textarea
            id="formMessage"
            name="message"
            rows="3"
            placeholder="Please write your message here"
            className="w-full px-3 py-2 mt-1 border rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4 mt-3">
          <label htmlFor="formName" className="block text-black-700">
            Name
          </label>
          <input
            type="text"
            id="formName"
            name="name"
            placeholder="Please enter your name"
            className="w-full px-3 py-2 mt-1 border rounded" 
            required
          />
        </div>
        <div className="mb-4 mt-3">
          <label htmlFor="formEmail" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="formEmail"
            name="email"
            placeholder="Please enter your email address"
            className="w-full px-3 py-2 mt-1 border rounded"
            required
          />
        </div>
        <div className="mb-4 mt-3">
          <label htmlFor="formPhone" className="block text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="formPhone"
            name="phone"
            placeholder="Please enter your phone number"
            className="w-full px-3 py-2 mt-1 border rounded"
          />
        </div>
        <div className="mb-4 mt-3">
          <label htmlFor="formWebsite" className="block text-gray-700">
            Problem
          </label>
          <input
            type="text"
            id="formWebsite"
            name="Problem"
            placeholder="Please enter your Problem"
            className="w-full px-3 py-2 mt-1 border rounded"
          />
        </div>
        <div className="mb-4 mt-3">
          <label className="inline-flex items-center">
            <input type="checkbox" name="terms" className="form-checkbox" required />
            <span className="ml-2 text-gray-700">I agree with the terms.</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        >
          Send Message Now
        </button>
        <div className="mt-4 text-green-500">
          {result}
        </div>
      </form>
    </div> 






    </>

  );
};

export default ContactForm;
