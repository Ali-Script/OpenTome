const { category } = require("./../db")
exports.create = async (req, res) => {
    try {

        //!!!!!!!!! ckech duplicate
        if (req.body == undefined || req.body.name == undefined) return res.status(422).json({ statusCode: 422, message: "name is required" })
        const { name } = req.body

        await category.create({
            name
        })
        return res.status(200).json({ statusCode: 200, message: "new category created succ" })
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}
exports.getAll = async (req, res) => {
    try {
        const categories = await category.findAll()
        return res.status(200).json({ statusCode: 200, message: categories })
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}
