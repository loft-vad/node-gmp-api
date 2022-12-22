CREATE TABLE groups (
    id character text NOT NULL CONSTRAINT groups_pkey PRIMARY KEY,
    name character text CONSTRAINT groups_name_key UNIQUE,
    permission character text
);