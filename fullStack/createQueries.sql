

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