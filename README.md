# Budgie Backend

**using this repo for basic currency info [Currency Repo](https://github.com/fawazahmed0/currency-api) many thanks to the author.**

### Getting Started

- clone/fork repo
- `cd` into directory
- run `npm install`
- make a `cp` of the `.env.example` file as `.env` and fill out the variables with your local variables
- run `npm run db:reset` to reset the database
- any issues with this, talk to Matt :)

### KNOWN SEEDING BUG

- still have an issue when running high number of seeds
- **error: Error: Max -5605456 should be greater than min 0.**
- Please set seeds to less than 100 for now :/

### ERD

![ERD Diagram](https://github.com/BrianKendalBucek/budgie-api/blob/main/public/docs/ERD.png?raw=true)

### Usage and Routes (So far)

#### Users

- GET `/api/users` returns all users
- GET `/api/users/:id` returns specific user with passed id

#### Categories

- GET `/api/categories` returns all categories
- GET `http://localhost:3002/api/categories/get_categories_by_id/:id` returns categories for a specific user
- DELETE `/api/categories/:id/delete` deletes category by id
- POST `/api/categories` adds a new category
  payload:

```
{
  "categoryName": "Food",
  "id": 1
}

```

#### Expenditures

- GET
