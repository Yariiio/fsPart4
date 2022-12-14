const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()
    return null
}

const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
        const decodedToken = jwt.verify(request.token, process.env.secret)
        request.user = decodedToken.username
    }
    next()
    return null
}

const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError') {
        response.status(400).json({error: error.message})
    }
    if(error.name === 'CastError') {
        response.status(400).json({error: 'invalid endpoint/id'})
    }
    if(error.name === 'JsonWebTokenError') {
        return response.status(401).json({error: 'invalid token'})
    }

    next(error)
}

module.exports = {
    requestLogger,
    errorHandler,
    tokenExtractor,
    userExtractor
}