const db = require('../db/connection')

exports.getComment = (review_id) =>{
    return db.query(`SELECT * FROM comments
    WHERE review_id = $1;`,[review_id])
    .then((result) =>{
        //console.log(result.rows)
        return result.rows
    })
}