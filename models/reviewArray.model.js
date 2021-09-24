const db = require('../db/connection')

exports.fetchReviewArray = (sort_by = "date", category) => {
    let queryStr = `SELECT reviews.*, 
    COUNT(comment_id) AS comment_count 
    FROM reviews
    LEFT OUTER JOIN comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.review_id
    `
    let queryValues = [sort_by]

    if (category) {
        queryStr += `WHERE category = $2`
        queryValues.push(category)
    }
    queryStr += `ORDER BY $1 DESC`

    return db.query(queryStr, queryValues)



    .then((result) =>{
        //console.log(result.rows, ">>>>>>>")
        return result.rows
    })
}