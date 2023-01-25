DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS expenditures CASCADE;
DROP TABLE IF EXISTS currencies CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS months CASCADE;
DROP TRIGGER IF EXISTS trg_populate_base_cost ON expenditures;
DROP TRIGGER IF EXISTS trg_update_base_cost ON expenditures;


CREATE TABLE currencies (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT,
  code VARCHAR(10) NOT NULL,
  date_added DATE,
  rate_to_usd NUMERIC(2)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  currency_id INTEGER REFERENCES currencies(id) ON DELETE CASCADE,
  monthly_budget INTEGER
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL
);



CREATE TABLE expenditures (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  currency_id INTEGER REFERENCES currencies(id) ON DELETE CASCADE,
  cost NUMERIC(12,2) NOT NULL,
  exchange_rate_base NUMERIC(12,8) NOT NULL,
  cost_in_to_base NUMERIC(12,2), --GENERATED ALWAYS AS (cost * exchange_rate_base) STORED, 
  date_paid DATE NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  notes TEXT
);

CREATE TABLE months (
  id SERIAL PRIMARY KEY NOT NULL,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  number_of_days INTEGER DEFAULT(30)
);

CREATE OR REPLACE FUNCTION set_cost_in_to_base()
RETURNS trigger AS 
$BODY$
BEGIN 
  NEW.cost_in_to_base = NEW.exchange_rate_base * NEW.cost;
  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;

CREATE TRIGGER trg_populate_base_cost 
    BEFORE INSERT
    ON expenditures
    FOR EACH ROW
    EXECUTE FUNCTION set_cost_in_to_base();

CREATE TRIGGER trg_update_base_cost 
    BEFORE UPDATE
    ON expenditures
    FOR EACH ROW
    EXECUTE FUNCTION set_cost_in_to_base();
