import React from "react";
import moment from "moment";
import deletedataA from "./delete.png";
import axiosInstance from "../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";

// Placeholder image if the image import fails
const defaultImage =
  "https://cdn-icons-png.flaticon.com/512/16593/16593170.png";

// Tailwind CSS classes
const cardClasses =
  " flex flex-col sm:flex-row bg-card rounded-lg mb-4 border-b-2 shadow w-[55vw] mx-auto ";
const avatarClasses = "w-12 h-12 ml-8 mr-[1vw] my-2";
const textClasses = "mb-1 font-sans text-sm sm:text-base ";
const titleClasses = "text-lg text-primary font-sans flex";



// AppointmentSchedule component
const AppointmentSchedule = ({ appointment }) => {
  console.log("app", appointment.length);
  return (
    <>
      <div className=" sm:w-[90vw] md:w-[80vw] lg:w-[70vw] sm:mx-auto h-[60vh] bg-white  w-[90vw]">
        <h2 className="text-2xl font-bold my-4  bg-white">
          Appointment Schedule
        </h2>

        {appointment.length !== 0 ? (
          <div className="">
            <div className=" min-h-[10vh] max-h-[50vh] overflow-x-auto overflow-y-auto flex flex-col  bg-card rounded-lg mb-4 border-b-2 shadow w-[85vw]  sm:mx-auto sm:w-[65vw]">
              {appointment &&
                appointment.map((app) => {
                  console.log("appdata", app);
                  const formattedDate = moment(app.date).format("DD/MM/YYYY");
                  const formattedDay = app.date_time.day;

                  const formattedStartTime = moment(
                    app.date_time.time.start,
                    "HH:mm"
                  ).format("h:mm A");
                  const formattedEndTime = moment(
                    app.date_time.time.end,
                    "HH:mm"
                  ).format("h:mm A");

                  const doctorFullName = app.doctor_id?.username;
                  const patientFullName = app.patient_id?.fullName || "Unknown";

                  const Deleteappoinmentandbooking = async (app) => {
                    try {
                      // const appointmentdata = app[0]
                      // console.log(appointmentdata)
                      // console.log(appointmentdata._id)
                      const id = app._id;
                      console.log("f", app._id);
                      if (!id) {
                        toast.error("Invalid appointment ID");
                        return;
                      }
                      const bookingId = app.schedule_id._id;
                      const patientId = app.patient_id._id;
                      console.log(
                        "bookingId=",
                        bookingId,
                        "patientId = ",
                        patientId
                      );

                      const user_id = app.doctor_id._id;
                      const day = app.date_time.day;
                      const start = app.date_time.time.start;
                      console.log(
                        "user_id=",
                        user_id,
                        "day =",
                        day,
                        "start = ",
                        start
                      );

                      const cancelbooking = await axiosInstance.put(
                        `/Schedule/cancelBooking`,
                        { bookingId, patientId, day, start }
                      );
                      console.log(cancelbooking);
                      const cancelAppointment = await axiosInstance.delete(
                        `/Appointment/cancelAppointment/${id}`
                      );
                      console.log(cancelAppointment);
                      toast.success(cancelbooking.data.message);
                      // Optionally, refresh the bookings list here
                      window.location.reload();
                    } catch (error) {
                      toast.error(
                        error.response
                          ? error.response.data.message
                          : "Error canceling booking"
                      );
                    }
                  };

                  const defaultImage =
                    "https://cdn-icons-png.flaticon.com/512/16593/16593170.png";

                  return (
                    <div className="border-b-2 shadow sm:flex justify-around items-center bg-white mx-auto p-4 my-4 rounded-lg w-[80vw] sm:w-[55vw]">
                      <div className="  flex flex-col sm:flex-row items-center  ">
                        <img
                          src={app.imageSrc || defaultImage}
                          alt={patientFullName}
                          className="w-15 h-12 mx-auto mb-2 sm:mx-6"
                        />
                      </div>

                      <div className="">
                        <p className="text-gray-600 text-base sm:text-lg ">
                          <span className="font-bold text-black">
                            Doctor Name:
                          </span>
                          Dr. {doctorFullName}
                        </p>
                        <p className="text-gray-600 text-lg ">
                          <span className="font-bold text-black">
                            Patient Name:{" "}
                          </span>
                          {patientFullName}
                        </p>
                        <p className="text-gray-600 text-lg ">
                          <span className="font-bold text-black">Day: </span>
                          {formattedDay}
                        </p>
                        <p className="text-gray-600 text-lg ">
                          <span className="font-bold text-black">Date: </span>
                          {formattedDate}
                        </p>
                      </div>

                      <div className="sm:ms-6">
                        <p className="text-gray-600 text-lg ">
                          <span className="font-bold text-black">Time: </span>
                          {formattedStartTime} - {formattedEndTime}
                        </p>
                        <p className="text-gray-600 text-lg ">
                          <span className="font-bold text-black">Status: </span>
                          {app.status}
                        </p>
                        <p className="text-gray-600 text-lg ">
                          <span className="font-bold text-black">
                            Payment:{" "}
                          </span>
                          {app.payment}
                        </p>
                        <p className="text-gray-600 text-lg ">
                          <span className="font-bold text-black">Pay: </span>
                          {app.Pay}
                        </p>
                      </div>
                      <div className="items-center sm:flex sm:ms-10">
                        <img
                          className="w-15 h-12 p-1  my-2 cursor-pointer mx-auto"
                          onClick={() => {
                            console.log("o", app._id);
                            Deleteappoinmentandbooking(app);
                          }}
                          src={deletedataA}
                          alt="delete"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div>
            <h1>No Appointment Found</h1>
          </div>
        )}

        <ToastContainer />
      </div>
    </>
  );
};

export default AppointmentSchedule;
