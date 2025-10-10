import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../axiosConfig";

const UserCardList = () => {
  const [users, setUsers] = useState([]); // State to hold users
  const [filter, setFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [newStaff, setNewStaff] = useState({
    img: "",
    fullName: "",
    username: "",
    password: "",
    mobile: "",
    email: "",
    date_of_birth: "",
    gender: "",
    bloodgroup: "",
    bio: "",
    role: "",
    specialty: "",
    address: "",
    degree: "",
  });

  const navigate = useNavigate();

  // Fetch users from the backend when the component mounts
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5050/auth/users', {
  //         withCredentials: true,
  //       });
  //       setUsers(response.data); // Assuming the data returned is an array of users
  //     } catch (error) {
  //       console.error('Error fetching users:', error.response?.data || error.message);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const token = localStorage.getItem('accessToken');

        // if (!token) {
        //   throw new Error('No access token provided');
        // }

        const response = await axiosInstance.get("/auth/noPatient", {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          // withCredentials: true,
        });

        setUsers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response?.data || error.message
        );
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = filter
    ? users.filter((user) => user.role.toLowerCase() === filter.toLowerCase())
    : users;

  const handleCardClick = (user) => {
    navigate(`/user-details/${user._id}`, { state: { user } });
  };

  const handleAddStaff = () => {
    setShowAddForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const addNewStaff = async (staffData) => {
    try {
      const response = await axiosInstance.post("/auth/signup", staffData, {
        // withCredentials: true,
      });
      console.log("New staff added:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding new staff:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleAddNewStaff = async (e) => {
    e.preventDefault();

    // Format the date_of_birth to only include the date
    const formattedStaff = {
      ...newStaff,
      date_of_birth: new Date(newStaff.date_of_birth)
        .toISOString()
        .split("T")[0], // Convert to 'YYYY-MM-DD'
    };

    try {
      const addedStaff = await addNewStaff(formattedStaff);
      setUsers((prevUsers) => [...prevUsers, addedStaff]);
      setShowAddForm(false);
      setNewStaff({
        img: "",
        fullName: "",
        username: "",
        password: "",
        mobile: "",
        email: "",
        date_of_birth: "",
        gender: "",
        bloodgroup: "",
        bio: "",
        role: "",
        specialty: "",
        degree: "",
        address: "",
      });
    } catch (error) {
      console.error("Failed to add staff:", error);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setNewStaff({
      img: "",
      fullName: "",
      username: "",
      password: "",
      mobile: "",
      email: "",
      date_of_birth: "",
      gender: "",
      bloodgroup: "",
      bio: "",
      role: "",
      specialty: "",
      degree: "",
      address: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filter and Add Staff Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 ">
        <select
          className="w-full md:w-1/3 px-4 py-2 mb-4 md:mb-0 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          onChange={(e) => setFilter(e.target.value)}
          defaultValue=""
        >
          <option value="">All Roles</option>
          <option value="Doctor">Doctor</option>
          <option value="Admin">Admin</option>
          <option value="SuperAdmin">SuperAdmin</option>
        </select>
        <button
          onClick={handleAddStaff}
          className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Staff
        </button>
      </div>

      {/* Add New Staff Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Staff
          </h3>
          <form onSubmit={handleAddNewStaff}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={newStaff.fullName}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={newStaff.username}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={newStaff.password}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="mobile">
                  Mobile No
                </label>
                <input
                  type="tel"
                  name="mobile"
                  id="mobile"
                  value={newStaff.mobile}
                  onChange={handleFormChange}
                  required
                  pattern="^\d{10}$"
                  placeholder="1234567890"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={newStaff.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="date_of_birth"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  id="date_of_birth"
                  value={newStaff.date_of_birth}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="gender">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={newStaff.gender}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="bloodgroup"
                >
                  Blood Group
                </label>
                <select
                  name="bloodgroup"
                  id="bloodgroup"
                  value={newStaff.bloodgroup}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  value={newStaff.bio}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                ></textarea>
              </div>

              {/* Role */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="role">
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={newStaff.role}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="">Select Role</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {newStaff.role == "Doctor" ? (
                <>
                  {/* specialty */}
                  <div className="md:col-span-2">
                    <label
                      className="block text-gray-700 mb-1"
                      htmlFor="specialty"
                    >
                      Specialty
                    </label>
                    <select
                      name="specialty"
                      id="specialty"
                      value={newStaff.specialty}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                    >
                      <option value="">Select Specialty</option>
                      <option value="consultant physician">
                        Consultant Physician
                      </option>
                      <option value="orthopedic & spine">
                        Orthopedic & Spine
                      </option>
                      <option value="neuro surgery">Neuro Surgery</option>
                      <option value="gastroenterology">Gastroenterology</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="pediatric">Pediatric</option>
                      <option value="gynac & obstretic">
                        Gynac & Obstretic
                      </option>
                      <option value="general surgery">General Surgeon</option>
                      <option value="skin (cosmo & trico)">
                        Skin (cosmo & trico)
                      </option>
                      <option value="anathesia">Anathesia</option>
                    </select>
                  </div>

                  {/* degree */}
                  <div className="md:col-span-2">
                    <label
                      className="block text-gray-700 mb-1"
                      htmlFor="degree"
                    >
                      Degree
                    </label>
                    <input
                      type="text"
                      name="degree"
                      id="degree"
                      value={newStaff.degree}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  </div>
                </>
              ) : (
                ""
              )}

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={newStaff.address}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="img">
                  Profile Photo
                </label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  value={newStaff.img}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 mr-4 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleAddNewStaff}
                className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add Staff
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="  bg-white p-6 rounded-lg border border-gray-200 shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 items-center"
            onClick={() => handleCardClick(user)}
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              <span className="font-bold text-black">{user.fullName}</span>
            </h2>

            <div className="sm:flex items-center">

              {/* img */}

              <img src={user.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS99bE6G1j_MJPlxG9z1yGpSFqeEt-ylJi6LWpnd5REpZYqeT3oGh90IFfcxy6PcRnQs0&usqp=CAU"} alt="" className="h-24 w-24 block mx-auto sm:mx-6 border-0 rounded-full" />


              {/* data */}
              <div>

                <p className="text-gray-600 text-base sm:text-lg">
                  {" "}
                  <span className="font-bold text-black">Role : </span>
                  {user.role}
                </p>
                <p className="text-gray-600 text-base sm:text-lg">
                  {" "}
                  <span className="font-bold text-black">Email : </span>
                  {user.email}
                </p>
                <p className="text-gray-600 text-base sm:text-lg">
                  <span className="font-bold text-black">DOB : </span>
                  {user.date_of_birth
                    ? new Date(user.date_of_birth).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-gray-600 text-base sm:text-lg">
                  {" "}
                  <span className="font-bold text-black">Blood Group : </span>{" "}
                  {user.bloodgroup}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCardList;
