const { sendResponse, AppError } = require("../helpers/utils.js");
const express = require("express");
const router = express.Router();

// CAR
const carAPI = require("./car.api");

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   // res.render('index', { title: 'Express' });
//   res.status(200).send("Welcome to CoderSchool!");
// });

// // Adding router and controllers
// router.get("/template/:test", async (req, res, next) => {
//   const { test } = req.params;
//   try {
//     //turn on to test error handling
//     if (test === "error") {
//       throw new AppError(401, "Access denied", "Authentication Error");
//     } else {
//       sendResponse(
//         res,
//         200,
//         true,
//         { data: "template" },
//         null,
//         "template success"
//       );
//     }
//   } catch (err) {
//     next(err);
//   }
// });

router.use("/car", carAPI);

module.exports = router;
