import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
// import { useParams } from 'react-router-dom'; //to get user Id from route params
import { ToastContainer, toast } from "react-toastify";
import cancle from "./delete.png";
import edit from "./editing.png";
import { FaUserAlt } from "react-icons/fa";

import deletedataA from "./delete.png";
import updatedata from "./update.png";
import AppointmentSchedule from "../component/AppoinmentUI/Appoinmentui";
import Footer from "../component/Footer/Footer";
// import { Appointment } from '../../../server/model';
const PatientDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userdata, setUserdata] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [appointmentToUpdate, setAppointmentToUpdate] = useState(null);

  // const {id}=useParams(); //get user id from route params

  //Fetch user data including appointments

  // const fetchUserData = async () => {
  //   try {
  //     const response = await axiosInstance.get(`/auth/userbyid`);
  //     console.log(response.data.data)
  //     const userData = response.data.data;
  //     setUserInfo(userData);
  //     setAppointments(userData.appointments || []);

  //     setLoading(false);

  //   } catch (error) {
  //     setError(error.response ? error.response.data.message : 'An error occured');
  //     setLoading(false);
  //   }
  // };



  const getUserInfoFromToken = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    console.log(user);
    if (!token) {
      console.log("null token");
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
 
  const handlelogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const loginuser = async () => {
    try {
      const loginData = await axiosInstance.get("/auth/userbyid");
      console.log("logeduser", loginData);
      setUserdata(loginData.data.data);
    } catch (error) {
      console.error("error fetching user data:", error);
    }
  };
  console.log("user",userdata);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get(
        "/Appointment/getAppointmentsByloggedId"
      );

      setAppointments(response.data.appointments);
      console.log("setAppointments: ", response.data.appointments);
 
      setLoading(false);
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
      setLoading(false);
    }
  };

  const handleDelete = async (userdata) => {
    try {
      await axiosInstance.delete(`/Patient/patient/${userdata._id}`); 
      // toast.success("Patient Delete Successfully");
      loginuser();
    } catch (err) {
      console.log(err.response ? err.response.data.message : "An error occurred");
    }
  };

  // // appoinment delete api
  // const Delete = async (data) => {
  //   const id = data._id;
  //   if (!id) {
  //     toast.error("Invalid appointment ID");
  //     return;
  //   }

  //   try {
  //     const response = await axiosInstance.delete(`/Appointment/cancelAppointment/${id}`);
  //     toast.success(response.data.message);

  //   } catch (error) {
  //     toast.error(error.response ? error.response.data.message : "Error canceling appointment");
  //   }
  // };

  // appointment and booking delete api using Promise.all
  const Delete = async (data) => {
    const appointmentId = data._id;
    const bookingId = data.bookingId; // Check if bookingId exists

    // Log the data object for debugging purposes
    console.log("Data:", data);

    if (!appointmentId) {
      toast.error("Invalid appointment ID");
      return;
    }

    try {
      if (bookingId) {
        // If bookingId exists, delete both appointment and booking concurrently
        const [appointmentResponse, bookingResponse] = await Promise.all([
          axiosInstance.delete(
            `/Appointment/cancelAppointment/${appointmentId}`
          ),
          axiosInstance.delete(`/Booking/cancelBooking/${bookingId}`),
        ]);

        // Success messages for both operations
        toast.success(appointmentResponse.data.message);
        toast.success(bookingResponse.data.message);
      } else {
        // If no bookingId, just delete the appointment
        const appointmentResponse = await axiosInstance.delete(
          `/Appointment/cancelAppointment/${appointmentId}`
        );
        toast.success(appointmentResponse.data.message);
      }
    } catch (error) {
      // Handle errors
      toast.error(
        error.response
          ? error.response.data.message
          : "Error canceling appointment or booking"
      );
    }
  };

  const handleUpdate = async () => {
    try {
      const id = selectedPatient._id;
      await axiosInstance.put(`/Patient/updatepatient/${id}`, selectedPatient);
      setTimeout(() => {
        toast.success("Patient updated successfully!");
        setIsModalOpen(false);
      }, 2000);
      loginuser();
    } catch (error) {
      toast.error("Error updating patient");
    }
  };

  useEffect(() => {
    const userData = getUserInfoFromToken();
    setUserInfo(userData);
    // console.log(userData);

    fetchAppointments();
  }, []);

  const handleUpdateClick = (appointment) => {
    setAppointmentToUpdate(appointment);
    setShowPopup(true);
  };

  const openModal = (patientData) => {
    setSelectedPatient(patientData);
    setIsModalOpen(true);
  };


  useEffect(() => {
    loginuser();
    fetchAppointments();
  }, []);
  // appointments deleteapi

  const patientData = {
    name: "John Doe",
    age: "-",
    gender: "Male",
    contact: "+1 (555) 123-4567",
    medicalRecordId: "MR123456",
  };

  // const upcomingAppointments = [
  //   { date: "2024-09-05", time: "10:00 AM", doctor: "Dr. Smith" },
  //   { date: "2024-09-20", time: "2:00 PM", doctor: "Dr. Jones" },
  // ];

  // const recentTests = [
  //   { testName: "Blood Test", date: "2024-08-20", results: "Normal" },
  //   { testName: "X-Ray", date: "2024-08-15", results: "Pending" },
  // ];

  // const prescriptions = [
  //   {
  //     medication: "Medication A",
  //     dosage: "1 tablet daily",
  //     startDate: "2024-08-01",
  //     endDate: "2024-08-31",
  //   },
  //   {
  //     medication: "Medication B",
  //     dosage: "2 tablets twice a day",
  //     startDate: "2024-08-10",
  //     endDate: "2024-09-10",
  //   },
  // ];

  return (
    <div className="overflo-x-hidden">
      <Navbar />
      <div className="mt-32 w-full ">
        {/* Navbar */}
        <div className="w-full bg-teal-600 text-white bg-main-color ">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="p-4 flex flex-row items-center justify-between">
              <a
                href="#"
                className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
              >
                Patient Dashboard
              </a>
              <button
                className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  <path
                    className={!isMenuOpen ? "block" : "hidden"}
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path
                    className={isMenuOpen ? "block" : "hidden"}
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <nav
              className={`flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row ${isMenuOpen ? "flex" : "hidden"
                }`}
            >
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent hover:bg-amber-400 md:w-auto md:inline md:mt-0 md:ml-4 hover:bg-gray-200 focus:bg-amber-500 focus:outline-none focus:shadow-outline"
                >
                  <span>{userInfo?.fullName}</span>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className={`inline w-4 h-4 transition-transform duration-200 transform ${isDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48">
                    <div className="py-2 bg-white text-blue-800 text-sm rounded-sm border border-main-color shadow-sm">
                      <a
                        className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        href="#"
                      >
                        Settings
                      </a>
                      <a
                        className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        href="#"
                      >
                        Help
                      </a>
                      <div className="border-b"></div>
                      <a
                        className="block px-4 py-2 mt-2 text-sm bg-white md:mt-0 focus:text-gray-900 hover:bg-indigo-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={handlelogout}
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>{" "} 
      {/* End of Navbar */}
      {/* <div className=" mx-auto my-12 p-5 "> */}
      <div className="w-[90vw] min-h-[10vh] md:mt-2 p-5 md:flex md:gap-2 no-wrap md:-mx-2  ">
        {/* Left Side */}
        <div className="w-full md:w-3/12 md:mx-2 h-64  mb-4">
          {/* Profile Card */}
          <div className="bg-white p-3 border-t-4 border-green-400 md:h-[60vh] h-[30vh]">
            
            <h2 className="text-teal-800 flex  sm:text-xl leading-8 my-1 ms-4  text-base font-bold">
              <FaUserAlt className="m-2 text-xl rounded-full text-teal-800 sm:h-6 sm:w-6 h-4 w-4" />
              {userInfo?.fullName}
            </h2>

            <p className="ms-4 sm:text-lg  text-sm mb-0.5">
              <span className="font-bold text-black ">Email: </span>
              {userInfo?.email}
            </p>

            <p className="ms-4 sm:text-lg  text-sm  mb-0.5">
              <span className="font-bold text-black">Blood Group: </span>
              {userdata?.bloodgroup}
            </p>
            <p className="ms-4 sm:text-lg  text-sm mb-0.5">
              <span className="font-bold text-black">Role: </span>
              {userdata?.role}
            </p>
            <p className="ms-4 sm:text-lg  text-sm mb-0.5">
              <span className="font-bold text-black">Mobile: </span>
              {userdata?.mobile}
            </p>
            <p className="ms-4 sm:text-lg  text-sm mb-0.5">
              <span className="font-bold text-black">Date_of_birth: </span>
              {userdata?.date_of_birth || "N/A"}
            </p>
            <p className="ms-4 sm:text-lg  text-sm mb-0.5">
              <span className="font-bold text-black">Gender: </span>
              {patientData?.gender}
            </p>
            <p className="ms-4 sm:text-lg  text-sm mb-0.5">
              <span className="font-bold text-black">Address:</span>
              {userdata?.address || "N/A"}
            </p>
          </div>
        </div>

        <AppointmentSchedule appointment={appointments} />

        {/* End of Right Side */}
      </div>
      {/* </div> */}
      {/* patientlist start*/}

      <div className="bg-white w-[90vw] sm:w-10/12 mx-auto pb-10 mb-12 rounded-lg">
        <h2 className=" text-2xl font-bold text-center p-4">Patient</h2>

        <div className=" w-11/12 border-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 rounded-lg items-center  ">
          {userdata.patients &&
            userdata.patients.map((userdata) => (
              <div className=" sm:flex justify-around items-center bg-white mx-auto p-4 my-4 rounded-lg w-[80vw] sm:w-[35vw]">
                <div>
                  <p className="text-gray-600 text-base sm:text-lg">
                    {" "}
                    <span className="font-bold text-black">FullName : </span>
                    {userdata.fullName}
                  </p>
                  <p className="text-gray-600 text-base sm:text-lg">
                    {" "}
                    <span className="font-bold text-black">Mobile No: </span>
                    {userdata.mobile}
                  </p>
                  <p className="text-gray-600 text-base sm:text-lg">
                    {" "}
                    <span className="font-bold text-black">Address: </span>
                    {userdata.address}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 text-lg">
                    {" "}
                    <span className="font-bold text-black">Gender: </span>
                    {userdata.gender}
                  </p>
                  <p className="text-gray-600 text-lg">
                    {" "}
                    <span className="font-bold text-black">Blood Group: </span>
                    {userdata.bloodgroup}
                  </p>
                  
                </div>
                <div className="items-center  ">
                  <button
                    className="h-[35px] w-[90px] text-white bg-green-500 border border-green-500  mx-auto my-4"
                    onClick={() => openModal(userdata)}
                  >
                    Update
                  </button>
                  <button
                    className="h-[35px] w-[90px] bg-red-500 text-white border border-green-500 mx-auto my-4"
                    onClick={() => handleDelete(userdata)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed mt-24 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[700px] h-[650px]">
            <h2 className="text-xl font-bold mb-4">Update Patient</h2>
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                value={selectedPatient.fullName}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    fullName: e.target.value,
                  })
                }
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Mobile</label>
              <input
                type="text"
                value={selectedPatient.mobile}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    mobile: e.target.value,
                  })
                }
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="bloodgroup">
                Blood Group
              </label>
              <select
                name="bloodgroup"
                id="bloodgroup"
                value={selectedPatient.bloodgroup}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    bloodgroup: e.target.value,
                  })
                }
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
              {/* <label className="block mb-2">Bloodgroup</label>
                            <input
                                type="text"
                                value={selectedPatient.bloodgroup}
                                onChange={(e) => setSelectedPatient({ ...selectedPatient,bloodgroup: e.target.value })}
                                className="border rounded px-4 py-2 w-full"
                            /> */}
            </div>

            <div className="mb-4">
              <label className="block mb-2" htmlFor="gender">
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={selectedPatient.gender}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    gender: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {/* <label className="block mb-2">Gender</label>
              <input
                type="text"
                value={selectedPatient.gender}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    gender: e.target.value,
                  })
                }
                className="border rounded px-4 py-2 w-full"
              /> */}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <input
                type="text"
                value={selectedPatient.address}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    address: e.target.value,
                  })
                }
                className="border rounded px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="habits">
                Habits
              </label>
              <select
                name="habits"
                id="habits"
                value={selectedPatient.habits}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    habits: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">Select Habits</option>
                <option value="Alcohol">Alcohol</option>
                <option value="Smoking">Smoking</option>
                <option value="Tobacco">Tobacco</option>
                <option value="Other">Other</option>
              </select>
              {/* <label className="block mb-2">Habits</label>
              <input
                type="text"
                value={selectedPatient.habits}
                onChange={(e) =>
                  setSelectedPatient({
                    ...selectedPatient,
                    habits: e.target.value,
                  })
                }
                className="border rounded px-4 py-2 w-full"
              /> */}
            </div>
            {/* <div className="mb-4">
                            <label className="block mb-2">Personal History</label>
                            <input
                                type="text"
                                value={selectedPatient.personalhistory}
                                onChange={(e) => setSelectedPatient({ ...selectedPatient, personalhistory: e.target.value })}
                                className="border rounded px-4 py-2 w-full"
                            />
                        </div> */}
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mx-6"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default PatientDashboard;
