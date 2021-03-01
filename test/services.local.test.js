const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-as-promised'));
const local = require('../services/local');

describe('local services', function() {
  describe('readCSV', function() {
    it('should return a String when provided with the name of an existing file in files folder', async () => {
      const fileName = 'HistoricalData_1614247993646.csv';
      const data = await local.readCSV(fileName);
      expect(data).to.be.a('string');
    });

    it('should throw an error if a file by that name does not exist in files folder', async function() {
      const fileName = 'non-existent-file';
      await expect(local.readCSV(fileName)).to.be.rejectedWith(Error);
    })
  });
});