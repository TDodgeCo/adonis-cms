'use strict'
const User = use('App/Models/User')
const Customer = use('App/Models/Customer')
const Quote = use('App/Models/Quote')
const Hash = use('Hash')
const Mail = use('Mail')
const Env = use('Env')
const { validateAll } = use('Validator')
const axios = use('axios')

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

class TestController {
  async test ({ response }) {
    try {
      const salespeople = await User
        .query()
        .where('permissions', 3)
        .fetch()
      const salesArr = salespeople.rows
      let repObj = []
      for (let i = 0; i < salesArr.length; i++) {
        console.log('Salesperson: ' + salesArr[i].$attributes.email)
        console.log('leads assigned: ' + salesArr[i].$attributes.leads_assigned)
        repObj.push({
          id: salesArr[i].$attributes.id,
          email: salesArr[i].$attributes.email,
          leads_assigned: salesArr[i].$attributes.leads_assigned
        })
      }
      console.log(repObj)
      const leastLeadsObj =
        repObj.reduce((l, e) => e.leads_assigned > l.leads_assigned ? l : e);
      const repToAssignTo = await User.find(leastLeadsObj.id)
      repToAssignTo.leads_assigned = repToAssignTo.leads_assigned + 1
      repToAssignTo.save()
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = TestController
