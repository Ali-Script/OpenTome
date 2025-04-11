const express = require("express");
const router = express.Router()

const controller = require("./../controller/authController")

router
    .route("/")
    .get(controller.signup)

module.exports = router