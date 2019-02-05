\c politico_test
CREATE SCHEMA politico_andela;

DROP TABLE IF EXISTS  politico_andela.candidates CASCADE;
DROP TABLE IF EXISTS politico_andela.votes CASCADE;
DROP TABLE IF EXISTS politico_andela.users CASCADE; 
DROP TABLE IF EXISTS politico_andela.offices CASCADE;
DROP TABLE IF EXISTS politico_andela.parties CASCADE;

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

CREATE TABLE IF NOT EXISTS politico_andela.offices (
     id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS politico_andela.parties (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) UNIQUE NOT NULL,
    acronym VARCHAR(100) UNIQUE,
    hqaddress TEXT NOT NULL,
    logoUrl VARCHAR(200) UNIQUE NOT NULL
);

 CREATE TABLE IF NOT EXISTS politico_andela.candidates (
    id SERIAL  NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) NOT NULL,
    candidate INTEGER REFERENCES politico_andela.users(id) NOT NULL,
    FOREIGN KEY(office) REFERENCES politico_andela.offices(id),
    FOREIGN KEY(candidate) REFERENCES politico_andela.users(id),
    PRIMARY KEY (office, candidate)
);


CREATE TABLE IF NOT EXISTS politico_andela.votes (
    id SERIAL NOT NULL,
    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
    voter INT REFERENCES politico_andela.users(id) NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) NOT NULL,
    candidate INTEGER REFERENCES politico_andela.users(id) NOT NULL,
    FOREIGN key(voter) REFERENCES politico_andela.users(id),
    FOREIGN KEY(candidate) REFERENCES politico_andela.users(id),
    PRIMARY KEY (office, voter)
);



INSERT INTO politico_andela.Users (firstName, lastName, otherName, email, phoneNumber, passportUrl, isAdmin, password) VALUES ('Wasiu', 'Idowu', 'Oriyomi', 'hoxtygen@live.com', '08060184972', 'https://www.mypassport.com', 'true', 'shaolindragon');
INSERT INTO politico_andela.Users (firstName, lastName, otherName, email, phoneNumber, passportUrl, password) VALUES ('Wasiu', 'Idowu', 'Oriyomi', 'hoxtygen01@live.com', '08060184972', 'https://www.mypassport1.com', '2a$14$phZP9Luv78eE3Tu1sf2wd.f5FNc9OHod3WqZIdCiUQIVqPm.PWlDm');
INSERT INTO politico_andela.Users (firstName, lastName, otherName, email, phoneNumber, passportUrl, password) VALUES ('Wasiu', 'Idowu', 'Oriyomi', 'hoxtygen02@live.com', '08060184972', 'https://www.mypassport2.com', '2a$14$phZP9Luv78eE3Tu1sf2wd.f5FNc9OHod3WqZIdCiUQIVqPm.PWlDm');
INSERT INTO politico_andela.Users (firstName, lastName, otherName, email, phoneNumber, passportUrl, password) VALUES ('Wasiu', 'Idowu', 'Oriyomi', 'hoxtygen03@live.com', '08060184972', 'https://www.mypassport3.com',  '2a$14$phZP9Luv78eE3Tu1sf2wd.f5FNc9OHod3WqZIdCiUQIVqPm.PWlDm');



INSERT INTO politico_andela.offices (name, type) VALUES ('Governor', 'State');
INSERT INTO politico_andela.offices (name, type) VALUES ('President', 'Federal');
INSERT INTO politico_andela.offices (name, type) VALUES ('Chairman', 'Local');
INSERT INTO politico_andela.offices (name, type) VALUES ('Senator', 'Legislative');
INSERT INTO politico_andela.offices (name, type) VALUES ('Councillor', 'Local');
INSERT INTO politico_andela.offices (name, type) VALUES ('House of Representatives', 'Legislative');
INSERT INTO politico_andela.offices (name, type) VALUES ('House of Assembly', 'Legislative');

INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Peoples Democratic Party',  'PDP', 'Wadata Plaza, Michael Okpara Way, Zone 5, Wuse, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/pdp_zpszds3pxzf.jpg');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('All Peoples Congress',  'APC', '40 Blantyre Street, Wuse II; Abuja, Nigeria', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/apc_zps2e7rdmhy.png');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Progressive People Alliance',  'PPA', 'Wadata Plaza, Michael Okpara Way, Zone 5, Wuse, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/ppa_zpsyjqgtnex.gif');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Democratic Peoples Party',  'DPP', 'No. 1 Nouakchott Street Zone 1, Wuse, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/dpp_zpszds3pxzf.jpg');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Labour Party',  'LP', 'Dabo Shopping Mall, 2nd Floor, Plot 73 Ladoke Akintola Boulevard, Garki, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/LP_zpstzetsgna.jpg');


/* INSERT INTO candidates (office, candidate) VALUES (2, 1);
INSERT INTO candidates (office, candidate) VALUES (2, 2);
INSERT INTO candidates (office, candidate) VALUES (2, 3); */


/* INSERT INTO votes (office, voter, candidate) VALUES (2, 1, 1); 
INSERT INTO votes (office, voter, candidate) VALUES (2, 3, 2);
INSERT INTO votes (office, voter, candidate) VALUES (2, 4, 3);
*/


