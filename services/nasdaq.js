const axios = require('axios');

/**
 * Requests data from Nasdaq API and returns it as a String in csv format
 * @param {String} stockTicker ticker symbol of the stock for which hsitorical data is requested
 * @param {String} from starting date for historical data, in format YYYY-MM-DD
 * @param {String} to ending date for historical data, in format YYYY-MM-DD
 */
exports.requestDataFromNasdaq = async (stockTicker, from, to) => {
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
  // Send axios request and pass data or an error to the caller
  try {
    const response = await axios(request_config);
    const stock_data = response.data;
    return stock_data;
  } catch (err) {
    throw err;
  }
}