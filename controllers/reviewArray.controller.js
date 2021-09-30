const {fetchReviewArray} = require('../models/reviewArray.model')

exports.getReviews = (req, res, next) =>{
const {sort_by} = req.query
const {order} =req.query
const {category} =req.query
    return fetchReviewArray(sort_by, order, category)
    .then((reviews) =>{
        res.status(200).send({reviews})
    })
    .catch((err)=>{
        next(err)
    })
}
