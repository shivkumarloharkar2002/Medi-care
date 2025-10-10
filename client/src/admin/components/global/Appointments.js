import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import deletedataA from "./delete.png";
import updatedata from "./update.png";

export default function Appointments() {
  const [alldoctor, setAlldoctor] = useState([]);

  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Current Appointment");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [appointmentToUpdate, setAppointmentToUpdate] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    payment: "Cash",
    status: "Scheduled",
    Pay: "Unpaid",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // // Fetch all appointments or a specific one if an ID is provided
  // const getData = async () => {
  //   try {
  //     const response = id
  //       ? await axiosInstance.get(`/Appointment/getAppointment/${id}`)
  //       : await axiosInstance.get('/Appointment/getAppointments');
  //     const fetchedAppointments = id ? [response.data.data] : response.data.data;
  //     setAllAppointments(fetchedAppointments);
  //     // applyFilters(fetchedAppointments);
  //   } catch (error) {
  //     console.error('Error fetching appointments:', error);
  //   }
  // };
  // console.log(allAppointments)

  // new
  const getData = async () => {
    try {
      const response = id
        ? await axiosInstance.get(`/Appointment/getAppointment/${id}`)
        : await axiosInstance.get("/Appointment/getAppointments");
      const fetchedAppointments = id
        ? [response.data.data]
        : response.data.data;
      setAllAppointments(fetchedAppointments);

      // Set the fetched data to filteredAppointments if no filter is applied
      setFilteredAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  console.log("nofilter applied", filteredAppointments);
  // new

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get(`/auth/findDoctorsByRole`);
        // toast.success(response.data.message);
        setAlldoctor(response.data.doctors);
        console.log(response);
      } catch (error) {
        toast.error(
          error.response
            ? error.response.data.message
            : "Error fetching doctors"
        );
      }
    };

    fetchDoctors();
  }, []);

  const handleAddAppointmentClick = () => {
    navigate("/appointment");
  };

  // const handleAddAppointmentClick = () => {
  //   setShowCreatePopup(true);
  // };

  const deletedata = async (data) => {
    try {
      const id = data._id;
      if (!id) {
        toast.error("Invalid appointment ID");
        return;
      }
      const bookingId = data.schedule_id._id;
      const patientId = data.patient_id._id;
      console.log("bookingId=", bookingId, "patientId = ", patientId);

      const user_id = data.doctor_id._id;
      const day = data.date_time.day;
      const start = data.date_time.time.start;
      console.log("user_id=", user_id, "day =", day, "start = ", start);

      const cancelbooking = await axiosInstance.put(`/Schedule/cancelBooking`, {
        bookingId,
        patientId,
        day,
        start,
      });
      console.log(cancelbooking);
      const cancelAppointment = await axiosInstance.delete(
        `/Appointment/cancelAppointment/${id}`
      );
      toast.success(cancelbooking.data.message);
      // Optionally, refresh the bookings list here
      window.location.reload();
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "Error canceling booking"
      );
    }
  };

  // Handle updating appointment (opens popup with form)
  const handleUpdateClick = (appointment) => {
    setAppointmentToUpdate(appointment);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setAppointmentToUpdate(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentToUpdate((prev) => ({
      ...prev,
      [name]: value, // This will correctly update the `Payment` field as well
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!appointmentToUpdate) return;

    const updatedData = {
      ...appointmentToUpdate,
      date: moment(appointmentToUpdate.date).format("YYYY-MM-DD"),
    };

    try {
      const response = await axiosInstance.post(
        `/Appointment/updateAppointment/${appointmentToUpdate._id}`,
        updatedData
      );
      toast.success(response.data.message);
      getData(); // Refresh data after update
      handlePopupClose(); // Close the update popup
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data.message
          : "Error updating appointment"
      );
    }
  };

  // Handle creating a new appointment
  const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/Appointment/createAppointment",
        newAppointment
      );
      toast.success(response.data.message);
      setShowCreatePopup(false);
      setNewAppointment({
        patientName: "",
        doctorName: "",
        date: "",
        payment: "Cash",
        status: "Scheduled",
        Pay: "Unpaid",
      });
      getData();
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data.message
          : "Error creating appointment"
      );
    }
  };

  // filter

  const [doctorName, setDoctorName] = useState("");
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');

  const handleDoctorNameChange = (e) => {
    setDoctorName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleClear = async () => {
    setDoctorName("");
    setEndDate("");
    setStartDate("");
    getData();
  };

  const handleSubmit = async () => {
    console.log("Doctor Name:", doctorName);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const filter = {
      doctor_name: doctorName,
      startDate: startDate,
      endDate: endDate,
    };
    try {
      const response = await axiosInstance.post(
        `/Appointment/filterAppointments`,
        filter
      );
      toast.success(response.data.message);
      setFilteredAppointments(response.data.appointments);
      console.log("filtereddata", response.data.appointments);
      // getData();
    } catch (error) {
      toast.error(
        error.response
          ? error.response.data.message
          : "Error filtering appointment"
      );
    }
  };
  // filter

  // Clear date input
  const clearDateFilters = () => {
    setDoctorName("");
    setStartDate("");
    setEndDate("");
  };
  return (
    <div className="container mx-auto p-4">
      {/* Filters */}

      <div className="flex justify-between w-full items-center mb-4">
        <div className="sm:flex flex-wrap justify-between w-full mt-5 space-y-4 sm:space-y-0">
          <div >
            <span className="py-2 px-2" htmlFor="doctorName">
              Doctor
            </span>
            <select
              name="doctorName"
              id="doctorName"
              value={doctorName}
              onChange={handleDoctorNameChange}
              required
              className="px-4 py-2 h-10 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>

              {alldoctor.map((doctor) => (
                <option value={doctor._id}>{doctor.username}</option>
                // <option key={doctor._id} value={doctor._id}>{doctor.username}</option>
              ))}
            </select>
          </div>
          <div>
            <span className="p-2">Start Date:</span>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="px-4 py-2  h-10  border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <span className="p-2">End Date:</span>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="px-4 py-2  h-10  border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
         <div className="flex">
          <div>
            <button
              onClick={handleSubmit}
              className="md:px-4 px-2 h-8 mr-1 md:mr-4 mt-2 ml-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply
            </button>

          </div>
          <div>
            <button
              onClick={handleClear}
              className="md:px-4 px-2 h-8 mr-1 md:mr-4  mt-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Clear
            </button>
          </div>
          <div >
          <button
            onClick={handleAddAppointmentClick}
            className="px-4 max-lg: md:h-8 h-fit w-fit md:mr-4 md:w-52 mt-6 sm:mt-2 max-md:mt-1 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Appointment
          </button> 
        </div>
          </div> 
      
        </div>
        
      </div>
      {/* <div className="flex justify-end  h ">
        <button
          onClick={handleAddAppointmentClick}
          className="px-2 py-2 h-auto bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Appointment
        </button>
      </div> */}

      <div className="w-[75vw] h-[50vh] sm:h-[88vh] overflow-x-auto sm:w-full">
        <table className=" w-48 overflow-x-scroll sm:w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th> 
              <th className="px-4 py-2 text-left">Patient Name</th>
              <th className="px-4 py-2 text-left">Doctor Name</th>
              <th className="px-4 py-2 text-left">Day</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Visited Time</th>
              {/* <th className="px-4 py-2 text-left">Complaint</th>
              <th className="px-4 py-2 text-left">Status</th> */}
              <th className="px-4 py-2 text-left">Payment Mode</th>
              <th className="px-4 py-2 text-left">Payment</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments
              .sort((a, b) => moment(a.date).diff(moment(b.date)))
              .map((data, index) => {
                const date = moment(data.date).format("L");
                const patientName =
                  data.patient_id?.fullName || "Unknown patient";
                const doctorName = data.doctor_id?.fullName || "Unknown Doctor";
                return (
                  <tr key={data._id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{patientName}</td>
                    <td className="px-4 py-2">Dr. {doctorName}</td>
                    <td className="px-4 py-2">{data.date_time?.day}</td>
                    <td className="px-4 py-2">{date}</td>
                    {/* <td className="px-4 py-2">{data.patient_id?.visited || "N/A"}</td>
                    <td className="px-4 py-2">
                      {data.patient_id?.personalhistory}
                    </td> */}
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${data.status === "Completed"
                            ? "bg-green-500"
                            : data.status === "Scheduled"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${data.payment === "Online"
                            ? "bg-green-500"
                            : "bg-red-500"
                          }`}
                      >
                        {data.payment}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${data.Pay === "Paid" ? "bg-green-500" : "bg-red-500"
                          }`}
                      >
                        {data.Pay}
                      </span>
                    </td>
                    <td className="px-4 py-2 h-20">
                      <div className="pt-1 flex space-x-2">
                        <img
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => deletedata(data)}
                          src={deletedataA}
                          alt="delete"
                        />
                        <img
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => handleUpdateClick(data)}
                          src={updatedata}
                          alt="update"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Update Appointment Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center     width: fit-content;">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2
              onClick={handleAddAppointmentClick}
              className="text-lg font-bold mb-4"
            >
              Update Appointment
            </h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label htmlFor="patientName" className="block text-gray-700">
                  Patient Name
                </label>
                <input
                  id="patientName"
                  type="text"
                  name="patientName"
                  value={
                    appointmentToUpdate.patient_id?.fullName ||
                    "Unknown patient"
                  }
                  onChange={handleFormChange}
                  className="px-4 py-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="doctorName" className="block text-gray-700">
                  Doctor Name
                </label>
                <input
                  id="doctorName"
                  type="text"
                  name="doctorName"
                  value={
                    appointmentToUpdate.doctor_id?.fullName || "Unknown Doctor"
                  }
                  onChange={handleFormChange}
                  className="px-4 py-2 border rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={appointmentToUpdate.status}
                  onChange={handleFormChange}
                  className="px-4 py-2 border rounded-md w-full"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Payment Mode Field in Update Form */}
              <div className="mb-4">
                <label htmlFor="payment" className="block text-gray-700">
                  Payment Mode
                </label>
                <select
                  id="payment"
                  name="payment"
                  value={appointmentToUpdate.payment || "Cash"} // Use value from appointmentToUpdate
                  onChange={handleFormChange} // Use the correct onChange handler
                  className="px-4 py-2 border rounded-md w-full"
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="Pay" className="block text-gray-700">
                  Pay
                </label>
                <select
                  id="Pay"
                  name="Pay"
                  value={appointmentToUpdate.Pay}
                  onChange={handleFormChange}
                  className="px-4 py-2 border rounded-md w-full"
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePopupClose}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Appointment Popup */}
      {showCreatePopup && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Create Appointment</h2>
            <form onSubmit={handleCreateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  // value={newAppointment.patientName}
                  value={
                    newAppointment.patient_id?.fullName || "Unknown patient"
                  }
                  onChange={handleCreateFormChange}
                  className="px-4 py-2 border rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Doctor Name</label>
                <input
                  type="text"
                  name="doctorName"
                  value={newAppointment.doctor_id?.fullName || "Unknown Doctor"}
                  onChange={handleCreateFormChange}
                  className="px-4 py-2 border rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newAppointment.date}
                  onChange={handleCreateFormChange}
                  className="px-4 py-2 border rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={newAppointment.status}
                  onChange={handleCreateFormChange}
                  className="px-4 py-2 border rounded-md w-full"
                  required
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Payment Mode</label>
                <select
                  name="payment"
                  value={newAppointment.payment}
                  onChange={handleCreateFormChange}
                  className="px-4 py-2 border rounded-md w-full"
                  required
                >
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Pay</label>
                <select
                  name="Pay"
                  value={newAppointment.Pay}
                  onChange={handleCreateFormChange}
                  className="px-4 py-2 border rounded-md w-full"
                  required
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowCreatePopup(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
