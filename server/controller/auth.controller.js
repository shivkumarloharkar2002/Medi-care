const {
  setTokens,
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/generateToken.js");
const { User } = require("../model/index.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const cloudinary = require('cloudinary').v2;
const Uploadoncloudinary = require("../File_upload/Coudinaryfile");
const cloudinary = require("cloudinary");

// Helper function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Controller for user logout
async function logout(req, res) {
  try {
    res.cookie("accessToken", "", { maxAge: 0 });
    res.cookie("refreshToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller for refreshing access token
async function refresh(req, res) {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = generateAccessToken(decoded.id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.log("Error in refresh controller", error.message);
    res.status(401).json({ error: "Invalid refresh token" });
  }
}

// Controller for user signup
async function signup(req, res) {
  try {
    const {
      fullName,
      username,
      email,
      password,
      mobile,
      bloodgroup,
      bio,
      date_of_birth,
      gender,
      address,
      role,
      specialty,
      degree,
      patients,
      appointments,
      schedule, // Assuming schedule is an array or an object that is part of the User model
    } = req.body;
    
    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log(req.file)
    // Upload the img to cloudinary
    // const img = await Uploadoncloudinary(req.body.path);
    // console.log(img);

    // Create a new user with all provided data, including the schedule
    const newUser = new User({
      // img: img,
      fullName,
      username,
      email, 
      password: hashedPassword,
      mobile,
      bloodgroup,
      bio,
      date_of_birth,
      gender,
      address,
      role,
      specialty,
      degree,
      patients,
      appointments,
      schedule, // Add schedule directly here
    });

    console.log("incomming data :", newUser);
    
    // Save the new user
    await newUser.save();

    // Respond with user data
    res.status(201).json({
      message: "User registered successfully",
      user: {
        img: newUser.img,
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        mobile: newUser.mobile,
        bloodgroup: newUser.bloodgroup,
        bio: newUser.bio,
        date_of_birth: newUser.date_of_birth,
        gender: newUser.gender,
        address: newUser.address,
        role: newUser.role,
        specialty: newUser.specialty,
        degree: newUser.degree,
        // Include schedule if needed
      },
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller for user login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user =
      (await User.findOne({ email })) ||
      (await User.findOne({ fullName: email }));

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = setTokens(user, res);
    const accessTokenExpiration = 7 * 60 * 60;

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller for getting users
async function getUsers(req, res) {
  try {
    const users = await User.find()
      .select("-password") // Exclude password field
      .populate("patients") // Only get required fields for patients
      .populate("appointments") // Only get required fields for appointments
      .populate("schedule"); // Only get scheduleWeek from schedule

    res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller for getting users without patient
async function getNoPatient(req, res) {
  try {
    const users = await User.find({
      $or: [{ role: "Admin" }, { role: "Doctor" }, { role: "SuperAdmin" }],
    })
      .select("-password") // Exclude password field
      .populate("patients") // Only get required fields for patients
      .populate("appointments") // Only get required fields for appointments
      .populate("schedule"); // Only get scheduleWeek from schedule

    res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// async function updateUser(req, res) {
//   console.log(req.file);

//   const img = await Uploadoncloudinary(req.file.path);
//   try {
//     const {
//       id,
//       fullName,
//       role, 
//       specialty,
//       username,
//       specialization,
//       email,
//       password,
//       date_of_birth,
//       mobile,
//       address,
//       degree,
//       bio,
//     } = req.body;

//     if (!id) {
//       return res.status(400).json({ error: "User ID is required" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       {_id:id},
//       {
//         fullName,
//         role,
//         specialty,
//         specialization,
//         email,
//         password,
//         date_of_birth,
//         mobile,
//         address,
//         degree,
//         username,
//         bio,
//         img: img,
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({
//       message: "User updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error in updateUser controller:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }


// update user
async function updateUser(req, res) {
  console.log(req.body);

  try {
    const {
      id,
      fullName,
      role,
      specialty,
      username,
      specialization,
      email,
      password,
      date_of_birth,
      mobile,
      address,
      degree,
      bio,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    let img;

    // If a new image is uploaded, handle its upload
    if (req.file) {
      img = await Uploadoncloudinary(req.file.path); // Upload the new image to Cloudinary
    } else {
      // Retain the current image from the database
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
      img = existingUser.img; // Use the existing image URL
    }

    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        fullName,
        role,
        specialty,
        specialization,
        email,
        password,
        date_of_birth,
        mobile,
        address,
        degree,
        username,
        bio,
        img, // Update with the new or existing image
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateUser controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}




async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error in deleteUser controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const UserfindbyId = async (req, res) => {
  try {
    const id = req.user.id;
    const oneData = await User.findById(id)
      .populate("patients") // Only get required fields for patients
      .populate("appointments") // Only get required fields for appointments
      .populate("schedule"); // O;

    // console.log(oneData)
    res.json({
      success: true,
      data: oneData,
      msg: "Find data successfully...",
    });
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
};

async function getDoctorSchedule(req, res) {
  try {
    const userId = req.user._id; // Assuming you're using authentication middleware to attach the user to the request

    // Find the user by ID
    const user = await User.findById(userId).populate("schedule");

    // Check if the user is a doctor
    if (user.role !== "Doctor") {
      return res
        .status(403)
        .json({ error: "Access denied. Only doctors can view schedule." });
    }

    // If the user is a doctor, return their schedule data
    res.status(200).json({
      message: "Doctor schedule fetched successfully",
      schedule: user.schedule,
    });
  } catch (error) {
    console.error("Error fetching doctor schedule:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// // Controller for finding doctors by role
// async function findDoctorsByRole(req, res) {
//   try {
//     // Check if a role was provided
//     const { role } = req.query;

//     // Validate role
//     if (!role) {
//       return res.status(400).json({ error: "Role is required" });
//     }

//     // Query the database for users with the specified role
//     const doctors = await User.find({ role: "Doctor" }) // Assuming role is 'Doctor'
//       .select("-password") // Exclude password field
//       .populate("schedule") // Populate all fields in the schedule
//       .populate("appointments"); // Populate all fields in appointments

//     // Check if any doctors were found
//     if (doctors.length === 0) {
//       return res.status(404).json({ message: "No doctors found" });
//     }

//     // Return the doctor data
//     res.status(200).json({
//       success: true,
//       message: "Doctors retrieved successfully",
//       doctors: doctors,
//     });
//   } catch (error) {
//     console.error("Error fetching doctors:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// Controller for finding doctors by role (without requiring a role in the query)
async function findDoctorsByRole(req, res) {
  try {
    // Query the database for users with the role 'Doctor'
    const doctors = await User.find({ role: "Doctor" }) // Filter by role 'Doctor'
      .sort({ specialty: 1 }) // Sort alphabetically by specialty
      .select("-password") // Exclude the password field
      .populate("schedule") // Populate schedule field
      .populate("appointments"); // Populate appointments field

    // Check if any doctors were found
    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    // Return the doctor data
    res.status(200).json({ 
      success: true,
      message: "Doctors retrieved successfully",
      doctors: doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
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
  findDoctorsByRole,
};
