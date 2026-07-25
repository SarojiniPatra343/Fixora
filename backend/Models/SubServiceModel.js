const mongoose = require('mongoose');
const SubServiceSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",
        required: true

    },

    subserviceName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true

    },
    description: {
        type: String,
        required: true

    },

    image:{
   type:String
},

    isActive: {
   type: Boolean,
   default: true
}


})
const SubServiceModel = mongoose.model('subservice', SubServiceSchema);
module.exports = SubServiceModel;
