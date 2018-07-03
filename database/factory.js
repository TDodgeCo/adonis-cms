'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

// Factory.blueprint('App/Models/Test', async (faker) => {
//   return {
//     test_int: faker.integer(),
//     test_string: faker.string(),
//   }
// })

// const Factory = use('Factory')
// const Hash = use('Hash')

// Factory.blueprint('App/Models/User', async (faker) => {
//   return {
//     name: faker.name(),
//     email: faker.email(),
//     password: await Hash.make(faker.password())
//   }
// })

Factory.blueprint('App/Models/Quote', async (faker) => {
  return {
    user_id: faker.integer({ min: 1, max: 5}),
    estimator: faker.name(),
    street_address: faker.address(),
    city: faker.city(),
    state: faker.state(),
    zip: faker.zip(),
    width: faker.integer({ min: 10, max: 150 }),
    length: faker.integer({ min: 20, max: 250 }),
    height: faker.integer({ min: 10, max: 40 }),
    roof_pitch: faker.integer({ min: 1, max: 12 }),
    wainscot: faker.bool(),
    wall_color: faker.color(),
    trim_color: faker.color(),
    roof_color: faker.color(),
    snow_load: faker.integer({ min: 0, max: 100 }),
    wind_load: faker.integer({ min: 115, max: 180 }),
    weight: faker.integer({ min: 2500, max: 100000 }),
  }
})

// Factory.blueprint('App/Models/Quote', async (faker) => {
//   return {
//     slug: 'blah-blah',
//     directory: 'blah-lbahl',
//     description: 'l;kasdjfklasjf l;asjfask dfasdkljf a;sdljfsadkfjasd',
//     title: 'l;kasdjfklasjf l;asjfask dfasdkljf a;sdljfsadkfjasd',
//     body: 'l;kasdjfklasjf l;asjfask dfasdkljf a;sdljfsadkfjasd'
//   }
// })
