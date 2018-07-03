'use strict'

/*
|--------------------------------------------------------------------------
| FaqSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class FaqSeeder {
  async run () {
    const faqs = await Factory.model('App/Models/Faq').createMany(80)
  }
}

module.exports = FaqSeeder
