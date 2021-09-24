const db = require('../db/connection')

exports.getComment = (review_id) =>{
    return db.query(`SELECT * FROM comments
    WHERE review_id = $1;`,[review_id])
    .then((result) =>{
        const review = result.rows[0]
        if (!review) {
            return Promise.reject({
                status: 404,
                msg: `No review found matching ${review_id}`
            })
        }
        //console.log(result.rows)
        return result.rows
    })
}