const express = require('express');
const app = express();
const PORT = 4000;
const scraper = require('./scraper_puppeteer.js');
const parser = require('./parser.js');

// handling for legacy
app.get('/home', async (req, res) => {
  res.redirect('/?' + new URLSearchParams(req.query).toString());
});

app.get('/', async (req, res) => {
  const postcode = req.query.postcode
  if (postcode) {
    res.status(400).send('Due to a deployment error with Chromium functionality is temporarily suspended - please check back again soon!');
    // Temporary disabled functionality
    /*
    const pcc_code_output = await scraper.get_code(postcode, true)
    const parsed_output = parser.parseScraperOutput(pcc_code_output)
    res.status(200).send(`${parsed_output}`);
    */
  } else {
    res.status(400).send('Welcome, your app is working well, but you forgot to include a postcode.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;