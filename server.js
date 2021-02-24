const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
  const request_config = {
    url: 'https://www.nasdaq.com/api/v1/historical/AAPL/stocks/2020-01-20/2021-01-20',
    headers: {
      'Accept-Encoding': 'deflate',
      'Connection': 'keep-alive'
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

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
