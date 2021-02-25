const axios = require('axios');

// @desc Gets historical stock data from Nasdaq API
// @route /api/nasdaq/:stockTicker/:from/:to
// @access Public
exports.getNasdaqData = async (req, res) => {
  // Destructure request parameters
  const { stockTicker, from, to } = req.params;
  // Configure axios request
  const request_config = {
    url: `https://www.nasdaq.com/api/v1/historical/${stockTicker}/stocks/${from}/${to}`,
    headers: {
      'Accept-Encoding': 'deflate',
      'Connection': 'keep-alive',
      'User-Agent': 'Script'
    },
    timeout: 10000
  };
  console.log(request_config.url);
  // Send axios request and handle response
  try {
    const response = await axios(request_config);
    const stock_data = response.data;
    res.send(stock_data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
}