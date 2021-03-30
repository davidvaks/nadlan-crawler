const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

exports.yad2Scrape = async (url) => {
    const response = await fetchData(url);
    const $ = cheerio.load(response.data);

    let feedItemList = [];

    const maybeRobotCaptcha = $('div[class="captcha-wrapper"]').html();

    if (!maybeRobotCaptcha) {
        $('.feed_item').each((index, element) => {

            const feedItemHtml = $(element).html();
            const $$ = cheerio.load(feedItemHtml);

            const id = $(`#feed_item_${index}`).attr('item-id');
            const image = $$(`#image_${index}`).find('img').attr('src');
            const title = $$(`#feed_item_${index}_title`).find('span').text().trim();
            const rooms = $$(`#data_rooms_${index}`).text();
            const floors = $$(`#data_floor_${index}`).text();
            const price = $$(`#feed_item_${index}_price`).text().trim();
            const ghostPrice = $$(`#feed_item_${index}_ghost_price`).text().trim();
            const lastUpdate = $$(`#feed_item_${index}_date`).text().trim();

            const item = {
                id,
                image: image.includes('placeholder') ? null : image,
                title,
                rooms,
                floors,
                price,
                ghostPrice,
                lastUpdate
            };

            feedItemList.push(item);
        });

        return {
            url,
            captcha: false,
            items: feedItemList
        };
    } else {
        return {
            url,
            captcha: true,
            items: []
        }
    }
};

async function fetchData(url) {
    console.log(`Crawling data for url ${url}...`);
    // make http call to url
    let response = await axios
        .get(url, {
            headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'}
        })
        .catch(
            (err) => console.log(err));

    if (response.status !== 200) {
        console.log("Error occurred while fetching data");
        return;
    }

    return response;
}