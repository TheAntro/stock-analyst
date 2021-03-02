/**
 * Returns the max amount of days a stock price was increasing in a given set of data
 * @param {Map} data stock data with dates as keys and other data within Objects as values
 */
const longestBullishTrend = function(data) {
  let longestTrend = 0;
  let currentTrend = 0;
  let lastPrice;
  data.forEach((value, key) => {
    // If there was a price increase from last close to current close, increment currentTrend
    if (lastPrice && lastPrice < value.close) {
      currentTrend++;
    } else {
      // If there was no price increase, replace longestTrend with currentTrend if it was longer and reset current
      longestTrend = Math.max(longestTrend, currentTrend);
      currentTrend = 0;
    }
    lastPrice = value.close;
  })

  // If the longest trend was not cut in the data, return currentTrend, otherwise return longestTrend
  let result = Math.max(longestTrend, currentTrend);
  return result;
}

module.exports = { longestBullishTrend };