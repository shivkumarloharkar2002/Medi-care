const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        patient_id: {
            
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        doctor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        schedule_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Schedule",
            // required: true,
          },
          date: {
            type: Date, // Changed to Date type
            required: true
        },
        date_time:
               {
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
                
            }
        ,

        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Canceled', 'Completed'],
            default: 'Pending',
            required: true
        },
        payment:{
            type: String,
            enum: ['Cash', 'Online'],
            default: 'Cash',
            required: true
        },
        Pay:{
            type: String,
            enum: ['Paid', 'Unpaid'],
            default: 'Unpaid',
            required: true
        }
    },
    { timestamps: true}
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

