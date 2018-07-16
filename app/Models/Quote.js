'use strict'

const Model = use('Model')

class Quote extends Model {
  // quote has - customer, salesperson, order

  user () {
    return this.hasMany('App/Models/User')
  }

  order () {
    return this.belongsTo('App/Models/Order')
  }

}

module.exports = Quote
