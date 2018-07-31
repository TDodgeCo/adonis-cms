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
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async faker => {
  return {
    name: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    first_name: faker.name(),
    last_name: faker.last(),
    phone: faker.phone(),
    permissions: 6
  }
})

// Factory.blueprint('App/Models/Post', async faker => {
//   return {
//     slug: faker.string(),
//     directory: 'regional',
//     description: faker.sentence(),
//     title: faker.sentence(),
//     body: faker.paragraph()
//   }
// })

// Factory.blueprint('App/Models/Faq', async faker => {
//   return {
//     post_id: faker.integer({ min: 1, max: 20 }),
//     faq_title: faker.sentence(),
//     faq_body: faker.paragraph()
//   }
// })

Factory.blueprint('App/Models/Quote', async faker => {
  return {
    customer_id: faker.integer({ min: 5, max: 10 }),
    salesperson: 1,
    hubspot_owner_id: 32947313,
    bldg_street_address: faker.address(),
    bldg_street_address_2: 'none',
    bldg_city: faker.city(),
    bldg_state: faker.state(),
    bldg_zip: faker.zip(),
    bldg_width: faker.integer({ min: 10, max: 150 }),
    bldg_length: faker.integer({ min: 20, max: 250 }),
    bldg_height: faker.integer({ min: 10, max: 40 }),
    roof_pitch: faker.integer({ min: 1, max: 12 }),
    wainscot: faker.bool(),
    wall_color: faker.color(),
    trim_color: faker.color(),
    roof_color: faker.color(),
    roof_snow_load: faker.integer({ min: 0, max: 100 }),
    wind_load: faker.integer({ min: 115, max: 180 }),
    weight: faker.integer({ min: 2500, max: 100000 })
  }
})
