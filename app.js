const express = require("express")
const {getCategories} = require('./controllers/category.controller')
const {getReview} = require('./controllers/getReview.controller')


const app = express()
app.use(express.json())


app.get('/api/categories', getCategories)
app.get('/api/reviews/:review_id', getReview)
// app.patch('/api/reviews/:review_id', updateReview)
// app.get('/api/reviews/:review_id/comments', getReviewComment)
// app.post('/api/reviews/:review_id/comments', postReview)
// app.get('/api')

app.use((err, req, res, next) => {
    console.log(err)
})

module.exports = app