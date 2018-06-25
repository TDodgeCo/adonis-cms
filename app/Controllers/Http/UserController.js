'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const Mail = use('Mail')
const Env = use('Env')
const { validateAll } = use('Validator')

class UserController {
  async index ({ view }) {
    return view.render('user.signup')
  }

  async store ({ request, auth, response }) {
    const userData = request.only(['name', 'email', 'password'])
    const user = await User.create(userData)
    await Mail.send('emails.welcome', userData.toJSON(), (message) => {
          message
            .to(user.email)
            .from(Env.get('MAIL_USERNAME'))
            .subject('Welcome to GAB')
        })
    await auth.attempt(userData.email, userData.password)
    return response.redirect('account')
  }

  async invite ({ request, auth, response, session }) {
    let userData = request.only([ 'name', 'email', 'password', 'admin'])
    if (userData.admin) {
      userData.admin = true
      await User.create(userData)
      await Mail.send('emails.welcome', userData, (message) => {
            message
              .to(userData.email)
              .from(Env.get('MAIL_USERNAME'))
              .subject('New Account Created - Great American Buildings')
          })
      session.flash({ notification: 'Admin User Added!'})
      return response.redirect('/account')
      }
    await User.create(userData)
    await Mail.send('emails.welcome', userData, (message) => {
          message
            .to(userData.email)
            .from(Env.get('MAIL_USERNAME'))
            .subject('New Account Created - Great American Buildings')
        })
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

  async test ({ request }) {

  }
}

module.exports = UserController
