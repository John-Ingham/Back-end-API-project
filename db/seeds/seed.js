const db = require('../connection.js')
//const {categoryData, commentData, reviewData, userData} = require('../data/development-data/index')
const format = require('pg-format');
const { formatUserData, formatCategoryData, formatReviewData, formatCommentsData } = require('../utils/data-manipulation.js');

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
   const dropTables = async () => {
     await db.query(`DROP TABLE IF EXISTS comments;`)
     await db.query(`DROP TABLE IF EXISTS reviews;`)
     await db.query(`DROP TABLE IF EXISTS categories;`)
     await db.query(`DROP TABLE IF EXISTS users;`)
  //console.log("Tables dropped")
   }
  await dropTables()
  

  
   return db.query(`CREATE TABLE categories (
   slug VARCHAR (500) PRIMARY KEY NOT NULL,
   description VARCHAR (500) NOT NULL
);`)

.then(() => {
  return db
  .query(`
  CREATE TABLE users (
    username VARCHAR (500) PRIMARY KEY NOT NULL,
    avatar_url VARCHAR (500),
    name VARCHAR (500) NOT NULL
  )`)
})

.then(() => {
  return db
    .query(`
    CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title VARCHAR (500) NOT NULL,
    review_body VARCHAR (1000) NOT NULL,
    designer VARCHAR (500) NOT NULL,
    review_image_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INT DEFAULT 0,
    category VARCHAR (500),
    owner VARCHAR (500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner) REFERENCES users(username),
    FOREIGN KEY (category) REFERENCES categories(slug)
    );`)
  })

  .then(() => {
    return db
    .query(`
      CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR (500) REFERENCES users(username),
      review_id INT REFERENCES reviews(review_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body VARCHAR (500) NOT NULL
    );`)
  })
  
  // 2. insert data
  .then(()=> {
    const formattedUserData = formatUserData(userData)
    const shopInsertion = format(
      `INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *;`,
      formattedUserData
    )
    return db.query(shopInsertion)
  })
  .then(() =>{
    const formattedCategoryData = formatCategoryData(categoryData)
    const categoryInsertion = format(
      `INSERT INTO categories (slug, description) VALUES %L RETURNING *;`,
      formattedCategoryData
    )
    return db.query(categoryInsertion)
  })
  .then (() => {
    const formattedReviewData = formatReviewData(reviewData)
    
    const reviewInsertion =format(
      `INSERT INTO reviews (title, review_body, designer, review_image_url, votes, category, owner, created_at) VALUES %L RETURNING *;`,
      formattedReviewData
    )
    return db.query(reviewInsertion)
  })
  .then(() => {
    const formattedCommentData = formatCommentsData(commentData)
    const commentInsertion = format(
      `INSERT INTO comments (author, review_id, votes, created_at, body) VALUES %L RETURNING *;`,
      formattedCommentData
    )
    return db.query(commentInsertion)
  })

} 




module.exports = seed;
