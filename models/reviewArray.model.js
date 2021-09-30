const db = require('../db/connection')

exports.fetchReviewArray = (sort_by = "created_at", order = "desc", category) => {
    if (!['', 'review_id', 'title', 'designer', 'votes', 'category', 'owner', 'created_at'].includes(sort_by)){
        return Promise.reject({status: 400, msg: "Invalid sort query"})
    }
    if (!['asc', 'desc'].includes(order)){
        return Promise.reject({status: 400, msg:"Invalid order query"})
    }
    let queryStr = `
    SELECT reviews.review_id, title, designer, review_img_url, reviews.votes, category, owner, reviews.created_at,
    COUNT(comment_id) AS comment_count 
    FROM reviews
    LEFT OUTER JOIN comments ON comments.review_id = reviews.review_id
    `
    let queryValues = []
    if (category) {
        if(!['euro game', 'social deduction', 'dexterity'].includes(category)){
            return Promise.reject({status: 404, msg: "Category not found"})
        }
        queryValues.push(category)
        queryStr += `WHERE category=$1`
        
    }
    queryStr += `GROUP BY reviews.review_id ORDER BY ${sort_by} ${order}`

    return db.query(queryStr, queryValues)

    .then((result) =>{       
        return result.rows
    })
    
}