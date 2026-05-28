const mongoose = require('mongoose')

const UniversitySchema = new mongoose.Schema(
    {
        flag: { type: String },
        name: { type: String, required: true, unique: true },
        country: { type: String, required: true },
        programs: { type: [String], default: [] },
        minGPA: { type: Number },
        deadline: { type: String },
        language: { type: String },
        match: { type: Number },
        type: {
            type: String,
            enum: ["Exchange", "Study Abroad"],
            required: true,
        },
        region: {
            type: String,
            enum: ["africa", "europe", "americas", "asia"],
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('University', UniversitySchema)
