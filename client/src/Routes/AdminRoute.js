import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import AdminHome from '../admin/AdminHome';
import Appointments from '../admin/components/global/Appointments';
import Dash from '../admin/components/global/Dash';
import LineChart from '../admin/components/global/Line';
import Doctors from '../admin/components/global/Doctor';
import Patients from '../admin/components/global/Patients'
import UserCardList from '../admin/components/global/Users'
import UserDetails from '../admin/components/global/UserDetails';
import DoctorDetails from '../admin/components/global/doctorDetails';
import ScheduleForm from '../admin/components/global/ScheduleForm';
import Video from '../admin/components/global/Video';
import VideoDetails from '../admin/components/global/VideoDetails';
import Form from '../admin/components/global/Form';
import { UserContext } from './usercontext';
import ProtectedRoute from './Protected_Route';

function AdminRoute() {
  const { user, loading } = useContext(UserContext)
  const userRole = user?.role
  console.log("admin role", userRole)

  const adminRoutes = [
    { path: "/admin", element: <Dash />, heading: "DASHBOARD" },
    { path: "/admin/appointments", element: <Appointments />, heading: "APPOINTMENTS" },
    { path: "/admin/doctors", element: <Doctors />, heading: "DOCTORS" },
    { path: "/admin/patients", element: <Patients />, heading: "PATIENTS" },
    { path: "/admin/line", element: <LineChart /> },
    { path: "/admin/users", element: <UserCardList />, heading: "STAFF" },
    { path: "/user-details/:id", element: <UserDetails />, heading: "USER DETAILS" },
    { path: "/doctor-details/:id", element: <DoctorDetails />, heading: "DOCTOR DETAILS" },
    { path: "/doctor-schedule/:id", element: <ScheduleForm /> },
    { path: "/admin/Video", element: <Video />, heading: "VIDEO MANAGEMENT" },
    { path: "/admin/videoDetails/:id", element: <VideoDetails />, heading: "VIDEO DETAILS" },
    { path: "/admin/form", element: <Form />, heading: "APPOINTMENT FORM" },
  ];

  return (
    <div>

      <Routes>
        {adminRoutes.map(({ path, element, heading }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute 
              userRole={userRole}  
              loading={loading} >
                <AdminHome main={element} heading={heading} />
              </ProtectedRoute>
            }
          />
        ))}
    </Routes>
    </div >
  );
}


export default AdminRoute;
