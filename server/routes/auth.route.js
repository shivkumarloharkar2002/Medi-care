const express = require("express");
const { authenticateToken, authorizeRoles } = require("../middleware/verify");
const {
  signup,
  logout,
  refresh,
  getUsers,
  getNoPatient,
  login,
  updateUser,
  deleteUser,
  UserfindbyId,
  getDoctorSchedule,
  findDoctors,
  findDoctorsByRole,
} = require("../controller/auth.controller");
const upload = require("../File_upload/multerfile");
const auth = express.Router();

// auth.post("/signup", upload.single("img"), signup);
auth.post("/signup", signup);

auth.post("/login", login);
auth.post("/logout", logout);
auth.post("/refresh", refresh); 
auth.get("/users", getUsers);
auth.get("/noPatient", getNoPatient);
// auth.get('/getDoctorsWithDetails', authenticateToken,  getUsers);
auth.post("/updateUser",upload.single("img"), updateUser); // Add this route for updating user details
auth.delete("/users/:id", authenticateToken, deleteUser); // Route for deleting a user

auth.get("/userbyid", authenticateToken, UserfindbyId);
auth.get("/doctor", getDoctorSchedule);

auth.get("/findDoctorsByRole", findDoctorsByRole);

module.exports = auth;
  