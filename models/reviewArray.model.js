const db = require('../db/connection')

exports.fetchReviewArray = (sort_by = "created_at", order = "desc", category) => {
    
    let queryStr = `
    SELECT reviews.review_id, title, designer, review_img_url, reviews.votes, category, owner, reviews.created_at,
    COUNT(comment_id) AS comment_count 
    FROM reviews
    LEFT OUTER JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id
    `
    let queryValues = []

    if (category) {
        queryStr += `WHERE category = $2`
        queryValues.push(category)
    }
    queryStr += `ORDER BY ${sort_by} ${order}`

    return db.query(queryStr, queryValues)



    .then((result) =>{
        //console.log(result.rows)
        return result.rows
    })
    
}