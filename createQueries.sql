\c politico hoxtygen


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
