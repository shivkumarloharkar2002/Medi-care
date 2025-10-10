import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

const DoctorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state;

  const [formData, setFormData] = useState({
    id: user._id,
    img: null,
    fullName: user.fullName,
    role: user.role,
    specialty: user.specialty,
    degree: user.degree,
    email: user.email,
    password: user.password,
    date_of_birth: user.date_of_birth,
    mobile: user.mobile,
    address: user.address,
    username: user.username,
    bio: user.bio,
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // Store the file if it's a file input
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append all form data
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axiosInstance.post(
        "/auth/updateUser",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );
      console.log(response);
      setPopupMessage("User updated successfully!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/admin/doctors");
      }, 2000);
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
    }
  };

  const handleCancel = () => {
    navigate("/admin/doctors");
  };

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/auth/users/${user._id}`);
      setPopupMessage("User deleted successfully!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/admin/doctors");
      }, 2000);
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {formData.fullName}
        </h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Admin">Admin</option>
                <option value="SuperAdmin">SuperAdmin</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Specialty:</label>
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              >
                <option value="consultant physician">
                  Consultant Physician
                </option>
                <option value="orthopedic & spine">Orthopedic & Spine</option>
                <option value="neuro surgery">Neuro Surgery</option>
                <option value="gastroenterology">Gastroenterology</option>
                <option value="cardiology">Cardiology</option>
                <option value="pediatric">Pediatric</option>
                <option value="gynac & obstretic">Gynac & Obstretic</option>
                <option value="general surgery">General Surgeon</option>
                <option value="skin (cosmo & trico)">
                  Skin (cosmo & trico)
                </option>
                <option value="anathesia">Anathesia</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Degree:</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700">User Name:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password:</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth:</label>
              <input
                type="text"
                name="date_of_birth"
                value={
                  formData.date_of_birth
                    ? new Date(formData.date_of_birth).toLocaleDateString()
                    : "N/A"
                }
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700">Mobile Number:</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Bio:</label>
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700">Profile Photo:</label>
              <input
                type="file"
                name="img"
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className=" sm:flex justify-between mt-6  ">
            <button
              type="button"
              onClick={handleCancel}
              className="mx-auto  sm:mx-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
            <div className=" flex justify-between mt-4 sm:mt-0">
              <button
                type="button"
                onClick={handleDelete}
                className=" sm:mx-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
              <button
                type="submit"
                className="sm:mx-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </form>

        {showPopup && (
          <div className="fixed top-0 right-0 mt-4 mr-4 p-4 bg-green-600 text-white rounded-lg shadow-lg border border-green-700 z-50 transition-transform transform scale-100 animate-fade-in">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-white mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m0 0L5 7m14 10h-1m1 0h-1m-1 0H7"
                />
              </svg>
              <span className="font-semibold">{popupMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;
