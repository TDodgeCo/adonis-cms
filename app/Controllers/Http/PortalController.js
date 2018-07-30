'use strict'
const User = use('App/Models/User')
const Quote = use('App/Models/Quote')
const axios = use('axios')

class PortalController {
  async index({ view, auth }) {
    const user = auth.user

    if (user.permissions != 6 || user.permission != 5) {
      const users = await User.all()
      const quotes = await Quote.all()
      const openQuotes = await Quote.query()
        .where('cost', null)
        .getCount()

      // salesQuotes for displaying to a salesperson quotes that need a price
      const salesQuotes = await Quote.query()
        .where('salesperson', user.id)
        .where('price', null)
        .getCount()

      return view.render('portal.index', {
        users: users.toJSON(),
        quotes: quotes.toJSON(),
        openQuotes,
        salesQuotes
      })
    }
    return view.render('portal.index')
  }

  async quotesPage({ view, auth }) {
    /**
     * PERMISSIONS LEGEND
     * 6 - customer
     * 5 - dealer
     * 4 - estimator
     * 3 - salesperson
     * 2 - project manager
     * 1 - editor
     * 0 - admin
     */
    // TODO SWITCH WONT WORK - IF ELSE
    const user = auth.user
    let quotes
    switch (user.permissions) {
      case 0:
        quotes = await Quote.all()
        return view.render('portal.quotes', {
          user: user,
          quotes: quotes.toJSON()
        })
      case 3:
        quotes = await Quote.query()
          .where('hubspot_owner_id', user.hubspot_owner_id)
          .fetch()
        console.log(quotes)
        return view.render('portal.quotes', {
          user: auth.user,
          quotes: quotes.toJSON()
        })
        break
      case 4:
        quotes = await Quote.query()
          .where('cost', null)
          .fetch()
        console.log(quotes)
        return view.render('portal.quotes', {
          user: auth.user,
          quotes: quotes.toJSON()
        })
        break
      case 6:
        quotes = await Quote.query()
          .where('customer_id', user.id)
          .fetch()
        console.log(quotes)
        return view.render('portal.quotes', {
          quotes: quotes.toJSON()
        })
        break
      default:
        console.log('permissions not recognized. redirecting to homepage.')
        return view.render('/')
    }
  }
  async projects({ view }) {
    return view.render('portal.projects')
  }
}

module.exports = PortalController
