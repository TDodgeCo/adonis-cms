# APP SPECIFIC STUFF

After installing npm packages and setting up your .env file, run `npm run dev-build`. This will create essential development users and seed the database with fake data.

User Permissions Column on User Migration:
1 Editor
2 Project Manager
3 Salesperson
4 Estimator
5 Dealer
6 Customer

### Cron Jobs

Lead assignment is rotated on a round robin that is based off daily leads assigned. This column is deleted at 11:59PM every night.
In order for this to function properly, you must run `adonis run:scheduler` in the background.

# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1.  Bodyparser
2.  Session
3.  Authentication
4.  Web security middleware
5.  CORS
6.  Edge template engine
7.  Lucid ORM
8.  Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

# ToDo

- Create models for leads, customers, salespeople and managers
- Create
- Create lead account view
- Create customer account view
- Create sales/manager views
- Tie in SFDC
- Persist SFDC data to local DB
- Setup category directories and post functionality
- Get sidebar links displaying appropriately
- Actual blog?
- Setup Stripe as payment provider
- Setup Spec sheet generator
- Setup Contract Generator through docusign
