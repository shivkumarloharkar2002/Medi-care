import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa';
import axiosInstance from '../../../axiosConfig';
import { useParams } from 'react-router-dom';

const ScheduleForm = () => {
  const { id: doctorId } = useParams();

  const [newSchedule, setNewSchedule] = useState({
    day: '',
    time: [{ start: '', end: '', Booking: '', Maxbook: 5 }],
  });

  const [submittedSchedules, setSubmittedSchedules] = useState([]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!doctorId) return;

      try {
        const response = await axiosInstance.get(`/Schedule/doctor-schedule/${doctorId}`);
        if (response.data && response.data.success) {
          setSubmittedSchedules(response.data.data.scheduleWeek || []);
        } else {
          console.error('Error fetching schedules:', response.data?.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching schedules:', error.response ? error.response.data : error.message);
      }
    };

    fetchSchedules();
  }, [doctorId]);

  const handleAddTimeSlot = () => {
    setNewSchedule(prevSchedule => ({
      ...prevSchedule,
      time: [...prevSchedule.time, { start: '', end: '', Booking: '', Maxbook: 5 }]
    }));
  };

  const handleRemoveTimeSlot = (slotIndex) => {
    setNewSchedule(prevSchedule => ({
      ...prevSchedule,
      time: prevSchedule.time.filter((_, i) => i !== slotIndex)
    }));
  };

  const handleTimeSlotChange = (slotIndex, field, value) => {
    setNewSchedule(prevSchedule => ({
      ...prevSchedule,
      time: prevSchedule.time.map((slot, i) =>
        i === slotIndex ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const resetNewSchedule = () => {
    setNewSchedule({
      day: '',
      time: [{ start: '', end: '', Booking: '', Maxbook: 5 }],
    });
  };

  const handleSaveSchedule = async () => {
    if (!newSchedule.day || !doctorId) {
      alert('Please select a day and ensure the doctor ID is available before saving the schedule.');
      return;
    }

    for (const slot of newSchedule.time) {
      if (slot.start >= slot.end) {
        alert('End time must be later than start time');
        return;
      }
    }

    const scheduleData = {
      day: newSchedule.day,
      time: newSchedule.time,
      Maxbook: newSchedule.Maxbook,
    };

    try {
      const existingSchedule = submittedSchedules.find(schedule => schedule.day === newSchedule.day);

      if (existingSchedule) {
        const response = await axiosInstance.post(
          '/Schedule/createDayWithTimeSlots',
          { 
            user_id: doctorId, 
            day: newSchedule.day, 
            updatedTimeSlots: newSchedule.time,
            updateMaxSlot: newSchedule.Maxbook 
          }
        );

        const updatedSchedules = submittedSchedules.map(schedule =>
          schedule.day === newSchedule.day ? response.data.data : schedule
        );
        setSubmittedSchedules(updatedSchedules);
        alert('Time slots and Max bookings updated successfully!');
      } else {
        const response = await axiosInstance.post(
          '/Schedule/CreateSchedule',
          { user_id: doctorId, scheduleWeek: [scheduleData] }
        );

        setSubmittedSchedules([...submittedSchedules, response.data.data]);
        alert('Schedule created successfully!');
      }

      resetNewSchedule();
    } catch (error) {
      if (error.response?.data?.message === "Schedule for this user already exists. Consider updating the existing schedule instead.") {
        try {
          const response = await axiosInstance.post(
            '/Schedule/createDayWithTimeSlots',
            { 
              user_id: doctorId, 
              day: newSchedule.day, 
              updatedTimeSlots: newSchedule.time,
              updateMaxSlot: newSchedule.Maxbook 
            }
          );

          const updatedSchedules = submittedSchedules.map(schedule =>
            schedule.day === newSchedule.day ? response.data.data : schedule
          );
          setSubmittedSchedules(updatedSchedules);
          alert('Time slots and Max bookings updated successfully!');
        } catch (updateError) {
          console.error('Error updating schedule:', updateError.response ? updateError.response.data : updateError.message);
          alert('Failed to update schedule');
        }
      } else {
        console.error('Error saving schedule:', error.response ? error.response.data : error.message);
        alert('Failed to save schedule');
      }
    }
  };

  const handleDeleteSchedule = async (day) => {
    try {
      await axiosInstance.delete('/Schedule/deleteDay', {
        data: { user_id: doctorId, day }
      });
      setSubmittedSchedules(submittedSchedules.filter(schedule => schedule.day !== day));
      alert('Schedule deleted successfully!');
    } catch (error) {
      console.error('Error deleting schedule:', error.response ? error.response.data : error.message);
      alert('Failed to delete schedule');
    }
  };

  const handleEditSchedule = (schedule) => {
    setNewSchedule({
      day: schedule.day,
      time: schedule.time || [{ start: '', end: '', Booking: '', Maxbook: 5 }],
      Maxbook: schedule.Maxbook || 5,
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg space-y-8">
      <h2 className="text-3xl font-bold text-gray-900 text-center">Manage Doctor Schedule</h2>
      <div className="space-y-6">
        <select
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          value={newSchedule.day}
          onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
        >
          <option value="">Select Day</option>
          {daysOfWeek.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>

        <div className="space-y-4">
          {newSchedule.time.map((slot, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
              <input
                type="time"
                value={slot.start}
                onChange={(e) => handleTimeSlotChange(index, 'start', e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-gray-600">to</span>
              <input
                type="time"
                value={slot.end}
                onChange={(e) => handleTimeSlotChange(index, 'end', e.target.value)}
                className="p-2 border border-gray-300 rounded-lg w-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveTimeSlot(index)}
                className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
              >
                <FaTrash />
              </button>
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
        </div>

        <div className="flex items-center space-x-4">
          <label className="text-gray-700">Max Bookings:</label>
          <input
            type="number"
            min="1"
            className="p-2 border border-gray-300 rounded-lg w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newSchedule.Maxbook}
            onChange={(e) => setNewSchedule({ ...newSchedule, Maxbook: +e.target.value })}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSaveSchedule}
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out flex items-center"
          >
            <FaSave className="mr-2" />
            Save Schedule
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-900">Submitted Schedules</h3>
        <ul className="space-y-4">
          {submittedSchedules?.map((schedule, index) => (
            <li key={index} className="p-4 bg-white shadow-lg rounded-lg border border-gray-300">
              <h4 className="text-xl font-semibold text-gray-800">{schedule?.day}</h4>
              <ul className="space-y-2 mt-2">
                {schedule?.time?.map((slot, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span>{slot.start} - {slot.end}</span>
                    <span className="text-gray-600">Bookings: {slot.Booking}</span>
                    <span className="text-gray-600">Max: {slot.Maxbook}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => handleEditSchedule(schedule)}
                  className="text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSchedule(schedule.day)}
                  className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out flex items-center"
                >
                  <FaTrash className="mr-1" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScheduleForm;