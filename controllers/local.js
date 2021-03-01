const csv = require('../utils/csv');
const dates = require('../utils/dates');
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
    const data = csv.toMap(csvData); //This takes 90%
    const dataBetweenDates = dates.slice(data, from, to); // Rest takes <1%
    // Convert data to Object as Map does not directly work with JSON
    res.status(200).json(Object.fromEntries(dataBetweenDates));
  } catch (err) {
    next(err);
  }
}
