const csv = require('../utils/csv');
const dates = require('../utils/dates');
const analysis = require('../utils/analysis');
const { performance } = require('perf_hooks');
const { readCSV } = require('../services/local');

// @desc returns all data from a stored csv file as JSON
// @route GET /api/local/:fileName
// @access Public
exports.getAllData = async (req, res, next) => {
  try {
    const csvData = await readCSV(req.params.fileName);
    const data = csv.toMap(csvData);
    // Convert data to Object as Map does not directly work with JSON
    res.status(200).json(Object.fromEntries(data));
  } catch (err) {
    next(err);
  }
}

// @desc returns data between specified dates
// @route GET /api/local/:fileName/:from/:to
// @access Public
exports.getDataBetweenDates = async (req, res, next) => {
  // Destructure request parameters
  const { fileName, from, to } = req.params;
  try {
    const csvData = await readCSV(fileName); // This takes 9% of execution time
    const dataBetweenDates = csv.toDateRangedMap(csvData, from, to);
    // Convert data to Object as Map does not directly work with JSON
    res.status(200).json(Object.fromEntries(dataBetweenDates));
  } catch (err) {
    next(err);
  }
}

// @desc returns longest bullish trend between specified dates
// @route GET /api/local/bull/:filename/:from/:to
// @access Public
exports.longestBullBetweenDates = async (req, res, next) => {
  // Destructure request parameters
  let { fileName, from, to } = req.params;
  try {
    const csvData = await readCSV(fileName);
    // parse data to a date ranged Map with a pre-buffer of one stock day to facilitate analysis
    const dataBetweenDates = csv.toDateRangedMap(csvData, from, to, 1n);
    // run analysis function to get result
    //console.log(Object.fromEntries(dataBetweenDates));
    const longestBullTrend = analysis.longestBullishTrend(dataBetweenDates);
    const message = `In ${fileName} stock historical data the Close/Last price increased ${longestBullTrend} days in a row between ${from} and ${to}`;
    res.status(200).json({
      success: true,
      result: message,
      check: longestBullTrend // for tests
    });
  } catch (err) {
    next(err);
  }
}


