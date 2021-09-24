const db = require('../db/connection')

exports.fetchReview = (review_id) => {
    return db.query(`SELECT reviews.*, COUNT(comment_id) AS comment_count 
    FROM reviews
    LEFT OUTER JOIN comments ON comments.review_id = reviews.review_id
    WHERE reviews.review_id = $1 
    GROUP BY reviews.review_id
    `, [review_id])
    .then((result) =>{
        const review = result.rows[0]
        if (!review) {
            return Promise.reject({
                status: 404,
                msg: `No review found matching ${review_id}`
            })
        }
        return result.rows[0]
    })
}