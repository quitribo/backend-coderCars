const mongoose = require('mongoose');
const Car = require('../models/Car');
const carController = {};

carController.createCar = async (req, res, next) => {
	try {
		const { make, model, release_date, transmission_type, size, style, price } = req.body;
		if (!make || !model || !release_date || !transmission_type || !size || !style || !price) {
			throw new Error('Missing required info!');
		}
		const car = await Car.create({ make, model, release_date, transmission_type, size, style, price });

		return res.status(200).send({ message: 'Create Car Successfully!', car });
	} catch (err) {
		res.status(400).send({ message: err.message });
	}
};

carController.getCars = async (req, res, next) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = req.query.limit || 10;
		const cars = await Car.find()
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);
		const total = await Car.countDocuments({ isDeleted: false });
		return res.status(200).json({ message: 'Get Car List Successfully!', cars, page, total: Math.ceil(total / limit) });
	} catch (err) {
		res.status(400).send({ message: err.message });
	}
};

carController.editCar = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID');

		const car = await Car.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
		if (!car) throw new Error('Car not found!');
		return res.status(200).send({ message: 'Update Car Successfully!', car });
	} catch (err) {
		res.status(400).send({ message: err.message });
	}
};

carController.deleteCar = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID');
		const car = await Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true });
		if (!car) throw new Error('Car not found!');
		return res.status(200).send({ message: 'Delete Car Successfully!', car });
	} catch (err) {
		res.status(400).send({ message: err.message });
	}
};

module.exports = carController;
