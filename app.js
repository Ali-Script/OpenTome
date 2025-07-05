const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require("passport");
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const setupSwagger = require('./configs/apiDoc/swaggerRoutes');
const { setHeaders } = require("./middleware/headers")
const logger = require("./utils/logger")
const requestLogger = require("./middleware/requestLogger")
const googleStrategy = require("./strategies/googleStrategy");

app.use(helmet());
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: "200mb", extended: false }))
app.use(bodyParser.json())
// app.use(morgan('combined'))
app.use(requestLogger)
app.use(cookieParser())
app.use(setHeaders);
app.use(express.static(path.join(__dirname, "./public")))
app.use("/images", express.static(path.resolve(__dirname, "./public/images")))
app.use("/files", express.static(path.resolve(__dirname, "./public/files")))
app.use("/avatars", express.static(path.resolve(__dirname, "./public/images/avatars")))
app.use("/authors", express.static(path.resolve(__dirname, "./public/images/authors")))
app.use("/covers", express.static(path.resolve(__dirname, "./public/images/covers")))
app.use("/api-doc", setupSwagger)
// const corsOptions = {
//     origin: "http://localhost:3000",
//     origin: ["https://jajiga.liara.run", "http://localhost:3000"],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: "include",
//     optionsSuccessStatus: 200
//};
app.use(cors());
passport.use(googleStrategy);

const authRouter = require("./routes/authRouter")
const authorRouter = require("./routes/authorRouter")
const bookRouter = require("./routes/bookRouter")
const categoryRouter = require("./routes/categoryRouter")
const captchaRouter = require("./routes/captchaRouter")


app.use("/auth", authRouter)
app.use("/author", authorRouter)
app.use("/book", bookRouter)
app.use("/category", categoryRouter)
app.use("/captcha", captchaRouter)

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});
app.use((req, res) => {
    return res.status(404).json({ statusCode: 404, message: "page not found 404" })
})
app.use((err, req, res, next) => {
    return res.status(500).json({ statusCode: 500, message: err });
});


module.exports = app;