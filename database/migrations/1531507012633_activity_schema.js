'use strict'

const Schema = use('Schema')

class ActivitySchema extends Schema {
  up () {
    this.create('activities', (table) => {
      table.increments()
      table.string('login_ip_address')
      table.string('login_url')
      table.string('page_visited')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('activities')
  }
}

module.exports = ActivitySchema
