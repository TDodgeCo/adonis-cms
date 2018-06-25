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
    user.sessions = 2
    await user.save()
    await Mail.send('emails.welcome', userData, (message) => {
          message
            .to(user.email)
            .from(Env.get('MAIL_USERNAME'))
            .subject('Welcome to GAB')
        })
    await auth.attempt(userData.email, userData.password)
    return response.redirect('account')
  }

  async invite ({ request, auth, response, session }) {
    if (auth.user.admin === 0) {
      return response.json({
        status: 'error',
        message: 'You are not authorized to do that.'
      })
    }
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
    const userSession = await User.find(auth.user.id)
    userSession.sessions = userSession.sessions + 1
    await userSession.save()
    return response.redirect('account')
  }

  async logout ({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }

  async account ({ view, auth, response }) {
    if (auth.user.sessions === 1) {
      return response.redirect('/set-password')
    }
    const users = await User.all()
    return view.render('account', {
      users: users.toJSON()
    })
    console.log(session.all())
  }

  async resetPassword ({ request, view, session, auth }) {
    const user = auth.current.user
    let password = await Hash.make(request.input('password'))
    user.password = password
    await user.save()
    session.flash({ notification: 'Password Updated!'})
    response.redirect('/account')
  }

}

module.exports = UserController
