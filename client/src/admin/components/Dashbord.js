import React from 'react';
import moment from 'moment';

const MainContent = ({ appointment }) => {

    // Get unique doctors and count 
    const uniqueDoctors = appointment.reduce((acc, curr) => {
        const doctorId = curr.doctor_id._id;
        if (!acc[doctorId]) {
            acc[doctorId] = { ...curr, total_App: 1 };
        } else {
            acc[doctorId].total_App += 1; 
        }
        return acc;
    }, {});

    const doctorsList = Object.values(uniqueDoctors); // Convert object back to array

    return (
        <main className="mt-4 bg-white rounded-lg shadow-lg py-0 flex flex-col md:flex-row justify-evenly w-full">
            {/* Visiting Doctors */}
            <div className='rounded-lg shadow-lg py-0 p-4 md:p-10 overflow-y-scroll h-[60vh] md:h-[80vh] w-full md:w-[45%]'>
                <h3 className="text-lg font-bold text-center"> Doctors</h3>
                <div className="mt-4 bg-white rounded-lg w-full">
                    {doctorsList.map((data, index) => {
                        const doctorFullName = data.doctor_id?.fullName || 'Unknown Doctor';
                        return (
                            <DoctorCard
                                key={data.doctor_id._id}
                                number={index + 1}
                                name={doctorFullName}
                                specialty={data.doctor_id.specialty}
                                total_App={data.total_App}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Recent Patient Activity */}
            <div className='rounded-lg shadow-lg py-6 p-4 md:p-10 overflow-y-scroll h-[60vh] md:h-[80vh] w-full md:w-[45%] mt-6 md:mt-0'>
                <h3 className="text-lg font-bold text-center"> Patients</h3>
                <div className="mt-4 bg-white rounded-lg w-full space-y-4">
                    {appointment && appointment.map((data, index) => {
                        console.log("d",data)
                        const date = moment(data.date).format('DD/MM/YYYY ');
                        const patientFullName = data.patient_id?.fullName || 'Unknown';
                        return (
                            <PatientCard
                                key={data._id}
                                number={index + 1}
                                name={patientFullName}
                                age={data.patient_id?.age}
                                gender={data.patient_id?.gender}
                                status={data.status}
                                complaint={data.patient_id?.complaint}
                                date={date}
                            />
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

const DoctorCard = ({ number, name, specialty, total_App }) => {
    return (
        <div className="border border-border rounded-lg p-2">
            <div className="ml-1 flex flex-col md:flex-row justify-between">
                <span className="text-xl font-bold mt-2 md:mt-5"># {number}</span>
                <div className='mt-2 md:mt-0'>
                    <h2 className="font-semibold mt-4 text-lg">Dr. {name}</h2>
                    <p className="text-muted-foreground">{specialty}</p>
                </div>
                <p className="md:text-xl mt-2 md:mt-5 text-sm font-semibold">
                    Appointments
                    <br />
                    <span className='text-red-500 text-sl'>{total_App}</span>
                </p>
            </div>
        </div>
    );
};

const PatientCard = ({ number, name, age, status, gender, date, complaint }) => {
    return (
        <div className="border border-border rounded-lg p-2">
            <div className="ml-1 flex flex-col md:flex-row justify-between">
                <span className="text-xl font-bold mt-2 md:mt-5">{number}.</span>
                <h2 className="font-semibold text-sl md:text-xl mt-2 md:mt-5">
                    {name}
                    <br />
                    <p className='text-sm mt-3'>Age :- {age}
                        <br></br>
                         {/* <span className='mx-3'>Years Old</span> */}
                         </p>
                </h2>
                <p className="text-muted-foreground mt-2 md:mt-5">Status
                    <br />
                    <span className='text-red-500 text-sm font-bold'>{status}</span>
                </p>
                {/* <p className="text-muted-foreground mt-2 md:mt-5">Disease
                    <br />
                    <span className='text-green-700 text-sm font-bold ml-6'>{complaint}</span>
                </p> */}
                <p className="text-sm">
                    <p className=' text-muted-foreground mt-2 md:mt-5 mb-2'>{gender}</p>
                  
                    <span className=' text-sm '>{date}</span>
                </p>
            </div>
        </div>
    );
};

const Bord = ({ appointment }) => {
    return (
        <div className="flex flex-col md:flex-row">
            <MainContent appointment={appointment} />
        </div>
    );
};

export default Bord;
