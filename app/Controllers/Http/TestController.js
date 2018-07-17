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

class TestController {
  async store ({ request, response, session, view }) {
    const data = request.only(['first_name', 'email', 'phone', 'zip'])
    const quote = request.all()
    console.log(quote)

    try {
      let dirtyPass = await Hash.make(String(Date.now() * 3))
      dirtyPass = replaceAll(dirtyPass, '/', 't')
      const quoteData = {
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
      quoteData.name = quote.first_name
      quoteData.email = quote.email
      quoteData.phone = quote.phone
      await axios.post('https://api.hubapi.com/contacts/v1/contact/?hapikey=' + Env.get('HAPI_KEY'), {
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
            "property": "company",
            "value": quote.company_name
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
        console.log('then response is : ' + response.data)
        if (response.status == 200 || response.status == '200') {
          session.flash({ success: 'Request received! We will email your quote as soon as an estimator finishes it. This typically takes less than 24 hours.'})
          // return response.redirect('back')
        }
        console.log('the .then response: ' + response.status)
      }).catch( err => {
        // SUBMIT DEAL IF CONTACT EXISTS
        console.log('error: ' + err)
        console.log('err object keys: ' + Object.keys(err))
        const vid = err.response.data.identityProfile.vid
        console.log(vid)
        axios.post('https://api.hubapi.com/deals/v1/deal?hapikey=' + Env.get('HAPI_KEY'), {
          "associations": {
            "associatedVids": [vid]
          },
          "properties": [
            {
              "name": "amount",
              "value": "2000"
            },
            {
              "name": "dealstage",
              "value": "appointmentscheduled"
            }
          ]
        }).then( response => {
          console.log('deal response keys: ' + Object.keys(response.data))
        }).catch( err => {
          const error = err
          console.log('deal error response keys: ' + Object.keys(error.response.data))
          console.log('error response data: ' + error.response.data.message)
        })
        session.flash({ failure: 'Looks like that email has been used already. Please log in to your account or contact your rep to request another quote.'})
        // return view.render('pages.quote-request', {
        //   quote: quote
        // })
      })
    } catch (error) {
      session.flash({ failure: 'Something went wrong. Please try again.' })
      // response.redirect('back')
      return console.log('catch error: ' + error)
    }
  }

}

module.exports = TestController
