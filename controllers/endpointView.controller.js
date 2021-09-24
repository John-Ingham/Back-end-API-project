

exports.getEndpoints = (req, res, next) => {
    
    const endPointList = {
              categoriesList: '/api/categories',
              reviewById: '/api/reviews/:review_id',
              updateReview: '/api/reviews/:review_id',
              allReviews: '/api/reviews',
              commentsFromReview: '/api/reviews/:review_id/comments',
              postComment: '/api/reviews/:review_id/comments'
            }
    
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(JSON.stringify(endPointList))
            
    
    
}