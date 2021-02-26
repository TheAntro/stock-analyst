const { parseCSVtoMap } = require('../utils/csv');
const { dateRange, sliceToDates } = require('../utils/dates');
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
    const csv = await readCSV(fileName);
    const parsedCSVMap = parseCSVtoMap(csv);
    const dataBetweenDates = sliceToDates(parsedCSVMap, from, to);
    const dataBetweenDatesObj = Object.fromEntries(dataBetweenDates);
    res.status(200).json(dataBetweenDatesObj);
  } catch (err) {
    next(err);
  }
}

exports.objBetweenDates = async (req, res, next) => {
  // Destructure request parameters
  const { fileName, from, to } = req.params;
  try {
    const csv = await readCSV(fileName);
    const parsedCSVObj = parseCSVtoObj(csv);
    const dataBetweenDates = sliceToDates(parsedCSVMap, from, to);
    const dataBetweenDatesObj = Object.fromEntries(dataBetweenDates);
    res.status(200).json(dataBetweenDatesObj);
  } catch (err) {
    next(err);
  }
}