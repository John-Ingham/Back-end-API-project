const {makeComment} = require('../models/postComment.model')

exports.postComment = (req, res, next) => {
    const{username, body} = req.body
    const {review_id} = req.params

    return makeComment(username, review_id, body)
    .then((madeComment) =>{
        res.status(201).send({madeComment})
    })
    .catch((err) =>{
        next(err)
    })
}