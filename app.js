const config      =   require('./utils/config')
const express     =   require('express')
const bodyParser  =   require('body-parser') 
const app         =   express()
const cors        =   require('cors')
/**
 * DB connection
 */
const blogRouters  = require('./controllers/blogs')
const middleware   = require('./utils/middleware')
const mongoose     = require('mongoose')

/**
 * Verify connections to MongoDB
 * @param config.MONGODB_URI connection from .env
 * @param useNewUrlParser remove depreceated warning
 */
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})


/**
 * Enables cross origin policy
 */
app.use(cors())

/**
 * Enable request.body access  
 */
app.use(bodyParser.json())

/**
 * Request logger middleware
 */
app.use(middleware.morganLogger)

/**
 * Base url for api
 */
app.use('/api/blogs', blogRouters)

/**
 * Unknown endpoint middleware
 */



module.exports = app

