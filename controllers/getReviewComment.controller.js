const{getComment} = require('../models/getReviewComment.model')

exports.getReviewComment = (req, res, next) =>{
    const{review_id} = req.params

    return getComment(review_id)
    .then((comments) =>{
        res.status(200).send({comments})
    })
    .catch((err) =>{
        next(err)
    })
}