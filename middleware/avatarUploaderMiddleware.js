const multer = require("multer")

const filename = function (req, file, cb) {
    try {
        const validFormat = [".jpg", ".png", ".jpeg", ".jfif", ".pjpeg", ".pjp", ".webp"]

        if (validFormat.includes(extname))
            cb(null, extname)
        else
            cb(new Error(`Just ${validFormat.join(' | ')} is valid`))

    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}
const maxSize = 1 * 1000 * 1000 * 10

const upload = multer({
    filename,
    limits: {
        fileSize: maxSize
    }
})

module.exports = upload