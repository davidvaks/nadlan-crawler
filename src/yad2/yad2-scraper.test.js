const {yad2Scrape} = require('./yad2-scraper');
const fs = require('fs');
const {expectedDigest} = require('./test-assets/yad2-expected-digest');

const axios = require('axios');

jest.mock('axios');

describe('yad2 scraper', () => {

    const url = "http://www.yad2.co.il";
    const searchResultsData = fs.readFileSync(__dirname + '/test-assets/yad2-data.txt', 'utf-8');
    const captchaPageData = fs.readFileSync(__dirname + '/test-assets/yad2-captcha.txt', 'utf-8');

    const givenYad2SuccessResponseWith = (data) => {
        const response = {
            status: 200,
            data
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(response));
    };

    it('scrape items from page and return digested data', async () => {
        givenYad2SuccessResponseWith(searchResultsData);

        const result = await yad2Scrape(url);

        console.log(result);

        expect(result.items).toEqual(expect.arrayContaining(expectedDigest.items));
    });

    it('detect robot captcha protection and return empty result set', async () => {
        givenYad2SuccessResponseWith(captchaPageData);

        const result = await yad2Scrape(url);

        expect(result).toEqual({
            captcha: true,
            items: []
        });
    });
});