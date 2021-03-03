/**
 * Returns the max amount of days a stock price was increasing in a given set of data
 * @param {Map} data stock data with dates as keys and other data within Objects as values
 */
const longestBullishTrend = function(data) {
  let longestTrend = 0;
  let currentTrend = 0;
  let lastPrice;
  data.forEach((value) => {
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

/**
 * Returns an Array of Objects with date, volume, and priceChange properties,
 * ordered in descending order by volume, and if volumes are equal, by priceChange.
 * @param {Map} data A Map with date strings as keys, and Objects with at least volume, 
 * high and low properties as values.
 */
const descendingVolumeAndPriceChange = function(data) {
  let result = [];
  data.forEach((value, key) => {
    result.push({
      date: key,
      volume: value.volume,
      // Math.abs to get the absolute value (pos/neg changes both as significant), 
      // toFixed to remove rounding errors resulting from floating point calculations (returns a string),
      // parseFloat to revert back to number for sorting.
      priceChange: parseFloat(Math.abs(value.high - value.low).toFixed(4))
    });
  })

  result.sort((date1, date2) => {
    // First sort by volume in descending order
    if (date1.volume > date2.volume) return -1;
    if (date1.volume < date2.volume) return 1;

    // If volumes were equal, sort in descending order by price change
    if (date1.priceChange > date2.priceChange) return -1;
    if (date1.priceChange < date2.priceChange) return 1;
  })
  return result;
}

const bestOpeningPriceSMA5 = function(data) {
  let result = [];
  return result;
}

module.exports = { longestBullishTrend, descendingVolumeAndPriceChange, bestOpeningPriceSMA5 };