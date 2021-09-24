const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest')
const app = require('../app')

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET/api/categories', () => {
    test('200: responds with an array of categories', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then((res) => {
            //console.log(res.body)
            expect(res.body.categories).toHaveLength(4)
        }) 
    }); 

});
describe('GET/api/reviews/:review_id', () => {
    test('200: responds with a review as requested', () => {
        const review_id = 1
        return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(200)
        .then((res) =>{
            //console.log(res.body.review)
            expect(res.body.review).toEqual({
                review_id: 1,
                title: 'Agricola',
                review_body: 'Farmyard fun!',
                designer: 'Uwe Rosenberg',
                review_image_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                votes: 1,
                category: 'euro game',
                owner: 'mallionaire',
                created_at: '2021-01-18T10:00:20.514Z',
                comment_count: "0"
            })
        })  
    });
    test('404: for invalid review_id value ', () => {
        const review_id = 3456
        return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(404)
        .then((res) =>{
            expect(res.body.msg).toBe("No review found matching 3456")
        })
    });  
});
describe('PATCH/api/reviews/:review_id', () => {
    test('201: responds by updating the reviews then return the updated review', () => {
        const review_id = 2
        const newVote =1
        return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send({inc_votes: newVote})
        .expect(201)
        .then((res) =>{
            //console.log(res.body)
            expect(res.body.updatedReview.votes).toBe(6)
        }) 
    });
    test('404: for invalid review_id value ', () => {
        const review_id = 3456
        return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(404)
        .then((res) =>{
            expect(res.body.msg).toBe("No review found matching 3456")
        })
    });  
    
});
describe('get/api/reviews/:review_id/comments', () => {
    test('200: responds with array of comments by review_id', () => {
        const review_id = 3
        return request(app)
        .get(`/api/reviews/${review_id}/comments`)
        .expect(200)
        .then((res) =>{
            expect(res.body.comments).toHaveLength(3)
        })
    });
    test('404: for invalid review_id value ', () => {
        const review_id = 9090
        return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(404)
        .then((res) =>{
            expect(res.body.msg).toBe("No review found matching 9090")
        })
    });  
    
});
describe('/api/reviews', () => {
    test('200: Should return an array of reviews, which can accept queries', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then((res)=>{
            expect(res.body.reviews).toHaveLength(13)

        //     res.body.reviews.forEach((review) =>{
        //         expect(review).toMatchObject(
        //             {
        //                 review_id: expect.any(Number),
        //                 title: expect.any(String),
        //                 review_body: expect.any(String),
        //                 designer: expect.any(String),
        //                 review_image_url: expect.any(String),
        //                 votes: expect.any(Number),
        //                 category: expect.any(String),
        //                 owner: expect.any(String),
        //                created_at: expect.any(Date), <>TIMSTAMP?<>
        //                 comment_count: expect.any(String)
        //               }
        //        ) 
        // })
    })  
})
})
describe('/api/reviews/:review_id/comments', () => {
    test('201: creates new comment and returns the comment', () => {
        const username = "mallionaire"
        const body = "This game slaps!"
        const review_id = 2
        return request(app)
        .post(`/api/reviews/${review_id}/comments`)
        .send({username: username,
               body: body})
        .expect(201)
        .then((res) =>{
            expect(res.body.madeComment).toBe("This game slaps!")
        })
    });
    test('404: for invalid review_id value ', () => {
        const review_id = 6969
        return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(404)
        .then((res) =>{
            expect(res.body.msg).toBe("No review found matching 6969")
        })
    });  
    
});
describe('/api', () => {
    test('200: returns an object with the list of endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((res) =>{
            //console.log(res.body, "><><><><>")
            expect(res.body).toEqual({
                categoriesList: '/api/categories',
                reviewById: '/api/reviews/:review_id',
                updateReview: '/api/reviews/:review_id',
                allReviews: '/api/reviews',
                commentsFromReview: '/api/reviews/:review_id/comments',
                postComment: '/api/reviews/:review_id/comments'
              })
        })
        
    });
    
});
describe('ANY/invalid url path', () => {
    test('404: invalid/non-existant URl given', () => {
        return request(app)

        .get('/api/walrus')
        .expect(404)
        .then((res) => {
            expect(res.body.msg).toBe('Invalid URL')
        })
        
    });
    
});