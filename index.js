const express = require('express');
const app = express();
const PORT = 4000;
const { printhello } = require('./scraper.js');
const scraper = require('./scraper.js');

app.get('/', async (req, res) => {
  const postcode = req.query.postcode
  if (postcode) {
    res.status(200).send(`Thanks for querying ${postcode}, ON THE DEV BRANCH!!, but I don't know what to do with that yet.`);
    const pcc_code_output = await scraper.get_code(postcode)
    console.log(`output for scraper is: ${pcc_code_output}`)
  } else {
    res.status(400).send('Welcome, your app is working well, but you forgot to include a postcode.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;