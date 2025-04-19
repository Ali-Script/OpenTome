const { author } = require("../db")
exports.create = async (req, res) => {
    try {
        const { firstName, lastName, avatar, description } = req.body

        await author.create({
            firstName, lastName, avatar, description
        })

    } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message })
    }
}