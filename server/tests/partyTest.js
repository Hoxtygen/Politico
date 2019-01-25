import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

describe('Parties', () => {
  describe('GET all parties', () => {
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

  describe('GET a party', () => {
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

  describe('ADD new party', () => {
    it('should add a new political party', (done) => {
      const newParty = {
        id: 9,
        name: 'All Nigerian Peoples Party',
        Acronym: 'ANPP',
        hqAddress: '40 Blantyre Street, Wuse II; Abuja, Nigeria',
        logoUrl: 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/anpp_zps2e7rdmhy.png',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .send(newParty)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.have.a.property('id');
          res.body.data.should.have.a.property('name');
          res.body.data.should.have.a.property('Acronym');
          res.body.data.should.have.a.property('hqAddress');
          res.body.data.should.have.a.property('logoUrl');
          done();
        });
    });
  });

  describe('PATCH request to edit a party information', () => {
    it('Given an Id, this route should edit the party information', (done) => {
      const id = 1;
      chai.request(app)
        .patch(`/api/v1/parties/${id}`)
        .send({
          name: 'National People Party',
          Acronym: 'NPN',
          hqAddress: 'Dabo Shopping Mall, 2nd Floor, Plot 73 Ladoke Akintola Boulevard, Garki, Abuja',
          logoUrl: 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/LP_zpstzetsgna.jpg',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.a.property('id');
          res.body.data.should.have.a.property('name');
          res.body.data.should.have.a.property('Acronym');
          res.body.data.should.have.a.property('hqAddress');
          res.body.data.should.have.a.property('logoUrl');
          done();
        });
    });
    it('Given an Id of a non-existent party, this route should throw an error', (done) => {
      const id = 100;
      chai.request(app)
        .patch(`/api/v1/parties/${id}`)
        .send({
          name: 'National People Party',
          Acronym: 'NPN',
          hqAddress: 'Dabo Shopping Mall, 2nd Floor, Plot 73 Ladoke Akintola Boulevard, Garki, Abuja',
          logoUrl: 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/LP_zpstzetsgna.jpg',
        })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
