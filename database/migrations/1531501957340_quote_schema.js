'use strict'

const Schema = use('Schema')

class QuoteSchema extends Schema {
  up () {
    this.create('quotes', (table) => {
      table.increments()
      table.integer('customer_id').notNullable()
      // This will become "assigned_to" and point to the sales person
      table.string('estimator')
      table.string('bldg_street_address').notNullable()
      table.string('bldg_street_address_2')
      table.string('bldg_city')
      table.string('bldg_state')
      table.string('bldg_zip').notNullable()
      table.integer('bldg_width').unsigned().notNullable()
      table.integer('bldg_length').unsigned().notNullable()
      table.integer('bldg_height').unsigned().notNullable()
      table.string('roof_pitch').notNullable().defaultTo('1:12')
      table.string('overhead_door')
      table.integer('overhead_quant').unsigned().defaultTo(0)
      table.boolean('overhead_insulation').defaultTo(false)
      table.string('man_door')
      table.integer('man_door_quant').unsigned().defaultTo(0)
      table.string('bldg_window')
      table.integer('bldg_window_quant').unsigned().defaultTo(0)
      table.string('roof_insulation').defaultTo('None')
      table.string('wall_insulation').defaultTo('None')
      table.string('frame_style').defaultTo('Gable')
      table.boolean('wainscot').defaultTo(false)
      table.string('wall_color').defaultTo('Polar White')
      table.string('trim_color').defaultTo('Koko Brown')
      table.string('roof_color').defaultTo('Galvalume')
      table.integer('roof_snow_load').unsigned().defaultTo(0)
      table.integer('ground_snow_load').unsigned().defaultTo(0)
      table.integer('wind_load').unsigned().defaultTo(115)
      table.string('exposure').defaultTo('C')
      table.string('seismic').defaultTo('D')
      table.string('building_code').defaultTo('IBC-15')
      table.string('frame_coating').defaultTo('Gray Oxide')
      table.string('secondary_coating').defaultTo('G90 Galvanized')
      table.string('gutters')
      table.text('framed_openings')
      table.integer('weight').unsigned()
      table.integer('collateral_load').unsigned().defaultTo(1)
      table.integer('live_load').unsigned().defaultTo(20)
      table.integer('other_load').unsigned().defaultTo(0)
      table.integer('freight').unsigned()
      table.integer('price').unsigned()
      table.integer('deposit').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('quotes')
  }
}

module.exports = QuoteSchema
