it('should throw an error and not get a single political office', (done) => {
      const id = 'ohms';
      chai.request(app)
        .get(`/api/v1/offices/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });



    =======================================================================================================

    officeRouter.get('/offices/:id', OfficeController.getOneOffice);
officeRouter.post('/offices', OfficeController.addNewOffice);
 static getOneOffice(req, res)	{
    const getOffice = politicalOffice.find(office => office.id === parseInt(req.params.id, 10));
    if (getOffice) {
      return res.status(200).json({
        status: 200,
        data: getOffice,
      });
    }
    res.status(4040).json({
      status: 404,
      error: 'Office does not exist',
    });
  }

  static addNewOffice(req, res) 	{
    const { type, name } = req.body;
    if (!type || !name) {
      res.status(400).json({
        status: 404,
        error: 'Missing fields not allowed',
      });
    }

    const newOffice = {
      id: politicalOffice.length + 1,
      name,
      type,
    };
    politicalOffice.push(newOffice);
    return res.status(201).json({
      status: 201,
      data: newOffice,
    });
  }


  =========================test==================================
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

  password = encrypt.encryptPwd(password);

      "coveralls": "npm run cover -- --report lcovonly && cat ./coverage/lcov.info | coveralls",
          "cover": "istanbul cover _mocha",

.error.details[0].message

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
        console.log(res);
        res.should.have.status(201);
        res.body.should.be.a('object');
        /* res.body.data.should.have.a.property('name');
        res.body.data.should.have.a.property('Acronym');
        res.body.data.should.have.a.property('hqAddress');
        res.body.data.should.have.a.property('logoUrl'); */
        done();
      });
  });


verifyAdmin(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      req.decoded = decoded;
      console.log(decoded)
      /* if (!decoded.isAdmin) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorized access',
        });
      } */
     // return next();
    });
  },


    INSERT INTO politico_andela.users (firstname, lastname, othername, email, phonenumber, passporturl, password) VALUES ('Idowu', 'Wasiu', 'Adeniyi', 'nirvanav88@gmail.com', 08060184972, 'http://wwww.nirvanavpass.com', 'clusters1988')

    \c politico
INSERT INTO politico_andela.Users (firstName, lastName, otherName, email, phoneNumber, passportUrl, isAdmin, password) VALUES ('Wasiu', 'Idowu', 'Adeniyi', 'shaolindragon22@gmail.com', '08060184972', 'https://www.wasiupassport.com', 'true', 'clusters1988');


 => res.status(200).json({
        status: 200,
        data: offices.rows,
      })

       => res.status(200).json({
        status: 200,
        data: parties.rows,
      })


      describe('Voting', () => {
  it('should vote for  a candidate', (done) => {
    const vote = {
      office: 2,
      voter: 1,
      candidate: 1,
    };
    chai.request(app)
      .post('/api/v1/votes')
      .send(vote)
      .set('api-access-token', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});



<table id = "dataTable">
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>Name</th>
                                                <th>Acronym</th>
                                                <th>Logo</th>
                                                <th>Headquarter Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Peoples Democratic Party</td>
                                                <td><Acronym>PDP</Acronym></td>
                                                <td><img src="./assets/img/pdp.png" alt="PDP logo" style="height: 50px; width: 50px"></td>
                                                <td>Wadata Plaza, Michael Okpara Way, Zone 5, Wuse, Abuja</td>
                                            </tr>

                                            <tr>
                                                <td>2</td>
                                            <td>Labour Party</td>
                                            <td><Acronym>LP</Acronym></td>
                                            <td><img src="./assets/img/LP.jpg" alt="PDP logo" style="height: 50px; width: 50px"></td>
                                            <td> Dabo Shopping Mall, 2nd Floor, Plot 73 Ladoke Akintola Boulevard, Garki, Abuja</td>
                                            </tr>

                                            <tr>
                                                <td>3</td>
                                            <td>Democratic Peoples Party</td>
                                            <td><Acronym>DPP</Acronym></td>
                                            <td><img src="./assets/img/dpp.jpg" alt="DPP logo" style="height: 50px; width: 50px"></td>
                                            <td>No. 1 Nouakchott Street Zone 1, Wuse, Abuja</td>
                                           
                                            </tr>

                                            <tr>
                                                <td>4</td>
                                                <td>Progressive Peoples Alliance</td>
                                                <td><Acronym>PPA</Acronym></td>
                                                <td><img src="./assets/img/ppa.gif" alt="PPA logo" style="height: 50px; width: 50px"></td>
                                                <td>Warri Street, off Emeka Anyoku Street, Area 11, Garki, Abuja</td>
                                            </tr>

                                            <tr>
                                                <td>5</td>
                                                <td>All Peoples Congress</td>
                                                <td><Acronym>APC</Acronym></td>
                                                <td><img src="./assets/img/apc.png" alt="APC logo" style="height: 50px; width: 50px"></td>
                                                <td>40 Blantyre Street, Wuse II; Abuja, Nigeria</td>
                                            </tr>     
                                        </tbody>                                   
                                    </table>



<tr>
                                                <td>1</td>
                                                <td>Peoples Democratic Party</td>
                                                <td><Acronym>PDP</Acronym></td>
                                                <td><img src="./assets/img/pdp.png" alt="PDP logo" style="height: 50px; width: 50px"></td>
                                                <td>Wadata Plaza, Michael Okpara Way, Zone 5, Wuse, Abuja</td>
                                                <td>
                                                    <a href="partyEdit.html" class="edit actn">Edit</a>
                                                    <button class="actn delete" type="submit">Delete</button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>2</td>
                                            <td>Labour Party</td>
                                            <td><Acronym>LP</Acronym></td>
                                            <td><img src="./assets/img/LP.jpg" alt="PDP logo" style="height: 50px; width: 50px"></td>
                                            <td> Dabo Shopping Mall, 2nd Floor, Plot 73 Ladoke Akintola Boulevard, Garki, Abuja</td>
                                            <td>
                                                <a href="partyEdit.html" class="edit actn">Edit</a>
                                                <button class="actn delete" type="submit">Delete</button>
                                            </td>
                                            </tr>

                                            <tr>
                                                <td>3</td>
                                            <td>Democratic Peoples Party</td>
                                            <td><Acronym>DPP</Acronym></td>
                                            <td><img src="./assets/img/dpp.jpg" alt="DPP logo" style="height: 50px; width: 50px"></td>
                                            <td>No. 1 Nouakchott Street Zone 1, Wuse, Abuja</td>
                                            <td>
                                                <a href="partyEdit.html" class="edit actn">Edit</a>
                                                <button class="actn delete" type="submit">Delete</button>
                                            </td>
                                            </tr>

                                            <tr>
                                                <td>4</td>
                                                <td>Progressive Peoples Alliance</td>
                                                <td><Acronym>PPA</Acronym></td>
                                                <td><img src="./assets/img/ppa.gif" alt="PPA logo" style="height: 50px; width: 50px"></td>
                                                <td>Warri Street, off Emeka Anyoku Street, Area 11, Garki, Abuja</td>
                                                <td>
                                                    <a href="partyEdit.html" class="edit actn">Edit</a>
                                                    <button class="actn delete" type="submit">Delete</button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>5</td>
                                                <td>All Peoples Congress</td>
                                                <td><Acronym>APC</Acronym></td>
                                                <td><img src="./assets/img/apc.png" alt="APC logo" style="height: 50px; width: 50px"></td>
                                                <td>40 Blantyre Street, Wuse II; Abuja, Nigeria</td>
                                                <td>
                                                    <a href="partyEdit.html" class="edit actn">Edit</a>
                                                    <button class="actn delete" type="submit">Delete</button>
                                                </td>
                                            </tr>   

 <tr>
                                                <td>1</td>
                                                <td>Governor</td>
                                                <td>State</td>
                                                <td>
                                                    <button class="btn contest" type="submit">Contest</button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>2</td>
                                            <td>Governor</td>
                                            <td>State</td>
                                            <td>
                                                <button class="btn contest" type="submit">Contest</button>
                                            </td>
                                            </tr>

                                            <tr>
                                                <td>3</td>
                                            <td>Mayor</td>
                                            <td>Local</td>
                                            <td>
                                                <button class="btn contest" type="submit">Contest</button>
                                            </td>
                                            </tr>

                                            <tr>
                                                <td>4</td>
                                                <td>President</td>
                                                <td>Federal</td>
                                                <td>
                                                    <button class="btn contest" type="submit">Contest</button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>5</td>
                                                <td>Senator</td>
                                                <td>Legislative</td>
                                                <td>
                                                    <button class="btn contest" type="submit">Contest</button>
                                                </td>
                                            </tr>                                                 




\c politico

CREATE TABLE IF NOT EXISTS politico_andela.candidates (
    id SERIAL NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(office) NOT NULL,
    party INTEGER REFERENCES politico_andela.parties(id) NOT NULL,
    candidate INTEGER REFERENCES politico_andela.offices(contestant) NOT NULL,
    PRIMARY KEY (office, candidate)
);

CREATE TABLE IF NOT EXISTS politico_andela.votes (
    id SERIAL NOT NULL,
    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
    voter INTEGER REFERENCES politico_andela.users(id) NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) NOT NULL,
    candidate INTEGER REFERENCES politico_andela.candidates(id) NOT NULL,
    FOREIGN key(voter) REFERENCES politico_andela.users(id),
    FOREIGN KEY(candidate) REFERENCES politico_andela.candidates(id),
    PRIMARY KEY (office, voter)
);



id SERIAL UNIQUE NOT NULL,
      office INTEGER REFERENCES offices (id) ON DELETE CASCADE,
      party INTEGER REFERENCES parties (id) ON DELETE CASCADE,
      candidate INTEGER REFERENCES users (id) ON DELETE CASCADE,
      PRIMARY KEY (office, candidate)


       id SERIAL UNIQUE NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_by INTEGER REFERENCES users (id) ON DELETE CASCADE,
      office INTEGER REFERENCES offices (id) ON DELETE CASCADE,
      candidate INTEGER REFERENCES candidates (id) ON DELETE CASCADE,
      PRIMARY KEY (created_by, office)



      CREATE_TABLE: `CREATE TABLE IF NOT EXISTS votes 
    (
      id SERIAL UNIQUE NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_by INTEGER REFERENCES users (id) ON DELETE CASCADE,
      office INTEGER REFERENCES offices (id) ON DELETE CASCADE,
      candidate INTEGER REFERENCES candidates (id) ON DELETE CASCADE,
      PRIMARY KEY (created_by, office)
    )

    
CREATE TABLE IF NOT EXISTS politico_andela.candidates (
    id SERIAL UNIQUE NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) ON DELETE CASCADE,
    party INTEGER REFERENCES politico_andela.parties(id) ON DELETE CASCADE,
    candidate INTEGER REFERENCES politico_andela.users(id) ON DELETE CASCADE,
    PRIMARY KEY (office, candidate)
);

CREATE_TABLE: `CREATE TABLE IF NOT EXISTS candidates
    (
      id SERIAL UNIQUE NOT NULL,
      office INTEGER REFERENCES offices (id) ON DELETE CASCADE,
      party INTEGER REFERENCES parties (id) ON DELETE CASCADE,
      candidate INTEGER REFERENCES users (id) ON DELETE CASCADE,
      PRIMARY KEY (office, candidate)
    )

    CREATE TABLE IF NOT EXISTS politico_andela.candidates (
    id SERIAL UNIQUE NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) ON DELETE CASCADE,
    party INTEGER REFERENCES politico_andela.parties(id) ON DELETE CASCADE,
    candidate INTEGER REFERENCES politico_andela.users(id) ON DELETE CASCADE,
    PRIMARY KEY (office, candidate)
);


    CREATE TABLE IF NOT EXISTS politico_andela.votes (
    id SERIAL NOT NULL,
    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
    voter INTEGER REFERENCES politico_andela.users(id) ON DELETE CASCADE,
    office INTEGER REFERENCES politico_andela.offices(id) ON DELETE CASCADE,
    candidate INTEGER REFERENCES politico_andela.candidates(id) ON DELETE CASCADE,
    PRIMARY KEY (voter, office)
);

Before adding a contestant to the candidate table check if it exists in the contestant table.




======================================WORKS=============================================

CREATE TABLE IF NOT EXISTS politico_andela.Users (
    id SERIAL PRIMARY KEY NOT NULL,
    first_Name VARCHAR(100) NOT NULL,
    last_Name VARCHAR(100),
    other_Name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL ,
    phone_Number VARCHAR(20) NOT NULL,
    passport_Url VARCHAR(200) UNIQUE NOT NULL,
    is_Admin BOOLEAN DEFAULT FALSE NOT NULL,
    password VARCHAR (900) NOT NULL
);

CREATE TABLE IF NOT EXISTS politico_andela.offices (
     id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS politico_andela.parties(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) UNIQUE NOT NULL,
    acronym VARCHAR(100) UNIQUE,
    hqaddress TEXT NOT NULL,
    logoUrl VARCHAR(200) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS politico_andela.contestants (
    id SERIAL UNIQUE NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) ON DELETE CASCADE,
    party INTEGER REFERENCES politico_andela.parties(id) ON DELETE CASCADE,
    candidate INTEGER UNIQUE REFERENCES politico_andela.users(id) ON DELETE CASCADE,
    PRIMARY KEY (office, candidate)
);


CREATE TABLE IF NOT EXISTS politico_andela.candidates (
    id SERIAL UNIQUE NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) ON DELETE CASCADE,
    party INTEGER REFERENCES politico_andela.parties(id) ON DELETE CASCADE,
    candidate INTEGER UNIQUE REFERENCES politico_andela.users(id) ON DELETE CASCADE,
    PRIMARY KEY (office, candidate)
);

    CREATE TABLE IF NOT EXISTS politico_andela.votes (
    id SERIAL NOT NULL,
    created_On DATE NOT NULL DEFAULT CURRENT_DATE,
    voter INTEGER REFERENCES politico_andela.users(id) ON DELETE CASCADE,
    office INTEGER REFERENCES politico_andela.offices(id) ON DELETE CASCADE,
    candidate INTEGER REFERENCES politico_andela.candidates(id) ON DELETE CASCADE,
    PRIMARY KEY (voter, office)
);


=====================================================================================