/**
 * MongoDB database schema
 */
const mongoose = require('mongoose')

const config =  require('../utils/config')

mongoose.set('useFindAndModify', false)

/**
 * base url
 */
const url = config.MONGODB_URI

console.log('connecting to', url)

/**
 * Connection verification
 */
mongoose.connect(url, { useNewUrlParser:true, useUnifiedTopology: true })
	.then(()=>{
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB', error.message)
	})
    
/**
 * MongoDB document structure
 */
const blogSchema = mongoose.Schema({
	title : String,
	author : String,
	url : String,
	likes : Number
})

module.exports = mongoose.model('Blog', blogSchema)