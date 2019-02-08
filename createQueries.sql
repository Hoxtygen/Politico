

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