const { 
  parseCSVtoArray,
  parseCSVtoMap,
} = require('../utils/csv')
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