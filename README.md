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

## ERD
![ERD Diagram](https://github.com/BrianKendalBucek/budgie-api/blob/main/public/docs/ERD.png?raw=true)