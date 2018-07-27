'use strict'
const User = use('App/Models/User')
const Env = use('Env')
const axios = use('axios')

class HubSpotController {
  async getOwnerId({ auth, response, session }) {
    const user = auth.user
    const email = user.email
    try {
      const hubspotUsers = await axios.get(
        'http://api.hubapi.com/owners/v2/owners?hapikey=' + Env.get('HAPI_KEY')
      )
      console.log('typeof hubspotUsers: ' + typeof hubspotUsers)
      const findUser = function(arr) {
        return arr.email == email
      }
      const userIndex = hubspotUsers.data.findIndex(findUser)
      const userOwnerId = hubspotUsers.data[userIndex].ownerId

      user.hubspot_owner_id = userOwnerId
      await user.save()
      session.flash({ notification: 'Hubspot Owner Id found and Connected. OWNERID: ' + userOwnerId})
      return response.redirect('back')
    } catch (err) {
      session.flash({ error: 'There was a problem. Do you have a hubspot account?' })
      return response.redirect('back')
    }
  }
}

module.exports = HubSpotController
