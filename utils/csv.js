const fs = require('fs');
const path = require('path');

/**
 * reads a CSV file and returns it in a String
 * @param {String} fileURI 
 */
exports.readCSV = function(fileURI) {
  const filePath = path.join(__dirname, '..', fileURI);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}

/**
 * Parses CSV from String to an array of arrays
 * @param {String} csv Content of a CSV file as a String
 */
exports.parseCSV = function(csv) {
  //Split csv String into an array of lines
  let lines = csv.split(/\r\n|\n/);

  // Create a result array and set its 0 index to be the headers array
  let result = [];
  let headers = lines[0].split(',');
  result.push(headers);

  // Remove headers (first line) from lines
  lines.shift();

  // Split rest of the csv file lines into arrays and push them into result
  let lineArray = [];
  lines.forEach(line => {
    let lineArray = line.split(',');
    result.push(lineArray);
  })

  return result;
}