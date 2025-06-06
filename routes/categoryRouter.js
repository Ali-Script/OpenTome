const express = require("express")
const router = express.Router()

const controller = require("./../controller/categoryController")

router
    .route("/create")
    .post(controller.create)
router
    .route("/get/:id")
    .get(controller.getOne)
router
    .route("/getAll")
    .get(controller.getAll)

module.exports = router