/* import chai from 'chai';
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

  describe('Create a political office', () => {
    it('should create a political office', (done) => {
      const newOffice = {
        id: 23,
        name: 'Alaga Council',
        type: 'Local',
      };
      chai.request(app)
        .post('/api/v1/offices')
        .send(newOffice)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.have.a.property('id');
          res.body.data.should.have.a.property('name');
          res.body.data.should.have.a.property('type');
          done();
        });
    });
  });
});
 */