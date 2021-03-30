const {yad2urls} = require('../urls');
const {yad2Scrape} = require('../yad2/yad2-scraper');

exports.scrapeAll = async () => {
    const allResponses = await Promise.all(yad2urls.map(async url => yad2Scrape(url)));
    return {
        responses: allResponses
    };
};