const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
       
        scheduleWeek: [
            {
                date: {
                    type: Date, // Changed to Date type
                    required: true
                },
                day: {
                    type: String,
                    required: true,
                },
                time: [
                    {
                        start: {
                            type: String,
                            required: true,
                        },
                        end: {
                            type: String,
                            required: true,
                        },
                        Booking: {
                            type: Number,
                            default: 0
                        },
                        patients: [
                            {
                                type: mongoose.Schema.Types.ObjectId,
                                ref: 'Patient',
                                required: true
                            }
                        ],
                        Maxbook: {
                            type: Number,
                            default: 5,
                        }
                    }
                ]
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

ScheduleSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
