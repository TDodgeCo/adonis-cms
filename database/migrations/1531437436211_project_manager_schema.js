'use strict'

const Schema = use('Schema')

class ProjectManagerSchema extends Schema {
  up () {
    this.create('project_managers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('project_managers')
  }
}

module.exports = ProjectManagerSchema
