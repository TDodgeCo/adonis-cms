'use strict'

const Schema = use('Schema')

class SalespersonSchema extends Schema {
  up () {
    this.create('salespeople', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('salespeople')
  }
}

module.exports = SalespersonSchema
