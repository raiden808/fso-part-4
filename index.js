require('dotenv').config()
const http        =   require('http')
const express     =   require('express')
const app         =   express()
const bodyParser  =   require('body-parser') 
const cors        =   require('cors')
const mongoose    =   require('mongoose')
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
 * Morgan terminal logs
 */
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :person')
  )

/**
 * MongoDB Schema
 */
const blogSchema = mongoose.Schema({
    title : String,
    author: String,
    url : String,
    likes: Number
})

/**
 * Initialize Schema
 */
const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI

console.log('connecting to ',mongoUrl)

mongoose.connect(mongoUrl,{useNewUrlParser:true, useUnifiedTopology: true})
    .then(result =>{
        console.log('Connected to MongoDB')
    })
    .catch((error)=>{
        console.log("error connecting to MongoDB", error.message)
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
 * MongoDB get request
 */
app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

/**
 * MongoDB post request
 */
app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result =>{
            response.status(201).json(result)
        })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})