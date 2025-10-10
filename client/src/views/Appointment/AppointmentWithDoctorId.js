// import React, { useState, useEffect } from "react";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import {
//   TextField,
//   Button,
//   IconButton,
//   Card,
//   CardContent,
//   Typography,
// } from "@mui/material";
// import PhoneIcon from "@mui/icons-material/Phone";
// import InfoIcon from "@mui/icons-material/Info";
// import ListIcon from "@mui/icons-material/List";
// import ServicesIcon from "@mui/icons-material/Build";
// import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import Navbar from "../../component/Navbar/Navbar";
// import NewLester from "../../component/NewLester/NewLester";
// import Footer from "../../component/Footer/Footer";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode"; // Note: jwtDecode is imported without braces.
// import background from "./newImage1.jpg"; // Ensure this image path is correct
// import axiosInstance from "../../axiosConfig";
// import { useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// const doctorsData = {
//   "General Checkup": ["Dr. Mandar Bhosle", "Dr. Abhay Patel"],
//   "Dental Care": ["Dr. Rahul Triumke"],
//   "Pediatric Care": ["Dr. Dhananjay Ware"],
//   Cardiology: ["Dr. Rahul Triumke", "Dr. Dhananjay Ware"],
// };

// const steps = ["Select Service", "Choose Date & Time", "Enter Details", "Summary"];

// function AppointmentWithDoctorId() {
//   const [activeTab, setActiveTab] = useState("service");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);
//   const navigate = useNavigate();
// //   {
// //     fullName: patientInfo.fullName,
// //     email: patientInfo.email,
// //     mobile: patientInfo.mobile,
// //     gender: patientInfo.gender,
// //     bloodgroup:patientInfo.bloodgroup,
// //     date_of_birth: patientInfo.date_of_birth,
// //     createdAt:new Date,
// //     updatedAt:new Date,
// // }
//   const [patientInfo, setPatientInfo] = useState({
//     isExists: false,
//     fullName: "",
//     email: "",
//     mobile: "",
//     gender: "",
//     illness: "",
//     address: "",
//     age: "",
//     bloodgroup: "",
//     date_of_birth: "",
//     dateTime: dayjs(),
//   });

//   const doctorId = useParams()
//   console.log("doctorId is : ", doctorId)

//   const getUserInfoFromToken = () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.log("null token");
//       setIsLoggedIn(false);
//       return null;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       setIsLoggedIn(true);
//       return decodedToken;
//     } catch (error) {
//       console.error("Invalid token:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const userData = getUserInfoFromToken();
//     setUserInfo(userData);
//     console.log(userData);
//   }, []);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setPatientInfo({ ...patientInfo, [name]: value });
//   };

//   const handleChange = () => {
//     if (activeTab === "service") {
//       setActiveTab("date");
//     }
//     if (activeTab === "date") {
//       setActiveTab("details");
//     }
//     if (activeTab === "details") {
//       setActiveTab("summary");
//     }
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       patientInfo: patientInfo,
//       doctor_id: String('66d6c9a0a26e91e712a10b76'),
//       date: "",
//       dateTime: patientInfo.dateTime.format("YYYY-MM-DD HH:mm"),
//     };

//     try {
//       const response = await axiosInstance.post("/Appointment/createAppointment", payload);
    
//       if (response.status === 200 || response.status === 201) {
//         const data = response.data; 
//         console.log("Appointment created successfully:", data);
//         toast.success("Appointment created successfully!");
//         navigate("/patientdashboard"); 
//       } else {
//         console.error("Error creating appointment:", response.statusText);
//         alert("Failed to create the appointment. Please try again.");
//       }
//     } catch (error) {
      
//       if (error.response) {
        
//         console.error("Error creating appointment:", error.response.data);
//         alert(`Failed to create the appointment: ${error.response.data.message || "Please try again."}`);
//       } else if (error.request) {
        
//         console.error("No response received:", error.request);
//         alert("No response from the server. Please check your network connection.");
//       } else {
        
//         console.error("Error:", error.message);
//         alert("An error occurred. Please try again later.");
//       }
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <ToastContainer />
//       <div className="bg-cream min-h-screen flex flex-col pt-12 items-center">
//         <section className="w-4/5 bg-cover bg-center my-8 border border-gray-300">
//           <div
//             className="w-5/5 mx-auto mb-8 bg-cover bg-center"
//             style={{ backgroundImage: "url(./appointmentbg.jpg)" }}
//           >
//             <img
//               src="./appointmentbg.jpg"
//               alt="Appointment Background"
//               className="w-full"
//             />
//           </div>

//         <div className="flex justify-between items-center py-4 px-10 border border-gray-200">
//           <h1 className="text-4xl font-medium">Book An Appointment</h1>
//           <div className="flex items-center">
//             <IconButton className="hover:bg-blue-700">
//               <PhoneIcon className="text-green-500 hover:text-white hover:bg-blue-500 rounded-full" />
//             </IconButton>
//             <span className="text-lg ml-2"> 02487-221525</span>
//           </div>
//         </div>

//           <div className="bg-white p-6 shadow-md text-center mt-20">
//             <h2 className="text-blue-500 text-lg">Online Appointment Booking</h2>
//             <h3 className="text-4xl font-bold mt-10">Please Fill In The Form</h3>
//             <div className="mt-4 flex">
//               <div className="w-1/4 border-r-2 pr-4 text-center">
//                 <ul className="space-y-4 text-center">
//                   <li>
//                     <button
//                       className={`flex items-center w-full text-left font-bold ${
//                         activeTab === "service"
//                           ? "text-green-500"
//                           : "text-black hover:text-green-500"
//                       }`}
//                       onClick={() => setActiveTab("service")}
//                     >
//                       <ServicesIcon className="mr-2" />
//                       Service
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       className={`flex items-center w-full text-left ${
//                         activeTab === "date"
//                           ? "text-green-500"
//                           : "text-black hover:text-green-500"
//                       }`}
//                     >
//                       <CalendarTodayIcon className="mr-2" />
//                       Date and Time
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       className={`flex items-center w-full text-left ${
//                         activeTab === "details"
//                           ? "text-green-500"
//                           : "text-black hover:text-green-500"
//                       }`}
//                     >
//                       <InfoIcon className="mr-2" />
//                       Basic Details
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       className={`flex items-center w-full text-left ${
//                         activeTab === "summary"
//                           ? "text-green-500"
//                           : "text-black hover:text-green-500"
//                       }`}
//                     >
//                       <ListIcon className="mr-2" />
//                       Summary
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//               <div className="w-3/4 pl-4">
//                 {activeTab === "service" && (
//                   <Card>
//                     <CardContent>
//                       <Typography variant="h5" component="div">
//                         Services Provided
//                       </Typography>
//                       <div className="mt-4">
//                         <label className="flex items-center space-x-2">
//                           <input
//                             type="checkbox"
//                             className="form-checkbox text-green-500"
//                           />
//                           <span>General Checkup</span>
//                         </label>
//                         <br />
//                         <label className="flex items-center space-x-2">
//                           <input
//                             type="checkbox"
//                             className="form-checkbox text-green-500"
//                           />
//                           <span>Dental Care</span>
//                         </label>
//                         <br />
//                         <label className="flex items-center space-x-2">
//                           <input
//                             type="checkbox"
//                             className="form-checkbox text-green-500"
//                           />
//                           <span>Pediatric Care</span>
//                         </label>
//                         <br />
//                         <label className="flex items-center space-x-2">
//                           <input
//                             type="checkbox"
//                             className="form-checkbox text-green-500"
//                           />
//                           <span>Cardiology</span>
//                         </label>
//                       </div>
//                     </CardContent>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       className="w-1/2 mt-4"
//                       onClick={() => handleChange()}
//                     >
//                       Next
//                     </Button>
//                   </Card>
//                 )}
//                 {activeTab === "date" && (
//                   <Card>
//                     <CardContent>
//                       <Typography variant="h5" component="div">
//                         Select Date and Time
//                       </Typography>
//                       <div className="mt-4">
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                           <DateTimePicker
//                             label="Choose Date and Time"
//                             value={patientInfo.dateTime}
//                             onChange={(newValue) =>
//                               setPatientInfo({ ...patientInfo, dateTime: newValue })
//                             }
//                           />
//                         </LocalizationProvider>
//                       </div>
//                     </CardContent>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       className="w-1/2 mt-4"
//                       onClick={() => handleChange()}
//                     >
//                       Next
//                     </Button>
//                   </Card>
//                 )}
//                 {activeTab === "details" && (
//                   <Card>
//                     <CardContent>
//                       <Typography variant="h5" component="div">
//                         Enter Your Details
//                       </Typography>
//                       <div className="space-y-2 mt-4">
//                         <TextField
//                           label="Full Name"
//                           name="fullName"
//                           value={patientInfo.fullName}
//                           onChange={handleInputChange}
//                           fullWidth
//                         />
//                         <TextField
//                           label="Email"
//                           name="email"
//                           value={patientInfo.email}
//                           onChange={handleInputChange}
//                           fullWidth
//                         />
//                         <TextField
//                           label="Phone Number"
//                           name="mobile"
//                           value={patientInfo.mobile}
//                           onChange={handleInputChange}
//                           fullWidth
//                         />
//                         <TextField
//                           label="Illness"
//                           name="illness"
//                           value={patientInfo.illness}
//                           onChange={handleInputChange}
//                           fullWidth
//                         />
//                         <TextField
//                           label="gender"
//                           name="gender"
//                           value={patientInfo.gender}
//                           onChange={handleInputChange}
//                           fullWidth
//                         />
//                         <TextField
//                           label="Address"
//                           name="address"
//                           value={patientInfo.address}
//                           onChange={handleInputChange}
//                           fullWidth
//                         />
//                         {/* <div className="mt-4"> */}
//                         {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
//                           <DateTimePicker
//                             label="Choose Date of Birth"
//                             value={patientInfo.date_of_birth}
//                             onChange={(newValue) =>
//                               setPatientInfo({ ...patientInfo, date_of_birth: newValue })
//                             }
//                           />
//                         </LocalizationProvider> */}
//                       {/* </div> */}
//                         <TextField
//                           label="Age"
//                           name="age"
//                           value={patientInfo.age}
//                           onChange={handleInputChange}
//                           fullWidth
//                         />
//                         <TextField
//                           label="Blood Group"
//                           name="bloodgroup"
//                           value={patientInfo.bloodgroup}
//                           onChange={handleInputChange}
//                           fullWidth
//                         />
//                       </div>
//                     </CardContent>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       className="w-1/2 mt-4"
//                       onClick={() => handleChange()}
//                     >
//                       Next
//                     </Button>
//                   </Card>
//                 )}
//                 {activeTab === "summary" && (
//                   <Card>
//                     <CardContent>
//                       <Typography variant="h5" component="div">
//                         Summary of Your Appointment
//                       </Typography>
//                       <div className="space-y-2 mt-4">
//                         <Typography>Name: {patientInfo.fullName}</Typography>
//                         <Typography>Email: {patientInfo.email}</Typography>
//                         <Typography>Phone Number: {patientInfo.phoneNumber}</Typography>
//                         <Typography>Illness: {patientInfo.illness}</Typography>
//                         <Typography>Address: {patientInfo.address}</Typography>
//                         <Typography>Age: {patientInfo.age}</Typography>
//                         <Typography>Blood Group: {patientInfo.bloodGroup}</Typography>
//                         <Typography>
//                           Date and Time: {patientInfo.dateTime.format("YYYY-MM-DD HH:mm")}
//                         </Typography>
//                       </div>
//                     </CardContent>
//                     <Button
//                       variant="contained"
//                       color="success"
//                       className="w-1/2 mt-4"
//                       onClick={handleSubmit}
//                     >
//                       Confirm Appointment
//                     </Button>
//                   </Card>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default AppointmentWithDoctorId;
