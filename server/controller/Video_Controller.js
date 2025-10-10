// const cloudinary = require('cloudinary').v2;
const Uploadoncloudinary = require("../File_upload/Coudinaryfile");
const Video = require("../model/video_model");
const cloudinary = require("cloudinary");

const Addvideo = async (req, res) => {
  const { title, caption, section } = req.body;

  try {
    // Check if a video already exists in the specified section
    const existingVideo = await Video.findOne({ section });

    if (existingVideo) {
      return res.status(400).json({
        success: false,
        msg: "A video already exists in this section. You cannot add another one.",
      });
    }

    // Upload the video to cloudinary 
    const videourl = await Uploadoncloudinary(req.file.path);

    // If no video exists, create the new one
    const videodata = await Video.create({
      title,
      caption,
      section,
      videourl: videourl,
    });

    res.json({
      success: true,
      data: videodata,
      msg: "Video uploaded successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      msg: "An error occurred while uploading the video.",
    });
  }
};


const Videodata = async (req, res) => {
  const alldata = await Video.find();
  res.json({
    success: true,
    msg: "all fabric",
    data: alldata,
  });
};

const OneVideoData = async (req, res) => {
  const { id } = req.params;

  const alldata = await Video.findById(id);
  res.json({
    success: true,
    msg: "all fabric",
    data: alldata,
  });
};

const Updatevideo = async (req, res) => {
  const { id } = req.params;
  console.log("this is file", req.file.path);

  const videourl = await Uploadoncloudinary(req.file.path);

  const {  title, caption, section, treatment } = req.body;
  try {
    const updated = await Video.updateOne(
      { _id: id },
      {
        $set: {
          title,
          caption,
          section,
          treatment,
          videourl: videourl,
        },
      }
    );
    res.json({
      success: true,
      data: updated,
      msg: `${title} is updated`,
    });
  } catch (e) {
    console.log(e);
  }
};

const Deletevideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    // if (!video) {
    //   return res.status(404).json({
    //     msg: "video not found",
    //   });
    // }
    // console.log(video);

    // const videoUrl = video.videourl;
    // console.log(videoUrl);

    // const publicId = videoUrl.split("/").pop().split(".")[0]; // Extract ID from URL
    // console.log(publicId);

    // const deletevid = await cloudinary.uploader.destroy("uy4i02copvtg4rsh0fnw",{ resource_type: 'video' });
    // console.log("Cloudinary delete response:", deletevid);

    // // Check if the image was successfully deleted
    // if (deletevid.result !== 'ok') {
    //     return res.status(500).json({
    //         msg: "Error deleting image from Cloudinary",
    //         error: deletevid
    //     });
    // }

    // Delete the document from MongoDB
    const deleteDocument = await Video.deleteOne({ _id: id });
    res.json({
      data: deleteDocument,
      msg: "video deleted successfully",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  Addvideo,
  Videodata,
  OneVideoData,
  Updatevideo,
  Deletevideo,
};

// Middleware to handle multiple file uploads
// router.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
//   try {
//     const { image, video } = req.files;
//     const { title, description, treatment } = req.body;

//     // Upload image and video to Cloudinary
//     const imageUrl = image ? await cloudinary.uploader.upload(image[0].path, { resource_type: 'image' }) : null;
//     const videoUrl = video ? await cloudinary.uploader.upload(video[0].path, { resource_type: 'video' }) : null;

//     // Create video data in your database
//     const videodata = await Video.create({
//       title,
//       description,
//       treatment,
//       imageUrl: imageUrl ? imageUrl.secure_url : null,
//       videoUrl: videoUrl ? videoUrl.secure_url : null
//     });

//     res.json({
//       success: true,
//       data: videodata,
//       msg: 'Video and image uploaded'
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ success: false, msg: 'An error occurred' });
//   }
// });

// module.exports = router;
