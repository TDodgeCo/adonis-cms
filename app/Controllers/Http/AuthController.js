'use strict'

const User = use('App/Models/User')
const Activity = use('App/Models/Activity')
const Hash = use('Hash')
const Mail = use('Mail')
const Env = use('Env')
const { validateAll } = use('Validator')

class AuthController {
  /**
   **  Logs the user in
   **/
  async login({ request, auth, response, session }) {
    const user = request.only(['email', 'password', 'remember'])
    if (user.remember) {
      await auth.remember(true).attempt(user.email, user.password)
    } else {
      await auth.attempt(user.email, user.password)
    }
    const userSession = await User.find(auth.user.id)
    userSession.sessions = userSession.sessions + 1
    await userSession.save()
    const activityDetails = {
      login_url: request.originalUrl(),
      login_ip_address: request.ip(),
      user_id: auth.user.id
    }
    await Activity.create(activityDetails)
    const isAuth = await auth.check()
    if (isAuth) {
      return response.redirect('/portal')
    }
    session.flash({ notification: 'Username or password incorrect.' })
    return response.redirect('back')
  }

  /**
   * Allows user to reset their password through email
   */
  async forgotPassword({ request, response, session }) {
    const data = request.all()
    try {
      // No need for if statement because findByOrFail throws an error
      const user = await User.findByOrFail('email', data.email)
      const pass = await Hash.make(String(Date.now() * 3))
      user.password = pass
      await user.save()
      const isSame = await Hash.verify(pass, user.password)
      if (isSame) {
        const userDetails = {
          name: user.first_name,
          email: user.email,
          tempPass: pass
        }
        await Mail.send('emails.reset-password', userDetails, message => {
          message
            .to(userDetails.email)
            .from(Env.get('MAIL_USERNAME'))
            .subject('Password Reset Instructions - Great American Buildings')
        })
        session.flash({ notification: 'Password reset instructions sent.' })
        return response.redirect('back')
      }
    } catch (err) {
      session.flash({ error: 'No user found.' })
      console.log(err)
      return response.redirect('back')
    }
  }

  async tempPassword({ auth, request, response, session }) {
    const { email, tempPass } = request.all()
    try {
      auth.attempt(email, tempPass)
      return response.redirect('/portal/reset-password')
    } catch (err) {
      session.flash({ error: 'Incorrect credentials.' + err })
      return response.redirect('back')
    }
  }

  async resetPassword({ auth, request, response, session }) {}
}

module.exports = AuthController
