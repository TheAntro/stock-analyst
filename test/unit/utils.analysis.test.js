const chai = require('chai');
const expect = chai.expect;
const analysis = require('../../utils/analysis');

const data = new Map([
  ['Wed Feb 10 2021', {
    close: 135.39,
    volume: 73046560,
    open: 136.48,
    high: 136.99,
    low: 134.4
  }],
  ['Thu Feb 11 2021', {
    close: 135.13,
    volume: 64280030,
    open: 135.9,
    high: 136.39,
    low: 133.77
  }],
  ['Fri Feb 12 2021', {
    close: 135.37,
    volume: 60145130,
    open: 134.35,
    high: 135.53,
    low: 133.6921
  }],
  ['Tue Feb 16 2021', {
    close: 133.19,
    volume: 80576320,
    open: 135.49,
    high: 136.01,
    low: 132.79
  }],
  ['Wed Feb 17 2021', {
    close: 130.84,
    volume: 98085250,
    open: 131.25,
    high: 132.22,
    low: 129.47
  }],
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
    });

    it('should return a number', function() {
      const result = analysis.longestBullishTrend(data);
      expect(result).to.be.a('number');
    });
  });

  describe('descendingVolumeAndPriceChange', function() {

    it('should return an Array', function() {
      const result = analysis.descendingVolumeAndPriceChange(data);
      expect(result).to.be.a('array');
    });

    it('the Array should contain objects', function() {
      const result = analysis.descendingVolumeAndPriceChange(data);
      expect(result[0]).to.be.a('object');
    });

    it('the objects should have date, volume, and priceChange properties', function() {
      const result = analysis.descendingVolumeAndPriceChange(data);
      expect(result[0].hasOwnProperty('date')).to.equal(true);
      expect(result[0].hasOwnProperty('volume')).to.equal(true);
      expect(result[0].hasOwnProperty('priceChange')).to.equal(true);
    });

    it('should return the list in descending order by volume first, price change second', function() {
      const result = analysis.descendingVolumeAndPriceChange(data);
      let previous = {};
      result.forEach(date => {
        if (previous.date) {
          expect(date.volume <= previous.volume).to.equal(true);
          if (date.volume === previous.volume) {
            expect(date.priceChange <= previous.priceChange).to.equal(true);
          }
        }
        previous = Object.assign({}, date);
      });
    });

    it('should accurately analyse price changes', function() {
      const result = analysis.descendingVolumeAndPriceChange(data);
      const date = result[0];
      expect(date.priceChange).to.equal(8.32);
    })
  });

  describe('bestOpeningPriceSMA5', function() {
    
    it('should return an Array', function() {
      const result = analysis.bestOpeningPriceSMA5(data);
      expect(result).to.be.a('array');
    });

    it('the Array should contain objects', function() {
      const result = analysis.bestOpeningPriceSMA5(data);
      expect(result[0]).to.be.a('object');
    });

    it('the objects should have date and priceChangePercentage properties', function() {
      const result = analysis.bestOpeningPriceSMA5(data);
      expect(result[0].hasOwnProperty('date')).to.equal(true);
      expect(result[0].hasOwnProperty('priceChangePercentage')).to.equal(true);
    });

    it('should return the list in descending order by priceChangePercentage', function() {
      const result = analysis.bestOpeningPriceSMA5(data);
      let previous = {};
      result.forEach(date => {
        if (previous.date) {
          expect(date.priceChangePercentage <= previous.priceChangePercentage).to.equal(true);
        }
        previous = Object.assign({}, date);
      });
    });

    it('should accurately analyse price change percentages', function() {
      const result = analysis.bestOpeningPriceSMA5(data);
      expect(result[0].date).to.equal('Fri Feb 19 2021');
      expect(result[0].priceChangePercentage).to.equal(-1.9631);
    })

  });

  describe('sma', function() {
    it('should return the average of an array of numbers', function() {
      const testArray1 = [1,2,3];
      const testArray2 = [1,2,3,4,5];
      const result1 = analysis.sma(testArray1);
      const result2 = analysis.sma(testArray2);
      expect(result1).to.equal(2);
      expect(result2).to.equal(3);
    });
  });
});