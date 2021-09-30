// const db = require('../db/connection')
// function checkReviewIDExists(review_id) {
//     return db.query(
//     `SELECT * FROM reviews
//      WHERE review_id = $1`, [review_id] )
// .then((result) =>{
//    console.log(result)
//    const checkedReview = result.rows
//    if (checkedReview.length === 0){
       
//        return Promise.reject({
//            status: 404,
//            msg: `No review found matching ${review_id}`})
//    }
// })
// }
// exports.makeComment = (username, review_id, body) =>{
    
//     return db.query(`
//     INSERT INTO comments
//     (author, review_id, votes, created_at, body)
//     VALUES
//     ($1, $2, null , null , $3)
//     RETURNING *;`, [username, review_id, body])
//     .then(async(result) =>{
//         const review = result.rows
//         if (!review.length === 0) {
//              await checkReviewIDExists(review_id)
//         }
       
//         return result.rows
//     })
// }