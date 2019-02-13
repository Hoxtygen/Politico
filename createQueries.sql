\c politico hoxtygen;

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
