const express = require('express')
const router = express.Router()

const postRouter = require('./postRouter')
const userRouter = require('./userRouter')

router.use(postRouter)
router.use(userRouter)

module.exports = router