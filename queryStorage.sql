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

INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Peoples Democratic Party',  'PDP', 'Wadata Plaza, Michael Okpara Way, Zone 5, Wuse, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/pdp_zpswdocfjci.png');
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

INSERT INTO politico_andela.votes (office, voter, candidate) VALUES (2, 1);

alter column 
alter table users alter column email drop not null;


CREATE TABLE IF NOT EXISTS politico_andela.candidates (
    id SERIAL PRIMARY KEY NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) NOT NULL,
    candidate INTEGER REFERENCES politico_andela.users(id) NOT NULL,
    FOREIGN KEY(office) REFERENCES politico_andela.offices(id),
    FOREIGN KEY(candidate) REFERENCES politico_andela.users(id)
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


ALTER TABLE politico_andela.candidates ADD UNIQUE (candidate);

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

CREATE TABLE IF NOT EXISTS politico_andela.contestants (
    id SERIAL NOT NULL,
    office INTEGER REFERENCES politico_andela.contestants(office) NOT NULL,
    party INTEGER REFERENCES politico_andela.parties(id) NOT NULL,
    contestant INTEGER REFERENCES politico_andela.users(id) NOT NULL,
    FOREIGN KEY(office) REFERENCES politico_andela.offices(id),
    FOREIGN key(party) REFERENCES politico_andela.parties(id),
    FOREIGN KEY(contestant) REFERENCES politico_andela.users(id),
    PRIMARY KEY (office, contestant)
);


candidates
id SERIAL UNIQUE NOT NULL,
      office INTEGER REFERENCES offices (id) ON DELETE CASCADE,
      party INTEGER REFERENCES parties (id) ON DELETE CASCADE,
      candidate INTEGER REFERENCES users (id) ON DELETE CASCADE,
      PRIMARY KEY (office, candidate)

        votes
       id SERIAL UNIQUE NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_by INTEGER REFERENCES users (id) ON DELETE CASCADE,
      office INTEGER REFERENCES offices (id) ON DELETE CASCADE,
      candidate INTEGER REFERENCES candidates (id) ON DELETE CASCADE,
      PRIMARY KEY (created_by, office)




      CREATE TABLE IF NOT EXISTS politico_andela.votes (
    id SERIAL NOT NULL,
    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
    voter INTEGER REFERENCES politico_andela.users(id) ON DELETE CASCADE,
    office INTEGER REFERENCES politico_andela.offices(id) ON DELETE CASCADE,
    candidate INTEGER REFERENCES politico_andela.candidates(candidate) ON DELETE CASCADE,
    PRIMARY KEY (voter, office)
);

===========================Works=========================================
Here, I was able to make candidate in the candidate table reference contestant  in the contestants table.
Also, check the trashcan.js file for another version that works. That version relies on if statement to check if the candidate about to be registered exists in the contestants database.

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
    contestant INTEGER UNIQUE REFERENCES politico_andela.users(id) ON DELETE CASCADE,
    PRIMARY KEY (office, contestant)
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


make candidate in votes reference candidate in candidates table
=======================================================================================
========================Adjusted for votes table===================================
CREATE TABLE IF NOT EXISTS politico_andela.Users (
    id SERIAL PRIMARY KEY NOT NULL,
    first_Name VARCHAR(100) NOT NULL,
    last_Name VARCHAR(100),
    other_Name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL ,
    phone_Number VARCHAR(20) NOT NULL,
    passport_Url VARCHAR(200) NOT NULL,
    is_Admin BOOLEAN DEFAULT FALSE NOT NULL,
    password VARCHAR (900) NOT NULL
);

CREATE TABLE IF NOT EXISTS politico_andela.offices (
     id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) UNIQUE NOT NULL,
    type VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS politico_andela.parties(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) UNIQUE NOT NULL,
    acronym VARCHAR(100) NOT NULL,
    hqaddress TEXT NOT NULL,
    logoUrl VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS politico_andela.contestants (
    id SERIAL UNIQUE NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) ON DELETE CASCADE,
    party INTEGER REFERENCES politico_andela.parties(id) ON DELETE CASCADE,
    contestant INTEGER UNIQUE REFERENCES politico_andela.users(id) ON DELETE CASCADE,
    PRIMARY KEY (office, contestant)
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
    candidate INTEGER REFERENCES politico_andela.candidates(candidate) ON DELETE CASCADE,
    PRIMARY KEY (voter, office)
);
====================================================================================

INSERT INTO politico_andela.offices (name, type) VALUES ('Governor', 'State');
INSERT INTO politico_andela.offices (name, type) VALUES ('President', 'Federal');
INSERT INTO politico_andela.offices (name, type) VALUES ('Chairman', 'Local');
INSERT INTO politico_andela.offices (name, type) VALUES ('Senator', 'Legislative');
INSERT INTO politico_andela.offices (name, type) VALUES ('Councillor', 'Local');
INSERT INTO politico_andela.offices (name, type) VALUES ('House of Representatives', 'Legislative');
INSERT INTO politico_andela.offices (name, type) VALUES ('House of Assembly', 'Legislative');


INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Peoples Democratic Party',  'PDP', 'Wadata Plaza, Michael Okpara Way, Zone 5, Wuse, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/pdp_zpswdocfjci.png');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('All Peoples Congress',  'APC', '40 Blantyre Street, Wuse II; Abuja, Nigeria', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/apc_zps2e7rdmhy.png');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Progressive People Alliance',  'PPA', 'Wadata Plaza, Michael Okpara Way, Zone 5, Wuse, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/ppa_zpsyjqgtnex.gif');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Democratic Peoples Party',  'DPP', 'No. 1 Nouakchott Street Zone 1, Wuse, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/dpp_zpszds3pxzf.jpg');
INSERT INTO politico_andela.parties (name, acronym, hqaddress, logoUrl) VALUES ('Labour Party',  'LP', 'Dabo Shopping Mall, 2nd Floor, Plot 73 Ladoke Akintola Boulevard, Garki, Abuja', 'http://i38.photobucket.com/albums/e143/hoxtygen/Politico/LP_zpstzetsgna.jpg');


DROP TABLE IF EXISTS politico_andela.users CASCADE; 
DROP TABLE IF EXISTS politico_andela.offices CASCADE;
DROP TABLE IF EXISTS politico_andela.parties CASCADE;
DROP TABLE IF EXISTS politico_andela.votes CASCADE;
DROP TABLE IF EXISTS politico_andela.contestants CASCADE;
DROP TABLE IF EXISTS  politico_andela.candidates CASCADE;









