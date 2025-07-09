const { author, book } = require("../db")
const sharp = require("sharp")
const validator = require("../validator/authorValidator")

exports.create = async (req, res) => {
    try {
        const validateBodyy = await validator.validate(req.body);
        if (validateBodyy.error) return res.status(422).json({ statusCode: 422, message: validateBodyy.error.details[0].message });

        const { firstName, lastName, description } = req.body
        if (req.file == undefined) return res.status(422).json({ statusCode: 422, message: "uploading failed" })

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
exports.remove = async (req, res) => {
    try {
        const id = req.params.id

        const getAuthor = await author.findOne({ where: { id } })
        if (!getAuthor) return res.status(404).json({ statusCode: 404, message: "No author found 404 !" })

        await book.delete({ where: { author_id: id } })

        return res.status(200).json({ statusCode: 200, message: "succ" })
    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}