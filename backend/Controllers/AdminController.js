const ServiceModel=require('../Models/ServiceModel');
const UserModel=require("../Models/UserModel");
const ProviderModel=require('../Models/ProviderModel');
exports.adminLogin=async (req,res)=>{
    const {email,password}=req.body;
    if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD){
        const role='admin';
        return res.json({email,password,role,message:'Admin Login Successfully'});
    }else{
        return res.json({message:'Invalid Credentials'});
    }
}

exports.createService=async (req,res)=>{
    const body=req.body;
    const file=req.file;
    const service=await ServiceModel.findOne({'ServiceName':body.ServiceName});
    if(service){
        return res.json({'message':'Service Already Exists'});
    }else{

        if(!file){
            return res.json({'message':'File is required'});
        }else{

            if(!body.ServiceName || !body.Description){
                return res.json({'message':'All Fields Are Required'});
            }else{
                await ServiceModel.create({
                    ServiceName:body.ServiceName,
                    Description:body.Description,
                    ServiceImage:`/serviceImage/${file.filename}`
                });
                return res.json({'message':'Service Created'});
            }
        }
    }
}
exports.getAllServices=async (req,res)=>{
    const services=await ServiceModel.find();
    return res.json(services);
}
exports.changeStatus=async (req,res)=>{
    const id=req.params.id;
    const service=await ServiceModel.findById(id);
    if(service.isActive==true){
        await ServiceModel.findByIdAndUpdate(id,{isActive:false});
    }else{
       await ServiceModel.findByIdAndUpdate(id,{isActive:true});
    }
    return res.json({message:"Status Changed Successfully"});
}

exports.allProvider=async (req,res)=>{
    const providers=await UserModel.find({role:'provider'});
    return res.json(providers);
}
exports.allUser=async (req,res)=>{
    const users=await UserModel.find({role:'customer'});
    return res.json(users);
}

exports.viewProvider=async (req,res)=>{
    const userid=req.params.userid;
    const provider=await ProviderModel.findOne({userId:userid}).populate('userId');
    return res.json(provider);
}
exports.approveProvider = async (req, res) => {

    const id=req.params.id;
    const provider=await ProviderModel.findById(id);
    if (provider.isApproved==false){
        await ProviderModel.findByIdAndUpdate(id,{isApproved:true});
    return res.json({message:'provider approved'});
}else{
    return res.json({message:'Provider already approved'})
}
};

exports.rejectProvider = async (req, res) => {

    const id=req.params.id;
    const provider=await ProviderModel.findById(id);
    if (provider.isApprove==true){
        await ProviderModel.findByIdAndUpdate(id,{isApproved:false});
    return res.json({message:'provider rejected'});
}else{
    return res.json({message:'Provider already rejected'})
}
};

exports.changeSubServiceStatus=async (req,res)=>{
    const id=req.params.id;
    const subService=await SubServiceModel.findById(id);
    if(subService.status==true){
        await SubServiceModel.findByIdAndUpdate(id,{status:false});
    }else{
        await SubServiceModel.findByIdAndUpdate(id,{status:true});
    }
    return res.json({'message':'Status Changed Successfully'});
}