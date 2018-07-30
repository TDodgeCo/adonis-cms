'use strict'

/*
|--------------------------------------------------------------------------
| QuoteSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class QuoteSeeder {
  async run() {
    const quotes = await Factory.model('App/Models/Quote').createMany(10)
  }
}

module.exports = QuoteSeeder
