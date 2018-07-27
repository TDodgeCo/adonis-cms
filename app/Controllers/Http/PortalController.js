'use strict'
const User = use('App/Models/User')
const Quote = use('App/Models/Quote')
const axios = use('axios')

class PortalController {
  async index({ view, auth }) {
    const user = auth.user
    const users = await User.all()
    if (!user.admin) {
      console.log('!user.admin')
      return view.render('/')
    }
    if (user.admin) {
      return view.render('portal.index', {
        users: users.toJSON()
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
     */
    // TODO SWITCH WONT WORK - IF ELSE
    const user = auth.user
    let quotes;
    switch (user.permissions) {
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
