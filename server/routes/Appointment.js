const express = require('express');
const {authenticateToken,authorizeRoles}=require('../middleware/verify')
const { createAppointment, cancelAppointment, completeAppointment, getAppointmentsByUserId, getAppointment, updateAppointment, Appointment_date, getAppointmentsByLoggedId } = require('../controller/appointment.controller');
const Appointments = express.Router();;

Appointments.post('/createAppointment', authenticateToken,createAppointment );
Appointments.delete('/cancelAppointment/:id', cancelAppointment);
Appointments.post('/completeAppointment', completeAppointment);
Appointments.post('/getAppointmentsByUserId', getAppointmentsByUserId);

Appointments.get('/getAppointmentsByloggedId',authenticateToken, getAppointmentsByLoggedId);

Appointments.get('/getAppointments',getAppointment );
Appointments.post('/updateAppointment/:id', updateAppointment);

// filterd
Appointments.post('/filterAppointments', Appointment_date); 



module.exports = Appointments;

