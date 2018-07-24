'use strict'

const Task = use('Task')
const User = use('App/Models/User')

class ResetLeadsAssigned extends Task {
  static get schedule () {
    return '0 59 23 * * *'
  }

  async handle () {
    await User
      .query()
      .where('permissions', 3)
      .update({ leads_assigned_today: 0 })
    console.log('Reset leads_assigned_today Ran')
  }
}

module.exports = ResetLeadsAssigned
