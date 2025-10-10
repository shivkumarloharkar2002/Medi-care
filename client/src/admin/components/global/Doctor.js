import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosConfig';

const Doctor = ({ filteredUsers }) => {
  const navigate = useNavigate();

  const handleViewProfile = (user) => {
    navigate(`/doctor-details/${user._id}`, { state: { user } });
  };

  const handleViewSchedule = (user) => {
    navigate(`/doctor-schedule/${user._id}`, { state: { doctorId: user._id } }); // Pass doctorId to the schedule component
  };

  return ( 
    <div className="p-6 bg-gray-100 min-h-screen">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          
          <div key={user._id} className="bg-white p-6 rounded-lg shadow-lg">
            {console.log(user)}
            <img
              src={user.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS99bE6G1j_MJPlxG9z1yGpSFqeEt-ylJi6LWpnd5REpZYqeT3oGh90IFfcxy6PcRnQs0&usqp=CAU"}
              alt={user.fullName}
              className="w-full h-48 sm:h-60 lg:h-80 aspect-auto rounded-t-lg mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">Name : {user.fullName}</h3> 
            <p className="text-gray-700 mb-2">Username: {user.username}</p>
            <p className="text-gray-700 mb-2">Mobile: {user.mobile}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleViewProfile(user)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                View Profile
              </button> 
              <button
                onClick={() => handleViewSchedule(user)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Doctors = () => {
  const [users, setUsers] = useState([]); 
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/auth/findDoctorsByRole');
        setUsers(response.data.doctors);
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) => user.role === 'Doctor') 
    .filter((user) => (filter ? user.role.toLowerCase() === filter.toLowerCase() : true)); 

  return (
    <div>
      <Doctor filteredUsers={filteredUsers || []} />
    </div>
  );
};

export default Doctors;
