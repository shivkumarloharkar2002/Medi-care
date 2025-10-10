const { Schedule, Patient, Appointment, User } = require("../model/index");
const moment = require("moment")


function getUpcomingDayDate(dayOfWeek) {

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const targetDayIndex = daysOfWeek.indexOf(dayOfWeek);
  if (targetDayIndex === -1) {
    throw new Error('Invalid day of the week');
  }
  const currentDate = new Date()
  const currentDay = currentDate.getDay();
  let daysUntilTarget = (targetDayIndex - currentDay + 7) % 7;

  if (daysUntilTarget === 0) {
    return currentDate // Move to next week's target day if today is the target
  }

  const upcomingDate = new Date(currentDate);
  upcomingDate.setDate(currentDate.getDate() + daysUntilTarget);

  return upcomingDate.toISOString();
}

const createAppointment = async (req, res) => {
  const user_id = req.user.id;
  try {
    const { patientInfo, doctor_id, dateTime, status = 'Pending' } = req.body;
    //console.log("Received dateTime:", dateTime);

    let patient;


    // Check if the patient exists by checking the user ID or unique identifier like email or mobile
    if (patientInfo.isExist) {
      //console.log("inside isexists");
      patient = await Patient.findById(patientInfo.patientId);

      //console.log(patient)
      // Update doctor ID and schedule if the patient already exists
      const updatePatient = await Patient.findByIdAndUpdate(
        patientInfo.patientId,
        {
          fullName: patientInfo.fullName,
          email: patientInfo.email,
          Doctor_id: doctor_id,
          schedule: {
            date:dateTime.date,
            day: dateTime.day,
            time: {
              start: dateTime.time.start,
              end: dateTime.time.end,
              dayId: dateTime.dayId,
              timeId: dateTime.timeId,
            },
          },
          mobile: patientInfo.mobile,
          gender: patientInfo.gender,
          address: patientInfo.address,
          bloodgroup: patientInfo.bloodgroup,
          age: patientInfo.age,
          refrredby: patientInfo.refrredby,
          complaint: patientInfo.complaint,
          personalhistory: patientInfo.personalHistory,
          familyhistory: patientInfo.familyHistory,
          habits: patientInfo.habits,
          visited: patientInfo.timeOfVisit,
        },
        { new: true }
      );
      // console.log(updatePatient)
      // Save the updated patient record
      await patient.save();

    }
    // If the patient does not exist, create a new patient
    if (!patient) {
      //console.log("creating patient");

      patient = new Patient(
        {
          fullName: patientInfo.fullName,
          email: patientInfo.email,
          User_id: user_id,
          Doctor_id: doctor_id,
          schedule: {
            day: dateTime.day,
            time: {
              start: dateTime.time.start,
              end: dateTime.time.end,
              dayId: dateTime.dayId,
              timeId: dateTime.timeId,
            },
          },
          mobile: patientInfo.mobile,
          gender: patientInfo.gender,
          address: patientInfo.address,
          bloodgroup: patientInfo.bloodgroup,
          age: patientInfo.age,
          referredby: patientInfo.referredby,
          complaint: patientInfo.complaint,
          personalhistory: patientInfo.personalHistory,
          familyhistory: patientInfo.familyHistory,
          habits: patientInfo.habits,
          visited: patientInfo.timeOfVisit,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      await patient.save();

    }

    // Fetch doctor's schedule to check slot availability
    const schedule = await Schedule.findOne({ user_id: doctor_id, 'scheduleWeek.day': dateTime.day, });
    if (!schedule) {
      return res.status(400).json({ message: 'No schedule available for the selected day.' });
    }

    const daySchedule = schedule.scheduleWeek.find(week => week.day === dateTime.day);
    if (!daySchedule) {
      return res.status(400).json({ message: 'Day schedule not found.' });
    }

    // Check if the patient has already booked any slot on the same day
    const hasAlreadyBooked = daySchedule.time.some(slot => slot.patients.includes(patient._id));
    if (hasAlreadyBooked) {
      return res.status(400).json({ message: 'You have already booked a slot on this day.' });
    }

    const timeSlot = daySchedule.time.find(
      slot => slot.start === dateTime.time.start && slot.end === dateTime.time.end
    );
    //console.log(timeSlot)
    if (!timeSlot) {
      return res.status(400).json({ message: 'Time slot not available.' });
    }

    // Check if the slot is already fully booked
    if (timeSlot.Booking >= timeSlot.Maxbook) {
      return res.status(400).json({ message: 'Time slot is fully booked.' });
    }

    // Check if the patient has already booked the same time slot
    // if (timeSlot.patients.includes(patient._id)) {
    //   return res.status(400).json({ message: 'You have already booked this time slot.' });
    // }

    // Increment the booking count for the selected time slot and add the patient to the list
    timeSlot.Booking += 1;
    timeSlot.patients.push(patient._id);
    await schedule.save();

    //console.log("schedule=", schedule)

    // Create the appointment

    const date = getUpcomingDayDate(dateTime.day);

    const appointment = new Appointment({

      user_id: user_id,


      patient_id: patient._id,
      schedule: dateTime.dayId,
      doctor_id,
      schedule_id: schedule._id,
      date: date,

      date_time: {
        day: dateTime.day,
        time: {
          start: dateTime.time.start,
          end: dateTime.time.end,
          dayId: dateTime.dayId,
          timeId: dateTime.timeId,
        },
      },
      status,
    });

    // Save the appointment
    await appointment.save();
    //console.log("appointment with scheduleId", appointment);

    // Add the appointment to the user's record
    if (patientInfo.isExist) {
      const userUpdateddataA = await User.findByIdAndUpdate(
        user_id,
        {
          $push: {
            appointments: appointment._id,
          },
        },
        { new: true }
      );
      // console.log("user's record",userUpdateddataA)
    } else {
      const userUpdateddataAP = await User.findByIdAndUpdate(
        user_id,
        {
          $push: {
            appointments: appointment._id,
            patients: patient._id,
          },
        },
        { new: true }
      );
      // console.log("user's record",userUpdateddataAP)
    }


    // Add the appointment,and patient  to the doctor's record
    const doctoupdatedata = await User.findByIdAndUpdate(
      doctor_id,
      {
        $push: {
          appointments: appointment._id,
          patients: patient._id,
        },
      },
      { new: true }
    );
    // console.log("doctor's record",doctoupdatedata)


    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const completeAppointment = async (req, res) => {
  try {
    const { appointment_id, diagnosis, treatment, prescription, doctor_id } =
      req.body;

    // Find the appointment
    const appointment = await Appointment.findById(appointment_id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.status === "Completed") {
      return res
        .status(400)
        .json({ message: "Appointment is already completed" });
    }

    // Create a medical record associated wish the completed appointment
    const medicalRecord = new MedicalRecord({
      patient_id: appointment.patient_id,
      doctor_id: doctor_id || appointment.doctor_id,
      diagnosis: diagnosis || "Null",
      treatment: treatment || "Null",
      prescription: prescription || [], // optional field
      record_date: new Date(), // set the current date
    });

    await medicalRecord.save();
    await Appointment.findByIdAndDelete(appointment_id);
    // Update the patient's medical history by adding the new medical record
    await User.findByIdAndUpdate(appointment.patient_id, {
      $push: { medicalHistory: medicalRecord._id },
    });

    res.status(200).json({
      message: "Appointment completed and medical record created successfully",
      appointment,
      medicalRecord,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const cancelAppointment = async (req, res) => {
//   const { id } = req.params
//   try {
//     // Find the appointment
//     const appointment = await Appointment.findByIdAndDelete(id);
//     if (!appointment) {
//       return res.status(404).json({ message: "Appointment not found" });
//     }
//     // console.log(appointment)
//     res.json({ message: "Appointment canceled successfully", appointment });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//     console.log(error)
//   }
// };



const cancelAppointment = async (req, res) => {
  const { id } = req.params; // `id` is the appointment ID

  try {
    // Find the appointment to be canceled
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const { patient_id, date_time, schedule_id } = appointment;

    // Find the user who created the appointment by matching appointment ID in their `appointments` field
    const user = await User.findOne({ appointments: id, role:"Patient" });
    if (!user) {
      return res.status(404).json({ message: "User associated with appointment not found" });
    }

    // Find the doctor by matching appointment ID in their `appointments` field
    const doctor = await User.findOne({ appointments: id, role: "Doctor" });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor associated with appointment not found" });
    }

    // Remove appointment ID from the user's record
    await User.findByIdAndUpdate(
      user._id,
      { $pull: { appointments: id } },
      { new: true }
    );

    // Remove patient ID from the user's record (if they created the patient)
    await User.findByIdAndUpdate(
      user._id,
      { $pull: { patients: patient_id } },
      { new: true }
    );

    // Remove the appointment and patient ID from the doctor's record
    await User.findByIdAndUpdate(
      doctor._id,
      { $pull: { appointments: id, patients: patient_id } },
      { new: true }
    );

    // Delete the appointment document
    await Appointment.findByIdAndDelete(id);

    res.json({ message: "Appointment canceled successfully", appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.error(error);
  }
};



const getAppointmentsByUserId = async (req, res) => {
  try {
    const { user_id } = req.body;
    const patient = await Patient.findOne({ user_id });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const appointments = await Appointment.find({
      patient_id: patient._id,
    }).populate("doctor_id");

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 




const getAppointmentsByLoggedId = async (req, res) => {
  try {
    const user_id = req.user.id;

    const appointments = await Appointment.find({
      user_id: user_id
    }).populate("patient_id")
      .populate("doctor_id")
      .populate("schedule_id");

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get Appointment api
const getAppointment = async (req, res) => {
  try {
    const allappointmentdata = await Appointment.find()
      .populate("patient_id")
      .populate("doctor_id")

      .populate("schedule_id")


    res.json({
      success: true,
      msg: "Appointment fetched",
      data: allappointmentdata,
    });
  } catch (e) {
    console.log(e);
  }
};




// // Update appointment is work
// const updateAppointment = async (req, res) => {
//   const { id } = req.params;
//   const { patientName, doctorName, date, status,paiment } = req.body;

//   try {
//       const updatedAppointment = await Appointment.findByIdAndUpdate(
//           id,
//           {
//               patientName,
//               doctorName,
//               date,
//               status,
//               paiment
//           },
//           { new: true } // Return the updated document
//       );

//       if (!updatedAppointment) {
//           return res.status(404).json({ success: false, message: 'Appointment not found' });
//       }

//       res.json({
//           success: true,
//           message: 'Appointment updated successfully',
//           data: updatedAppointment
//       });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Server error' });
//   }
// };



// Update appointment
const updateAppointment = async (req, res) => {
  const { id } = req.params;

  const { patientName, doctorName, date, status, payment, Pay, } = req.body;


  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        patientName,
        doctorName,
        date,
        status,
        payment,
        Pay
      },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: updatedAppointment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// // Fetch and filter Appointment
// const Appointment_date = async (req, res) => {
//   const { start,end}=req.body
//   console.log(start,end)

//   console.log(moment(start).format('l'),moment(end).format('l'))


//   try {
//     // Fetch and filter appointments
//     const appointments = await Appointment.find({
//       createdAt: {
//         $gte: start,
//         $lte: end
//       }
//     });

//     res.json({
//       appointments,

//     });
//     console.log("this is data",appointments)
//   }
//   catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }



const Appointment_date = async (req, res) => {
  const { startDate, endDate, doctor_name } = req.body;
  console.log(startDate, endDate, doctor_name);

  const query = {};

  if (startDate && endDate) {
    const start = moment(startDate).startOf('day').toDate();
    const end = moment(endDate).endOf('day').toDate();

    // console.log("Filtered Dates:", moment(start).format('L'), moment(end).format('L'));

    query.createdAt = {
      $gte: start,
      $lte: end
    };
  }

  if (doctor_name) {
    query.doctor_id = doctor_name;
  }

  try {
    // Fetch and filter appointments based on the constructed query
    const appointments = await Appointment.find(query)
      .populate("patient_id")
      .populate("doctor_id")
      .populate("schedule_id")

    res.json({
      appointments
    });

    //console.log("Filtered Appointments:", appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






module.exports = {
  createAppointment,
  completeAppointment,
  cancelAppointment,
  getAppointmentsByUserId,
  getAppointment,
  updateAppointment,
  Appointment_date,
  getAppointmentsByLoggedId
};