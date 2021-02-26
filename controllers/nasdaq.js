const { requestDataFromNasdaq } = require('../services/nasdaq');

// @desc Gets historical stock data from Nasdaq API
// @route /api/nasdaq/:stockTicker/:from/:to
// @access Public
exports.getNasdaqData = async (req, res, next) => {
  // Destructure request parameters
  const { stockTicker, from, to } = req.params;
  // Get data from Nasdaq and handle response
  try {
    const stock_data = await requestDataFromNasdaq(stockTicker, from, to);
    res.status(200).send(stock_data);
  } catch (err) {
    next(err);
  }
}