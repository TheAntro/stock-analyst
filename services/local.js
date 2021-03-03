const { readFile } = require('fs').promises;
const path = require('path');

/**
 * reads in a CSV file and returns it in a String
 * @param {String} filename 
 */
exports.readCSV = async function(filename) {
  const filePath = path.join(__dirname, '..', 'files', filename);
  const data =  await readFile(filePath, 'utf8');
  return data;
}
