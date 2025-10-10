const express = require('express');
const ScheduleRoutes = express.Router();
const scheduleController = require('../controller/Schedule.controller');
const { authenticateToken } = require('../middleware/verify');

// Create a new schedule or update if it already exists
ScheduleRoutes.post('/CreateSchedule', scheduleController.CreateSchedule);
// Create a new day with time slots
ScheduleRoutes.post('/createDayWithTimeSlots', scheduleController.createDayWithTimeSlots);
// Update a specific time slot for a day
ScheduleRoutes.put('/updateTimeSlot', scheduleController.updateTimeSlot);
// Delete a specific time slot for a day
ScheduleRoutes.delete('/deleteTimeSlot', scheduleController.deleteTimeSlot); 
// Delete an entire day with its time slots
ScheduleRoutes.delete('/deleteDay', scheduleController.deleteDay);
// Remove a schedule by user_id
ScheduleRoutes.delete('/removeSchedule/:user_id', scheduleController.removeSchedule);
// Use book slot
ScheduleRoutes.post('/book-slot', scheduleController.bookSlot);
// Use Cancel slot
ScheduleRoutes.delete('/CancelSlot', scheduleController.CancelSlot);
// Update Max slot
ScheduleRoutes.put('/Update-Max-slot', scheduleController.editMaxBooking);
ScheduleRoutes.delete('/ResetAllSlots', scheduleController.ResetAllSlots);
ScheduleRoutes.get('/doctor-schedule/:id',authenticateToken, scheduleController.getScheduleById); 

//cancel booking slot
ScheduleRoutes.put("/cancelBooking",scheduleController.Canclebooking)

module.exports = ScheduleRoutes;
// ResetAllSlots  