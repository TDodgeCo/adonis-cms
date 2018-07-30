'use strict'

const User = use('App/Models/User')
const Quote = use('App/Models/Quote')
const Database = use('Database')

class QuoteController {
  async details({ view, params }) {
    const quote = await Quote.findBy('id', params.id)
    const user = await User.findBy('id', quote.customer_id)
    const salesperson = await User.findBy(
      'hubspot_owner_id',
      quote.hubspot_owner_id
    )
    return view.render('portal.quote', {
      quote,
      user,
      salesperson
    })
  }
  async open({ view }) {
    const quotes = await Quote.query()
      .where('cost', null)
      .fetch()
    return view.render('portal.quotes', {
      quotes: quotes.toJSON()
    })
  }

  async update({ request, response, params, session }) {
    try {
      const data = request.all()
      const quote = await Quote.findBy('id', params.id)

      quote.estimator = data.estimator
      quote.bldg_street_address = data.bldg_street_address
      quote.bldg_street_address_2 = data.bldg_street_address_2
      quote.bldg_city = data.bldg_city
      quote.bldg_state = data.bldg_state
      quote.bldg_zip = data.bldg_zip
      quote.bldg_width = data.bldg_width
      quote.bldg_length = data.bldg_length
      quote.bldg_height = data.bldg_height
      quote.roof_pitch = data.roof_pitch
      quote.overhead_door = data.overhead_door
      quote.overhead_quant = data.overhead_quant
      quote.overhead_insulation = data.overhead_insulation
      quote.man_door = data.man_door
      quote.man_door_quant = data.man_door_quant
      quote.bldg_window = data.bldg_window
      quote.bldg_window_quant = data.bldg_window_quant
      quote.roof_insulation = data.roof_insulation
      quote.wall_insulation = data.wall_insulation
      quote.frame_style = data.frame_style
      quote.wainscot = data.wainscot
      quote.roof_snow_load = data.roof_snow_load
      quote.ground_snow_load = data.ground_snow_load
      quote.wind_load = data.wind_load
      quote.exposure = data.exposure
      quote.seismic = data.seismic
      quote.building_code = data.building_code
      quote.frame_coating = data.frame_coating
      quote.secondary_coating = data.secondary_coating
      quote.gutters = data.gutters
      quote.framed_openings = data.framed_openings
      quote.weight = data.weight
      quote.collateral_load = data.collateral_load
      quote.live_load = data.live_load
      quote.other_load = data.other_load
      quote.freight = data.freight
      quote.cost = data.cost
      quote.accessories_cost = data.accessories_cost
      quote.engineering_cost = data.engineering_cost

      await quote.save()
      session.flash({ notification: 'Estimate successfully updated.' })
      return response.redirect('/portal/quotes/' + quote.id)
    } catch (err) {
      session.flash({ error: err })
      console.log(err)
      return response.redirect('back')
    }
  }
}

module.exports = QuoteController
