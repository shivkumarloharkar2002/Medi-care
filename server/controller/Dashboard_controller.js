const { Appointment, Patient, User, Schedule } = require("../model");
const moment = require("moment")

// const Dashboard_data = async (req, res) => {
//   try {
//     const allappointmentdata = await Appointment.find()
//     const Allpatient = await Patient.find()
//     const users = await User.find().select("-password")
//     const filteredDoctors = users.filter(
//       (item) => item.role === "Doctor"
//     );
//     res.json({
//       success: true,
//       msg: "Appointment fetched",
//       allappointmentdata: allappointmentdata,
//       Allpatient: Allpatient,
//       filteredDoctors: filteredDoctors,
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

const Dashboard_date = async (req, res) => {
  const { rangetype } = req.query; // Extract rangeType from query parameters
  //console.log(rangetype);

  // Function to get the date range based on the range type
  const getRange = () => {
    switch (rangetype) {
      case 'today':
        return {
          start: moment().startOf('day').toDate(),
          end: moment().endOf('day').toDate(),
        };
      case 'week':
        return {
          start: moment().startOf('isoWeek').toDate(), // ISO week starts on Monday
          end: moment().endOf('isoWeek').toDate(),
        };
      case 'month':
        return {
          start: moment().startOf('month').toDate(),
          end: moment().endOf('month').toDate(),
        };
      case 'year':
        return {
          start: moment().startOf('year').toDate(),
          end: moment().endOf('year').toDate(), // Fixed to the end of the year
        };
      default:
        return { start: null, end: null };
    }
  };

  // Get the calculated start and end dates
  const { start, end } = getRange();

  if (!start || !end) {
    return res.status(400).json({ message: 'Invalid range type provided' });
  }

  console.log('Start:',Date(start), 'End:', Date(end));

  try {

    const allappointmentdata = await Appointment.find()
  console.log(allappointmentdata,"All appoinments")
    // Fetch appointments within the date range
    const appointments = await Appointment.find({
      date: {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    })
      .populate('patient_id')
      .populate('doctor_id')
      .populate('schedule_id');

    // Fetch patients (no filtering by date for now, adjust if needed)
    const patients = await Patient.find()
      .populate('User_id')
      .populate('Doctor_id')
      .populate('appointments');

    // Fetch users and schedules within the date range
    const users = await Schedule.find({
      'scheduleWeek.date': {
        $gte: new Date(start),
        $lte: new Date(end),
      },
    })
      .populate('user_id')
      .select('-password'); // Exclude password field
      const doc = await Schedule.find()
      console.log("All doctors",doc)
console.log("filtering doctors",users)
    // Send response with the fetched data
    res.json({
      appointments,
      patients,
      users,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  // Dashboard_data,
  Dashboard_date
}