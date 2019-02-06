import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import seed from '../../adminSeed';


chai.use(chaiHttp);
chai.should();

let token;
let adminToken;
const newUser = {
  firstname: 'Oriyomi',
  lastname: 'jonatan',
  othername: 'Wasiu',
  email: 'jonoris@gmail.com',
  phonenumber: '08156110987',
  passporturl: 'https://www.orisjonapassport.com',
  password: 'shaolindragon',
};


describe('Users', () => {
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

  it('should login a user', (done) => {
    const user = {
      email: 'jonoris@gmail.com',
      password: 'shaolindragon',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        token = res.body.data[0].token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should login an Admin', (done) => {
    const userAdmin = {
      email: 'hoxtygen@live.com',
      password: 'clusters1988',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(userAdmin)
      .end((err, res) => {
        adminToken = res.body.data[0].token;
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Create a political office', () => {
  it('should create a political office', (done) => {
    const newOffice = {
      name: 'Alaga Council',
      type: 'Local',
    };
    chai.request(app)
      .post('/api/v1/offices')
      .set('api-access-token', adminToken)
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        /*  res.body.data.should.have.a.property('id');
        res.body.should.have.a.property('name');
        res.body.data.should.have.a.property('type'); */
        done();
      });
  });

  it('should get a single political office', (done) => {
    const id = 3;
    chai.request(app)
      .get(`/api/v1/offices/${id}`)
      .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return all offices', (done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .set('api-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

//  Parties

describe('Political Party', () => {
  it('should get a single political party', (done) => {
    const id = 3;
    chai.request(app)
      .get(`/api/v1/parties/${id}`)
      .set('api-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should get all political parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .set('api-access-token', token)
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
      .set('api-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should delete a party', (done) => {
    const id = 4;
    chai.request(app)
      .delete(`/api/v1/parties/${id}`)
      .set('api-access-token', adminToken)
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
      .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should add a new political party', (done) => {
    const newParty = {
      name: 'Every Nigerian Peoples Party',
      Acronym: 'ENPP',
      hqAddress: '40 Blantyre Street, Wuse II; Abuja, Nigeria',
      logoUrl: 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/enpp_zps2e7rdmhy.png',
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(newParty)
      .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});

describe('Candidate Registration', () => {
  // const office = { office: 2 };
  it('should register a candidate', (done) => {
    chai.request(app)
      .post('/api/v1/office/1/register')
      .send({ office: 2 })
      .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});

