const { Patient, User } = require("../model")


const Getall_patient = async (req, res) => {
    try {
        const Allpatient = await Patient.find().populate("User_id")
        res.json({
            success: true,
            data: Allpatient
        })
    }
    catch (e) {
        console.log(e)
    }
}
const Patient_byId = async (req, res) => {
    const id = req.user.id; // Assuming req.user.id contains the correct user ID
    console.log(id);
    try {
        const Patientdata = await Patient.find({ User_id: id }); // Fetch patient data by User ID

        if (Patientdata.length === 0) { // Check if no patients are found
            return res.json({
                success: false,
                data: [],
                msg: "Patient is not available"
            });
        }

        res.json({
            success: true,
            data: Patientdata
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            msg: "An error occurred while fetching the patient data",
            error: e.message
        });
    }
};
const Updatepatient = async (req, res) => {

    const { id } = req.params;

    const { fullName, mobile, bloodgroup, description, gender, address, age, habits, personalhistory, familyhistory } = req.body;
    console.log(id)
    try {
        const update = await Patient.updateOne({ _id: id }, {
            $set: {
                fullName: fullName,
                mobile: mobile,
                bloodgroup: bloodgroup,
                description: description,
                gender: gender,
                address: address,
                age: age,
                habits: habits,
                personalhistory: personalhistory,
                familyhistory: familyhistory,
            }
        })
        res.json({
            sucess: true,
            msg: "Patient updated Succefully",
            data: update
        })
    }
    catch (e) {
        console.log(e)
    }
}


const Deletepatient = async (req, res) => {
    try {
        const { id } = req.params;
console.log(req.user)

        // Remove patient ID from all users' patients arrays
        const userUpdate = await User.updateMany(
            {},
            { $pull: { patients: id } }  // Remove patient ID from all users' patients arrays
        );

        // Update Patient's User_id to null
        const patientUpdate = await Patient.updateMany(
            { _id: id },
            { $unset: { User_id: "" } }  // Remove User_id reference from the patient document(s)
        );

        // console.log("Removed patient reference from all users:", userUpdate);
        // console.log("Cleared User_id reference in patient(s):", patientUpdate);

        if(req.user.role==="Admin"){
            const Deletepatient = await Patient.deleteOne({ _id: id })
        }

        res.json({
            success: true,
            data: {},
            msg: "Patient references deleted from all users and User_id removed from patient(s)",
        });
    } catch (e) {
        console.log("Delete error:", e);
        res.status(500).json({ success: false, error: e.message });
    }
};



// const Searchpatient= async (req, res) => {
//     console.log(req.query)
//     const { name, mobile } = req.query;
//      const number = Number(mobile)
//     // Create search conditions based on input
//     let searchCondition = {};
//     if (name) searchCondition.fullName = { $regex: name, $options: 'i' }; // case insensitive
//     if (mobile) searchCondition.mobile = { $regex: number }; // partial matches


// console.log('Search condition:', searchCondition);
//     try {
//         const patients = await Patient.find(searchCondition);
//         if (patients.length>0)
//             console.log("filtered patients:", patients);
//         res.status(200).json({ 
//            success:true,
//            data: patients 
//         });
//     } catch (err) {
//         res.status(500).json({
//             success:false,
//             message: err.message 
//         });
//     }
// };

const Searchpatient = async (req, res) => {
    const { name, mobile } = req.query;
    console.log('Name:', name);
    console.log('Mobile:', mobile);

    let searchCondition = {};
    if (name) {
        searchCondition.fullName = { $regex: name, $options: 'i' }; // case insensitive
    }
    if (mobile) {
        const numberMobile = Number(mobile);
        if (!isNaN(numberMobile)) {
            searchCondition.mobile = String(numberMobile); // ensure it's a string
        }
    }

    console.log('Search condition:', searchCondition);
    try {
        const patients = await Patient.find(searchCondition);
        console.log("Filtered patients:", patients); // Log the results
        res.status(200).json({
            success: true,
            data: patients
        });
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


module.exports = {
    Getall_patient,
    Patient_byId,
    Updatepatient,
    Deletepatient,
    Searchpatient
}