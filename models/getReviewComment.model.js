const db = require('../db/connection')
function checkReviewIDExists(review_id) {
    return db.query(
        `SELECT * FROM reviews
         WHERE review_id = $1`, [review_id] )
    .then((result) =>{
        
        const checkedReview = result.rows
        if (checkedReview.length === 0){
            
            return Promise.reject({
                status: 404,
                msg: `No review found matching ${review_id}`})
        }
     })
}

exports.getComment = (review_id) =>{
    

    return db.query(`SELECT * FROM comments
    WHERE review_id = $1;`,[review_id])
    .then (async(result) =>{
        const review = result.rows
        
    
        if (review.length === 0 ){
            await checkReviewIDExists(review_id)
        } return result.rows
        
          
    })
   
}
