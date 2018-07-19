'use strict'
const User = use('App/Models/User')
const Quote = use('App/Models/Quote')
const axios = use('axios')

class PortalController {
  async index ({ view }) {
    return view.render('portal.index')
  }
  async quotes ({ view, auth }) {
    const quotes = await Quote
      .query()
      .where('customer_id', auth.user.id)
      .fetch()
    console.log(quotes)
    return view.render('portal.quotes', {
      quotes: quotes.toJSON()
    })
  }
  async projects ({ view }) {
    return view.render('portal.quotes')
  }
}

module.exports = PortalController
