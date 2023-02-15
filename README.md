# Budgie Backend

**using this repo for basic currency info [Currency Repo](https://github.com/fawazahmed0/currency-api) many thanks to the author.**

### Getting Started

- clone/fork repo
- `cd` into directory
- run `npm install`
- make a `cp` of the `.env.example` file as `.env` and fill out the variables with your local variables
- run `npm run db:reset` to reset the database
  - follow the command line prompts to chose whether you would like to reset the schema, random seeds or "nice" preformatted seeds

### KNOWN SEEDING BUG

- still have an issue when running high number of seeds
- **error: Error: Max -5605456 should be greater than min 0.**
- Please set seeds to less than 100 for now :/

### ERD

![ERD Diagram](https://github.com/BrianKendalBucek/budgie-api/blob/main/public/docs/ERD.png?raw=true)

### Usage and Routes

#### Users

- GET `/api/users` returns all relevant info for logged in user

#### Categories

- GET `/api/categories` returns all categories
- GET `/api/categories/get_categories_by_id/` returns categories for a specific user
- GET `/api/categories/total_per_category` returns the sum of expenses in each category for a user
- PUT `/api/categories/soft_delete` preferred method for deleting
- DELETE `/api/categories/delete` hard deletes category by id (avoid)
  - assumes user is already logged in as users should only be able to delete categories they own
  - payload from front end, needs to include catId
- POST `/api/categories` adds a new category
  payload:

```
{
  "categoryName": "Food",
  "id": 1
}

```

#### Expenditures

- GET `/api/expenditures` get all expenditures by user ID
  - returns an array of users expenses
- GET `/api/expenditures/singleExpense` get one single Expense by id, payload must include expenseId
- GET `/api/expenditures/totals_per_day` get total expenses for each calender day
- GET `/api/expenditures/budget_spent` returns the percentage of users budget spent
- GET `/api/expenditures/totals_per_month` returns total per month!
- POST `/api/expenditures` with payload example

```
{
  "currencyId": 45,
  "cost": 50.00,
  "exchangeRateBase": 0.008,
  "datePaid": "2020-10-10",
  "categoryId": 3,
  "notes": "This is a cool widget"
}
```

- DELETE `/api/expenditures/delete` to delete by expense id
- payload must include expenseId
  - on failure will return
  ```
  {
  "error": "Not found"
  }
  ```
  - on success will return
  ```
  {
  "delete": "done"
  }
  ```

#### Currency

- GET `/api/currency` lists all currencies currently in DB with rate to usd
- GET `/api/currency/:code` get a specific currency by country code
