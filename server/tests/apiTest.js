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

describe('Create a political office', () => {
  it('should create a political office', (done) => {
    const newOffice = {
      name: 'Alaga Council',
      type: 'Local',
    };
    chai.request(app)
      .post('/api/v1/offices')
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
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

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

//  Parties

describe('Political Party', () => {
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

  it('should get all political parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
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
      .end((err, res) => {
        //console.log(res);
        res.should.have.status(201);
        res.body.should.be.a('object');
        /* res.body.data.should.have.a.property('name');
        res.body.data.should.have.a.property('Acronym');
        res.body.data.should.have.a.property('hqAddress');
        res.body.data.should.have.a.property('logoUrl'); */
        done();
      });
  });
});
