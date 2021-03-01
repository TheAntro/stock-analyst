/**
 * Parses CSV from String to an array of arrays
 * @param {String} csv Content of a CSV file as a String
 */
exports.toArray = function(csv) {
  //Split csv String into an array of lines
  let lines = csv.split(/\r\n|\n/);

  // Create a result array and set its 0 index to be the headers array
  let result = [];
  let headers = lines[0].split(',');
  result.push(headers);

  // Remove headers (first line) from lines
  lines.shift();

  // Split rest of the csv file lines into arrays and push them into result
  lines.forEach(line => {
    lineArray = line.split(',');
    result.push(lineArray);
  });

  return result;
}

/**
 * Parses CSV from String to a Map of date strings as keys and stock data from the date in an object as values
 * @param {String} csv Content of a CSV file as a String
 */
exports.toMap = function(csv) {
  let lines = csv.split(/\r\n|\n/);
  let result = new Map();

  // Add data to Map with date as key and rest of the data as properties of an object as value
  lines.forEach(line => {
    lineArray = line.split(',');
    // Assuming the MM/DD/YYYY syntax from Nasdaq's csv files, omit header and empty rows
    if (lineArray[0].length === 10) {
      let date = new Date(lineArray[0]);
      // Specify the format to allow slicing through matching with similarly formatted date strings
      result.set(date.toDateString(), {
        close: lineArray[1],
        volume: lineArray[2],
        open: lineArray[3],
        high: lineArray[4],
        low: lineArray[5]
      });
    }
  });
  return result;
}