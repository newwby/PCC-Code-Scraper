const express = require('express');
const app = express();
const PORT = 4000;

// handling for legacy
// app.get('/home', (req, res) => {
//   res.redirect('/?' + new URLSearchParams(req.query).toString());
// });

app.get('/home', (req, res) => {
  const postcode = req.query.postcode
  if (postcode) {
    res.status(200).json({output: `${postcode} code undefined`});
  } else {
    res.status(400).json({output: `You forgot to include a postcode!`});
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;