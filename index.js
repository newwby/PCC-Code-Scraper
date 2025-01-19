const express = require('express');
const app = express();
const PORT = 4000;

app.get('/home', (req, res) => {
  const postcode = req.query.postcode
  if (postcode) {
    res.status(200).json(`Welcome, your app is working well, thanks for querying ${postcode} but I don't know what to do with that yet.`);
  } else {
    res.status(400).json('Welcome, your app is working well, but you forgot to include a postcode.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;