const express = require('express');
const { scrapeAll } = require('./scraper/scraper');
const app = express();
const port = 3000;

app.get('/scrape', async (req, res) => {
    const scrapingResult = await scrapeAll();
    res.send(JSON.stringify(scrapingResult));
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});