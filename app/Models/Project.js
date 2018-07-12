'use strict'

const Model = use('Model')

class Project extends Model {
  // project has - customer, quote, order, project manager
  customer () {
    return this.belongsTo('App/Models/Customer')
  }

  quote () {
    return this.belongsTo('App/Models/Quote')
  }

  order () {
    return this.belongsTo('App/Models/Order')
  }

  projectManager () {
    return this.belongsTo('App/Models/ProjectManager')
  }

}

module.exports = Project
