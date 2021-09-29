const{patchReview} = require('../models/patchReview.model')

exports.updateReview = (req, res, next) => {
    const {review_id} = req.params
    const{inc_votes: newVote} = req.body
    return patchReview(newVote, review_id)
    .then((updatedReview) =>{
        res.status(200).send({updatedReview})
    })
    .catch((err) =>{
        next(err)
    })
}