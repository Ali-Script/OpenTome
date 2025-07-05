const express = require("express")
const router = express.Router()

const controller = require("./../controller/captchaController")

router
    .route("/")
    .get(controller.create)

module.exports = router