import React, { useEffect, useState } from 'react';
import { FaCalendarCheck, FaUserInjured, FaUserMd, FaProcedures, FaChild, FaVirus } from 'react-icons/fa';
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LineChart from './Line';
import { Box } from '@mui/material';
import axiosInstance from '../../../axiosConfig';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import Bord from '../Dashbord';


export default function Dash() {
  const navigate = useNavigate();
  const [patient, setpatient] = useState([])
  const [getalldata, setGetalldata] = useState([])
  const [appointment, setappointment] = useState([])
  const [doctors, setdoctors] = useState([])



  const [rangeType, setRangeType] = useState('today')
  const handleRangeChange = (event) => {
    setRangeType(event.target.value);
    console.log(event.target.value)
  }
  const Fetchdata = async () => {
    try {
      const Alldata = await axiosInstance.get(`/dashboard/getalldata?rangetype=${rangeType}`)
      setGetalldata(Alldata.data)
      console.log(Alldata)

      setpatient(Alldata.data.appointments)
      setappointment(Alldata.data.appointments)
      setdoctors(Alldata.data.users)
      console.log("appointment =", Alldata.data.appointments,
        "patient =", Alldata.data.appointments,
        "doctor =", Alldata.data.users)
    }
    catch (e) {
      console.log(e)
      // navigate("/patientdashboard")
    }
  }

  const countpatient = patient.length
  const countapointment = appointment.length
  const countdoctor = doctors.length
  console.log(countapointment, countpatient, countdoctor)

  useEffect(() => {
    Fetchdata()
  }, [rangeType])


  const [filterpatient, setfilterpatient] = useState([])
  const [filterappointment, setfilterappointment] = useState([])
  const [filterdoctor, setfilterdoctors] = useState([])








  // useEffect(() => {
  //   filterDataFn();
  // }, [startDate, endDate, getalldata]);


  return (
    <div className='overflow-x-hidden'>
      <div>
        {/* <label class="formbold-form-label">
          date
        </label> */}
        <select className="border border-border rounded-lg p-4 ms-10 " value={rangeType} onChange={handleRangeChange}>
          <option value="today" selected>Today</option>
          <option value="week">Current Week</option>
          <option value="month">Current Month</option>
          <option value="year">Current Year</option>
        </select>

      </div>

      

      {/* <div>
        <span className='py-2'>Start Date:</span>
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <span className='py-2'>End Date:</span>
        <input
          type='date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className
          ="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="buttonC" onClick={clearDateFilters} >Clear date</button>
      </div> */}


      {/* <div className="p-6 bg-gray-100 min-h-screen"> */}

      {/* <Card
          title="Current Cases"
          value="320"
          icon={<FaProcedures className="text-white" />}
          bgColor="from-red-400"
        />
        <Card
          title="Child Cases"
          value="50"
          icon={<FaChild className="text-white" />}
          bgColor="from-purple-400"
        />
        <Card
          title="Diseases"
          value="45"
          icon={<FaVirus className="text-white" />}
          bgColor="from-teal-400"
        /> */}
      {/* </div> */}

     



      <div className='p-6 bg-gray-100 w-screen' >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-0 md:mr-0 mr-[18vw]">
          <Card
            title="Appointments"
            value={countapointment}
            icon={<FaCalendarCheck className="text-white  h-20 w-10" />}
            bgColor="from-blue-500"
          />
          <Card
            title="Patients"
            value={countpatient}
            icon={<FaUserInjured className="text-white h-20 w-10" />}
            bgColor="from-green-500"
          />
          <Card
            title="Doctors"
            value={countdoctor}
            icon={<FaUserMd className="text-white h-20 w-10" />}
            bgColor="from-yellow-500"
          />

        </div>
      </div>

      {/* <Bord appointment={appointment} /> */}
      <Bord appointment={appointment} />

      {/* <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
          <p className="text-gray-700 mb-4">
            A Month-wise overview of the hospital's data.

          </p>
          <div className="grid p-10 grid-cols-1 gap-6">
            <Box m="20px">
              <Box height="60vh">
                <LineChart />
              </Box>
            </Box>

            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <div className="h-40 bg-gray-200 rounded"><LineChart /></div>
            </div>
          </div>
        </div> */}

    </div>













  );
};

const Card = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`p-4 rounded-lg h-32 shadow-lg flex items-center  bg-gradient-to-r ${bgColor} to-gray-200 to-95%`}>
      <div className="p-3 rounded-full bg-opacity-25 mr-4">{icon}</div>
      <div>
        <p className="text-white text-lg">{title}</p>
        <p className="text-white text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};


