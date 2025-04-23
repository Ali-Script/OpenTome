const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join("public", "files"))
    },

    filename: function (req, file, cb) {
        try {
            const fileunicname = Date.now() + Math.random() * 100
            const extname = path.extname(file.originalname)

            const allowedFileExtensions = [
                ".pdf",
                ".epub",
                ".mobi",
                ".doc",
                ".docx",
                ".txt",
                ".rtf",
                ".odt"
            ];

            if (allowedFileExtensions.includes(extname)) cb(null, fileunicname + extname)
            else cb(new Error(`Just ${allowedFileExtensions.join(' | ')} is valid`))


        } catch (err) {
            throw err
        }
    }
})
const maxSize = 100 * 1024 * 1024;

const upload = multer({
    storage, limits: {
        fileSize: maxSize
    }
})

module.exports = upload




