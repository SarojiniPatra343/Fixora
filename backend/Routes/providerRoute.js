const express = require("express");
const ProviderRouter = express.Router();
const verifyToken=require('../Middleware/verifyToken');
const document = require("../Middleware/document");
const ProviderController = require("../Controllers/ProviderController");

// FIXED ROUTES
ProviderRouter.put(
  "/updateSubService/:id",verifyToken,
  ProviderController.updateSubService
);

ProviderRouter.get(
  "/singleSubService/:id",verifyToken,
  ProviderController.singleSubService
);

ProviderRouter.post(
  "/uploadInfo",
  document.single("document"),verifyToken,
  ProviderController.uploadInfo
);

ProviderRouter.post(
  "/subservice",
  verifyToken,
  ProviderController.createSubService
);

ProviderRouter.get(
  "/allServices",
  verifyToken,
  ProviderController.allService
);

ProviderRouter.get(
  "/allSubService/:userId",
  verifyToken,
  ProviderController.allSubService
);

ProviderRouter.get(
  "/changeSubServiceStatus/:id",
  verifyToken,
  ProviderController.changeSubServiceStatus
);

ProviderRouter.get(
    "/providerOrders/:providerId",
    verifyToken,
    ProviderController.getProviderOrders
);

ProviderRouter.patch(
  "/changeBookingStatus/:id",
  verifyToken,
  ProviderController.changeBookingStatus
);

module.exports = ProviderRouter;