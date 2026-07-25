const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    providerUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"service",
        required:true
    },
    subServiceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subservice",
        required:true
    },
    bookingDate:{
        type:Date,
        required:true
    },
    bookingTime:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["Pending","Paid","Failed"],
        default:"Pending"
    },
    bookingStatus:{
        type:String,
        enum:[
            "Pending",
            "Accepted",
            "In Progress",
            "Completed",
            "Cancelled"
        ],
        default:"Pending"
    },
    razorpayOrderId:String,
    razorpayPaymentId:String,
    razorpaySignature:String
},{
    timestamps:true
});

module.exports = mongoose.model("Booking", bookingSchema);