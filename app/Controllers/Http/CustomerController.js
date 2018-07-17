'use strict'
const User = use('App/Models/User')
const Customer = use('App/Models/Customer')
const Quote = use('App/Models/Quote')
const Hash = use('Hash')
const Mail = use('Mail')
const Env = use('Env')
const { validateAll } = use('Validator')
const axios = use('axios')

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
      session.flash({ notification: 'You already have an account. Please log in and do this. We have stored your inputs.'})
      return response.redirect('login')
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
      // TODO UNCOMMENT THIS FOR MAIL FUNCTIONALITY
      // if (isSame) {
      //   const userDetails = {
      //     first_name: data.first_name,
      //     email: data.email,
      //     tempPass: dirtyPass,
      //   }
      //   await Mail.send('emails.welcome-customer', userDetails, (message) => {
      //     message
      //       .to(userDetails.email)
      //       .from(Env.get('MAIL_USERNAME'))
      //       .subject('New Account Instructions - Great American Buildings')
      //   })
      // }
      const quoteData = {
        customer_id: newUser.id,
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
        bldg_zip: quote.zip
      }
      const customer = await Quote.create(quoteData) // const only for testing

      quoteData.name = newUser.first_name
      quoteData.email = newUser.email
      quoteData.phone = newUser.phone
      await axios.post('https://api.hubapi.com/contacts/v1/contact/?hapikey=1456739c-4b72-4610-847f-193a8e3837ec', {
        properties: [
          {
            "property": "email",
            "value": quoteData.email
          },
          {
            "property": "firstname",
            "value": quoteData.first_name
          },
          {
            "property": "lastname",
            "value": quoteData.last_name
          },
          {
            "property": "phone",
            "value": quoteData.phone
          },
          {
            "property": "bldg_width",
            "value": quoteData.bldg_width
          },
          {
            "property": "bldg_length",
            "value": quoteData.bldg_length
          },
          {
            "property": "bldg_height",
            "value": quoteData.bldg_height
          },
          {
            "property": "roof_pitch",
            "value": quoteData.roof_pitch
          },
          {
            "property": "overhead_door",
            "value": quoteData.overhead_door
          },
          {
            "property": "overhead_door_quant",
            "value": quoteData.overhead_door_quant
          },
          {
            "property": "man_door",
            "value": quoteData.man_door
          },
          {
            "property": "man_door_quant",
            "value": quoteData.man_door_quant
          },
          {
            "property": "bldg_window",
            "value": quoteData.bldg_window
          },
          {
            "property": "bldg_window_quant",
            "value": quoteData.bldg_window_quant
          },
          {
            "property": "roof_insulation",
            "value": quoteData.roof_insulation
          },
          {
            "property": "wall_insulation",
            "value": quoteData.wall_insulation
          },
          {
            "property": "frame_style",
            "value": quoteData.frame_style
          },
          {
            "property": "frame_coating",
            "value": quoteData.frame_coating
          },
          {
            "property": "wainscot",
            "value": quoteData.wainscot
          },
          {
            "property": "gutters",
            "value": quoteData.gutters
          },
          {
            "property": "framed_openings",
            "value": quoteData.framed_openings
          },
          {
            "property": "bldg_zip",
            "value": quoteData.bldg_zip
          }
        ]
      }).then( response => {
        if (response.data == 409 || response.data == '409') {
          session.flash({ notification: 'You already have an account. Please log in and do this. We have stored your inputs.'})
          return response.redirect('login')
        }
        console.log('the .then response: ' + response.status)
      }).catch( err => {
        console.log('error: ' + err)
      })
      this.testMethod()
    } catch (error) {
      return console.log('error: ' + error)
    }
  }

}

module.exports = CustomerController
