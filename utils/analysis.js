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

/**
 * Returns an Array of Objects with date and priceChangePercentage properties
 * ordered in descending order by priceChangePercentages
 * @param {Map} data A Map with date strings as keys, and Objects with at least volume, 
 * high and low properties as values.
 */
const bestOpeningPriceSMA5 = function(data) {
  let result = [];
  let sma5Prices = [];
  let sma5;
  let change;
  data.forEach((value, key) => {
    // Initialize SMA 5 before starting analysis
    if (sma5Prices.length !== 5) {
      sma5Prices.push(value.close);
    } else {
      // Start analysis when SMA5 can be calculated
      sma5 = sma(sma5Prices);
      change = (value.open - sma5) / sma5 * 100;
      result.push({
        date: key,
        // To remove rounding errors from, toFixed to 4 decimals and convert back to number with parseFloat
        priceChangePercentage: parseFloat(change.toFixed(4))
      })
    }
  })
  // Sort to descending order by priceChangePercentage
  result.sort((date1, date2) => date2.priceChangePercentage - date1.priceChangePercentage);
  return result;
}

/**
 * Returns the average of the numbers in the array
 * @param {Array} openingPrices Array of opening prices in number format from n number of days
 */
const sma = function(openingPrices) {
  const sum = openingPrices.reduce((price1, price2) => price1 + price2);
  const avg =  sum/openingPrices.length;
  return avg;
}

module.exports = { longestBullishTrend, descendingVolumeAndPriceChange, bestOpeningPriceSMA5, sma };