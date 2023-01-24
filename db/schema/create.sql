DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS expenditures CASCADE;
DROP TABLE IF EXISTS currencies CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS months CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  monthly_budget INTEGER
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE currencies (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT,
  code VARCHAR(10) NOT NULL,
  date_added DATE,
  rate_to_usd NUMERIC(2)
);

CREATE TABLE expenditures (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  currency_id INTEGER REFERENCES currencies(id) ON DELETE CASCADE,
  cost NUMERIC(2) NOT NULL,
  exchange_rate_base NUMERIC(8) NOT NULL,
  cost_in_base NUMERIC, 
  -- I couldn't get GENERATED ALWAYS to work with my version of psql 9.5, move this calcuation to the back end instead?
  -- GENERATED ALWAYS as (cost * exchange_rate_base) STORED,
  date_paid DATE NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  notes TEXT
);

CREATE TABLE months (
  id SERIAL PRIMARY KEY NOT NULL,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  number_of_days INTEGER DEFAULT(30)
)

