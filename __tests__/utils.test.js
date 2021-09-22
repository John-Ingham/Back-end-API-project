

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
    
});