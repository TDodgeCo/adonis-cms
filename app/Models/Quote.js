'use strict'

const Model = use('Model')

class Quote extends Model {
  // quote has - customer, salesperson, order

  customer () {
      return this.belongsTo('App/Models/Customer')
  }

  salesperson () {
      return this.belongsTo('App/Models/Salesperson')
  }

  order () {
      return this.belongsTo('App/Models/Order')
  }

}

module.exports = Quote
