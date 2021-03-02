const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Integration tests', function() {
  describe('GET /api/local/:filename', function() {
    it('should respond with status 200 when provided with an existing filename', function(done) {
      chai.request(server)
      .get('/api/local/AAPL.csv')
      .end(function (err, res) {
        expect(res).to.have.status(200);
      })
      done();
    })
  })

  describe('GET /api/local/bull/:filename/:from/:to', function() {
    it('should respond with status 200 when filename is valid', function(done) {
      chai.request(server)
      .get('/api/local/bull/AAPL.csv/2021-01-06/2021-01-08')
      .end(function (err, res) {
        expect(res).to.have.status(200);
      })
      done();
    })

    /* 
    A bit of confusion about the definition of an upward trend
    In the requirements document, it is stated as an example that between 01/06/2021 and 01/08/2021
    The close/last price increased 3 days in a row.
    However, the actual historical data for these days is as follows (N-1 included):
    01/08/2021,$132.05,105158200,$132.43,$132.63,$130.23
    01/07/2021,$130.92,109578200,$128.36,$131.63,$127.86
    01/06/2021,$126.6,155088000,$127.72,$131.0499,$126.382
    01/05/2021,$131.01,97664900,$128.89,$131.74,$128.43
    Where closing price is the second column in each row.
    If the definition of an upward trend is that the closing price of day N is higher than closing price
    on day N-1, then on 
    01/06/2021, N.close < (N-1).close (126.6 < 131.01)
    01/07/2021, N.close > (N-1).close (130.92 > 126.61)
    01/08/2021, N.close > (N-1).close (132.05 > 130.92)
    Thus, to my understanding, closing price of N was higher than closing price of N-1 only 2 days in a row.
    */
    it('should respond with the longest bullish trend between dates', function(done) {
      chai.request(server)
      .get('/api/local/bull/AAPL.csv/2021-01-06/2021-01-08')
      .end(function (err, res) {
        expect(res.body.check).to.equal(2);
      })
      done();
    })

    it('should work over gaps, e.g. when the start date is Monday and Mondays close is higher than Fridays', function(done) {
      chai.request(server)
      .get('/api/local/bull/AAPL.csv/2021-02-08/2021-02-10')
      .end(function (err, res) {
        expect(res.body.check).to.equal(1);
      })
      done();
    })
  })
})
