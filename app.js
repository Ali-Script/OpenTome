const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const { setHeaders } = require("./middleware/headers")


app.use(helmet());
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: "200mb", extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cookieParser("rtujh57uhHG)B$&ghy073hy57hbHB)rthrtbdfg$&BH)Hb85h4b84bhe8hb*BH#$*B"))
app.use(setHeaders);

const corsOptions = {
    origin: "http://localhost:3000",
    origin: ["https://jajiga.liara.run", "http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: "include",
    optionsSuccessStatus: 200
};

app.use(cors());


app.use((req, res) => {
    return res.status(404).json({ statusCode: 404, message: "page not found 404" })
})
app.use((err, req, res, next) => {
    return res.status(500).json({ statusCode: 500, message: err });
});


module.exports = app;