CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    password_digest VARCHAR(50)
);