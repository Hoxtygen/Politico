CREATE TABLE IF NOT EXISTS politico_andela.Users (
    id SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100),
    otherName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL ,
    phoneNumber VARCHAR(20) NOT NULL,
    passportUrl VARCHAR(200) UNIQUE NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE NOT NULL,
    password VARCHAR (900) NOT NULL
);

INSERT INTO politico_andela.Users (firstName, lastName, otherName, email, phoneNumber, passportUrl, isAdmin, password) VALUES ('Wasiu', 'Idowu', 'Oriyomi', 'hoxtygen@live.com', '08060184972', 'https://www.mypassport.com', 'true', 'shaolindragon');

CREATE TABLE IF NOT EXISTS politico_andela.offices (
     id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
);

INSERT INTO politico_andela.offices (name, type) VALUES ('Governor', 'State');
INSERT INTO politico_andela.offices (name, type) VALUES ('President', 'Federal');
INSERT INTO politico_andela.offices (name, type) VALUES ('Chairman', 'Local');
INSERT INTO politico_andela.offices (name, type) VALUES ('Senator', 'Legislative');
INSERT INTO politico_andela.offices (name, type) VALUES ('Councillor', 'Local');
INSERT INTO politico_andela.offices (name, type) VALUES ('House of Representatives', 'Legislative');
INSERT INTO politico_andela.offices (name, type) VALUES ('House of Assembly', 'Legislative');

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

INSERT INTO politico_andela.offices (name, type) VALUES ('Governor', 'State');
INSERT INTO politico_andela.offices (name, type) VALUES ('President', 'Federal');
INSERT INTO politico_andela.offices (name, type) VALUES ('Chairman', 'Local');
INSERT INTO politico_andela.offices (name, type) VALUES ('Senator', 'Legislative');
INSERT INTO politico_andela.offices (name, type) VALUES ('Councillor', 'Local');
INSERT INTO politico_andela.offices (name, type) VALUES ('House of Representatives', 'Legislative');
INSERT INTO politico_andela.offices (name, type) VALUES ('House of Assembly', 'Legislative');

INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Peoples Democratic Party',  'PDP', 'Wadata Plaza, Michael Okpara Way, Zone 5, Wuse, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/dpp_zpszds3pxzf.jpg');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('All Peoples Congress',  'APC', '40 Blantyre Street, Wuse II; Abuja, Nigeria', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/apc_zps2e7rdmhy.png');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Progressive People Alliance',  'PPA', 'Wadata Plaza, Michael Okpara Way, Zone 5, Wuse, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/ppa_zpsyjqgtnex.gif');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Democratic Peoples Party',  'DPP', 'No. 1 Nouakchott Street Zone 1, Wuse, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/dpp_zpszds3pxzf.jpg');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Labour Party',  'LP', 'Dabo Shopping Mall, 2nd Floor, Plot 73 Ladoke Akintola Boulevard, Garki, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/LP_zpstzetsgna.jpg');

CREATE TABLE IF NOT EXISTS politico_andela.candidates (
    id SERIAL PRIMARY KEY NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) NOT NULL,
    party INTEGER REFERENCES politico_andela.parties(id) NOT NULL,
    candidate INTEGER REFERENCES politico_andela.users(id) NOT NULL,
    FOREIGN KEY(office) REFERENCES politico_andela.offices(id),
    FOREIGN key(party) REFERENCES politico_andela.parties(id),
    FOREIGN KEY(candidate) REFERENCES politico_andela.users(id)
);

INSERT INTO politico_andela.candidates (office, party,candidate) VALUES (2, 1, 1);

CREATE TABLE IF NOT EXISTS politico_andela.votes (
    id SERIAL NOT NULL,
    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
    voter INT REFERENCES politico_andela.users(id) NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) NOT NULL,
    candidate INTEGER REFERENCES politico_andela.candidates(id) NOT NULL,
    FOREIGN key(voter) REFERENCES politico_andela.users(id),
    FOREIGN KEY(candidate) REFERENCES politico_andela.candidates(id),
    PRIMARY KEY (office, voter)
);

INSERT INTO politico_andela.votes (office, voter,candidate) VALUES (1, 1, 1);