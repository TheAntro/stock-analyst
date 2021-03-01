const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Integration tests', function() {
  describe('GET /api/local/:filename', function() {
    it('should respond with status 200 when provided with an existing filename', function(done) {
      chai.request(server)
      .get('/api/local/HistoricalData_1614247993646.csv')
      .end(function (err, res) {
        expect(res).to.have.status(200);
      })
      done();
    })
  })
})
