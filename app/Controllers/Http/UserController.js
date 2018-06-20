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
    const userData = request.only(['name', 'email', 'password'])
    await User.create(userData)

    await auth.attempt(userData.email, userData.password)
    return response.redirect('account')
  }

  async invite ({ request, auth, response, session }) {
    let userData = request.only([ 'name', 'email', 'password', 'admin'])
    console.log(userData)
    if (userData.admin) {
      userData.admin = true
      await User.create(userData)
      session.flash({ notification: 'Admin User Added!'})
      return response.redirect('/account')
      }
    console.log('is invite, non admin')
    await User.create(userData)
    session.flash({ notification: 'User Added!'})
    return response.redirect('/account')
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
    const users = await User.all()
    return view.render('account', {
      users: users.toJSON()
    })
    console.log(session.all())
  }
}

module.exports = UserController
