# Budgie Backend

### Getting Started

**using this repo for basic currency info [Currency Repo](https://github.com/fawazahmed0/currency-api) many thanks to the author.**

- clone/fork repo
- `cd` into directory
- run `npm install`
- make a `cp` of the `.env.example` file as `.env` and fill out the variables with your local variables
- run `npm run db:reset` to reset the database
- any issues with this, talk to Matt :)

### Current state Jan 23 3pm PST

- began working on the basic server structure and created an `api` folder for any routes that will return data
- you can navigate to `/api/convert` in your browser to see a `json` of currencies supported with `usd` as the base currency
- I am currently hoping to get the DB tables finalized and populated with fake data (ie fakerjs) in order to start setting up routes that will return proper json to the front end
