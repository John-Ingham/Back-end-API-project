const { request } = require('express')
const db = require('../db/connection')

exports.makeComment = (username, review_id, body) =>{
    
    if(!username || !body){
        return Promise.reject({
                       status: 400,
                       msg: `Incomplete input`})
            
    }
    return db.query(`
    INSERT INTO comments
    (author, review_id, votes, created_at, body)
    VALUES
    ($1, $2, null , null , $3)
    RETURNING *;`, [username, review_id, body])
    .then((result) =>{
        const review = result.rows[0]
        if (!review) {
        return Promise.reject({
                status: 404,
                msg: `No review found matching ${review_id}`
            })
        }
       
        return result.rows[0].body
    })
}

// Original version for reference