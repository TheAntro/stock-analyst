const chai = require('chai');
const expect = chai.expect;
const csv = require('../../utils/csv');
const csvData = require('../mockdata/csvString');

describe('CSV Utils', function() {
  
  describe('toMap', function() {
    it('should parse csv format String into a Map', function() {
      const result = csv.toMap(csvData);
      expect(result).to.be.a('map');
    });

    it('should omit headers', function() {
      const result = csv.toMap(csvData);
      expect(result.has('Date')).to.equal(false);
    })

    it('should have dates in toDateString format as keys', function() {
      const result = csv.toMap(csvData);
      let dates = ['02/24/2021', '02/23/2021', '02/22/2021', '02/19/2021', '02/18/2021']
      dates = dates.map(date => new Date(date).toDateString());
      keys = Array.from(result.keys());
      expect(dates).to.deep.equal(keys);
    });

    it('should store stock data in map values as objects', function() {
      const result = csv.toMap(csvData);
      let mapIter = result.values();
      expect(mapIter.next().value).to.be.a('object');
    })

    it('should provide numeric stock data from a date using the date in toDateString format as a key', function() {
      const result = csv.toMap(csvData);
      let date = new Date('02/24/2021').toDateString();
      const data = result.get(date);
      expect(data.close).to.equal(125.35);
      expect(data.volume).to.equal(111039900);
      expect(data.open).to.equal(124.94);
      expect(data.high).to.equal(125.56);
      expect(data.low).to.equal(122.23);
    })
  });

  describe('toDateRangedMap', function() {
    it('should parse csv format String into a Map', function() {
      const result = csv.toDateRangedMap(csvData, '02/22/2021', '02/24/2021');
      expect(result).to.be.a('map');
    });

    it('should omit headers', function() {
      const result = csv.toDateRangedMap(csvData, '02/22/2021', '02/24/2021');
      expect(result.has('Date')).to.equal(false);
    })

    it('should have dates in toDateString format as keys', function() {
      const result = csv.toDateRangedMap(csvData, '02/22/2021', '02/24/2021');
      let dates = ['02/22/2021', '02/23/2021', '02/24/2021']
      dates = dates.map(date => new Date(date).toDateString());
      keys = Array.from(result.keys());
      expect(dates).to.deep.equal(keys);
    });

    it('should store stock data in map values as objects', function() {
      const result = csv.toDateRangedMap(csvData, '02/22/2021', '02/24/2021');
      let mapIter = result.values();
      expect(mapIter.next().value).to.be.a('object');
    })

    it('should provide numeric stock data from a date using the date in toDateString format as a key', function() {
      const result = csv.toDateRangedMap(csvData, '02/22/2021', '02/24/2021');
      let date = new Date('02/24/2021').toDateString();
      const data = result.get(date);
      expect(data.close).to.equal(125.35);
      expect(data.volume).to.equal(111039900);
      expect(data.open).to.equal(124.94);
      expect(data.high).to.equal(125.56);
      expect(data.low).to.equal(122.23);
    })

    it('should not contain dates outside of the given range if no buffer is passed', function() {
      const result = csv.toDateRangedMap(csvData, '02/22/2021', '02/24/2021');
      let date = new Date('02/19/2021').toDateString();
      expect(result.has(date)).to.equal(false);
    })

    it('should have buffer amount of days extra at the beginning if buffer is passed', function() {
      const result = csv.toDateRangedMap(csvData, '02/22/2021', '02/24/2021', 2);
      let keyIter = result.keys();
      let firstDate = keyIter.next().value;
      let secondDate = keyIter.next().value;
      let thirdDate = keyIter.next().value;
      let expectedFirstDate = new Date('02/18/2021').toDateString();
      let expectedSecondDate = new Date('02/19/2021').toDateString();
      let expectedThirdDate = new Date('02/22/2021').toDateString();
      expect(firstDate).to.equal(expectedFirstDate);
      expect(secondDate).to.equal(expectedSecondDate);
      expect(thirdDate).to.equal(expectedThirdDate);
    });
  });
});