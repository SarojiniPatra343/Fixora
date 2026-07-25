const mongoose=require('mongoose');
const ServiceSchema=new mongoose.Schema({
    ServiceName:{
        type:String,
        required:true,
        unique:true
    },
    Description:{
        type:String,
        required:true,
    },
    ServiceImage:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const ServiceModel=mongoose.model('service',ServiceSchema);
module.exports=ServiceModel;