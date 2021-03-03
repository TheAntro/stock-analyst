const chai = require('chai');
const expect = chai.expect;
const analysis = require('../../utils/analysis');

const data = new Map([
  ['Thu Feb 18 2021', {
    close: 129.71,
    volume: 158273000,
    open: 129.2,
    high: 129.995,
    low: 127.41
  }],
  ['Fri Feb 19 2021', {
    close: 129.87,
    volume: 87668830,
    open: 130.24,
    high: 130.71,
    low: 128.8
  }],
  ['Mon Feb 22 2021', {
    close: 126,
    volume: 103916400,
    open: 128.01,
    high: 129.72,
    low: 125.6
  }],
  ['Tue Feb 23 2021', {
    close: 125.86,
    volume: 158273000,
    open: 123.76,
    high: 126.71,
    low: 118.39
  }],
  ['Wed Feb 24 2021', {
    close: 125.35,
    volume: 111039900,
    open: 124.94,
    high: 125.56,
    low: 122.23
  }]
]);

describe('Analysis utils', function() {
  describe('longestBullishRun', function() {

    it('should output max amount of days stock price was increasing in a row in the data', function() {
      const result = analysis.longestBullishTrend(data);
      expect(result).to.equal(1);
    })

    it('should return a number', function() {
      const result = analysis.longestBullishTrend(data);
      expect(result).to.be.a('number');
    })
  })

  describe('descendingVolumeAndPriceChange', function() {

    it('should return an Array', function() {
      const result = analysis.descendingVolumeAndPriceChange(data);
      expect(result).to.be.a('array');
    })

    it('the Array should contain objects', function() {
      const result = analysis.descendingVolumeAndPriceChange(data);
      expect(result[0]).to.be.a('object');
    })

    it('the objects should have date, volume, and priceChange properties', function() {
      const result = analysis.descendingVolumeAndPriceChange(data);
      expect(result[0].hasOwnProperty('date')).to.equal(true);
      expect(result[0].hasOwnProperty('volume')).to.equal(true);
      expect(result[0].hasOwnProperty('priceChange')).to.equal(true);
    })

    it('should return the list in descending order by volume first, price change second', function() {
      const result = analysis.descendingVolumeAndPriceChange(data);
      let previous = {};
      result.forEach(date => {
        if (previous.date) {
          expect(date.volume <= previous.volume).to.equal(true);
          if (date.volume === previous.volume) {
            expect(date.priceChange <= previous.priceChange);
          }
        }
        previous = Object.assign({}, date);
      });
    })
  })
})