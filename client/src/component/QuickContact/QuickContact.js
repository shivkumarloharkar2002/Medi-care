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
  bgAccent: 'bg-green-500', // Consistent accent color
  textForeground: 'text-gray-800',
  textMutedForeground: 'text-gray-500',
};

const QuickContact = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className={`${sharedClasses.textLg} font-extrabold ${sharedClasses.textForeground}`}>
          Send Us A Message Anytime
        </h2>
        <p className={`${sharedClasses.mt2} ${sharedClasses.textMutedForeground}`}>
          We're here to help and answer any questions you might have. We look forward to hearing from you.
        </p>
      </div>
      <div className="mt-10 max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <form>
          <div className="mb-4">
            <label htmlFor="formMessage" className="block text-gray-700 font-semibold">
              Your Message
            </label>
            <textarea
              id="formMessage"
              rows="3"
              placeholder="Please write your message here"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
            ></textarea>
          </div>
          <div className="mb-4 mt-3">
            <label htmlFor="formName" className="block text-gray-700 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="formName"
              placeholder="Please enter your name"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 mt-3">
            <label htmlFor="formEmail" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="formEmail"
              placeholder="Please enter your email address"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 mt-3">
            <label htmlFor="formPhone" className="block text-gray-700 font-semibold">
              Phone
            </label>
            <input
              type="text"
              id="formPhone"
              placeholder="Please enter your phone number"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 mt-3">
            <label htmlFor="formWebsite" className="block text-gray-700 font-semibold">
              Website
            </label>
            <input
              type="text"
              id="formWebsite"
              placeholder="Please enter your website"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 mt-3">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">I agree with the terms.</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mt-3"
          >
            Send Message Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickContact;
