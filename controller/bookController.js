const { book } = require("./../db")
const sharp = require("sharp")
const path = require("path")
const validator = require("./../validator/authorValidator")

exports.create = async (req, res) => {
    try {
        const validateBodyy = await validator.validate(req.body);
        if (validateBodyy.error) return res.status(422).json({ statusCode: 422, message: validateBodyy.error.details[0].message });

        const { name, description, author_id, category_id } = req.body

        const extName = path.extname(req.file.originalname)
        const validFormat = [".jpg", ".png", ".jpeg", ".jfif", ".pjpeg", ".pjp", ".webp"]

        if (!validFormat.includes(extName)) return res.status(420).json({ satatusCode: 420, message: `Just ${validFormat.join(' | ')} is valid` })

        const buffer = req.file.buffer
        const pathh = `./images/covers/${Date.now()}${req.file.originalname}`
        sharp(buffer).toFormat('png').png({ quality: 50 }).toFile(`./public${pathh}`)

        await book.create({
            name,
            description,
            cover: pathh,
            author_id,
            category_id
        })

    } catch (err) {
        return res.status(500).json({ satatusCode: 500, message: err.message })
    }
}
exports.uploadBook = async (req, res) => {
    try {
        if (req.body == undefined || req.params.id == undefined)
            return res.status(422).json({ statusCode: 422, message: "validation err: id and file are required !" });

        const { id } = req.params

        const findBook = await book.findOne({ where: { id } })
        if (!findBook) return res.status(404).json({ satatusCode: 404, message: "no book with this ID was found" })
        else if (findBook.dataValues.file != '') return res.status(409).json({ satatusCode: 409, message: "this book is already have a pdf file" })

        await book.update(
            { file: req.file.filename },
            {
                where: {
                    id,
                },
            },
        );

        return res.status(200).json({ satatusCode: 200, message: "pdf file successfully updated" })

    } catch (err) {
        return res.status(500).json({ satatusCode: 500, message: err.message })
    }
}
exports.getAll = async (req, res) => {
    try {

        const books = await book.findAll();

        return res.status(200).json({ satatusCode: 200, message: books })

    } catch (err) {
        return res.status(500).json({ satatusCode: 500, message: err.message })
    }
}