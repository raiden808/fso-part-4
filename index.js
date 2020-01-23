require('dotenv').config()
const http        =   require('http')
const express     =   require('express')
const app         =   express()
const bodyParser  =   require('body-parser') 
const cors        =   require('cors')
const mongoose    =   require('mongoose')

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

mongoose.connect(mongoUrl, { useNewUrlParser: true })

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