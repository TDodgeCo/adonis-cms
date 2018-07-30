'use strict'
const User = use('App/Models/User')
const Env = use('Env')
const axios = use('axios')

class BuildController {
  async index({}) {
    const usersData = [
      {
        first_name: 'Tim',
        last_name: 'Dodge',
        email: 'timldodge@gmail.com',
        password: Env.get('BUILD_PASS'),
        admin: 1,
        permissions: 0
      },
      {
        first_name: 'John',
        last_name: 'Malone',
        email: 'crm-test+test@grambuildings.com',
        password: Env.get('BUILD_PASS'),
        admin: 0,
        permissions: 3
      },
      {
        first_name: 'Terry',
        last_name: 'Zues',
        email: 'crm-test+test1@grambuildings.com',
        password: Env.get('BUILD_PASS'),
        admin: 0,
        permissions: 3
      },
      {
        first_name: 'Mica',
        last_name: 'Zunis',
        email: 'mica@example.com',
        password: Env.get('BUILD_PASS'),
        admin: 0,
        permissions: 4
      }
    ]
    try {
      const user = await User.createMany(usersData)
      console.log('initial build was a success')
      try {
        return this.getOwnerId()
      } catch (err) {
        console.log('Hubspot Id error: ' + err)
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getOwnerId() {
    let users = await User.query()
      .where('permissions', 3)
      .fetch()

    users = users.toJSON()
    const hubspotUsers = await axios.get(
      'http://api.hubapi.com/owners/v2/owners?hapikey=' + Env.get('HAPI_KEY')
    )
    for (var user in users) {
      const localUser = await User.find(users[user].id)
      const findUser = function(arr) {
        return arr.email == localUser.email
      }
      const userIndex = hubspotUsers.data.findIndex(findUser)
      const userOwnerId = hubspotUsers.data[userIndex].ownerId

      localUser.hubspot_owner_id = userOwnerId
      await localUser.save()
    }
  }
}

module.exports = BuildController
