const db = require('../db/connection')

exports.makeComment = (username, review_id, body) =>{
    
    return db.query(`
    INSERT INTO comments
    (author, review_id, votes, created_at, body)
    VALUES
    ($1, $2, null , null , $3)
    RETURNING *;`, [username, review_id, body])
    .then((result) =>{
        //console.log(result.rows[0].body)
        return result.rows[0].body
    })
}