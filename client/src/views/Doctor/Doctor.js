import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import Navbar from "../../component/Navbar/Navbar";
import "./style.css";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import Footer from "../../component/Footer/Footer";

const Doctor = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [doctorsData, setDoctorsData] = useState([]); // Store filtered doctor data
  const [currentPage, setCurrentPage] = useState(1);
  const [scheduleData, setScheduleData] = useState({}); // Store schedule data for each doctor
  const recordsPerPage = 6; // Number of records to display per page
  const navigate = useNavigate();

  // Function to decode the token and get user info
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

  // Fetch and filter data to only include doctors
  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/auth/findDoctorsByRole`);
      // const filteredDoctors = response.data.doctors
      //   .filter((item) => item.role === "Doctor")
      //   .sort((a, b) => a.specialty.localeCompare(b.specialty)); // Sort by specialty name

      // console.log(filteredDoctors);
      setDoctorsData(response.data.doctors); // Store filtered and sorted doctor data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to get schedule data for each doctor
  // const ScheduleData = async (doctors) => {
  //   const schedules = {};
  //   for (const doctor of doctors) {
  //     try {
  //       const response = await axiosInstance.get(
  //         `/Schedule/doctor-schedule/${doctor._id}`
  //       );
  //       schedules[doctor._id] = response.data; // Store schedule data by doctor ID
  //     } catch (error) {
  //       console.error(
  //         `Error fetching schedule for doctor ${doctor._id}:`,
  //         error
  //       );
  //       schedules[doctor._id] = []; // Handle case where there's no schedule data
  //     }
  //   }
  //   setScheduleData(schedules); // Store all schedules in state
  // };
  // console.log(scheduleData.data);

  useEffect(() => {
    const userData = getUserInfoFromToken();
    setUserInfo(userData);
    getData();
  }, []);

  // useEffect(() => {
  //   if (doctorsData.length > 0) {
  //     ScheduleData(doctorsData); // Fetch schedule data after doctorsData is fetched
  //   }
  // }, [doctorsData]);

  // Function to handle booking an appointment
  const handleBookAppointment = async (doctor) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/appointment/${doctor._id}`);
  };

  // Pagination Logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = doctorsData.slice(firstIndex, lastIndex);
  console.log(records);
  const nPage = Math.ceil(doctorsData.length / recordsPerPage);
  const pageNumbers = [...Array(nPage + 1).keys()].slice(1);
  // console.log(pageNumbers);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container  pt-20 md:px-4 lg:px-8 ">
        <main>
          <div className="doctor-list-container p-2 md:p-6 bg-white rounded-lg shadow-md mt-6">
            <div className="doctor-list-header flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold items-center">All Doctors</h2>
            </div>
            <div className="overflow-x-scroll w-[100%]">
              <table className="doctor-table w-full table-auto text-sm">
                <thead>
                  <tr className="">
                    <th className="md:px-4 px-2 py-2 text-[8px] md:text-base text-left ">Sr. No</th>
                    <th className="md:px-4 px-2 py-2 text-[8px] md:text-base text-left ">Physician Name</th>
                    <th className="md:px-4 px-2 py-2 text-[8px] md:text-base text-left ">Date</th>
                    <th className="md:px-4 px-2 py-2 text-[8px] md:text-base text-left ">Day</th>
                    <th className="md:px-4 px-2 py-2 text-[8px] md:text-base text-left ">Timing</th>
 
                    <th className="md:px-4 px-2 py-2 text-[8px] md:text-base text-left  hidden md:table-cell">
                      Contact Number 
                    </th> 
                    <th className="md:px-4 px-2 py-2 text-[8px] md:text-base text-left  hidden lg:table-cell">
                      Degree
                    </th>
                    <th className="md:px-4 px-2 py-2 text-[8px] md:text-base text-left ">Specialty</th>
                    <th className="md:px-4 px-2 py-2 text-[8px] md:text-base text-left ">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {records.map((doctor, index) => (
                    <tr key={doctor._id}>
                      <td className="md:px-4 py-2 px-2">
                        {index + 1 + (currentPage - 1) * recordsPerPage}
                      </td>
                      <td className="md:px-4 py-2 px-2">Dr. {doctor.username}</td>

                      <td className="md:px-4 py-2 px-2">
                        {console.log(doctor.schedule)}
                        {doctor.schedule.length > 0 &&
                          doctor.schedule[0].scheduleWeek.map((week, index) => {
                            const date = moment(week.date).format("DD/MM/YYYY");
                            return <span key={index}>{date}, </span>;
                          })}
                      </td>

                      <td className="md:px-4 py-2 px-2">
                        {doctor.schedule.length > 0 &&
                          doctor.schedule[0].scheduleWeek.map((week, index) => (
                            <span key={index}>{week.day},  </span>
                          ))}
                      </td>

                      <td className="px-4 w-[20px] py-2">
                        {doctor.schedule.length > 0 && 
                          doctor.schedule[0].scheduleWeek.map((week, index) => (
                            <div className="w-max" key={index}>
                              {week.time.map((timeSlot, i) => {
                                const start = moment(timeSlot.start, 'HH:mm').format('h:mm A');
                                const end = moment(timeSlot.end, 'HH:mm').format('h:mm A');
                                return (
                                  <span className="flex" key={i}>
                                    {start} - {end}
                                    {i < week.time.length - 1 ? ", " : "  "}
                                  </span>
                                );
                              })}
                            </div>
                          ))}
                      </td>

                      <td className="px-4 py-2hidden md:table-cell">
                        {doctor.mobile}
                      </td>
                      <td className="px-4 py-2hidden lg:table-cell">
                        {doctor.degree}
                      </td>
                      <td className="md:px-4 py-2 px-2">
                        <p
                          className={`specialty ${doctor.specialty
                            .toLowerCase()
                            .replace(/[&()]/g, "-")
                            .replace(/\s+/g, "-")}`}
                        >
                          {doctor.specialty}
                        </p>
                      </td>
                      <td className="md:px-4 py-2 px-2">
                        <button
                          className="book-appointment-button py-2 px-4 rounded h-20 text-sm"
                          onClick={() => handleBookAppointment(doctor)}
                        >
                          Book Appointment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="pagination flex justify-center mt-6 space-x-2">
              <button
                className="page-button"
                onClick={prePage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {pageNumbers.map((n, i) => (
                <button
                  className={`page-button ${
                    currentPage === n ? "bg-blue-500" : ""
                  }`}
                  key={i}
                  onClick={() => changePage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className="page-button"
                onClick={nextPage}
                disabled={currentPage === nPage}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Doctor;
