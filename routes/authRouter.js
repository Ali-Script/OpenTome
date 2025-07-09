const express = require("express");
const router = express.Router()

const controller = require("./../controller/authController")
const userValidatorSchema = require("./../validator/authValidator")
const userValidatorMiddleware = require("./../middleware/userValidator")
const authGourd = require("./../middleware/authGourd")
const passport = require("passport");

router
    .route("/signup")
    .post(controller.signup)
router
    .route("/signup/confirmCode")
    .post(userValidatorMiddleware(userValidatorSchema), controller.confirmCode)
router
    .route("/login")
    .post(controller.login)
router
    .route("/logout")
    .get(authGourd, controller.logout)
router
    .route("/google")
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
    .route("/google/callback")
    .get(passport.authenticate("google", { session: false }), controller.googleLogin);
router
    .route("/getMe")
    .get(authGourd, controller.getme)
router
    .route("/refresh-token")
    .get(controller.genRefreshToken)


module.exports = router