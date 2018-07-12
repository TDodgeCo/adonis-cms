'use strict'

const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.timestamps()
      table.string('company_name')
      table.string('phone').notNullable()
      table.string('ip_address').notNullable() // IP address that initially filled out the form
      table.string('captured_from').notNullable() // The page the customer filled the form out on
      table.string('billing_street')
      table.string('billing_street_2')
      table.string('billing_city')
      table.string('billing_state')
      table.string('billing_zip')
      table.integer('customer_id').unsigned()
      table.foreign('customer_id').references('users.id')
    })
  }

  down () {
    this.drop('customers')
  }
}

module.exports = CustomerSchema
