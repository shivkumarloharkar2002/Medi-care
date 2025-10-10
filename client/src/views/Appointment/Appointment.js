import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import ListIcon from "@mui/icons-material/List";
import ServicesIcon from "@mui/icons-material/Build";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaUserInjured } from "react-icons/fa";
import dayjs from "dayjs";
import Navbar from "../../component/Navbar/Navbar";
import NewLester from "../../component/NewLester/NewLester";
import Footer from "../../component/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Note: jwtDecode is imported without braces.
import background from "./newImage1.jpg"; // Ensure this image path is correct
import axiosInstance from "../../axiosConfig";
import doctor from "./doctor.png";
import appointmentbg from "./appointmentbg.jpg"
// const doctorsData = {
//   "General Checkup": ["Dr. Mandar Bhosle", "Dr. Abhay Patel"],
//   "Dental Care": ["Dr. Rahul Triumke"],
//   "Pediatric Care": ["Dr. Dhananjay Ware"],
//   Cardiology: ["Dr. Rahul Triumke", "Dr. Dhananjay Ware"],
// };

// const steps = ["Select Service", "Choose Date & Time", "Enter Details", "Summary"];

function Appointment() {
  const [activeTab, setActiveTab] = useState("service");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [DoctorsName, setDoctorsName] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [patient, setPatient] = useState([]);
  const [patientId, selectedPetientId] = useState(null);
  const [selectedpatient, setselectedPetient] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [able, setAble] = useState(false);

  const handleCancel = () => {
    navigate("/admin/appointments");
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get("/auth/users");
        const filteredDoctors = response.data.filter(
          (item) => item.role === "Doctor"
        );
        // console.log(filteredDoctors);
        setDoctors(filteredDoctors); // Store filtered doctor data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch data based on ID
      setActiveTab("date");
      setSelectedDoctorId(id);
    }
  }, [id]);

  const cardClasses = "bg-card p-4 rounded-lg shadow-md";
  const textPrimaryClasses = "text-primary hover:underline";
  const textSecondaryClasses = "text-secondary";
  const textMutedClasses = "text-muted-foreground";
  const [patientInfo, setPatientInfo] = useState({
    fullName: "",
    email: "",
    mobile: "",
    doctorId: "",
    age: "",
    referredBy: "",
    familyHistory: "",
    personalHistory: "",
    date: "",
    complaint: "",
    habits: "",
    paymentStatus: null,
    modeOfPayment: null,
    timeOfVisit: "",
    gender: "",
    address: "",
    bloodgroup: "",
    Bookslot: {},
    isExist: false,

    // dateTime: dayjs(),
  });

  const getUserInfoFromToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("null token");
      setIsLoggedIn(false);
      return null;
    }

    try {
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  useEffect(() => {
    const userData = getUserInfoFromToken();
    setUserInfo(userData);
    // console.log(userData);
  }, []);

  const handleInputChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      setPatientInfo({ ...patientInfo, [name]: value });
    } else {
      // console.log("patient selected:", event);
      const {
        fullName,
        email,
        mobile,
        doctorId,
        familyhistory,
        personalhistory,
        age,
        habits,
        address,
        gender,
        bloodgroup,
        _id,
      } = event;
      setPatientInfo({
        ...patientInfo,
        fullName,
        email,
        mobile,
        doctorId,
        age,
        familyHistory: familyhistory,
        personalHistory: personalhistory,
        habits,
        bloodgroup,
        gender,
        address,
        patientId: _id,
        isExist: true,
      });
    }
  };

  const handleChange = () => {
    if (activeTab === "service") {
      setActiveTab("date");
    }
    if (activeTab === "date") {
      setActiveTab("details");
    }
    if (activeTab === "details") {
      setActiveTab("summary");
    }
  };

  const handleSubmit = async () => {
    setAble(true)
    const payload = {
      patientInfo: patientInfo,
      doctor_id: selectedDoctorId,
      date: "",
      dateTime: patientInfo.Bookslot,
    };

    try {
      const response = await axiosInstance.post(
        "/Appointment/createAppointment",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        console.log("Appointment created successfully:", data);
        alert("Appointment created successfully!");
        navigate("/patientdashboard");
      } else {
        console.error("Error creating appointment:", response.statusText);
        alert("Failed to create the appointment. Please try again.");
      }

      setAble(false)
    } catch (error) {
      setAble(false)
      if (error.response) {
        console.error("Error creating appointment:", error.response.data);
        alert(
          `Failed to create the appointment: ${error.response.data.message || "Please try again."
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert(
          "No response from the server. Please check your network connection."
        );
      } else {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  {
    /* API */
  }
  const [doctorsData, setDoctorsData] = useState([]); // Store filtered doctor data
  const [Time, setTime] = useState(null);
  // Fetch and filter data to only include doctors
  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/auth/findDoctorsByRole`);

      // console.log(filteredDoctors);
      setDoctorsData(response.data.doctors); // Store filtered doctor data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const userData = getUserInfoFromToken();
    setUserInfo(userData);
    getData();
  }, []);

  {
    /* API */
  }
  //get schedule of doctor
  const getSchedule = async () => {
    // console.log(selectedDoctorId);
    try {
      const response = await axiosInstance.get(
        `/Schedule/doctor-schedule/${selectedDoctorId}`
      );
      if(response.data.data.scheduleWeek){
        setSchedule(response.data.data.scheduleWeek);
      }else{
        setSchedule([]);
      }
     

      // setDoctorsData(filteredDoctors); // Store filtered doctor data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //get schedule of doctor
  const getPetient = async () => {
    try {
      const response = await axiosInstance.get(`/Patient/patientbyid`);
      setPatient(response.data.data);
      console.log(patient);
      // setDoctorsData(filteredDoctors); // Store filtered doctor data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Get Doctor scedule
  useEffect(() => {
    if (activeTab == "date") {
      getSchedule();
    }
    if (activeTab == "details") {
      getPetient();
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className=" min-h-screen w-fit lg:w-full md:flex md:flex-col pt-12 items-center">
        <section className="w-6/5 bg-cover bg-center my-14 md:my-10 border border-gray-300">
          <div
            className=" mb-8 bg-cover bg-center bg-no-repeat w-[100vw] "
          // style={{ backgroundImage: "url(./appointmentbg.jpg)" }}
          >
            <img
              src={appointmentbg}
              alt="Appointment Background"
              className="w-full"
            />
          </div>

          <div className="md:flex justify-between items-center py-4 px-10 border border-gray-200">
            <h1 className="lg:text-4xl text-3xl mb-4 font-medium">Book An Appointment</h1>
            <div className="md:flex md:items-center text-center">
              <IconButton className="hover:bg-blue-700">
                <PhoneIcon className="text-green-500 hover:text-white hover:bg-blue-500 rounded-full" />
              </IconButton>
              <span className="text-lg ml-2"> +91 7588694436</span>
            </div>
          </div>

          <div className="bg-white md:p-6  shadow-md text-center mt-20 w-[100%]">
            <h2 className="text-blue-500 text-lg">
              Online Appointment Booking
            </h2>
            <h3 className="text-4xl font-bold mt-10">
              Please Fill In The Form
            </h3>
            <div className="mt-4 lg:flex w-full">
              <div className="lg:w-1/4 md:border-r-2 md:pr-4 md:text-center ml-5 min-w-fit md:w-full ">
                <ul className="lg:space-y-4 text-center text-xs md:text-md justify-between flex lg:block">
                  <li>
                    <button
                      className={`flex items-center md:mx-2 w-full text-left font-bold ${activeTab === "service"
                        ? "text-green-500"
                        : "text-black hover:text-green-500"
                        }`}
                      onClick={() => setActiveTab("service")}
                    >
                      {/* <ServicesIcon className="mr-2" /> */}
                      <img
                        className="mr-2 h-5 w-5"
                        src={doctor}
                        alt="doctors"
                      ></img>
                      Doctors
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full ml-3 text-left ${activeTab === "date"
                        ? "text-green-500"
                        : "text-black hover:text-green-500"
                        }`}
                      onClick={() => selectedDoctorId && setActiveTab("date")}
                    >
                      <CalendarTodayIcon className="mr-2" />
                     Schedule
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full ml-2 text-left ${activeTab === "details"
                        ? "text-green-500"
                        : "text-black hover:text-green-500"
                        }`}
                      onClick={() => patientInfo.Bookslot && selectedDoctorId && setActiveTab("details")}
                    >
                      <InfoIcon className="md:mr-1" />
                      Details
                    </button>
                  </li>
                  <li>
                    <button
                      className={`flex items-center w-full mx-3 text-left ${activeTab === "summary"
                        ? "text-green-500"
                        : "text-black hover:text-green-500"
                        }`}
                    >
                      <ListIcon className="mr-2" />
                      Summary
                    </button>
                  </li>
                </ul>
              </div>

              <div className="lg:w-3/4 lg:pl-4">
                {activeTab === "service" && (
                  <Card className="pb-4">
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Doctors
                      </Typography>

                      <div className="max-h-[60vh] w-full overflow-y-scroll">
                        <table className="min-w-full bg-white shadow-md rounded-lg ">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left bg-gray-200">
                                Sr.No
                              </th>
                              <th className="px-4 py-2 text-left bg-gray-200">
                                Name
                              </th>
                              <th className="px-4 py-2 text-left bg-gray-200">
                                Specialllist
                              </th>
                            </tr>
                          </thead>

                          <tbody style={{ height: "100px" }}>
                            {doctorsData.map((doctor, index) => (
                              <tr key={doctor.id}>
                                <td>{index + 1}</td>
                                <td>
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <input
                                      type="radio"
                                      name="doctor"
                                      required
                                      checked={selectedDoctorId === doctor._id}
                                      onChange={() =>
                                        setSelectedDoctorId(doctor._id)
                                      }
                                      style={{ marginRight: "10px" }}
                                    />
                                    Dr. {doctor.username}
                                  </div>
                                </td>
                                <td>{doctor.specialty}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* new */}
                    </CardContent>
                    <Button
                      variant="contained"
                      color="success"
                      className="w-1/2 mt-4"
                      onClick={() => {
                        if (selectedDoctorId) {
                          handleChange();
                        } else {
                          setPopupMessage("Please Select Doctor");
                          setShowPopup(true);
                          setTimeout(() => {
                            setShowPopup(false);
                          }, 2000);
                        }
                      }}
                    >
                      Next
                    </Button>
                  </Card>
                )}
                {activeTab === "date" && (
                  <Card className="p-4 m-5 ">
                    {
                      id ?


                        doctorsData.map((data) => {
                          if (id == data._id)
                            return (
                              <h1 className="text-lg font bold">Dr. {data.fullName}</h1>
                            )
                        })

                        : (
                          null
                        )
                    }
                    <CardContent>

                   
                   {
                   
                   schedule.length>0?
                   <div>
                   <Typography variant="small" component="div">
                   Select Day and Time of this week
                 </Typography>
                   <div className="mt-4 overflow-y-scroll h-[40vh]">
                        {/* {console.log(schedule)} */}

                        {
                          // schedule.length > 0 ? (
                          schedule.map((Day) => {
                            const date = moment(Day.date).format("DD/MM/YYYY");
                            return (
                              // console.log(Day)
                              <div className="p-3">
                                <h3>
                                  {Day.day} ({date})
                                </h3>
                                <div>
                                  {/* {console.log("day time",Day.time)} */}
                                  {Day.time.length > 0 ? (
                                    Day.time.map((time) => {
                                      const start = moment(time.start, 'HH:mm').format('h:mm A');
                                      const end = moment(time.end, 'HH:mm').format('h:mm A');
                                      return (
                                        <div className="flex justify-center m-2 ">
                                          <input
                                            type="radio"
                                            name="time"
                                            checked={Time === time._id}
                                            onChange={() => {
                                              setPatientInfo({
                                                ...patientInfo,
                                                Bookslot: {
                                                  day: Day.day,
                                                  time: {
                                                    start: time.start,
                                                    end: time.end,
                                                  },
                                                  dayId: Day._id,
                                                  timeId: time._id,
                                                },
                                              });
                                              setTime(time._id);
                                            }}
                                          />
                                          <p className="ml-2">
                                            {start} -- {end}
                                          </p>
                                        </div>
                                        // console.log(time.start,"--",time.end)
                                      );
                                    })
                                  ) : (
                                    <div className=" text-sm pt-5 content-center text-center">
                                      {" "}
                                      Sorry All Slot of this day is booked
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>

                      </div>
                      :
                      <Typography variant="small" component="div">
                      Sorry Doctor is not available 
                    </Typography>
                      
                      }
                    </CardContent>
                    <Button
                      variant="contained"
                      color="success"
                      className="w-1/2 mt-4"
                      onClick={() => {
                        console.log(patientInfo); // Add this for debugging
                        if (
                          patientInfo.Bookslot?.day &&
                          patientInfo.Bookslot.time.start &&
                          patientInfo.Bookslot.time.end
                        ) {
                          handleChange();
                        } else {
                          setPopupMessage("Please Select Day and Time");
                          setShowPopup(true);
                          setTimeout(() => {
                            setShowPopup(false);
                          }, 2000);
                        }
                      }}
                    >
                      Next
                    </Button>
                  </Card>
                )}
                {activeTab === "details" && (
                  <div className="my-4">
                    <Card>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          Exiting Patient
                        </Typography>
                        <div className="lg:space-y-2 lg:mx-4 overflow-y-scroll h-[40vh]">
                          {console.log("selected petient", patient)}
                          {patient.map((e) => (
                            <div className="flex w-[80]  md:max-w-[80vw] md:p-3 py-3">
                              <input
                                type="radio"
                                name="patient"
                                checked={patientId === e._id}
                                onChange={() => {
                                  selectedPetientId(e._id);
                                  setselectedPetient(e);
                                  handleInputChange(e);
                                }}
                                className="m-2"
                              />

                              <div className="bg-card md:p-4 p-2 w-full bg-slate-200 rounded-lg shadow-md">
                                <div className="flex  items-center w-full">
                                  <div className="flex justify-between w-full">

                                    <div className="flex w-fit md:w-full text-lg font-semibold">
                                      <span className="flex min-w-max"><FaUserInjured className="rounded-full  md:block mr-1 text-2xl" />   Name: {e.fullName}</span>

                                    </div>
                                    <p
                                      className={`${textSecondaryClasses} flex`}
                                    >
                                      <span className="flex text-lg font-semibold">
                                        Bloodgroup:{" "}
                                      </span>
                                      {e.bloodgroup}
                                    </p>

                                  </div>


                                </div>
                                <div className="flex justify-between w-full">

                                  <p className={`${textMutedClasses} flex`}>
                                    <span className="flex text-lg font-semibold">Gender:</span> {e.gender}
                                  </p>
                                  <p className={`${textPrimaryClasses} flex`}>
                                    <span className="flex text-lg font-semibold"> Mobile: </span>  {e.mobile}
                                  </p>
                                </div>

                                <div className="mt-4 flex justify-between ">
                                  <p className="flex">
                                    <span className="flex text-lg font-semibold">
                                      Address:
                                    </span>{" "}
                                    {e.address}
                                  </p>

                                </div>
                              </div>
                            </div>
                          )
                          )
                          }
                        </div>
                      </CardContent>
                    </Card>

                    <div className="bg-white px-4 md:p-6 rounded-lg border border-gray-200 shadow-lg my-6">
                      <form className="p-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                          {/* Full Name */}
                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="fullName"
                            >
                              Full Name <sup className="text-red-600">*</sup>
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              id="fullName"
                              value={patientInfo.fullName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                          </div>

                          {/* Mobile Number */}
                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="fullName"
                            >
                              Mobile<sup className="text-red-600">*</sup>
                            </label>
                            <input
                              type="number"
                              name="mobile"
                              id="mobile"
                              maxLength="10"
                              minLength="10"
                              value={patientInfo.mobile}
                              onChange={(e) => {
                                const regex = /^[0-9]*$/; // Only allows numbers
                                if (regex.test(e.target.value) && e.target.value.length <= 10) {
                                  handleInputChange(e);
                                }
                              }}
                              pattern="[0-9]{10}"
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                          </div>
                          {/* Email */}
                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="TimeofVisit"
                            >
                              Email<sup className="text-red-600">*</sup>
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={patientInfo.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                          </div>

                          {/* Age */}
                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="age"
                            >
                              Age<sup className="text-red-600">*</sup>
                            </label>
                            <input
                              type="number"
                              name="age"
                              id="age"
                              value={patientInfo.age}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                          </div>

                          {/* Reffered By */}
                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="refferedby"
                            >
                              Reffered By
                            </label>
                            <input
                              type="text"
                              name="referredBy"
                              id="referredBy"
                              value={patientInfo.referredBy}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                          </div>
                          {/* Gender */}
                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="personalhistory"
                            >
                              Gender<sup className="text-red-600">*</sup>
                            </label>
                            <select
                              name="gender"
                              id="gender"
                              value={patientInfo.gender}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          {/* Complaint */}
                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="complaint"
                            >
                              Complaint<sup className="text-red-600">*</sup> (Disease)
                            </label>
                            <input
                              type="text"
                              name="complaint"
                              id="complaint"
                              value={patientInfo.complaint}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                          </div>

                          {/* Family History */}

                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="personalhistory"
                            >
                              Family History (Disease)
                            </label>
                            <select
                              name="familyHistory"
                              id="familyHistory"
                              value={patientInfo.familyHistory}
                              onChange={handleInputChange}
                    
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            >
                              <option value="">Select</option>
                              <option value="BP">BP</option>
                              <option value="Diabetes">Diabetes</option>
                              <option value="Asthma">Asthma</option>
                              <option value="Thyroid">Thyroid</option>
                              <option value="TB">TB</option>
                              <option value="Other">Other</option>
                              <option value="No">Nothing</option>
                            </select>
                          </div>

                          {/* Personal History */}
                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="personalhistory"
                            >
                              Personal History (Disease)
                            </label>
                            <input
                              type="text"
                              name="personalHistory"
                              id="personalHistory"
                              value={patientInfo.personalHistory}
                              onChange={handleInputChange}
                            
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                          </div>

                          {/* Habits */}
                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="Habits"
                            >
                              Habits <sup className="text-red-600">*</sup> 
                            </label>
                            <select
                              name="habits"
                              id="habits"
                              value={patientInfo.habits}
                              onChange={handleInputChange}
                      
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            >
                              <option value="">Select Habits</option>
                              <option value="Alcohol">Alcohol</option>
                              <option value="Smoking">Smoking</option>
                              <option value="Tobacco">Tobacco</option>
                              <option value="Other">Other</option>
                              <option value="No">Nothing</option>
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
                              value={patientInfo.bloodgroup}
                              onChange={handleInputChange}
                       
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

                          {/* Visiting time */}

                          <div>
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="TimeofVisit"
                            >
                              Time of Visit <sup className="text-red-600">*</sup>
                            </label>
                            <select
                              name="timeOfVisit"
                              id="timeOfVisit"
                              value={patientInfo.timeOfVisit}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            >
                              <option value="">Select Visit</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="10+">10+</option>
                            </select>
                          </div>

                          {/* Address */}
                          <div className="md:col-span-2">
                            <label
                              className="block text-gray-700 mb-1"
                              htmlFor="Address"
                            >
                              Address<sup className="text-red-600">*</sup> 
                            </label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              value={patientInfo.address}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                            />
                          </div>
                        </div>

                        <div className="mt-6 p-4 flex justify-center">
                          <Button
                            variant="contained"
                            color="success"
                            className="w-1/2 mt-4"
                            onClick={() => {
                              //  console.log( patientInfo.fullName &&
                              //   patientInfo.mobile &&
                              //   patientInfo.email &&
                              //   patientInfo.age &&
                              //   patientInfo.gender &&
                              //   patientInfo.complaint &&
                              //   patientInfo.familyHistory &&
                              //   patientInfo.personalHistory &&
                              //   patientInfo.habits &&
                              //   patientInfo.bloodgroup &&
                              //   patientInfo.timeOfVisit &&
                              //   patientInfo.address); // Add this for debugging
                              if (
                                patientInfo.fullName &&
                                patientInfo.mobile &&
                                patientInfo.age &&
                                patientInfo.gender &&
                                patientInfo.complaint &&
                                patientInfo.habits &&
                                patientInfo.timeOfVisit &&
                                patientInfo.address
                              ) {
                                handleChange();
                              } else {
                                setPopupMessage("Please Fill all Fields");
                                setShowPopup(true);
                                setTimeout(() => {
                                  setShowPopup(false);
                                }, 2000);
                              }
                            }}
                          >
                            Next
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {activeTab === "summary" && (

                  <Card>
                    <CardContent className="bg-gray-100">
                      <Typography variant="h5" component="div">
                        Summary of Your Appointment
                      </Typography>
                      <div className="mt-4 bg-white rounded-lg shadow-lg py-6 flex flex-col md:flex-row justify-between px-4">
                        <div className="flex-1 mb-4 md:mb-0">
                          <Typography className="text-left">
                            <span className="font-semibold">Full Name:</span>{" "}
                            {patientInfo.fullName}
                          </Typography>

                          <Typography className="text-left">
                            <span className="font-semibold">Email:</span> {patientInfo.email}
                          </Typography>
                          <Typography className="text-left">
                            <span className="font-semibold">Address:</span> {patientInfo.address}
                          </Typography>
                          <Typography className="text-left">
                            <span className="font-semibold">Complaint (Disease):</span>{" "}
                            {patientInfo.complaint}
                          </Typography>

                          <Typography className="text-left">
                            <span className="font-semibold">Age:</span> {patientInfo.age}
                          </Typography>
                          <Typography className="text-left">
                            <span className="font-semibold">Referred By:</span> {patientInfo.referredBy}
                          </Typography>
                          <Typography className="text-left">
                            <span className="font-semibold">Gender:</span> {patientInfo.gender}
                          </Typography>
                        </div>

                        <div className="flex-1">
                          {doctorsData.map((doctor) => {
                            if (doctor._id === selectedDoctorId) {
                              return (
                                <Typography className="text-left" key={doctor._id}>
                                  <span className="font-semibold">Doctor Name:</span> Dr. {doctor.username}
                                </Typography>
                              );
                            }
                            return null; // Handle case where doctor is not found
                          })}

                          <Typography className="text-left">
                            <span className="font-semibold">Phone Number:</span> {patientInfo.mobile}
                          </Typography>

                          <Typography className="text-left">
                            <span className="font-semibold">Family History:</span> {patientInfo.familyHistory}
                          </Typography>

                          <Typography className="text-left">
                            <span className="font-semibold">Personal History:</span> {patientInfo.personalHistory}
                          </Typography>

                          <Typography className="text-left">
                            <span className="font-semibold">Habits:</span> {patientInfo.habits}
                          </Typography>

                          <Typography className="text-left">
                            <span className="font-semibold">Blood Group:</span> {patientInfo.bloodgroup}
                          </Typography>

                          <Typography className="text-left">
                            <span className="font-semibold">Times of Visit:</span> {patientInfo.timeOfVisit}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                    <Button
                      variant="contained"
                      color="success"
                      className="w-full md:w-1/2 mb-4"
                      onClick={handleSubmit}
                      disabled={able}
                    >
                      Confirm Appointment
                    </Button>
                  </Card>

                )}
              </div>
            </div>
          </div>
        </section>
      </div>

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
      <Footer />
    </div>
  );
}

export default Appointment;
