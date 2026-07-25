const AdminController=require('../Controllers/AdminController');
const upload=require('../Middleware/upload');

const express=require('express');
const router=express.Router();

router.post('/login',AdminController.adminLogin);
router.post('/createService',upload.single('image'),AdminController.createService);
router.get('/allService',AdminController.getAllServices);
router.patch('/changeStatus/:id',AdminController.changeStatus);
router.get('/allProvider',AdminController.allProvider);
router.get('/allUser',AdminController.allUser);
router.get('/viewProvider/:userid',AdminController.viewProvider);
router.put(
    '/approveProvider/:id',
    
    AdminController.approveProvider
);
router.put(
    '/rejectProvider/:id',
  
    AdminController.rejectProvider
);
module.exports=router;