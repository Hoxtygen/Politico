\c politico hoxtygen


CREATE TABLE IF NOT EXISTS politico_andela.votes (
    id SERIAL NOT NULL,
    createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
    createdBy INT NOT NULL DEFAULT CURRVAL(politico_andela.votes_voter_seq),
    voter INTEGER REFERENCES politico_andela.users(id),
    office INTEGER REFERENCES politico_andela.offices(id) NOT NULL,
    candidate INTEGER REFERENCES politico_andela.candidates(id) NOT NULL,
    FOREIGN key(voter) REFERENCES politico_andela.users(id),
    FOREIGN KEY(candidate) REFERENCES politico_andela.candidates(id),
    PRIMARY KEY (office, voter)
); 

INSERT INTO politico_andela.votes (office, voter,candidate) VALUES (1, 1, 1);

