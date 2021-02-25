const {
  readCSV,
  parseCSV
} = require('../utils/csv')

// @desc returns all data from a stored csv file as JSON
// @route GET /api/local/:fileName
// @access Public
exports.getAllData = (req, res) => {
  let csv = readCSV(req.params.fileName);
  let parsedCSV = parseCSV(csv);
  res.json(parsedCSV);
}