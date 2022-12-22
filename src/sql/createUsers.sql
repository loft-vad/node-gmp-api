CREATE TABLE users (
  id text NOT NULL CONSTRAINT users_pkey PRIMARY KEY,
  login text NOT NULL CONSTRAINT users_login_key UNIQUE,
  password text NOT NULL,
  age integer,
  isDeleted
);