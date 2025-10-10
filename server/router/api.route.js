const express = require('express');
const auth = require('../routes/auth.route');
const ScheduleRoutes = require('../routes/schedule');
const Appointments = require('../routes/Appointment');
const Patient_routes = require('../routes/patient_routes');
const Video_routes = require('../routes/Video_routes');
const Dashoard_route = require('../routes/Dashboard_routes');
const { authenticateToken, authorizeRoles } = require('../middleware/verify');

const Router = express.Router();

// Routes
Router.use('/auth', auth);
Router.use('/Schedule', ScheduleRoutes);
Router.use('/Appointment', Appointments);
Router.use("/Patient", Patient_routes);
Router.use('/video', Video_routes);
Router.use("/dashboard", Dashoard_route);

// Add the ping route
Router.get('/ping', (req, res) => {
  res.status(200).send('Server is alive when noone is active');
});

module.exports = Router;
