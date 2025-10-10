const express = require('express');

const { Getall_patient, Patient_byId, Updatepatient, Deletepatient, Searchpatient } = require('../controller/patient_cotroller.js');
const { authenticateToken } = require('../middleware/verify.js');

const Patient_routes=express.Router();

//http://localhost:5050/Patient/allpatient
Patient_routes.get("/allpatient",Getall_patient)

// http://localhost:5050/Patient/patientbyid/:id
Patient_routes.get("/patientbyid",authenticateToken,Patient_byId)

// http://localhost:5050/Patient/updatepatient
Patient_routes.put("/updatepatient/:id",Updatepatient)


Patient_routes.delete("/patient/:id",authenticateToken,Deletepatient) 

Patient_routes.get("/Searchpatient",Searchpatient)


// http://localhost:5050/Patient/deletepatient/66d6c9a0a26e91e712a10b76
Patient_routes.delete("/deletepatient/:id",authenticateToken,Deletepatient)

module.exports = Patient_routes