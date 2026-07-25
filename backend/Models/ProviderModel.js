const mongoose = require("mongoose");
const ProviderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true
    },
    experience: {
        type: String,
        required: true,
        min: 0
    },
    description: {
        type: String,
        trim: true
    },
    totalReviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },

            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },

            comment: {
                type: String,
                trim: true
            },

            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    availability: [
        {
            day: {
                type: String,
                required: true,
                enum: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ]
            },

            startTime: {
                type: String,
                required: true
            },

            endTime: {
                type: String,
                required: true
            }
        }
    ],
    documents: [
        {
            documentName: {
                type: String,
                required: true,
                trim: true
            },

            document: {
                type: String,
                required: true
            },

            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    isApproved: {
        type: Boolean,
        default: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("provider", ProviderSchema);