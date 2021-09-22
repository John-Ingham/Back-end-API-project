const {fetchReview} = require('../models/fetchReview.model')

exports.getReview = (req, res, next) => {
    const {review_id} = req.params
    return fetchReview(review_id)
    .then((review) =>{
        res.status(200).send({review})
    })
    .catch((err) => {
        next(err)
    })
}