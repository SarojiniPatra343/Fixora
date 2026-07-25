const ProviderModel = require('../Models/ProviderModel');
const SubServiceModel = require('../Models/SubServiceModel');
const ServiceModel = require('../Models/ServiceModel');
const BookingModel = require("../Models/BookingModel");


// Upload Provider Info
exports.uploadInfo = async (req, res) => {

    const body = req.body;

    const file = req.file;

    if (!file) {
        return res.json({
            message: 'Document is required'
        });
    }

    if (!body.userId || !body.experience || !body.description) {
        return res.json({
            message: 'User, experience and description are required'
        });
    }

    const existingProvider = await ProviderModel.findOne({
        userId: body.userId
    });

    if (existingProvider) {
        return res.json({
            message: "Provider already exists"
        });
    }

    await ProviderModel.create({
        userId: body.userId,
        experience: body.experience,
        description: body.description,
        documents: [
            {
                documentName: body.documentName,
                document: `/documents/${file.filename}`
            }
        ]
    });

    return res.json({
        message: 'Provider Data Uploaded, waiting for Approval'
    });
};


// Create Sub Service
exports.createSubService = async (req, res) => {

    const body = req.body;

    if (
        !body.userId ||
        !body.serviceId ||
        !body.subserviceName ||
        !body.price ||
        !body.duration ||
        !body.description
    ) {
        return res.json({
            message: 'All fields are required'
        });
    }

    await SubServiceModel.create({

        userId: body.userId,

        serviceId: body.serviceId,

        subserviceName: body.subserviceName,

        price: body.price,

        duration: body.duration,

        description: body.description,

        image: body.image

    });

    return res.json({
        message: 'SubService Created Successfully'
    });
};


// Get All Services
exports.allService = async (req, res) => {

    const services = await ServiceModel.find({
        isActive: true
    });

    return res.json(services);
};


// Get All Sub Services
exports.allSubService = async (req, res) => {

  try {

    const { userId } = req.params;

    const data = await SubServiceModel.find({ userId })
    .populate("serviceId");

    res.status(200).json(data);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};
// Change Status
exports.changeSubServiceStatus = async (req, res) => {

    try {

        const id = req.params.id;

        const subService = await SubServiceModel.findById(id);

        await SubServiceModel.findByIdAndUpdate(id, {
            isActive: !subService.isActive
        });

        return res.json({
            message: "Status Changed Successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: error.message
        });

    }

};
exports.singleSubService = async (req, res) => {

    try {

        const id = req.params.id;

        const data = await SubServiceModel.findById(id);

        res.json(data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};

exports.updateSubService = async (req, res) => {

    try {

        const id = req.params.id;

        await SubServiceModel.findByIdAndUpdate(id, req.body);

        res.json({
            message: "SubService Updated Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};


exports.getProviderOrders = async (req, res) => {
    try {

        const { providerId } = req.params;

        const orders = await BookingModel.find({
            providerUserId: providerId
        })
        .populate("userId", "name email mobile")
        .populate("serviceId")
        .populate("subServiceId");

        res.status(200).json(orders);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};

exports.changeBookingStatus = async (req, res) => {
    const id=req.params.id;
    const status=req.body.status;
    await BookingModel.findByIdAndUpdate(id,{bookingStatus:status});
    return res.json({'message':'Status Updated'});
}
