'use strict'
const Post = use('App/Models/Post')
const { validateAll } = use('Validator')

class PostController {
  async index ({ view }) {
    const posts = await Post.all()

    return view.render('posts.index', {
      title: 'Latest Posts',
      posts: posts.toJSON()
    })
  }

  async details ({ params, view }) {
    const post = await Post.find(params.id)

    return view.render('posts.details', {
      post: post
    })
  }

  async add ({ view }) {
    return view.render('posts.add')
  }

  async store ({ request, response, session }) {
    const data = request.only(['title', 'body'])

    const validation = await validateAll(data, {
      title: 'required|min:3|max:255',
      body: 'required|min:100'
    })

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }
    await Post.create(data)

    session.flash({ notification: 'Post Added!'})

    return response.redirect('/posts')
  }

}

module.exports = PostController
