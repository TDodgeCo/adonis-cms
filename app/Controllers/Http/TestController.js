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
  async test ({ params, response }) {
    const email = 'crm-test@grambuildings.com'
    const hubspotUsers =
    await axios.get('http://api.hubapi.com/owners/v2/owners?hapikey=1456739c-4b72-4610-847f-193a8e3837ec')
    console.log('typeof hubspotUsers: ' + typeof hubspotUsers)
    const findUser = function (arr) {
      return arr.email == email
    }
    const userIndex = hubspotUsers.data.findIndex(findUser)
    const userOwnerId = hubspotUsers.data[userIndex].ownerId
    response.json({
      ownerId: userOwnerId
    })
  }
}

module.exports = TestController
