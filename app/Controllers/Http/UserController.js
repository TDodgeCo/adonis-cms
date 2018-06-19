'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const Mail = use('Mail')
const { validateAll } = use('Validator')

class UserController {
  async index ({ view }) {
    return view.render('user.signup')
  }

  async store ({ request, auth, view }) {
    const userData = request.only(['username', 'email', 'password'])
  }
}

module.exports = UserController
