const { category, book } = require("./../db")
exports.create = async (req, res) => {
    try {
        if (req.body == undefined || req.body.name == undefined) return res.status(422).json({ statusCode: 422, message: "name is required" })
        const { name } = req.body

        const checkDup = await category.findOne({ where: { name } })
        if (checkDup) return res.status(409).json({ statusCode: 409, message: "This category is already exist !" })

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
exports.getOne = async (req, res) => {
    try {
        const id = req.params.id

        const getCategory = await category.findOne({ where: { id } })
        if (!getCategory) return res.status(404).json({ statusCode: 404, message: "No category found 404 !" })

        const getBook = await book.findAll({ where: { author_id: id } })

        const authorPlain = getCategory.get({ plain: true });
        authorPlain.books = getBook;

        return res.status(200).json({ statusCode: 200, message: getCategory })
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}