/**
 * Returns a String in Date.toDateString() format that is delta days away from the provided date
 * @param {String} date original date as a String that can be converted to Date
 * @param {Number} delta number of days and the direction that the date should be moved
 */
const moveDate = function(date, delta) {
  let movedDate = new Date(date);
  movedDate.setDate(movedDate.getDate() + delta);
  return movedDate.toDateString();
}

/**
 * Trims data in a Map to contain a buffer of set number of stock days before the from date
 * @param {Map} data Map containing dates in toDateString() format as keys
 * @param {String} from date after the buffer as a String that can be converted to Date
 * @param {Number} buffer number of stock days the buffer should contain
 */
const trimDateBuffer = function(data, from, buffer) {
  let result = data;
  // Set start date to the day before the from date to stop iteration of buffer before it
  let startDate = new Date(from);
  startDate.setDate(startDate.getDate()-1);
  // Initialize arrays to track which dates will be kept and which will be removed from result
  let removeArray = [];
  let keepArray = [];
  // Use iterator to go through keys of the Map one by one in order
  const keyIter = result.keys();
  // Get first value for iterated date before while loop to use it in the conditional
  let iteratedDate = new Date(keyIter.next().value);
  // First push all of the dates before the actual date range in to the keepArray
  while (iteratedDate < startDate) {
    keepArray.push(iteratedDate.toDateString());
    iteratedDate = new Date(keyIter.next().value);
  }
  // Then shift (to remove the days that are before the buffer) extra buffer from keepArray to removeArray
  while (keepArray.length > buffer) {
    removeArray.push(keepArray.shift());
  }
  // Then remove all dates in the removeArray from the result Map, leaving only the wanted buffer as extra.
  removeArray.forEach(date => result.delete(date));
  return result;
}

module.exports = { moveDate, trimDateBuffer };