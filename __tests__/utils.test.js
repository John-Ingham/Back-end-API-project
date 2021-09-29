

const {formatUserData, formatCategoryData, formatReviewData, formatCommentsData } = require("../db/utils/data-manipulation")

describe('formatUserData', () => {
    test('given an empty array should return []', () => {
        const input = []
        const output = formatUserData(input)
        expect(output).toEqual([])
    });
    test('Given an array of 1 user object, returns an array with 1 user array', () => {
        const input = [ {username: 'tickle122',
                         name: 'Tom Tickle',
                         avatar_url: 'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg'
                        }]
        const output = formatUserData(input)
        expect(output).toEqual([ 
                                 ['tickle122',
                                 'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
                                  'Tom Tickle'
                                 ]
                                ])
    });
    test('The mapping should not mutate the original data', () => {
        const input = [ {username: 'tickle122',
                         name: 'Tom Tickle',
                         avatar_url: 'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg'
                        }]
        const output = formatUserData(input)
        formatUserData(input)
        expect(input).toEqual([ {username: 'tickle122',
                                 name: 'Tom Tickle',
                                 avatar_url: 'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg'
                                }
                              ])
        expect(input).not.toBe(output)
        
    });
    
});
describe('formatCategoryData', () => {
    test('given an empty array should return []', () => {
        const input = []
        const output = formatCategoryData(input)
        expect(output).toEqual([])
    });
    test('Given an array of 1 category object, returns an array with 1 category array', () => {
        const input = [ {
            slug: 'deck-building',
            description:
              'Games where players construct their own deck as a main element of the gameplay'
          }]
        const output = formatCategoryData(input)
        expect(output).toEqual([ 
                                 [
                                  'deck-building',
                                  'Games where players construct their own deck as a main element of the gameplay'
                                 ]
                                ])
    });
    test('The mapping should not mutate the original data', () => {
        const input = [ {
            slug: 'deck-building',
            description:
              'Games where players construct their own deck as a main element of the gameplay'
          }]
        const output = formatCategoryData(input)
        formatCategoryData(input)
        expect(input).toEqual([ {
            slug: 'deck-building',
            description:
              'Games where players construct their own deck as a main element of the gameplay'
          }
                              ])
        expect(input).not.toBe(output)
        
    });
    
});
describe('formatReviewData', () => {
    test('given an empty array should return []', () => {
        const input = []
        const output = formatReviewData(input)
        expect(output).toEqual([])
    });
    test('Given an array of 1 review object, returns an array with 1 review array', () => {
        const input = [ {title: 'Culture a Love of Agriculture With Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'tickle122',
        review_img_url:
          'https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: 'strategy',
        created_at: new Date(1610964020514),
        votes: 1 }]
        const output = formatReviewData(input)
        expect(output).toEqual([ 
                                 ['Culture a Love of Agriculture With Agricola',
                                 "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
                                  'Uwe Rosenberg',
                                  'https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                                  1,
                                  'strategy',
                                  'tickle122',
                                   new Date(1610964020514),
                                ]
                                ])
    });
    test('The mapping should not mutate the original data', () => {
        const input = [ {title: 'Culture a Love of Agriculture With Agricola',
                         designer: 'Uwe Rosenberg',
                         owner: 'tickle122',
                         review_img_url: 'https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                         review_body:  "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
                         category: 'strategy',
                         created_at: new Date(1610964020514),
                         votes: 1 
                        }]
        const output = formatReviewData(input)
        formatReviewData(input)
        expect(input).toEqual(
            [ 
            {title: 'Culture a Love of Agriculture With Agricola',
             designer: 'Uwe Rosenberg',
             owner: 'tickle122',
             review_img_url: 'https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
             review_body: "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
             category: 'strategy',
             created_at: new Date(1610964020514),
             votes: 1 }
            ])
        expect(input).not.toBe(output)
        
    });
    
});

describe('formatCommentsData', () => {
    test('given an empty array should return []', () => {
        const input = []
        const output = formatCommentsData(input)
        expect(output).toEqual([])
    });
    test('Given an array of 1 comment object, returns an array with 1 comment array', () => {
        const input = [
         {
            body: 'I loved this game too!',
            votes: 16,
            author: 'happyamy2016',
            review_id: 2,
            created_at: new Date(1511354163389), 
         }]
        
            const output = formatCommentsData(input)
        expect(output).toEqual([ 
                                 [
                                     'happyamy2016',
                                     2,
                                     16,
                                     new Date(1511354163389), 
                                     'I loved this game too!',
                                 ]
                                ])
    });
    test('The mapping should not mutate the original data', () => {
        const input = [ {
            body: 'I loved this game too!',
            votes: 16,
            author: 'happyamy2016',
            review_id: 2,
            created_at: new Date(1511354163389), 
          }]
        const output = formatCommentsData(input)
        formatCommentsData(input)
        expect(input).toEqual([ {
            body: 'I loved this game too!',
            votes: 16,
            author: 'happyamy2016',
            review_id: 2,
            created_at: new Date(1511354163389), 
          }
                              ])
        expect(input).not.toBe(output)
        
    });
    
});