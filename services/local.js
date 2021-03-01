const { readFile } = require('fs').promises;
const path = require('path');

/**
 * reads in a CSV file and returns it in a String
 * @param {String} fileName 
 */
exports.readCSV = async function(fileName) {
  const filePath = path.join(__dirname, '..', 'files', fileName);
  const data =  await readFile(filePath, 'utf8');
  return data;
}
