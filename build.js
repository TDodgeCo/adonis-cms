const axios = require('axios')
console.log('Initiating BuildController')
try {
  axios.get('http://localhost:3333/build')
  return console.log('User build complete. Initiating Seed.')
} catch (err) {
  console.log('BuildController Err: ' + err)
}
