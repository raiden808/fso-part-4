require('dotenv').config()
const http        =   require('http')
const express     =   require('express')
const app         =   express()
const bodyParser  =   require('body-parser') 
const cors        =   require('cors')
const morgan      =   require('morgan')

/**
 * DB connection
 */
const blogRouters  = require('./controllers/blogs')


/**
 * Extend morgan request logger
 */
morgan.token('person', (request) => {
	if(request.method !== 'GET'){
		return JSON.stringify(request.body)
	}
})

/**
 * Morgan terminal logs
 */
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :person')
)

/**
 * Enables cross origin policy
 */
app.use(cors())

/**
 * Enable request.body access  
 */
app.use(bodyParser.json())

/**
 * Base url for api
 */
app.use('/api/blogs', blogRouters)


const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
	console.log(`Server running on port ${PORT}`)
})