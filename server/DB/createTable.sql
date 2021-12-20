CREATE TABLE IF NOT EXISTS siteUser
(
    userID      SERIAL PRIMARY KEY NOT NULL,
    username    VARCHAR(22)        NOT NULL,
    password    VARCHAR(64)        NOT NULL,
    dateOfBirth DATE
);

CREATE TABLE IF NOT EXISTS movie
(
    movieTitle VARCHAR(75) PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS movieList
(
    matchID    serial PRIMARY KEY NOT NULL,
    userID     INT                NOT NULL,
    movieTitle VARCHAR            NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (userID)
            REFERENCES siteUser (userID),
    CONSTRAINT fk_movie
        FOREIGN KEY (movieTitle)
            REFERENCES movie (movieTitle)
);