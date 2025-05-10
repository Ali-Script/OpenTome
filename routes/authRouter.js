const express = require("express");
const router = express.Router()

const controller = require("./../controller/authController")
const userValidatorSchema = require("./../validator/authValidator")
const userValidatorMiddleware = require("./../middleware/userValidator")

router
    .route("/signup")
    .post(controller.signup)
router
    .route("/signup/confirmCode")
    .post(userValidatorMiddleware(userValidatorSchema), controller.confirmCode)
router
    .route("/login")
    .post(controller.login)

module.exports = router