'use strict'
const Drive = use('Drive')
const Helpers = use('Helpers')

class TestController {
  async index ({ view }) {
    return view.render('test')
  }

  async save ({ request, response, view, session }) {
    const files = request.file('test-images', {
      type: 'image',
      size: '2mb'
    })
    let count = 0
    files.moveAll(Helpers.publicPath('images'), (file) => {
      count++
      return {
        name: slug + '-' + count + '.' + file.subtype
      }
    })
    return view.render('test.test')
  }

  async test ({ params, response }) {
    response.json({
      state: params.state,
      dealer: params.dealer
    })
  }
}

module.exports = TestController
