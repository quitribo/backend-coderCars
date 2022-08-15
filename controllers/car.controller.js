const { sendResponse, AppError } = require("../helpers/utils.js");
const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  const info = req.body;

  try {
    if (!info) throw new AppError(402, "Bad Request", "Create Car Error");

    const newCar = await Car.findOne(info);
    if (newCar) throw new AppError(403, "Bad Request", "Car already exists");
    //mongoose query
    const created = await Car.create(info);
    sendResponse(res, 200, true, { data: created }, null, "Create Car Success");
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  const filter = {};
  try {
    // YOUR CODE HERE
    //mongoose query
    const listOfFound = await Car.find(filter);
    sendResponse(
      res,
      200,
      true,
      listOfFound,
      null,
      "Found list of CARS success"
    );
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const carFromDB = await Car.findById(req.params.id);
    const carInfo = req.body;

    // Check car if exists
    if (!carFromDB) throw new AppError(404, "Not Found", "Car Not Found");

    const options = { new: true };
    const updated = await Car.findByIdAndUpdate(carFromDB, carInfo, options);
    sendResponse(res, 200, true, updated, null, "Update car successfully");
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    //check
    console.log(req.params);
    const carFromDB = await Car.findById(req.params.id);
    if (!carFromDB) throw new AppError(404, "Forbidden", "Car not found");

    //delete
    const options = { new: true };
    await Car.findByIdAndUpdate(carFromDB, { isDeleted: true });
    sendResponse(res, 200, true, null, null, "Delete user success");
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
