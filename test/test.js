
const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API endpoint /users', function() {
  this.timeout(5000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });

  // GET - List all colors
  it('should return all data', function() {
    return chai.request(app)
      .get('/users')
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        //expect(res.body.results).to.be.an('array');
        expect(res.body.results.medicines).to.have.lengthOf(2);
      });
  });

  it('should delete record from data', function() {
    return chai.request(app)
      .delete('/users/delete/1')
      .then(function(res) {

        expect(res).to.have.status(200);
        expect(res).to.be.json;
       
        //expect(res.body.results).to.have.lengthOf(1);
      });
  });
  
});