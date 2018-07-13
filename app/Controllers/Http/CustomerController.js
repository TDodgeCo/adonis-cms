'use strict'
const User = use('App/Models/User')
const Customer = use('App/Models/Customer')
const Quote = use('App/Models/Quote')
const Hash = use('Hash')
const Mail = use('Mail')
const Env = use('Env')
const { validateAll } = use('Validator')

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


class CustomerController {
  async store ({ request, response, session }) {
    const data = request.only(['first_name', 'email', 'phone', 'zip'])
    const quote = request.all()
    console.log(quote)
    const user = await User.findBy('email', data.email)
    if (user) {
      return response.redirect('login')
      session.flash({ notification: 'You already have an account. Please log in and do this. We have stored your inputs.'})
      // TODO send/save input data and present after user authenticates
    }
    console.log('Attempting to create user ' + data.first_name)

    try {
      let dirtyPass = await Hash.make(String(Date.now() * 3))
      dirtyPass = replaceAll(dirtyPass, '/', 't')
      data.ip_address = request.ip()
      data.captured_from = request.originalUrl()
      data.password = dirtyPass
      const newUser = await User.create(data)
      // make sure the hashes match
      const isSame = await Hash.verify(data.password, newUser.password)
      console.log(isSame)
      if (isSame) {
        const userDetails = {
          first_name: data.first_name,
          email: data.email,
          tempPass: dirtyPass,
        }
        await Mail.send('emails.welcome-customer', userDetails, (message) => {
          message
            .to(userDetails.email)
            .from(Env.get('MAIL_USERNAME'))
            .subject('New Account Instructions - Great American Buildings')
        })
      }
      const quoteData = {
        user_id: newUser.id,
        bldg_width: quote.bldg_width,
        bldg_length: quote.bldg_length,
        bldg_height: quote.bldg_height,
        roof_pitch: quote.roof_pitch,
        overhead_door: quote.overhead_door,
        overhead_quant: quote.overhead_quant,
        man_door: quote.man_door,
        man_door_quant: quote.man_door_quant,
        bldg_window: quote.bldg_window,
        bldg_window_quant: quote.bldg_window_quant,
        roof_insulation: quote.roof_insulation,
        wall_insulation: quote.wall_insulation,
        frame_style: quote.frame_style,
        frame_coating: quote.frame_coating,
        wainscot: quote.wainscot,
        gutters: quote.gutters,
        framed_openings: quote.framed_openings,
        zip: quote.zip
      }
      const customer = await Quote.create(quoteData) // const only for testing
      return console.log(customer)
    } catch (error) {
      return console.log('error: ' + error)
    }
  }
}

module.exports = CustomerController
