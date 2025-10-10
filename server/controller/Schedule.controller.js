const moment = require("moment")

const { Schedule, User } = require("../model/index");
const updateTimeSlot = async (req, res) => {
  try {
    const { user_id, day, oldStart, newStart, newEnd } = req.body;
    console.log(req.body);
    const schedule = await Schedule.findOne({
      user_id,
      "scheduleWeek.day": day,
    });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule or day not found" });
    }

    // Find the specific time slot and update it
    const daySchedule = schedule.scheduleWeek.find((sch) => sch.day === day);
    const timeSlot = daySchedule.time.find((t) => t.start === oldStart);

    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    timeSlot.start = newStart || timeSlot.start;
    timeSlot.end = newEnd || timeSlot.end;

    await schedule.save();
    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific time slot for a day
const deleteTimeSlot = async (req, res) => {
  try {
    const { user_id, day, start } = req.body;

    const schedule = await Schedule.findOne({ 
      user_id,
      "scheduleWeek.day": day,
    });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule or day not found" });
    }

    // Find the specific day and remove the time slot
    const daySchedule = schedule.scheduleWeek.find((sch) => sch.day === day);
    daySchedule.time = daySchedule.time.filter((t) => t.start !== start);

    // If the day has no more time slots, remove the day itself
    if (daySchedule.time.length === 0) {
      schedule.scheduleWeek = schedule.scheduleWeek.filter(
        (sch) => sch.day !== day
      );
    }

    await schedule.save();
    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const CreateSchedule = async (req, res) => {
  try {
    const { user_id, date, scheduleWeek } = req.body;

    // Check if a schedule already exists for the given user_id
    const existingSchedule = await Schedule.findOne({ user_id });

    if (existingSchedule) {
      return res
        .status(400)
        .json({
          message:
            "Schedule for this user already exists. Consider updating the existing schedule instead.",
        });
    }

    // Create a new schedule
    const schedule = await Schedule.create({
      user_id,
      scheduleWeek,
      createdAt: new Date(),
      updatedAt: new Date(),
    });



    res.status(200).json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a schedule by user_id
const removeSchedule = async (req, res) => {
  try {
    const { user_id } = req.params;

    const schedule = await Schedule.findOneAndDelete({ user_id });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteDay = async (req, res) => {
  try {
    const { user_id, day } = req.body;

    // Find the schedule by user_id and day
    const schedule = await Schedule.findOne({ user_id });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Filter out the day that needs to be deleted
    schedule.scheduleWeek = schedule.scheduleWeek.filter(
      (sch) => sch.day !== day
    );

    await schedule.save();
    res
      .status(200)
      .json({
        message: `Day ${day} and its time slots deleted successfully`,
        schedule,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


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




const createDayWithTimeSlots = async (req, res) => {
  try {
    const { user_id, day, timeSlots } = req.body;
    console.log(timeSlots);

    const upcomingDate = getUpcomingDayDate(day);

    // console.log("date of schedule",upcomingDate)

    // Find the schedule by user_id
    let schedule = await Schedule.findOne({ user_id });

    // If no schedule exists for the user, create a new one
    if (!schedule) {
      schedule = new Schedule({ user_id, scheduleWeek: [] });
    }


    // Check if the day already exists in the schedule
    const existingDayIndex = schedule.scheduleWeek.findIndex(
      (sch) => sch.day === day
    );

    if (existingDayIndex !== -1) {
      // If the day exists, iterate over timeSlots and add/update them one by one 
      timeSlots.forEach((slot) => {
        // Check if this slot already exists in the day's time slots
        const slotExists = schedule.scheduleWeek[existingDayIndex].time.some(
          (existingSlot) =>
            existingSlot.start === slot.start && existingSlot.end === slot.end
        );

        // If the slot doesn't exist, add it
        if (!slotExists) {
          schedule.scheduleWeek[existingDayIndex].time.push(slot);
        }
      });
    } else {
      // If the day doesn't exist, create a new day with the time slots
      schedule.scheduleWeek.push({
        day,
        date: upcomingDate,
        time: timeSlots
      });
    }

    // Save the updated schedule
    await schedule.save();

    // console.log("update schdule with date",schedule)
    // add schedule to doctor's record
    const userUpdateddata = await User.findByIdAndUpdate(user_id, {
      $push: {

        schedule: schedule._id
      }
    }, { new: true });

    res
      .status(201)
      .json({
        message: `Day ${day} with time slots created/updated successfully`,
        schedule,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editMaxBooking = async (req, res) => {
  try {
    const { user_id, day, start, newMaxBooking } = req.body;
    console.log(req.body);

    // Find the schedule by user_id and day
    const schedule = await Schedule.findOne({
      user_id,
      "scheduleWeek.day": day,
    });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule or day not found" });
    }

    // Find the specific day schedule
    const daySchedule = schedule.scheduleWeek.find((sch) => sch.day === day);
    if (!daySchedule) {
      return res.status(404).json({ message: "Day not found in schedule" });
    }

    // Find the specific time slot
    const timeSlot = daySchedule.time.find((t) => t.start === start);

    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    timeSlot.Maxbook = newMaxBooking;
    // Save the schedule (saving the parent document saves the subdocument)
    await schedule.save();

    res
      .status(200)
      .json({ message: "Max booking updated successfully", schedule });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const bookSlot = async (req, res) => {
  try {
    const { user_id, day, start } = req.body;

    // Find the schedule by user_id and day
    const schedule = await Schedule.findOne({
      user_id,
      "scheduleWeek.day": day,
    });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule or day not found" });
    }

    // Find the specific time slot
    const daySchedule = schedule.scheduleWeek.find((sch) => sch.day === day);
    const timeSlot = daySchedule.time.find((t) => t.start === start);

    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    // Check if the current bookings exceed the maximum allowed
    if (timeSlot.Booking >= timeSlot.Maxbook) {
      return res
        .status(400)
        .json({ message: `Maximum booking limit reached for this time slot.` });
    }

    // Increment the booking count
    timeSlot.Booking += 1;
    timeSlot.patients.push(patient._id);

    await schedule.save();
    res.status(200).json({ message: "Slot booked successfully", schedule });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const CancelSlot = async (req, res) => {
  try {
    const { user_id, day, start } = req.body;

    // Find the schedule by user_id and day
    const schedule = await Schedule.findOne({
      user_id,
      "scheduleWeek.day": day,
    });
    console.log("schedule=", schedule)
    if (!schedule) {
      return res.status(404).json({ message: "Schedule or day not found" });
    }

    // Find the specific time slot
    const daySchedule = schedule.scheduleWeek.find((sch) => sch.day === day);
    const timeSlot = daySchedule.time.find((t) => t.start === start);

    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    // Check if the booking count is greater than 0 before decrementing
    if (timeSlot.Booking <= 0) {
      return res
        .status(400)
        .json({ message: "No bookings to cancel for this time slot." });
    }

    // Decrement the booking count
    timeSlot.Booking = (timeSlot.Booking || 0) - 1;

    await schedule.save();
    res.status(200).json({ message: "Slot canceled successfully", schedule });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const ResetAllSlots = async (req, res) => {
  try {
    const { day } = req.body;

    // Find all schedules for the specified day
    const schedules = await Schedule.find({ "scheduleWeek.day": day });
    if (schedules.length === 0) {
      return res
        .status(404)
        .json({ message: "No schedules found for the specified day" });
    }

    // Iterate over each schedule to reset all time slots for the given day
    for (const schedule of schedules) {
      const daySchedule = schedule.scheduleWeek.find((sch) => sch.day === day);

      if (daySchedule) {
        // Reset all time slots' booking count to 0
        daySchedule.time.forEach((timeSlot) => {
          timeSlot.Booking = 0;
        });

        await schedule.save(); // Save changes for each schedule
      }
    }

    res
      .status(200)
      .json({
        message: "All slots for the specified day have been reset successfully",
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const Canclebooking = async (req, res) => {
  const { bookingId, patientId, day, start } = req.body;
  console.log("bookingId=", bookingId, "patientId =", patientId,"day = ",day,"start = ",start)
  try {
    // Find the booking by ID
    const booking = await Schedule.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    console.log("booking =", booking)
    // Check if scheduleWeek exists and is an array
    if (!booking.scheduleWeek || !Array.isArray(booking.scheduleWeek)) {
      return res.status(400).json({ message: "Schedule week not found in booking" });
    }

    // Loop through scheduleWeek to find the correct time slot
    let found = false;

    for (const schedule of booking.scheduleWeek) {
      // Check if the schedule's day matches the specified day
      if (schedule.day.toLowerCase() === day.toLowerCase()) {
        // Find the time slot that matches the startTime and contains the patientId
        const timeSlot = schedule.time.find(slot =>
          slot.start === start && slot.patients.includes(patientId)
        );

        if (timeSlot) {
          // Remove the first occurrence of the patient ID from the selected time slot
          const patientIndex = timeSlot.patients.indexOf(patientId);

          if (patientIndex !== -1) {
            timeSlot.patients.splice(patientIndex, 1); // Remove patient ID from this slot

            // Decrease the booking count
            if (timeSlot.Booking > 0) {
              timeSlot.Booking -= 1; // Decrease booking count by 1
            }

            found = true;
            break; // Exit loop once found
          }
        }
      }
    }
    if (!found) {
      return res.status(400).json({ message: `Patient not found for the ${day} and ${start}` });
    }

    // Save the updated booking
    await booking.save();

    return res.status(200).json({ message: "Booking canceled successfully", booking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error canceling booking", error });
  }
}


  // const getScheduleById = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const schedule = await Schedule.findOne({ user_id: id }).populate(
  //       "user_id",
  //       "name email"
  //     ); // Optionally populate user data if needed

  //     if (!schedule) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Schedule not found",
  //       });
  //     }

  //     res.status(200).json({
  //       success: true,
  //       data: schedule,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: "Server error",
  //       error: error.message,
  //     });
  //   }
  // };


  // new
  const getScheduleById = async (req, res) => {
    console.log("user role =", req.user.role)


    try {
      const { id } = req.params;

      const schedule = await Schedule.findOne({ user_id: id }).populate(
        "user_id"
        
      );

      if (req.user.role === "Patient") {

      if (!schedule) {
        return res.status(200).json({
          success: "success",
          data:[],
          message: "Schedule not found",
        });
      }
    } else{
      if (!schedule) {
        return res.status(200).json({
          success: "success",
          message: "Schedule not found",
        });
    }
  }
      // // Modify the schedule before sending it to the frontend
      // const modifiedSchedule = schedule.toObject(); // Convert to plain object for modification
      // modifiedSchedule.scheduleWeek = modifiedSchedule.scheduleWeek.map(day => {
      //   day.time = day.time.map(timeSlot => {
      //     if (timeSlot.Booking === timeSlot.Maxbook) {
      //       delete timeSlot.Booking; // Remove Booking if it equals Maxbook
      //     }
      //     return timeSlot;
      //   }); 
      //   return day;
      // });



      const modifiedSchedule = schedule.toObject(); // Convert to plain object for modification

      if (req.user.role === "Patient") {
        modifiedSchedule.scheduleWeek = modifiedSchedule.scheduleWeek.map(day => {
          day.time = day.time.filter(timeSlot => {
            // Only keep time slots where Booking is less than Maxbook
            return timeSlot.Booking < timeSlot.Maxbook;
          });
          return day;
        });
        console.log("modifiedschedule=", modifiedSchedule)
        res.status(200).json({
          success: true,
          data: modifiedSchedule,
        });
      }
      else {
        console.log("schedule=", schedule)
        res.status(200).json({
          success: true,
          data: schedule,
        });

      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };

  module.exports = {
    CreateSchedule,
    removeSchedule,
    updateTimeSlot,
    deleteTimeSlot,
    deleteDay,
    createDayWithTimeSlots,
    editMaxBooking,
    bookSlot,
    CancelSlot,
    ResetAllSlots,
    getScheduleById,
    Canclebooking
  }
