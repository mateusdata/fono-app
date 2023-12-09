CREATE TABLE person (
    per_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    sur_name VARCHAR(50) DEFAULT NULL,
    last_name VARCHAR(50),
    cpf VARCHAR(11) NOT NULL UNIQUE,
    birthday DATE NOT NULL,
    created_at TIMESTAMP ,
    updated_at TIMESTAMP
);

CREATE TABLE users (
    user_id SERIAL NOT NULL,
    per_id INT NOT NULL REFERENCES person(per_id) ON DELETE CASCADE,
    email CHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    reset_password BOOLEAN DEFAULT FALSE,
    status VARCHAR(10) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' + INTERVAL '3 hour'),
    updated_at TIMESTAMP,
    verification_code varchar(6),
    expiration_date DATE,
    CHECK (status IN ('active', 'banned', 'inactive'))
);