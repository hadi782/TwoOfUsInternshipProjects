const express = require('express');
const ShortId = require('shortid');
const cors = require('cors');
const app = express();
app.use(express.json());
const PORT = 3000;

const urlMap = new Map();
app.use(cors());

app.post('/shorten', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'A valid URL is not found' });
  }

  const shortId = ShortId.generate();
  urlMap.set(shortId, url);

  res.json({ shortId, shortUrl: `http://localhost:${PORT}/${shortId}` });
});

app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const url = urlMap.get(shortId);

  if (url) {
    res.redirect(url);
  } else {
    res.status(404).send('URL is not found');
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
});
