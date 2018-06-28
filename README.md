# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

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
