import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Parties', () => {
  describe('GET', () => {
    it('should get all political parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

  describe('GET', () => {
    it('should get a single political party', (done) => {
      const id = 3;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not get a political party', (done) => {
      const id = 300;
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should not get a political party', (done) => {
      const id = 'man';
      chai.request(app)
        .get(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('Delete a party', () => {
    it('should delete a party', (done) => {
      const id = 4;
      chai.request(app)
        .delete(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should not delete a party', (done) => {
      const id = 300;
      chai.request(app)
        .delete(`/api/v1/parties/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
