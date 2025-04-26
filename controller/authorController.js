const { author, book } = require("../db")
const sharp = require("sharp")

exports.create = async (req, res) => {
    try {
        const { firstName, lastName, description } = req.body

        const buffer = req.file.buffer
        const pathh = `./images/authors/${Date.now()}${req.file.originalname}`
        sharp(buffer).toFormat('png').png({ quality: 50 }).toFile(`./public${pathh}`)

        await author.create({
            firstName, lastName, avatar: pathh, description
        })
        return res.status(200).json({ statusCode: 200, message: "new author created succ" })
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}
exports.getAll = async (req, res) => {
    try {
        const getAllAuthors = await author.findAll()
        return res.status(200).json({ statusCode: 200, message: getAllAuthors })
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}
exports.getOne = async (req, res) => {
    try {
        const id = req.params.id

        const getAuthor = await author.findOne({ where: { id } })
        if (!getAuthor) return res.status(404).json({ statusCode: 404, message: "No author found 404 !" })

        const getBook = await book.findAll({ where: { author_id: id } })

        const authorPlain = getAuthor.get({ plain: true });
        authorPlain.books = getBook;

        return res.status(200).json({ statusCode: 200, message: getAuthor })
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}