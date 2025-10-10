import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    mobile: '',
    age: '',
    bloodgroup: '',
    bio: '',
    gender: 'Male'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      try {
        const response = await axiosInstance.post('/auth/signup', formData);
        console.log('Signup successful:', response.data);
        navigate('/login')
      } catch (error) {
        console.error('There was an error during signup!', error);
      }
    }
  };

  const inputClassName = "w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none";
  const labelClassName = "block mb-2 text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/sbg.jpg')" }}>
      <div className="bg-white bg-opacity-40 backdrop-blur-lg p-10 rounded-lg shadow-2xl max-w-lg w-full">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          {step === 1 ? 'Step 1: Credentials' : 'Step 2: Additional Information'}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div>
                <label htmlFor="email" className={labelClassName}>Email</label>
                <input
                  type="email"
                  id="email"
                  className={inputClassName}
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className={labelClassName}>Password</label>
                <input
                  type="password"
                  id="password"
                  className={inputClassName}
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="fullName" className={labelClassName}>Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className={inputClassName}
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="username" className={labelClassName}>Username</label>
                <input
                  type="text"
                  id="username"
                  className={inputClassName}
                  placeholder="Enter your username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="mobile" className={labelClassName}>Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  className={inputClassName}
                  placeholder="Enter your mobile number"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="age" className={labelClassName}>Age</label>
                <input
                  type="number"
                  id="age"
                  className={inputClassName}
                  placeholder="Enter your age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="bloodgroup" className={labelClassName}>Blood Group</label>
                <select
                  id="bloodgroup"
                  className={inputClassName}
                  required
                  value={formData.bloodgroup}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select your blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div>
                <label htmlFor="bio" className={labelClassName}>Bio</label>
                <input
                  type="text"
                  id="bio"
                  className={inputClassName}
                  placeholder="Enter a brief bio"
                  required
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200"
              >
                Sign Up
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
