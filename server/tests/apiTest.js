import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';


chai.use(chaiHttp);
chai.should();

let token;
const newUser = {
  firstname: 'Oriyomi',
  lastname: 'jonatan',
  othername: 'Wasiu',
  email: 'jonoris@gmail.com',
  phonenumber: '08156110987',
  passporturl: 'https://www.orisjonapassport.com',
  password: 'shaolindragon',
};

describe('signup', () => {
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((req, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});


describe('offices', () => {
  it('should return all offices', (done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
