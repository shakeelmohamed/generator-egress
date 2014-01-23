-- Table: users

-- DROP TABLE users;

CREATE TABLE users
(
  userid serial NOT NULL,
  username text NOT NULL,
  email text NOT NULL,
  secret text NOT NULL,
  CONSTRAINT "PRIMARY" PRIMARY KEY (userid),
  CONSTRAINT email_unique UNIQUE (email),
  CONSTRAINT username_unique UNIQUE (username)
)