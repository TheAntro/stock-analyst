const chai = require('chai');
const expect = chai.expect;
const analysis = require('../../utils/analysis');
const data = require('../mockdata/longMap');
const shortData = require('../mockdata/shortMap');

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
    });

    it('returns empty array if there are not enough days as buffer to complete analysis', function() {
      const result = analysis.bestOpeningPriceSMA5(shortData);
      expect(result.length).to.equal(0);
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