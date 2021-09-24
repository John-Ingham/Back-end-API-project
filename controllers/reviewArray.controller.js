const {fetchReviewArray} = require('../models/reviewArray.model')

exports.getReviews = (req, res, next) =>{
const {sort_by} = req.query

    return fetchReviewArray(sort_by)
    .then((reviews) =>{
        res.status(200).send({reviews})
    })
    .catch((err)=>{
        next(err)
    })
}
