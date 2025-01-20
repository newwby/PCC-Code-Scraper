const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// pre-flight
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.status(200).send('');
});

// standard behaviour
app.get('/', (req, res) => {
  const postcode = req.query.postcode;
  if (postcode) {
    res.status(200).send(`Thanks for querying ${postcode}, ON THE DEV BRANCH!, but I don't know what to do with that yet.`);
  } else {
    res.status(400).send('Welcome, your app is working well, but you forgot to include a postcode.');
  }
});

// Set CORS headers for GET requests as well
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
