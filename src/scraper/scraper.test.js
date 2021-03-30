jest.mock('../yad2/yad2-scraper');
const {yad2Scrape} = require('../yad2/yad2-scraper');
const {scrapeAll} = require('./scraper');

describe('scrape all', () => {

    const scrapeResult =
        {
            captcha: false,
            items: [
                {
                    id: 't5jwcele',
                    image: 'https://img.yad2.co.il/Pic/202103/24/2_2/o/y2_1_07793_20210324100345.jpeg?l=7&c=3&w=195&h=117',
                    title: 'רחובות 4',
                    rooms: '4',
                    floors: '1',
                    price: '5,200 ₪',
                    ghostPrice: '5,200 ₪',
                    lastUpdate: 'עודכן היום'
                }
            ]
        };
    yad2Scrape.mockImplementation(url => Promise.resolve(scrapeResult));

    it('scrape yad2 urls and return', async () => {
        expect(await scrapeAll()).toEqual({
            responses: [scrapeResult]
        });
    });
})
;