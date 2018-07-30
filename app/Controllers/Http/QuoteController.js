'use strict'

const User = use('App/Models/User')
const Quote = use('App/Models/Quote')
const Database = use('Database')

class QuoteController {
  async details({ view, params }) {
    const quote = await Quote.findBy('id', params.id)
    const user = await User.findBy('id', quote.customer_id)
    const salesperson = await User.findBy('id', quote.hubspot_owner_id)
    return view.render('portal.quote', {
      quote,
      user,
      salesperson
    })
  }
}

module.exports = QuoteController
