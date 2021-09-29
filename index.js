const {getCategories} = require('./controllers/category.controller')
const {getReview} = require('./controllers/getReview.controller')
const{updateReview} = require('./controllers/patchReview.controller')
const{getReviewComment} = require('./controllers/getReviewComment.controller')
const{getReviews} = require('./controllers/reviewArray.controller')
const{postComment} = require('./controllers/postComment.controller')
const{getEndpoints} = require('./controllers/endpointView.controller')

module.exports = {getCategories, getReview, updateReview, getReviewComment, getReviews, postComment, getEndpoints}