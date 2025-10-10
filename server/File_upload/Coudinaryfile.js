const cloudinary = require('cloudinary').v2;
const fs = require('fs');  // file system (read write remote karyala madat karte)

const dotenv = require("dotenv")
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const Uploadoncloudinary = async (localfilepath) =>{  //locafilepath image chi url link 
try{ 
    if(!localfilepath){
        console.log("could not file path")
    }
  const uploadData = await cloudinary.uploader.upload(localfilepath,{
        resource_type:"auto"  // file cha type konta ahe (img,video,pdf) check karte, ithe auto kele ahe
    })
    console.log(uploadData.secure_url," file has been upload succefully")
    fs.unlinkSync(localfilepath)
    return uploadData.secure_url
}
catch(e){
    fs.unlinkSync(localfilepath) // he local la saved keleli file delete kart
    console.log(e)
}
}

module.exports = Uploadoncloudinary;