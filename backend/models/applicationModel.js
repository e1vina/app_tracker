const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        universityName: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            default: '',
            trim: true,
        },
        program: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            default: 'Exchange',
            trim: true,
        },
        status: {
            type: String,
            default: 'Planned',
            trim: true,
        },
        deadline: {
            type: String,
            default: '',
        },
        semester: {
            type: String,
            default: 'Autumn 2025',
            trim: true,
        },
        notes: {
            type: String,
            default: '',
        },
        checklist: {
            type: Object,
            default: {},
        },
        flag: {
            type: String,
            default: '🎓',
        },
        programs: {
            type: [String],
            default: [],
        },
        progress: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

applicationSchema.index(
    { user: 1, universityName: 1, program: 1, semester: 1 },
    { unique: true }
);

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
