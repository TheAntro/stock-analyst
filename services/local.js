const fs = require('fs');
const path = require('path');
const util = require('util');

// Make a Promise version of readFile to use async/await syntax
const readFile = util.promisify(fs.readFile);

/**
 * reads in a CSV file and returns it in a String
 * @param {String} fileName 
 */
exports.readCSV = async function(fileName) {
  const filePath = path.join(__dirname, '..', 'files', fileName);
  const data =  await readFile(filePath, 'utf8');
  return data;
}
