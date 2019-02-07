\c politico

CREATE TABLE IF NOT EXISTS politico_andela.candidates (
    id SERIAL NOT NULL,
    office INTEGER REFERENCES politico_andela.contestants(office) NOT NULL,
    party INTEGER REFERENCES politico_andela.contestants(party) NOT NULL,
    candidate INTEGER REFERENCES politico_andela.contestants(contestant) NOT NULL,
    PRIMARY KEY (office, candidate)
);