const express = require("express");
const router = express.Router()

const controller = require("../controller/authorController")

router
    .route("/create")
    .post(controller.create)

module.exports = router