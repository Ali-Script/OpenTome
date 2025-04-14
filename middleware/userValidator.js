module.exports = (validator) => {
    return async (req, res, next) => {
        try {
            if (req.body.role) return res.status(422).json({ statusCode: 422, message: "you can not set role for yourSelf" });
            const validateBodyy = await validator.validate(req.body);

            if (validateBodyy.error) return res.status(422).json({ statusCode: 422, message: validateBodyy.error.details[0].message });

        } catch (err) {
            return res.status(500).json({ statusCode: 500, message: err.message });
        }
        return next();
    };
};
