'use strict'

const Schema = use('Schema')

class QuoteSchema extends Schema {
  up () {
    this.create('quotes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().defaultTo(1)
      table.string('estimator')
      table.string('street_address').notNullable()
      table.string('street_address_2')
      table.string('city')
      table.string('state')
      table.integer('zip').unsigned().notNullable()
      table.integer('width').unsigned().notNullable()
      table.integer('length').unsigned().notNullable()
      table.integer('height').unsigned().notNullable()
      table.integer('roof_pitch').unsigned().notNullable().defaultTo(1)
      table.integer('overhead_doors').unsigned().defaultTo(0)
      table.integer('rollup_doors').unsigned().defaultTo(0)
      table.integer('man_doors').unsigned().defaultTo(0)
      table.integer('windows').unsigned().defaultTo(0)
      table.string('roof_insulation').defaultTo('None')
      table.string('wall_insulation').defaultTo('None')
      table.string('frame_style').defaultTo('Gable')
      table.boolean('wainscot').defaultTo(false)
      table.string('wall_color').defaultTo('Polar White')
      table.string('trim_color').defaultTo('Koko Brown')
      table.string('roof_color').defaultTo('Galvalume')
      table.integer('snow_load').unsigned().defaultTo(0)
      table.integer('wind_load').unsigned().defaultTo(115)
      table.string('exposure').defaultTo('C')
      table.string('seismic').defaultTo('D')
      table.string('building_code').defaultTo('IBC-15')
      table.string('frame_coating').defaultTo('Gray Oxide')
      table.string('secondary_coating').defaultTo('G90 Galvanized')
      table.integer('weight').unsigned()
      table.integer('collateral_load').unsigned().defaultTo(1)
      table.integer('live_load').unsigned().defaultTo(20)
      table.integer('other_load').unsigned().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('quotes')
  }
}

module.exports = QuoteSchema
