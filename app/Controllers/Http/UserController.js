'use strict'
const User = use('App/Models/User')
const Activity = use('App/Models/Activity')
const Hash = use('Hash')
const Mail = use('Mail')
const Env = use('Env')
const { validateAll } = use('Validator')

class UserController {
  /**
  **  Currently shows the signup page. TODO Refactor to API || stronger passwords
  **/
  async index ({ view }) {
    return view.render('user.signup')
  }

  async store ({ request, auth, response }) {
    const userData = request.only(['first_name', 'last_name', 'email', 'password'])
    const user = await User.create(userData)
    user.sessions = 2
    user.ip_address = request.ip()
    user.captured_from = request.originalUrl()
    await user.save()
    // await Mail.send('emails.welcome', userData, (message) => {
    //       message
    //         .to(user.email)
    //         .from(Env.get('MAIL_USERNAME'))
    //         .subject('Welcome to GAB')
    //     })
    await auth.remember(true).attempt(userData.email, userData.password)
    return response.redirect('account')
  }
  /**
  **  Allows an admin to create and invite a new user TODO stronger passwords
  **/
  async invite ({ request, auth, response, session }) {
    if (auth.user.admin === 0) {
      return response.json({
        status: 'error',
        message: 'You are not authorized to do that.'
      })
    }
    let userData = request.only([ 'first_name', 'last_name', 'email', 'password', 'admin' ])
    if (userData.admin) {
      userData.admin = true
      await User.create(userData)
      await Mail.send('emails.welcome-invite', userData, (message) => {
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
  /**
  **  Logs the user in
  **/
  async login ({ request, auth, response }) {
    const user = request.only(['email', 'password'])
    const activityDetails = {
      login_url: request.originalUrl(),
      login_ip_address: request.ip()
    }
    await auth.remember(true).attempt(user.email, user.password)
    const userSession = await User.find(auth.user.id)
    userSession.sessions = userSession.sessions + 1
    userSession.activity().attach(activityDetails)
    await userSession.save()
    return response.redirect('account')
  }
  /**
  **  Logs the user out
  **/
  async logout ({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }
  /**
  **  shows the account page. admins can view and edit users
  **/
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
  /**
  **  resets a users password
  **/
  async resetPassword ({ request, response, session, auth }) {
    if (request.input('id')) {
      const user = await User.findBy('id', request.input('id'))
      const dirtyPass = await Hash.make(String(Date.now() * 3))
      user.password = dirtyPass
      user.ip_address = request.ip()
      user.captured_from = request.originalUrl()
      await user.save()
      // make sure the hashes match
      const hashedPass = await user.password
      const isSame = await Hash.verify(dirtyPass, user.password)
      if (isSame) {
        const userDetails = {
          name: user.first_name,
          email: user.email,
          tempPass: dirtyPass,
        }
        await Mail.send('emails.reset-password', userDetails, (message) => {
              message
                .to(userDetails.email)
                .from(Env.get('MAIL_USERNAME'))
                .subject('Password Reset Instructions - Great American Buildings')
            })
      }
      return console.log(isSame)
    }
    const user = auth.current.user
    user.password = request.input('password')
    await user.save()
    const isSame = await Hash.verify(request.input('password'), user.password)
    console.log(isSame)
    if(isSame) {
      session.flash({ notification: 'Password Updated!'})
      return response.redirect('/account')
    }
    session.flash({ notification: 'Something went wrong. Try again.'})
    return response.redirect('back')
  }

}

module.exports = UserController
