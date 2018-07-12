'use strict'

const Model = use('Model')

class Salesperson extends Model {
  // salesperson has - customers, quotes, orders

  customers () {
      return this.hasMany('App/Models/Customer')
  }

  quotes () {
      return this.hasMany('App/Models/Quote')
  }

  orders () {
      return this.hasMany('App/Models/Order')
  }

}

module.exports = Salesperson
