const express = require("express");
const router = express.Router()

const controller = require("./../controller/authController")
const userValidatorSchema = require("./../validator/authValidator")
const userValidatorMiddleware = require("./../middleware/userValidator")

router
    .route("/signup")
    .post(userValidatorMiddleware(userValidatorSchema), controller.signup)
router
    .route("/signup/confirmCode")
    .post(userValidatorMiddleware(userValidatorSchema), controller.confirmCode)

module.exports = router