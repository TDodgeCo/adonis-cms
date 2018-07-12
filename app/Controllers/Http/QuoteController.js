'use strict'

const User = use('App/Models/User')
const Quote = use('App/Models/Quote')
const Database = use('Database')

class QuoteController {

  async index ({ response, auth, view }) {
    const user = auth.current.user
    const quotes = await Database.from('quotes').where('user_id', user.id)
    return view.render('account.quotes', {
      quotes: quotes,
      user: user
    })
  }

}

module.exports = QuoteController
