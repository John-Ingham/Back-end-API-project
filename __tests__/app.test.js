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
            
            expect(res.body.categories).toHaveLength(4)
            
            res.body.categories.forEach((category) =>{
                expect(category.length).not.toBe(0)
                expect(category).toMatchObject(
                    {slug: expect.any(String),
                     description: expect.any(String)}
                )
            }) 
    }); 

});
})
describe('GET/api/reviews/:review_id', () => {
    test('200: responds with a review as requested', () => {
        const review_id = 1
        return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(200)
        .then((res) =>{
        
            expect(res.body.review).toEqual({
                review_id: 1,
                title: 'Agricola',
                review_body: 'Farmyard fun!',
                designer: 'Uwe Rosenberg',
                review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
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
    test('400; Bad request for invalid review_id - not an integer', () => {
        const review_id = "not-an-id"
        return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(400)
        .then((res) =>{
            expect(res.body.msg).toBe("Bad request")
        
    });
    }) 
});
describe('PATCH/api/reviews/:review_id', () => {
    test('200: responds by updating the reviews then return the updated review', () => {
        const review_id = 2
        const newVote =1
        return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send({inc_votes: newVote})
        .expect(200)
        .then((res) =>{
             
            expect(res.body.updatedReview.votes).toBe(6)

                expect(res.body.updatedReview.length).not.toBe(0)
                expect(res.body.updatedReview).toMatchObject(
                    {review_id: 2,
                        title: 'Jenga',
                        review_body: 'Fiddly fun for all the family',
                        designer: 'Leslie Scott',
                        review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
                        votes: 6,
                        category: 'dexterity',
                        owner: 'philippaclaire9',
                        created_at: '2021-01-18T10:01:41.251Z'
                    }
                )
             
        }) 
    });
    test('400; Bad request for invalid review_id - not an integer', () => {
        const review_id = "not-an-id"
        const newVote = 1 
        return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send({inc_votes: newVote})
        .expect(400)
        .then((res) =>{
            expect(res.body.msg).toBe("Bad request")
        
    });
    })
    test('400; Bad request for vote entry - not an integer', () => {
        const review_id = 2
        const newVote = "gibberish"
        return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send({inc_votes: newVote})
        .expect(400)
        .then((res) =>{
            expect(res.body.msg).toBe("Bad request")
        
    });
    })
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
        .get(`/api/reviews/${review_id}/comments`)
        .expect(404)
        .then((res) =>{
            expect(res.body.msg).toBe("No review found matching 9090")
        })
    }); 
    test('400; Bad request for id entry - not an integer', () => {
        const review_id ="gibberish"
        return request(app)
        .get(`/api/reviews/${review_id}/comments`)
        .expect(400)
        .then((res) =>{
            expect(res.body.msg).toBe("Bad request")
        
    });
    })
    test('200: Given a valid id with no comments returns an empty array', () => {
        const review_id = 1
        return request(app)
        .get(`/api/reviews/${review_id}/comments`)
        .expect(200)
        .then((res) =>{
            expect(res.body.comments).toHaveLength(0)
        })
    });
    
});
describe('/api/reviews', () => {
    test('200: Should return an array of review objects', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then((res)=>{
            expect(res.body.reviews).toHaveLength(13)
            expect(res.body.reviews).toBeSortedBy('created_at', {descending:true})
            res.body.reviews.forEach((review) =>{
                expect(review.length).not.toBe(0)
                expect(review).toMatchObject(
                    {
                        review_id: expect.any(Number),
                        title: expect.any(String),
                        designer: expect.any(String),
                        review_img_url: expect.any(String),
                        votes: expect.any(Number),
                        category: expect.any(String),
                        owner: expect.any(String),
                       created_at: expect.any(String),
                        comment_count: expect.any(String)
                      }
               ) 
        })
    })  
    })
    test('200: accepts a "sort_by" query of votes', () => {
        return request(app)
        .get('/api/reviews?sort_by=votes')
        .expect(200)
        .then((res) =>{
            expect(res.body).toBeSortedBy('votes', {descending : true})
            expect(res.body.reviews[0]).toEqual(
                {
                    review_id: 12,
                    title: "Scythe; you're gonna need a bigger table!",
                    designer: 'Jamey Stegmaier',
                    review_img_url: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
                    votes: 100,
                    category: 'social deduction',
                    owner: 'mallionaire',
                    created_at: '2021-01-22T10:37:04.839Z',
                    comment_count: '0'
                  }
            )
        })
    });
    test('200: accepts a order query and returns ordered as queried', () => {
        return request(app)
        .get('/api/reviews?order=asc')
        .expect(200)
        .then((res) =>{
            expect(res.body).toBeSortedBy('created_at', {ascending:true})
        })
       
    });
    test('400: Given an incorrect sort_by will reject', () => {
        return request(app)
        .get('/api/reviews?sort_by=bananas')
        .expect(400)
        .then((res) =>{
            expect(res.body.msg).toBe("Invalid sort query")
        })
    });
    test('400: given an invalid order query will reject', () => {
        return request(app)
        .get('/api/reviews?order=nonsense')
        .expect(400)
        .then((res)=>{
            expect(res.body.msg).toBe("Invalid order query")
        })
    });
    test('200: Accepts category query', () => {
        return request(app)
        .get('/api/reviews?category=dexterity')
        .expect(200)
        .then((res) =>{
           
            expect(res.body.reviews).toHaveLength(1)
        })
        
    });
    test('404: Given an invalid category query will reject', () => {
        return request(app)
        .get('/api/reviews?category=chance')
        .expect(404)
        .then((res) =>{
            expect(res.body.msg).toBe("Category not found")
        })
    });

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
        const username = "mallionaire"
        const body = "This game slaps!"
        const review_id = 6969
        return request(app)
        .post(`/api/reviews/${review_id}/comments`)
        .send({username: username,
            body: body})
        .expect(404)
        .then((res) =>{
            expect(res.body.msg).toBe("Unable to find requested")
        })
    }); 
    test('400: Given an invalid id input', () => {
        const username = "mallionaire"
        const body = "This game slaps!"
        const review_id = "nonsense"
        return request(app)
        .post(`/api/reviews/${review_id}/comments`)
        .send({username: username,
            body: body})
        .expect(400)
        .then((res)=> {
            expect(res.body.msg).toBe("Bad request")
        })
    }); 
    test('400: Given an incomplete request, will reject', () => {
        const review_id = 2
        const body = "Well, I loved this game!"
        const username = "mallionaire"
        return request(app)
        .post(`/api/reviews/${review_id}/comments`)
        .send({
               username : username
              })
        .expect(400)
        .then((res) =>{
            expect(res.body.msg).toBe("Incomplete input")
        })

    });
});
describe('/api', () => {
    test('200: returns an object with the list of endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((res) =>{
            
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

