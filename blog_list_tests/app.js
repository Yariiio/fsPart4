const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('./utils/middleware').errorHandler
require('express-async-errors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')

const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to database')
})
.catch((error) => {
    logger.error('Can not connect to database', error.message)
})



app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

module.exports = app