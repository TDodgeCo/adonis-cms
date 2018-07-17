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

  async newStore ({ request, response, session, view}) {
    console.log(await Hash.make(replaceAll(String(Date.now() * 3 ), '/', 't')))
    const quote = request.all()
    quote.ip_address = request.ip()
    quote.captured_from = request.originalUrl()
    try {
      const user = await User.findBy('email', quote.email)
      console.log('can user be found by email? ' + user == true)
      if (!user) {
        console.log('no user found')
        this.userNotFound({ quote })
      }
      console.log('user found. userID: ' + user.id)
      this.userFound({ quote })
    } catch (err) {
      console.log(
        'user is: ' + quote.first_name +
        '\nerr: ' + err
      )
    }
  }

  async userFound ({ quote }) {
    console.log('userFound method initiated \n user email is: ' + quote.email)
    try {
      this.createDealInHubSpot({ quote })
    } catch (err) {
      console.log('userFound Method Error: ' + err)
    }

    try {
      await Mail.send('emails.multiple-quote-requests', quote, (message) => {
            message
              .to(quote.email)
              .from(Env.get('MAIL_USERNAME'))
              .subject('Additional Quote Requested - Great American Buildings')
          })
    } catch (err) {
      console.log('userFound method mail function error: ' + err)
    }
  }

  async userNotFound ({ quote }) {
    console.log('userNotFound method initiated \nemail of requested quote: ' + quote.email)
    let dirtyPass = await Hash.make(replaceAll(String(Date.now() * 3 ), '/', 't'))
    quote.password = dirtyPass
    try {
      const user = await User.create({
        first_name: quote.first_name,
        last_name: quote.last_name,
        email: quote.email,
        password: dirtyPass
      })
      console.log('created user: ' + user.id)
      return this.createContactInHubSpot({ quote })
    } catch (err) {
      console.log('userNotFound Catch Error: ' + err)
    }
  }

  async createContactInHubSpot ({ quote }) {
    try {
      var vid;
      await axios.post('https://api.hubapi.com/contacts/v1/contact/?hapikey=1456739c-4b72-4610-847f-193a8e3837ec', {
        properties: [
          {
            "property": "email",
            "value": quote.email
          },
          {
            "property": "firstname",
            "value": quote.first_name
          },
          {
            "property": "lastname",
            "value": quote.last_name
          },
          {
            "property": "company",
            "value": quote.company_name
          },
          {
            "property": "phone",
            "value": quote.phone
          },
          {
            "property": "hubspot_owner_id",
            "value": 32889852

          }
        ]
      }).then( response => {
        console.log('create contact .then vid are: ' + response.data.vid)
        vid = response.data.vid
        console.log('vid = ' + vid)
      }).catch(err => {
        console.log('create contact catch message is: ' + err.response.data.message)
      })
      quote.vid = vid
      return this.createDealInHubSpot({ quote })
    } catch (err) {
      console.log('axios catch err is: ' + err)
    }
    console.log('createContactInHubSpot is not initiated: ' + quote)
  }

  async createDealInHubSpot ({ quote }) {
    console.log(quote.vid)
    const dealName = quote.first_name + ' ' + quote.last_name + ' ' + quote.bldg_width + 'x' + quote.bldg_length + 'x' + quote.bldg_height
    try {
      axios.post('https://api.hubapi.com/deals/v1/deal?hapikey=' + Env.get('HAPI_KEY'), {
        "associations": {
          "associatedVids": [
            quote.vid
          ]
        },
        "properties": [
          {
            "value": dealName,
            "name": "dealname"
          },
          {
            "value": quote.zip,
            "name": "bldg_zip"
          },
          {
            "value": 32889852,
            "name": "hubspot_owner_id"
          }
        ]
      })
      this.createLocalQuote({ quote })
    } catch (err) {
      console.log('createDealInHubSpot catch error: ' + err)
    }
  }
  async createLocalQuote ({ quote }) {
    try {
      const user = await User.findBy('email', quote.email)
      quote.customer_id = user.id
      quote.bldg_zip = quote.zip
      delete quote._csrf
      delete quote.ip_address
      delete quote.captured_from
      delete quote.company_name
      delete quote.email
      delete quote.first_name
      delete quote.last_name
      delete quote.phone
      delete quote.password
      delete quote.zip
      delete quote.vid

      console.log('createLocalQuote test: ' + quote)
      const newQuote = await Quote.create(quote)
      console.log('Quote Created! id is: ' + newQuote)
    } catch (err) {
      console.log('createLocalQuote err: ' + err)
    }
  }
}

module.exports = CustomerController
