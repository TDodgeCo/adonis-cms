'use strict'
const Drive = use('Drive')
const Helpers = use('Helpers')

class TestController {
  async index ({ view }) {
    return view.render('test.test')
  }

  async save ({ request, response, view, session }) {
    const files = request.file('test-images', {
      type: 'image',
      size: '2mb'
    })
    const arr = files._files
    console.log(arr.length)
    const slug = 'residential-steel-buildings'
    let count = 0
    files.moveAll(Helpers.publicPath('images'), (file) => {
      count++
      return {
        name: slug + '-' + count + '.' + file.subtype
      }
    })

    return view.render('test.test')
  }
}

module.exports = TestController
