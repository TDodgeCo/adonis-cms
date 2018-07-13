'use strict'

const Model = use('Model')

class ProjectManager extends Model {
  // project manager has - customer, order, project

  customer () {
    return this.belongsTo('App/Models/Customer')
  }

  order () {
    return this.belongsTo('App/Models/Order')
  }

  project () {
    return this.belongsTo('App/Models/Project')
  }
  
}

module.exports = ProjectManager
