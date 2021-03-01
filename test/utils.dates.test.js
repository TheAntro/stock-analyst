const chai = require('chai');
const expect = chai.expect;
const dates = require('../utils/dates');

const data = new Map([
  ['Wed Feb 24 2021', {
    close: 125.35,
    volume: 111039900,
    open: 124.94,
    high: 125.56,
    low: 122.23
  }],
  ['Tue Feb 23 2021', {
    close: 125.35,
    volume: 111039900,
    open: 124.94,
    high: 125.56,
    low: 122.23
  }],
  ['Mon Feb 22 2021', {
    close: 125.35,
    volume: 111039900,
    open: 124.94,
    high: 125.56,
    low: 122.23
  }],
  ['Fri Feb 19 2021', {
    close: 125.35,
    volume: 111039900,
    open: 124.94,
    high: 125.56,
    low: 122.23
  }],
  ['Thu Feb 18 2021', {
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
});