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
describe('/api/reviews/:review_id', () => {
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
    
});