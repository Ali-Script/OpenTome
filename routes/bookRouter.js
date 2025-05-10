const express = require("express");
const router = express.Router()

const controller = require("./../controller/bookController")
const pdfUploader = require("./../middleware/pdfUploaderMiddleware")
const avatarUploader = require("./../middleware/avatarUploaderMiddleware")
const authGourd = require("./../middleware/authGourd")

router
    .route("/create")
    .post(avatarUploader.single("cover"), controller.create)
router
    .route("/update/uploadFile/:id")
    .put(pdfUploader.single("file"), controller.uploadBook)
router
    .route("/getAll")
    .get(authGourd, controller.getAll)


module.exports = router