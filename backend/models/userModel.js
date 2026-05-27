const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            default: '',
        },
        lastName: {
            type: String,
            default: '',
        },
        homeUniversity: {
            type: String,
            default: '',
        },
        gpa: {
            type: String,
            default: '',
        },
        studyYear: {
            type: String,
            default: 'Year 1',
        },
        targetSemester: {
            type: String,
            default: 'Spring 2026',
        },
        languages: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
