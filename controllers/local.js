const path = require('path');
const csv = require('../utils/csv');
const analysis = require('../utils/analysis');
const { readCSV } = require('../services/local');

// @desc returns all data from a stored csv file as JSON
// @route GET /api/local/:fileName
// @access Public
exports.getAllData = async (req, res, next) => {
  try {
    const csvData = await readCSV(req.params.filename);
    const data = csv.toMap(csvData);
    // Convert data to Object as Map does not directly work with JSON
    res.status(200).json(Object.fromEntries(data));
  } catch (err) {
    next(err);
  }
}

// @desc returns longest bullish trend between specified dates
// @route GET /api/local/bull/:filename/:from/:to
// @access Public
exports.longestBullBetweenDates = async (req, res, next) => {
  // Destructure request parameters
  let { filename, from, to } = req.params;
  try {
    const csvData = await readCSV(filename);
    // parse data to a date ranged Map with a pre-buffer of one stock day to facilitate analysis
    const dataBetweenDates = csv.toDateRangedMap(csvData, from, to, 1);
    if (dataBetweenDates.size == 0) {
      res.status(404).json({
        success: false,
        message: 'The provided date range is at least partly outside ' +
                 'of the content of the provided csv file, or there is ' +
                 'not enough data before the starting date to complete analysis,' +
                 'or the provided starting date is after the provided ending date of the analysis'
      })
    } else {
      // run analysis function to get result
      const longestBullTrend = analysis.longestBullishTrend(dataBetweenDates);
      const message = `In ${path.parse(filename).name} stock historical data the Close/Last price increased ${longestBullTrend} days in a row between ${from} and ${to}`;
      res.status(200).json({
        success: true,
        message: message,
        data: longestBullTrend
      });
    }
  } catch (err) {
    next(err);
  }
}

// @desc returns list of dates, volumes, and price changes, ordered by volume first, price change second
// @route GET /api/local/sort/:filename/:from/:to
// @access Public
exports.descendingVolumeAndPriceChange = async (req, res, next) => {
  let { filename, from, to } = req.params;
  try {
    const csvData = await readCSV(filename);
    const dataBetweenDates = csv.toDateRangedMap(csvData, from, to);
    if (dataBetweenDates.size == 0) {
      res.status(404).json({
        success: false,
        message: 'The provided date range is at least partly outside ' +
                 'of the content of the provided csv file, or there is ' +
                 'not enough data before the starting date to complete analysis,' +
                 'or the provided starting date is after the provided ending date of the analysis'
      })
    } else {
      const orderedData = analysis.descendingVolumeAndPriceChange(dataBetweenDates);
      res.status(200).json({
        success: true,
        data: orderedData
      });
    }
  } catch (err) {
    next(err);
  }
}

// @desc returns list of dates and price change percentages between opening price and the SMA 5 price of the day, ordered by percentage change
// @route GET /api/local/sma5/:filename/:from/:to
// @access Public
exports.bestOpeningPrice = async (req, res, next) => {
  let { filename, from, to } = req.params;
  try {
    const csvData = await readCSV(filename);
    // parse to Map with a buffer of 5 days to get the SMA 5 for the first day in date range.
    const dataBetweenDates = csv.toDateRangedMap(csvData, from, to, 5);
    if (dataBetweenDates.size == 0) {
      res.status(404).json({
        success: false,
        message: 'The provided date range is at least partly outside ' +
                 'of the content of the provided csv file, or there is ' +
                 'not enough data before the starting date to complete analysis, ' +
                 'or the provided starting date is after the provided ending date of the analysis'
      })
    } else {
      const bestOpeningPrices = analysis.bestOpeningPriceSMA5(dataBetweenDates);
      res.status(200).json({
        success: true,
        data: bestOpeningPrices
      })
  }
  } catch (err) {
    next(err);
  }
}


