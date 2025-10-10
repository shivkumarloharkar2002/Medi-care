import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaSave, FaEdit } from "react-icons/fa";
import axiosInstance from "../../../axiosConfig";
import { useParams } from "react-router-dom";
import { format, parse, isBefore, subDays } from "date-fns";
import moment from "moment";

const ScheduleForm = () => {
  const { id: doctorId } = useParams();

  const [newSchedule, setNewSchedule] = useState({
    day: "",
    time: [{ start: "", end: "", Booking: "", Maxbook: 5 }],
  });

  const [doc, setDoc] = useState([]);
  const [submittedSchedules, setSubmittedSchedules] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [tosetMaxBook, TosetMaxBook] = useState(false);
  const [oldStartData, setoldStartData] = useState("");
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return format(date, "hh:mm a");
  };

  const fetchSchedules = async () => {
    if (!doctorId) return;

    try {
      const response = await axiosInstance.get(
        `/Schedule/doctor-schedule/${doctorId}`
      );
      console.log(response.data.data);
      setDoc(response.data.data.user_id);
      if (response.data && response.data.success) {
        const schedules = response.data.data.scheduleWeek || [];
        setSubmittedSchedules(updateExpiredBookings(schedules));
      } else {
        console.error(
          "Error fetching schedules:",
          response.data?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error fetching schedules:", error || "Unknown error");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [doctorId]);

  const updateExpiredBookings = (schedules) => {
    const today = new Date();
    return schedules.map((schedule) => {
      const scheduleDate = new Date(schedule.day); // Assuming 'day' is a date string
      if (isBefore(scheduleDate, today)) {
        return {
          ...schedule,
          time: schedule.time.map((slot) => ({
            ...slot,
            Booking: 0,
          })),
        };
      }
      return schedule;
    });
  };

  const handleAddTimeSlot = () => {
    setNewSchedule((prevSchedule) => ({
      ...prevSchedule,
      time: [
        ...prevSchedule.time,
        { start: "", end: "", Booking: "", Maxbook: 5 },
      ],
    }));
  };

  const handleRemoveTimeSlot = (slotIndex) => {
    setNewSchedule((prevSchedule) => ({
      ...prevSchedule,
      time: prevSchedule.time.filter((_, i) => i !== slotIndex),
    }));
  };

  const handleTimeSlotChange = (slotIndex, field, value) => {
    setNewSchedule((prevSchedule) => ({
      ...prevSchedule,
      time: prevSchedule.time.map((slot, i) =>
        i === slotIndex ? { ...slot, [field]: value } : slot
      ),
    }));
  };

  const handleCreateSchedule = async () => {
    if (!newSchedule.day || !doctorId) {
      alert(
        "Please select a day and ensure the doctor ID is available before creating the schedule."
      );
      return;
    }

    for (const slot of newSchedule.time) {
      if (slot.start >= slot.end) {
        alert("End time must be later than start time");
        return;
      }
    }

    const scheduleData = {
      day: newSchedule.day,
      time: newSchedule.time,
      Maxbook: newSchedule.Maxbook,
    };
    console.log(scheduleData);
    try {
      const response = await axiosInstance.post(
        "/Schedule/createDayWithTimeSlots",
        {
          user_id: doctorId,
          day: newSchedule.day,
          timeSlots: newSchedule.time,
        }
      );
      console.log(response);
      setSubmittedSchedules(response.data.schedule.scheduleWeek);
      alert("Schedule created successfully!");
      resetNewSchedule();
    } catch (error) {
      console.error(
        "Error creating schedule:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to create schedule");
    }
  };

  const handleUpdateTimeSlot = async () => {
    if (!selectedTimeSlot || !doctorId) {
      alert(
        "Please select a time slot to update and ensure the doctor ID is available."
      );
      return;
    }

    console.log(newSchedule);
    try {
      const response = await axiosInstance.put("/Schedule/updateTimeSlot", {
        user_id: doctorId,
        day: selectedTimeSlot.day,
        oldStart: oldStartData,
        newStart: selectedTimeSlot.start,
        newEnd: selectedTimeSlot.end,
      });
      console.log(response);
      const updatedSchedules = submittedSchedules.map((schedule) =>
        schedule.day === selectedTimeSlot.day
          ? response.data.scheduleWeek
          : schedule
      );

      setSubmittedSchedules(updatedSchedules);
      alert("Time slot updated successfully!");
      setPopupVisible(false);
      setSelectedTimeSlot(null);

      fetchSchedules();
    } catch (error) {
      console.error(
        "Error updating time slot:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to update time slot");
    }
  };

  const handleDeleteTimeSlot = async (day, slotIndex) => {
    try {
      await axiosInstance.delete("/Schedule/deleteTimeSlot", {
        data: {
          user_id: doctorId,
          day,
          start: submittedSchedules.find((sch) => sch.day === day).time[
            slotIndex
          ].start,
        },
      });

      const updatedSchedules = submittedSchedules.map((schedule) =>
        schedule.day === day
          ? {
              ...schedule,
              time: schedule.time.filter((_, i) => i !== slotIndex),
            }
          : schedule
      );
      setSubmittedSchedules(updatedSchedules);
      alert("Time slot deleted successfully!");

      fetchSchedules();
    } catch (error) {
      console.error(
        "Error deleting time slot:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to delete time slot");
    }
  };

  const handleDeleteDay = async (day) => {
    try {
      await axiosInstance.delete("/Schedule/deleteDay", {
        data: { user_id: doctorId, day },
      });

      setSubmittedSchedules(
        submittedSchedules.filter((schedule) => schedule.day !== day)
      );
      alert("Day deleted successfully!");

      fetchSchedules();
    } catch (error) {
      console.error(
        "Error deleting day:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to delete day");
    }
  };

  const handleRemoveSchedule = async () => {
    try {
      await axiosInstance.delete(`/Schedule/removeSchedule/${doctorId}`);

      setSubmittedSchedules([]);
      alert("All schedules removed successfully!");

      fetchSchedules();
    } catch (error) {
      console.error(
        "Error removing schedule:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to remove schedule");
    }
  };

  const handleEditMaxBooking = async (day, start, newMaxBooking) => {
    console.log(day, start, newMaxBooking);
    try {
      const response = await axiosInstance.put("/Schedule/Update-Max-slot", {
        user_id: doctorId,
        day,
        start,
        newMaxBooking,
      });
      console.log(response);
      const updatedSchedules = submittedSchedules.map((schedule) =>
        schedule.day === day
          ? { ...schedule, Maxbook: newMaxBooking }
          : schedule
      );
      setSubmittedSchedules(updatedSchedules);
      fetchSchedules();
      alert("Max bookings updated successfully!");
      TosetMaxBook(false);
      setSelectedTimeSlot(null);
    } catch (error) {
      console.error(
        "Error updating max bookings:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to update max bookings");
    }
  };

  const handleEditSchedule = (schedule) => {
    setNewSchedule({
      day: schedule.day,
      time: schedule.time || [{ start: "", end: "", Booking: "", Maxbook: 5 }],
      Maxbook: schedule.Maxbook || 5,
    });
    setEditingSchedule(schedule.day);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
    resetNewSchedule();
  };

  const resetNewSchedule = () => {
    setNewSchedule({
      day: "",
      time: [{ start: "", end: "", Booking: "", Maxbook: 5 }],
    });
    setEditingSchedule(null);
    setSelectedTimeSlot(null);
  };

  const openEditMax = (slot, index, day) => {
    setEditingSchedule(day);
    setSelectedTimeSlot({ ...slot, index, day });
    TosetMaxBook(true);
  };

  const openEditPopup = (slot, index, day) => {
    console.log(slot, day);
    setEditingSchedule(day);
    setSelectedTimeSlot({ ...slot, index, day });
    setoldStartData(slot.start);
    setPopupVisible(true);
  };

  return (
    <div className=" sm:mx-auto bg-white p-3 sm:p-8 rounded-xl shadow-lg space-y-8 w-[85vw] md:w-[80vw] max-h-[93vh] overflow-y-auto">
      <h2 className="text-3xl font-bold text-gray-900 text-center">
        Manage Doctor Schedule
      </h2>

      {/* Schedule Form */}
      <div className="space-y-6">
        <h2 className="text-3xl  text-gray-900 text-center">
       {  doc.fullName? `Dr.${doc.fullName}`:null}
        </h2>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          value={newSchedule.day}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, day: e.target.value })
          }
        >
          <option value="">Select Day</option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <div className="space-y-4">
          {newSchedule.time.map((slot, index) => (
            <div
              key={index}
              className="sm:flex items-center space-x-1 sm:space-x-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
            >
              <input
                type="time"
                value={slot.start}
                onChange={(e) =>
                  handleTimeSlotChange(index, "start", e.target.value)
                }
                className=" border border-gray-300 rounded-lg sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-gray-600"> to </span>
              <input
                type="time"
                value={slot.end}
                onChange={(e) =>
                  handleTimeSlotChange(index, "end", e.target.value)
                }
                className=" border border-gray-300 rounded-lg w-auto focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex items-center space-x-4">
                <label className="text-gray-700 text-base sm:text-lg">
                  Max Bookings:
                </label>
                <input
                  type="number"
                  min="1"
                  className="p-2 border border-gray-300 rounded-lg w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500 "
                  value={slot.Maxbook}
                  onChange={(e) =>
                    handleTimeSlotChange(index, "Maxbook", e.target.value)
                  }
                />
              </div>

              <div className=" sm:flex justify-end space-x-4">
                <button
                  className="bg-red-500 mx-auto mt-3 sm:mt-0 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleRemoveTimeSlot(index)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTimeSlot}
            className="flex items-center text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
          >
            <FaPlus className="mr-2" />
            Add Time Slot
          </button>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-green-400 text-white px-2 py-1 rounded hover:bg-green-600"
              onClick={() => handleCreateSchedule()}
            >
              create
            </button>
          </div>
        </div>
      </div>

      {/* Submitted Schedules */}
      <div className="sm:mt-8  w-[78vw] sm:mx-auto">
        <h3 className="text-2xl font-semibold text-gray-900">
          Submitted Schedules
        </h3>

     {   
     submittedSchedules.length>0?
        <ul className="space-y-4 w-[75vw]">
          {submittedSchedules
            ?.sort((a, b) => moment(a.date).diff(moment(b.date)))
            .map((schedule, index) => {
              const date = moment(schedule.date).format("DD/MM/YYYY");
              return (
                <li
                  key={index}
                  className="p-5 bg-white shadow-lg rounded-lg border border-gray-300"
                >
                  {/* Delete Day Button */}
                  <div className="mt-4 flex sm:space-x-4 justify-between">
                    <h4 className="text-base sm:text-xl font-semibold text-gray-800">
                      {schedule?.day} ({date})
                    </h4>

                    <button
                      onClick={() => handleDeleteDay(schedule.day)}
                      className="flex items-center space-x-1 px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-150 ease-in-out shadow-md mx-auto sm:mx-0 w-32 sm:w-auto"
                    >
                      <FaTrash className="text-white text-sm sm:text-xl" />
                      <span>Delete Day</span>
                    </button>
                  </div>
                  {schedule?.time?.map((slot, i) => (
                    <div
                      key={i}
                      className="sm:flex items-center sm:space-x-4 text-gray-600 py-2 "
                    >
                      <span className="text-base sm:text-lg ">
                        {formatTime(slot?.start)} - {formatTime(slot?.end)}
                      </span>
                      {/* <span className="">|</span> */}
                      <span className="text-base sm:text-lg  ">
                        {" "}
                        | Max Bookings: {slot?.Maxbook}&nbsp;&nbsp;&nbsp;
                      </span>
                      <span className="text-base sm:text-lg ">
                        {" "}
                        Bookings: {slot?.Booking || 0}
                      </span>
                      <div className="flex w-[30vw] justify-around gap-2 sm:gap-3 ">
                        {/* Delete Button */}
                        <button
                          onClick={() => openEditMax(slot, index, schedule.day)}
                          className="flex items-center sm:space-x-1 px-2 sm:px-3 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded-lg transition duration-150 ease-in-out shadow-md mt-4 sm:mt-0 mx-auto w-32 sm:w-auto "
                        >
                          <FaEdit className="text-white " />
                          <span className=" text-center text-sm sm:text-lg">
                            {" "}
                            Maxbook
                          </span>
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteTimeSlot(schedule.day, i)}
                          className="flex items-center sm:space-x-1 px-2 sm:px-3 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition duration-150
                           ease-in-out shadow-md mt-4 sm:mt-0 mx-auto w-32 sm:w-auto "
                        >
                          <FaTrash className="text-white" />
                          <span className="text-center text-sm sm:text-lg">
                            Delete
                          </span>
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() =>
                            openEditPopup(slot, index, schedule.day)
                          }
                          className="flex items-center sm:space-x-1 px-2 sm:px-3 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg transition duration-150 ease-in-out shadow-md mt-4 sm:mt-0 mx-auto w-32 sm:w-auto"
                        >
                          <FaEdit className="text-white" />
                          <span className="text-center text-sm sm:text-lg">
                            Edit
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </li>
              );
            })}
        </ul>
        :
        <span className="font-bold text-2xl w-full flex justify-center">No Schedule </span>}
        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={handleRemoveSchedule}
            className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-150 ease-in-out flex items-center"
          >
            <FaTrash className="mr-2" />
            Remove All Schedules
          </button>
        </div>
      </div>

      {/* Popup for Editing Time Slot */}
      {tosetMaxBook && selectedTimeSlot && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              Edit Max Bookings for Slot
            </h3>
            <h3 className="text-lg font-semibold mb-4">
              Start Time: {formatTime(selectedTimeSlot.start)}
            </h3>
            <div className="space-y-4">
              <input
                type="number"
                min="1"
                value={selectedTimeSlot.Maxbook}
                onChange={(e) => {
                  // Ensure the value is numeric and non-negative
                  const value = parseInt(e.target.value, 10);
                  setSelectedTimeSlot({ ...selectedTimeSlot, Maxbook: value });
                }}
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() =>
                  handleEditMaxBooking(
                    selectedTimeSlot.day,
                    selectedTimeSlot.start,
                    selectedTimeSlot.Maxbook
                  )
                }
                className="bg-orange-400 text-white p-2 rounded-lg hover:bg-orange-600"
              >
                Save
              </button>
              <button
                onClick={() => TosetMaxBook(false)}
                className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for Editing Time Slot */}
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Time Slot</h3>
            <h3 className="text-lg font-semibold mb-4">
              {formatTime(oldStartData)}
            </h3>
            <div className="space-y-4">
              <input
                type="time"
                value={selectedTimeSlot.start}
                onChange={(e) =>
                  setSelectedTimeSlot({
                    ...selectedTimeSlot,
                    start: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="time"
                value={selectedTimeSlot.end}
                onChange={(e) =>
                  setSelectedTimeSlot({
                    ...selectedTimeSlot,
                    end: e.target.value,
                  })
                }
                className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleUpdateTimeSlot}
                className="bg-green-400 text-white p-2 rounded-lg hover:bg-green-700 transition duration-150 ease-in-out flex items-center"
              >
                <FaSave className="mr-2" />
                Save Changes
              </button>
              <button
                onClick={handlePopupClose}
                className="bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out flex items-center"
              >
                <FaTrash className="mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleForm;
