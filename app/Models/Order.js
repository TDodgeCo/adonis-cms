'use strict'

const Model = use('Model')

class Order extends Model {
  // order has - customer, salesperson, project
  customer () {
    return this.belongsTo('App/Models/Customer')
  }

  salesperson () {
    return this.belongsTo('App/Models/Salesperson')
  }

  project () {
    return this.belongsTo('App/Models/Project')
  }
}

module.exports = Order
