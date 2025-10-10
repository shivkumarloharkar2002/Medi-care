const express = require("express")
const upload = require('../File_upload/multerfile.js');
const {Addvideo,Videodata, Updatevideo, Deletevideo,OneVideoData} = require('../controller/Video_Controller.js');

const Video_routes= express.Router();

// http://localhost:5050/video/
Video_routes.post("/addvideo", upload.single("videourl"),Addvideo)


Video_routes.get("/allvideo",Videodata)

Video_routes.get("/OneVideoData/:id",OneVideoData)

Video_routes.put('/updatevideo/:id',upload.single("videourl"),Updatevideo)

Video_routes.delete('/deletevideo/:id',Deletevideo)

module.exports = Video_routes  