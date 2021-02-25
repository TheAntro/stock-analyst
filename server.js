const express = require('express');
const axios = require('axios');
const {
  readCSV,
  parseCSV
} = require('./utils/csv')

const app = express();

app.get('/nasdaq', async (req, res) => {
  const request_config = {
    url: 'https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20',
    headers: {
      'Accept-Encoding': 'deflate',
      'Connection': 'keep-alive',
      'User-Agent': 'Script'
    },
    timeout: 10000
  };
  try {
    const response = await axios(request_config);
    const stock_data = response.data;
    res.send(stock_data);
  } catch (err) {
    console.log(err);
    res.send('Error');
  }
});

app.get('/local/:fileURI', (req, res) => {
  let csv = readCSV(req.params.fileURI);
  let parsedCSV = parseCSV(csv);
  res.json(parsedCSV);
})

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
