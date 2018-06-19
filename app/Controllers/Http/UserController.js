'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const Mail = use('Mail')
const { validateAll } = use('Validator')

class UserController {
  async index ({ view }) {
    return view.render('user.signup')
  }

  async store ({ request, auth, response }) {
    const userData = request.only(['username', 'email', 'password'])
    console.log('user data is ' + userData.username + ' ' + userData.email)
    const user = await User.create(userData)

    await auth.attempt(userData.email, userData.password)
    return response.redirect('account')
  }

  async login ({ request, auth, response }) {
    const user = request.only(['email', 'password'])
    await auth.attempt(user.email, user.password)
    return response.redirect('account')
  }

  async logout ({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }

  async account ({ view }) {
    return view.render('account')
    console.log(session.all())
  }
}

module.exports = UserController
