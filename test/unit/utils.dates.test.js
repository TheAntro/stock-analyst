const chai = require('chai');
const expect = chai.expect;
const dates = require('../../utils/dates');
const data = require('../mockdata/shortMap');

describe('dates utils', function() {

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