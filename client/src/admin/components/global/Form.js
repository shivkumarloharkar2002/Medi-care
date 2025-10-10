import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosConfig";

function Form() {
  const navigate = useNavigate();

  const [fullName, setfullName] = useState("");
  const [doctorName, setdoctorName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [refferedby, setrefferedby] = useState("");
  const [complaint, setcomplaint] = useState("");
  const [familyhistory, setfamilyhistory] = useState("");
  const [personalhistory, setpersonalhistory] = useState("");
  const [habits, sethabits] = useState("");
  const [paymentstatus, setpaymentstatus] = useState("");
  const [ModeofPayment, setModeofPayment] = useState("");
  const [bloodgroup, setbloodgroup] = useState("");
  const [TimeofVisit, setTimeofVisit] = useState("");

  const [doctorname, setDoctorname] = useState("");
  const [doctors, setDoctors] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Fetch the list of doctors from the backend when the component mounts
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
  // console.log(doctors);

  useEffect(() => {
    console.log(doctorName);
    console.log(doctorId);
  }, [doctorName, doctorId]);

  

  const handleAddNewAppointment = async (e) => {
    e.preventDefault();

    const appointmentData = {
      fullName,
      doctorName,
      doctorId,
      date,
      age,
      referredBy: refferedby,
      complaint,
      familyHistory: familyhistory,
      personalHistory: personalhistory,
      habits,
      paymentStatus: paymentstatus,
      modeOfPayment: ModeofPayment,
      bloodGroup: bloodgroup,
      timeOfVisit: TimeofVisit,
    };

    try {
      const response = await axiosInstance.post(
        "/Appointment/createAppointment",
        appointmentData
      );
      console.log(response.data.message); // "Appointment created successfully"

      // Redirect after successful submission
      setPopupMessage("Appointment Created Successfully");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/admin/appointments");
      }, 3000);
    } catch (error) {
      setPopupMessage("Error creating appointment:", error);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      console.error("Error creating appointment:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/appointments");
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-6">
      <form onSubmit={handleAddNewAppointment}>
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
              onChange={(e) => {
                setfullName(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Doctor Name */}

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="doctorname">
              Doctor Name
            </label>
            <select
              name="doctorname"
              id="doctorname"
              onChange={(e) => {
                const selectedDoctor = doctors.find(
                  (doctor) => doctor.username === e.target.value
                );
                setdoctorName(selectedDoctor?.username || "");
                setDoctorId(selectedDoctor?._id || "");
                // console.log(doctorName)
                // console.log(doctorId)
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor.username}>
                  {doctor.username}
                </option>
              ))}
            </select>
          </div>

          {/* Date  */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              onChange={(e) => {
                setAge(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Reffered By */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1" htmlFor="refferedby">
              Reffered By
            </label>
            <input
              type="text"
              name="refferedby"
              id="refferedby"
              onChange={(e) => {
                setrefferedby(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Complaint */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1" htmlFor="complaint">
              Complaint (Disease)
            </label>
            <input
              type="text"
              name="complaint"
              id="complaint"
              onChange={(e) => {
                setcomplaint(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Family History */}

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="familyhistory">
              Family History
            </label>
            <select
              name="familyhistory"
              id="familyhistory"
              onChange={(e) => {
                setfamilyhistory(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select Family History</option>
              <option value="BP">BP</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Asthma">Asthma</option>
              <option value="Thyroid">Thyroid</option>
              <option value="TB">TB</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Personal History */}
          <div className="md:col-span-2">
            <label
              className="block text-gray-700 mb-1"
              htmlFor="personalhistory"
            >
              Personal History (Disease)
            </label>
            <input
              type="text"
              name="personalhistory"
              id="personalhistory"
              onChange={(e) => {
                setpersonalhistory(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Habits */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="habits">
              Habits
            </label>
            <select
              name="habits"
              id="habits"
              onChange={(e) => {
                sethabits(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select Habits</option>
              <option value="Alcohol">Alcohol</option>
              <option value="Smoking">Smoking</option>
              <option value="Tobacco">Tobacco</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="paymentstatus">
              Payment Status
            </label>
            <select
              name="paymentstatus"
              id="paymentstatus"
              onChange={(e) => {
                setpaymentstatus(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>

          {/* Mode of Payment */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="ModeofPayment">
              Mode of Payment
            </label>
            <select
              name="ModeofPayment"
              id="ModeofPayment"
              onChange={(e) => {
                setModeofPayment(e.target.value);
              }}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select Mode of Payment</option>
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="bloodgroup">
              Blood Group
            </label>
            <select
              name="bloodgroup"
              id="bloodgroup"
              onChange={(e) => {
                setbloodgroup(e.target.value);
              }}
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

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1" htmlFor="TimeofVisit">
              Time of Visit
            </label>
            <input
              type="text"
              name="TimeofVisit"
              id="TimeofVisit"
              onChange={(e) => {
                setTimeofVisit(e.target.value);
              }}
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
            onClick={handleAddNewAppointment}
            className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Appointment
          </button>
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
  );
}

export default Form;