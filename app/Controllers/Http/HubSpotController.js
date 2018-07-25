'use strict'
const axios = use('axios')

class HubSpotController {
  async getOwnerId ({ params, response }) {
    const email = params.email
    const hubspotUsers =
    await axios.get('http://api.hubapi.com/owners/v2/owners?hapikey=' + Env.get('HAPI_KEY'))
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

module.exports = HubSpotController
