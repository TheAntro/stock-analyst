const { performance } = require('perf_hooks');
const { parseCSVtoMap } = require('../utils/csv');
const { datesSlice } = require('../utils/dates');
const { readCSV } = require('../services/local');

// @desc returns all data from a stored csv file as JSON
// @route GET /api/local/:fileName
// @access Public
exports.getAllData = async (req, res, next) => {
  try {
    const csv = await readCSV(req.params.fileName);
    const parsedCSVMap = parseCSVtoMap(csv);
    const parsedCSVMapAsObj = Object.fromEntries(parsedCSVMap);
    res.status(200).json(parsedCSVMapAsObj);
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
    const csv = await readCSV(fileName); // This takes 9% of execution time
    const parsedCSVMap = parseCSVtoMap(csv); //This takes 90%
    const dataBetweenDates = datesSlice(parsedCSVMap, from, to); // Rest takes <1%
    const dataBetweenDatesAsObj = Object.fromEntries(dataBetweenDates);
    res.status(200).json(dataBetweenDatesAsObj);
  } catch (err) {
    next(err);
  }
}
