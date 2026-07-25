const UserModel = require('../Models/UserModel');
const SubServiceModel = require('../Models/SubServiceModel');
const SubService=require('../Models/SubServiceModel');
const bcrypt = require('bcrypt');
const razorpay = require("../config/razorpay");
const BookingModel = require('../Models/BookingModel');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

async function sendMail(mail){
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: "sarojinipatra343@gmail.com",
            pass:"bwwgrihjwwtcrmfz"
        }
    });

    let info = await transporter.sendMail({
        from: '"Fixora" <sarojinipatra343@gmail.com>',
        to:`${mail}`,
        subject: "Test Email",
        text: "Hello! You are register successfully.",
        html: "<p>Now you can enjoy our application.</p>"
    });
    console.log("Email sent :",info.messageId);
}

exports.createUser = async (req, res) => {
    const body = req.body;
    const file = req.file;
    console.log(body,file)
    if (!file) {
        return res.json({ 'message': 'File is required' });
    }
    if (!body.name || !body.email || !body.password || !body.phone || !body.role || !body.street || !body.city || !body.state || !body.pincode || !body.location) {
        return res.json({ 'message': 'All Fields Are Required' });
    } else {
        const hashedPassword = bcrypt.hashSync(body.password, 10);
        await UserModel.create({
            name:body.name,
            email:body.email,
            password:hashedPassword,
            phone:body.phone,
            role:body.role,
            profileImage:`/userImage/${file.filename}`,
            address: {
                street:body.street,
                city:body.city,
                state:body.state,
                pincode:body.pincode,
                location:body.location
            }
        })
        sendMail(body.email);
        return res.json({'message':'User Created Successfully'});
    }
}
exports.login=async (req,res)=>{
    const body=req.body;
    if(!body.email || !body.password){
        return res.json({"message":"email and password required"});
    }else{
        const user=await UserModel.findOne({email:body.email});
        if(!user){
            return res.json({'message':'User Not Found'});
        }else{
            const compare=bcrypt.compareSync(body.password,user.password);
            if(!compare){
                return res.json({'message':'Invalid Credentials'});
            }else{
                const token=jwt.sign({userId:user._id },
                    process.env.JWT_SECRET,{expiresIn: "1h"});
                return res.json({user,token});
            }
        }
    }
}

exports.subServices=async (req,res)=>{
    const subServices=await SubServiceModel.find().populate('serviceId')
    return res.json(subServices);
}


exports.createOrder = async (req,res)=>{
    try{
        const { amount } = req.body;
        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Order creation failed"
        });
    }
}


exports.verifyPayment = async(req,res)=>{
    try{
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,

            userId,
            providerUserId,
            serviceId,
            subServiceId,
            bookingDate,
            bookingTime,
            amount,
            address
        } = req.body;
        const generatedSignature =
        crypto
        .createHmac(
            "sha256",
            process.env.RAZORPAY_KEY_SECRET
        )
        .update(
            razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");
        if (
    generatedSignature !== razorpay_signature
) {
    console.log("Received:", razorpay_signature);
    console.log("Generated:", generatedSignature);

    return res.status(400).json({
        message: "Payment Verification Failed"
    });
}
        const booking =
        await BookingModel.create({
            userId,
            providerUserId,
            serviceId,
            subServiceId,
            bookingDate,
            bookingTime,
            amount,
            address,
            paymentStatus:"Paid",
            razorpayOrderId:
            razorpay_order_id,
            razorpayPaymentId:
            razorpay_payment_id,
            razorpaySignature:
            razorpay_signature
        });
        res.status(200).json({
            success:true,
            booking
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server Error"
        });
    }
};

exports.allBookings = async (req, res) => {
    try {
        const userId = req.params.userId;

        console.log("UserId:", userId);

        const allBookings = await BookingModel.find({
            userId: userId
        })
        .populate("providerUserId")
        .populate("userId")
        .populate("serviceId")
        .populate("subServiceId");

        console.log(allBookings);

        return res.status(200).json(allBookings);

    } catch (err) {
        console.log("ERROR:", err);

        return res.status(500).json({
            message: err.message
        });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await BookingModel.find()
            .populate("userId")
            .populate("providerUserId")
            .populate("serviceId")
            .populate("subServiceId");

        return res.status(200).json(bookings);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};