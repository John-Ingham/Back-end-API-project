// extract any functions you are using to manipulate your data, into this file
const {categoryData, commentData, reviewData, userData} = require('../data/test-data/index')

//console.log({userData})

exports.formatUserData = (userData) => {
//make it - [[username, avatar url, name]]
const formattedUserData = userData.map((user) => {
    return [user.username,
            user.avatar_url,
            user.name]  
        })
    return formattedUserData
}

exports.formatCategoryData = (categoryData) => {
    const formattedCategoryData = categoryData.map((category) => {
        return [category.slug,
                category.description]
    })
    return formattedCategoryData
}   

exports.formatReviewData = (reviewData) => {
    const formattedReviewData = reviewData.map((review) => {
        return [
                review.title,
                review.review_body,
                review.designer,
                review.review_img_url,
                review.votes,
                review.category,
                review.owner,
                review.created_at]
    })
    return formattedReviewData
}

exports.formatCommentsData = (commentData) => {
    const formattedCommentData = commentData.map((comment) => {
        return [
                comment.author,
                comment.review_id,
                comment.votes,
                comment.created_at,
                comment.body]
    })
    return formattedCommentData
}
//console.log(formattedUserData)