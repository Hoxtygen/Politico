import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import seed from '../../adminSeed';


chai.use(chaiHttp);
chai.should();

let token;
let adminToken;
const newUser = {
  first_Name: 'Oriyomi',
  last_Name: 'jonatan',
  other_Name: 'Wasiu',
  email: 'jonoris@gmail.com',
  phone_Number: '08156110987',
  passport_Url: 'https://www.orisjonapassport.com',
  password: 'shaolindragon',
};

describe('Home Page', () => {
  it('should return welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

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
      email: 'udub-it@hotmail.com',
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

describe('Political Office', () => {
  it('Should return an empty database', (done) => {
    chai.request(app)
      .get('/api/v1/offices/')
      .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it('should create a political office', (done) => {
    const newOffice = {
      name: 'Party Chairman',
      type: 'State',
    };
    chai.request(app)
      .post('/api/v1/offices')
      .set('api-access-token', adminToken)
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should not create a political office', (done) => {
    const newOffice = {
      type: 'State',
    };
    chai.request(app)
      .post('/api/v1/offices')
      .set('api-access-token', adminToken)
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should not create a political office', (done) => {
    const newOffice = {
      name: 'Senior Prefect',
    };
    chai.request(app)
      .post('/api/v1/offices')
      .set('api-access-token', adminToken)
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });


  it('should get a single political office', (done) => {
    const id = 1;
    chai.request(app)
      .get(`/api/v1/offices/${id}`)
      .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should not get a single political office', (done) => {
    const id = 300;
    chai.request(app)
      .get(`/api/v1/offices/${id}`)
      .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should not get a single political office', (done) => {
    const id = 'cat';
    chai.request(app)
      .get(`/api/v1/offices/${id}`)
      .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
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

  it('should not get a political party', (done) => {
    const id = 'cat';
    chai.request(app)
      .get(`/api/v1/parties/${id}`)
      .set('api-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
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

describe('Contestants', () => {
  it('should return an empty contestant database', (done) => {
    chai.request(app)
      .get('/api/v1/contestants/')
    // .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });

  it('Should add a new contestant', (done) => {
    chai.request(app)
      .post('/api/v1/contestants/1/add')
      .send({
        office: 1,
        party: 1,
      })
      .set('api-access-token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not add a new contestant', (done) => {
    chai.request(app)
      .post('/api/v1/contestants/3000/add')
      .send({
        office: 1,
        party: 1,
      })
      .set('api-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('Should not add a new contestant', (done) => {
    chai.request(app)
      .post('/api/v1/contestants/3/add')
      .send({
        office: 1000,
        party: 1,
      })
      .set('api-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('Should not add a new contestant', (done) => {
    chai.request(app)
      .post('/api/v1/contestants/3/add')
      .send({
        office: 1,
        party: 1000,
      })
      .set('api-access-token', token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return all contestants', (done) => {
    chai.request(app)
      .get('/api/v1/contestants/')
    // .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


describe('Candidate Registration', () => {
  it('should register a candidate', (done) => {
    chai.request(app)
      .post('/api/v1/office/1/register')
      .send({
        office: 1,
        party: 1,
      })
      .set('api-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});
