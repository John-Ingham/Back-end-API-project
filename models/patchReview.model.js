const db = require('../db/connection')

exports.patchReview = (newVote, review_id) =>{
    return db.query(`UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING*;`, [newVote, review_id])
    .then((result) => {
        
        return result.rows[0]
    })
                  
}