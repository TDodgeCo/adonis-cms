'use strict'
const User = use('App/Models/User')
const Quote = use('App/Models/Quote')
const axios = use('axios')

class PortalController {
  async index ({ view, auth }) {
    return view.render('portal.index', {
      user: auth.user
    })
  }
  /**
     * PERMISSIONS LEGEND
     * 6 - customer
     * 5 - dealer
     * 4 - estimator
     * 3 - salesperson
     * 2 - project manager
     * 1 - editor
     */
  async quotes ({ view, auth }) {
    const user = auth.user
    if (user.permissions == 6) {
      const quotes = await Quote
      .query()
      .where('customer_id', user.id)
      .fetch()
      console.log(quotes)
      return view.render('portal.quotes', {
        quotes: quotes.toJSON()
      })
    }
    else if (user.permissions == 3) {
      const quotes = await Quote
        .query()
        .where('hubspot_owner_id', user.hubspot_owner_id)
        .fetch()
      console.log(quotes)
      return view.render('portal.quotes', {
        user: auth.user,
        quotes: quotes.toJSON()
      })
    }
    else if (user.permissions == 4) {
      const quotes = await Quote
        .query()
        .where('cost', null)
        .fetch()
      console.log(quotes)
      return view.render('portal.quotes', {
        user: auth.user,
        quotes: quotes.toJSON()
      })  
    }
  }
  async projects ({ view }) {
    return view.render('portal.quotes')
  }
}

module.exports = PortalController
