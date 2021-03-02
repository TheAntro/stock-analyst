const chai = require('chai');
const expect = chai.expect;
const dates = require('../utils/dates');

const data = new Map([
  ['Thu Feb 18 2021', {
    close: 129.71,
    volume: 96856750,
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

describe('dates utils', function() {
  describe('dateRange', function() {
    it('should return an Array', function() {
      const range = dates.dateRange('02/22/2021', '02/23/2021');
      expect(range).to.be.a('array');
    })

    it('should return an Array of dates between the dates given as parameters', function() {
      const range = dates.dateRange('02/22/2021', '02/24/2021');
      expect(range.length).to.equal(3);
    })

    it('dates in the array should be in toDateString format', function() {
      const range = dates.dateRange('02/22/2021', '02/24/2021');
      expect(range[0]).to.equal(new Date('02/22/2021').toDateString());
    })
  })
  
  describe('slice', function() {
    it('should return a Map', function() {
      const sliced = dates.slice(data, '02/22/2021', '02/23/2021');
      expect(sliced).to.be.a('map');
    })

    it('should slice a provided map to only include data from days between the provided dates', function() {
      const sliced = dates.slice(data, '02/22/2021', '02/23/2021');
      let includedDate = new Date('02/22/2021').toDateString();
      let excludedDate = new Date('02/18/2021').toDateString();
      expect(sliced.has(includedDate)).to.equal(true);
      expect(sliced.has(excludedDate)).to.equal(false);
    })
  });

  describe('moveDate', function() {
    it('should return a string', function() {
      const movedDate = dates.moveDate('02/22/2021', 2);
      expect(movedDate).to.be.a('string');
    })

    it('should work moving the date forwards', function() {
      const movedDate = dates.moveDate('02/22/2021', 2);
      let expectedDate = new Date('02/24/2021');
      expect(movedDate).to.equal(expectedDate.toDateString());
    })

    it('should work moving the date backwards', function() {
      const movedDate = dates.moveDate('02/22/2021', -2);
      let expectedDate = new Date('02/20/2021');
      expect(movedDate).to.equal(expectedDate.toDateString());
    })

    it('should work moving over month bounds', function() {
      const movedDate = dates.moveDate('02/28/2021', 5);
      let expectedDate = new Date('03/05/2021');
      expect(movedDate).to.equal(expectedDate.toDateString());
    })

    it('should work moving over year bounds', function() {
      const movedDate = dates.moveDate('01/01/2021', -5);
      let expectedDate = new Date('12/27/2020');
      expect(movedDate).to.equal(expectedDate.toDateString());
    })
  })

  describe('trimDateBuffer', function() {
    it('should return a Map', function() {
      const result = dates.trimDateBuffer(data, '02/22/2021', 1);
      expect(result).to.be.a('map');
    })

    it('result should have a buffer of n days before from date', function() {
      const result = dates.trimDateBuffer(data, '02/22/2021', 1);
      const keyIter = result.keys();
      let firstDate = keyIter.next().value;
      let secondDate = keyIter.next().value;
      let fromDate = new Date('02/22/2021').toDateString();
      expect(firstDate).to.not.be.equal(fromDate);
      expect(secondDate).to.be.equal(fromDate);
    })
  })
});