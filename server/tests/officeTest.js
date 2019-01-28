import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();


describe('Political Office', () => {
  describe('GET all political office', () => {
    it('should get all political offices', (done) => {
      chai.request(app)
        .get('/api/v1/offices')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('GET a single political office', () => {
    it('should get a single political office', (done) => {
      const id = 3;
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
