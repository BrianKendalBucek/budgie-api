# Budgie Backend

**using this repo for basic currency info [Currency Repo](https://github.com/fawazahmed0/currency-api) many thanks to the author.**

### Getting Started

- clone/fork repo
- `cd` into directory
- run `npm install`
- make a `cp` of the `.env.example` file as `.env` and fill out the variables with your local variables
- run `npm run db:reset` to reset the database
- any issues with this, talk to Matt :)

### Current state Jan 23 3pm PST

- began working on the basic server structure and created an `api` folder for any routes that will return data
- you can navigate to `/api/convert` in your browser to see a `json` of currencies supported with `usd` as the base currency
- I am currently hoping to get the DB tables finalized and populated with fake data (ie fakerjs) in order to start setting up routes that will return proper data to the front end
- _Note_ resetdb.js could be improved, and current bin folder only populates users and categories tables

### ERD
![ERD Diagram](https://github.com/BrianKendalBucek/budgie-api/blob/main/public/docs/ERD.png?raw=true)

### notes from Bryce/Kenny meeting

- Add currency code row to users tables, to be the base currency from which all expenditures converted
- in currency table put ratio to usd from api request

- steps to populate currency table in backend
  1st

1. request country code list from api
2. input country code and name into db
3. request usd rates from api
4. input rate into db where the country code matches

2nd

- method to update currency rates

note on converting

- method to convert involves relationship back to usd
- once done, divide the input currency by that rate
- send the converted amount back

- notes from kenny
- User tables needs to have a fk that points to the currencies table
- support different payment methods STRETCH
- knex.js as a query builder?
-
