const express = require("express")
const {getCategories} = require('./controllers/category.controller')
const {getReview} = require('./controllers/getReview.controller')
const{updateReview} = require('./controllers/patchReview.controller')
const{getReviewComment} = require('./controllers/getReviewComment.controller')
const{getReviews} = require('./controllers/reviewArray.controller')
const{postComment} = require('./controllers/postComment.controller')
const{getEndpoints} = require('./controllers/endpointView.controller')

const app = express()
app.use(express.json())


app.get('/api/categories', getCategories)
app.get('/api/reviews/:review_id', getReview)
app.patch('/api/reviews/:review_id', updateReview)
app.get('/api/reviews', getReviews)
app.get('/api/reviews/:review_id/comments', getReviewComment)
app.post('/api/reviews/:review_id/comments', postComment)
app.get('/api', getEndpoints)

app.all('*' , (req, res, next) =>{
    res.status(404)
    .send({msg : 'Invalid URL'})

})
app.use((err, req, res, next) => {
if (err.status) {
    res.status(err.status).send({msg: err.msg})
} else {
    next(err)
}
})
app.use((err, req, res, next) => {
    console.log(err, "<><><>Unhandled Error<><><>")
    res.status(500).send({msg: "Internal server error"})
})

module.exports = app