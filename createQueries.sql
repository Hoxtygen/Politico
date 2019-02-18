\c politico;

DROP TABLE IF EXISTS politico_andela.users CASCADE; 
DROP TABLE IF EXISTS politico_andela.offices CASCADE;
DROP TABLE IF EXISTS politico_andela.parties CASCADE;
DROP TABLE IF EXISTS politico_andela.votes CASCADE;
DROP TABLE IF EXISTS  politico_andela.candidates CASCADE;
DROP TABLE IF EXISTS  politico_andela.contestants CASCADE;


CREATE TABLE IF NOT EXISTS politico_andela.Users (
    id SERIAL PRIMARY KEY NOT NULL,
    first_Name VARCHAR(100) NOT NULL,
    last_Name VARCHAR(100) NOT NULL,
    other_Name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL ,
    phone_Number VARCHAR(20) NOT NULL,
    passport_Url VARCHAR(200) NOT NULL,
    party INTEGER REFERENCES politico_andela.parties(id) ON DELETE CASCADE,
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
    contestant INTEGER UNIQUE REFERENCES politico_andela.users(id) ON DELETE CASCADE,
    PRIMARY KEY (office, contestant)
);


CREATE TABLE IF NOT EXISTS politico_andela.candidates (
    id SERIAL UNIQUE NOT NULL,
    office INTEGER REFERENCES politico_andela.offices(id) ON DELETE CASCADE,
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
