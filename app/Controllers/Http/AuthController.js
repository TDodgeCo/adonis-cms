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
      await auth.attempt(email, tempPass)
      return response.redirect('/portal/reset-password')
    } catch (err) {
      session.flash({ error: 'Incorrect credentials.' + err })
      return response.redirect('back')
    }
  }

  async resetPassword({ auth, request, response, session }) {
    let pass = request.input('password')
    const user = auth.user
    try {
      function validatePassword() {
        var newPassword = pass
        var minNumberofChars = 6
        var maxNumberofChars = 16
        var regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        if (newPassword.length < minNumberofChars || newPassword.length > maxNumberofChars) {
          session.flash({ error: 'Password should be between 6 and 16 characters.'})
          return response.redirect('back')
        }
        if (!regularExpression.test(newPassword)) {
          session.flash({ error: 'Password should contain atleast one number and one special character.'})
          return response.redirect('back')
        }
        return true
      }
      if (validatePassword()) {
        console.log('password valid')
        user.password = await Hash.make(pass)
        user.save()
        const isSame = await Hash.verify(pass, user.password)
        if (isSame) {
          return response.redirect('/portal')
        }
      }
      sessions.flash({ error: 'Something went wrong. Try again.'})
      return response.redirect('back')
    } catch (err) {
      sessions.flash({ error: 'We caught an error. Try again.'})
      return response.redirect('back')
    }
  }
}

module.exports = AuthController
