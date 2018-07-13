'use strict'

const Schema = use('Schema')

class DealerSchema extends Schema {
  up () {
    this.create('dealers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('dealers')
  }
}

module.exports = DealerSchema
