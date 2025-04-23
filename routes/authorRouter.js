const express = require("express");
const router = express.Router()

const controller = require("../controller/authorController")
const multerMiddleware = require("../middleware/avatarUploaderMiddleware")

router
    .route("/create")
    .post(multerMiddleware.single("avatar"), controller.create)
router
    .route("/getAll")
    .get(controller.getAll)

module.exports = router