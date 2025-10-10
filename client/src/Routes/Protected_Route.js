import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, userRole, loading }) => {
    console.log(loading)
    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }
    const allowedRoles = ["Doctor", "Admin", "SuperAdmin"];
    console.log("protected route userrole", userRole)
    if (!userRole || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />; // Redirect to homepage if not allowed
    }

    return children; // Render children if the user is allowed
};

export default ProtectedRoute;




















// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { UserContext } from './usercontext';
// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(UserContext)

//   // If the user is not logged in, redirect to the login page
//   console.log(user)
//   if (!user || !["Doctor", "Admin", "SuperAdmin"].includes(user.role)) {
//     return <Navigate to="/" />;
// }


//   // If user is logged in, render the child components (e.g., admin or patient dashboard)
//   return children;
// };

// export default ProtectedRoute;
