const {
  getCategories,
  getReview,
  updateReview,
  getReviewComment,
  getReviews,
  postComment,
  getEndpoints,
} = require('./index')

const express = require('express')

const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/categories', getCategories)
app.route('/api/reviews/:review_id').get(getReview).patch(updateReview)
app.get('/api/reviews', getReviews)
app.get('/api/reviews/:review_id/comments', getReviewComment)
app.post('/api/reviews/:review_id/comments', postComment)
app.get('/api', getEndpoints)

app.all('*', (req, res, next) => {
  res.status(404).send({ msg: 'Invalid URL' })
})
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg })
  } else {
    next(err)
  }
})
app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Bad request' })
  } else {
    next(err)
  }
})
app.use((err, req, res, next) => {
  if (err.code === '23503') {
    res.status(404).send({ msg: 'Unable to find requested' })
  } else {
    next(err)
  }
})
app.use((err, req, res, next) => {
  console.log(err, '<><><>Unhandled Error<><><>')
  res.status(500).send({ msg: 'Internal server error' })
})

module.exports = app
