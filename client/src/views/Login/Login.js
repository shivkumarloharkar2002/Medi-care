import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../component/Navbar/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Initialize loading state


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);


    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { accessToken, refreshToken, user } = response.data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Login successful!');

      

      if (user.role === 'Patient') {
        navigate('/patientdashboard');
      } else if (['Admin', 'Doctor', 'SuperAdmin'].includes(user.role)) {
        navigate('/admin');
      } else {
        toast.error('Unrecognized user role.');
      }


    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center  pt-20"
        // style={{ backgroundImage: "url('./login.avif')", objectFit: 'cover' }}
        style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/023/740/386/small_2x/medicine-doctor-with-stethoscope-in-hand-on-hospital-background-medical-technology-healthcare-and-medical-concept-photo.jpg')", objectFit: 'cover mx-1	' }}

      >
        <div className="bg-white bg-opacity-40 backdrop-blur-sm p-12 rounded-2xl shadow-2xl max-w-md w-full">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Login</h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">Email</label>
              <input
                type="text"
                id="email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-400 focus:outline-none placeholder-gray-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-green-400 focus:outline-none placeholder-gray-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-900 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition duration-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-8 text-center text-gray-800">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-700 hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
