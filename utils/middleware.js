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

module.exports = {
	morganLogger,
	unknownEndpoint
}
