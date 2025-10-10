const { Schema, model } = require("mongoose");

const VideoSchema = new Schema(
  {
    videourl: {
      type: String,
    },
    
    title: {
      type: String,
    },
    caption: {
      type: String,
    },
    section: {
      type: String,
      
    },

     
  },
  { timestamps: true }
);

const Video = model("Video", VideoSchema);

module.exports = Video;
