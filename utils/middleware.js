/**
 * Middle ware request logger
 */
const morgan      =   require('morgan')

/**
 * Extend morgan request logger
 */
morgan.token('person', (request) => {
	if(request.method !== 'GET'){
		return JSON.stringify(request.body)
	}
})

/**
 * Enable export to morgan logger
 */
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :person')

/**
 * If API url does not exist
 */
const unknownEndpoint = (request, response) =>{
	response.status(404).send({ error: 'unknown endpoint' })
}

/**
 * Custom error handling middleware
 */
const errorHandler = (error, request, response, next) => {
	console.log(error.message)

	if(error.name === 'CastError' && error.kind === 'ObjectId'){
		return response.status(400).send({ error:'malformatted id' })
	} else if (error.name === 'ValidationError'){
		return response.status(400).json({ error: error.message })
	}

	next(error)

}

module.exports = {
	morganLogger,
	unknownEndpoint,
	errorHandler
}
