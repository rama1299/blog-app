require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./router/indexRouter')

app.use(cors())
app.use(morgan('tiny'))
app.use("/uploads", express.static("uploads"));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(router)
app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
