'use strict'

const Model = use('Model')

class Customer extends Model {
  // customer has - quotes, orders, projects, salesperson, project manager

  quotes () {
      return this.hasMany('App/Models/Quote')
  }

  orders () {
      return this.hasMany('App/Models/Order')
  }

  projects () {
      return this.hasMany('App/Models/Project')
  }

  salesperson () {
      return this.belongsTo('App/Models/Salesperson')

  }

  projectManager () {
      return this.belongsTo('App/Models/ProjectManager')
  }

}

module.exports = Customer
