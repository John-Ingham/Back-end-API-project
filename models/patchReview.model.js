const db = require('../db/connection')

exports.patchReview = (newVote, review_id) =>{
    return db.query(`UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING*;`, [newVote, review_id])
    .then((result) => {
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