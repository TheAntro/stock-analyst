const chai = require('chai');
const { performance } = require('perf_hooks');
const expect = chai.expect;
const csv = require('../../utils/csv');

const csvData = `Date,Close/Last,Volume,Open,High,Low
02/24/2021,$125.35,111039900,$124.94,$125.56,$122.23
02/23/2021,$125.86,158273000,$123.76,$126.71,$118.39
02/22/2021,$126,103916400,$128.01,$129.72,$125.6
02/19/2021,$129.87,87668830,$130.24,$130.71,$128.8
02/18/2021,$129.71,96856750,$129.2,$129.995,$127.41`

const headers = ['date', 'close/last', 'volume', 'open', 'high', 'low'];

describe('CSV Utils', function() {
  describe('toArray', function() {
    it('should parse csv format String into an Array of Arrays', function() {
      const result = csv.toArray(csvData);
      expect(result).to.be.a('array');
      expect(result[0]).to.be.a('array');
    });

    it('should have headers stored in the 0 index', function() {
      const result = csv.toArray(csvData);
      const firstRow = result[0];
      expect(firstRow[0]).to.equal('Date');
      expect(firstRow[1]).to.equal('Close/Last');
      expect(firstRow[2]).to.equal('Volume');
      expect(firstRow[3]).to.equal('Open');
      expect(firstRow[4]).to.equal('High');
      expect(firstRow[5]).to.equal('Low');
    });

    it('should return an Array with empty string at 0 index, wrapped in another Array, if an empty string is given', function() {
      const result = csv.toArray('');
      expect(result).to.be.a('array');
      expect(result[0][0]).to.equal('');
    });
  });

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