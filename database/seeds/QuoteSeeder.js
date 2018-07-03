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
const Database = use('Database')

class QuoteSeeder {
  async run () {
    const quotesArray = await Factory.model('App/Models/Quote').create()
  }
}

module.exports = QuoteSeeder
