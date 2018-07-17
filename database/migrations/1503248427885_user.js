'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.integer('sessions').defaultTo(0)
      table.string('name', 55).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.boolean('admin').defaultTo(false)
      table.string('ip_address')
      table.string('captured_from')
      table.string('first_name')
      table.string('last_name')
      table.string('title')
      table.string('phone')
      table.string('company')
      table.string('address')
      table.string('address_2')
      table.string('city')
      table.string('state')
      table.string('zip')
      table.integer('permissions').unsigned()
      table.integer('leads_assigned').unsigned()
      table.integer('projects_assigned').unsigned()
      table.integer('hubspot_owner_id').unsigned()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
