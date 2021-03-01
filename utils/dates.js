/**
 * Creates an Array of Dates between from and to, supplied as Strings.
 * @param {String} from 
 * @param {String} to 
 */
function dateRange(from, to) {
  // Use Dates to avoid keeping track of month lengths etc. during iteration
  let startDate = new Date(from);
  let endDate = new Date(to);

  let dates = [startDate];
  let date = new Date(startDate);
  while (date < endDate) {
    date.setDate(date.getDate() + 1);
    let tmpDate = new Date(date)
    // Turn Dates into strings to allow matching with Map keys or Object properties
    let stringDate = tmpDate.toDateString();
    dates.push(stringDate);
  }
  return dates
}

/**
 * 
 * @param {Map} data 
 * @param {String} from 
 * @param {String} to 
 */
exports.datesSlice = function(data, from, to) {
  let dates = dateRange(from, to);
  let slice = new Map();
  dates.forEach(date => {
    if (data.has(date)) {
      slice.set(date, data.get(date));
    }
  })
  return slice;
}