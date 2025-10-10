const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        User_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        Doctor_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        appointments: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Appointment", 
            },
          ],
          schedule:               {
            day: {
                type: String,
                required: true,
            },
            time:
                {
                    start: {
                        type: String,
                        required: true,
                    },
                    end: {
                        type: String,
                        required: true, 
                    },
                    dayId:{
                        type: String,
                        required: true, 
                    },
                    timeId:{
                        type: String,
                        required: true, 
                    }
                }
            
        },
        mobile: {
            type: Number,
            required: true,
            maxLength: 10,
        },
        email: {
            type: String,
        },
        bloodgroup: {
            type: String,
 
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true,
        },
        address: {
            type: String,
            required: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }, 
        updatedAt: {
            type: Date,
        },
       age:{
        type:Number,
        required:true,
       },
       refferedby:{
        type:String,
       
       },
       personalhistory:{
        type:String,
        
       },
       familyhistory:{
        type:String,
        
       },
       habits:{
        type:String,
       },
       visited:{
        type:String,
       },
       complaint:{
        type:String
       }
    
    },
    { timestamps: true }
);

PatientSchema.pre('save', function () {
  this.updatedAt = Date.now();
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;

