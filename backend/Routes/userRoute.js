const UserController=require('../Controllers/UserController');
const AdminController=require('../Controllers/AdminController');
const uploadUser=require('../Middleware/uploadUser');
const verifyToken=require('../Middleware/verifyToken');
const express=require('express');
const router=express.Router();

router.post('/createUser',uploadUser.single('image'),UserController.createUser);
router.post('/login',UserController.login);

router.get('/allService',verifyToken,AdminController.getAllServices);
router.get('/subServices',verifyToken,UserController.subServices);
router.post("/create-order",verifyToken,UserController.createOrder);
router.post("/verify-payment",verifyToken,UserController.verifyPayment);
router.get("/allBookings/:userId", verifyToken, UserController.allBookings);
module.exports=router;