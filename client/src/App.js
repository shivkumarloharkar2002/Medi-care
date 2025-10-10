import React from "react";
import NewRoutes from "./Routes/NewRote";
import AdminRoute from "./Routes/AdminRoute";
import { UserProvider } from "./Routes/usercontext";

// import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <NewRoutes />

     {/* Wrap only AdminRoute with UserProvider */}
     <UserProvider>
        <AdminRoute />
      </UserProvider>
    </div>
  );
}

export default App;
