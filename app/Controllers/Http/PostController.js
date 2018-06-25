'use strict'
const Post = use('App/Models/Post')
const { validateAll } = use('Validator')

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

class PostController {
  async index ({ view }) {
    const posts = await Post.all()
    return view.render('posts.index', {
      title: 'Latest Posts',
      posts: posts.toJSON()
    })
  }

  async details ({ params, view }) {
    const post = await Post.findBy('slug', params.slug)
    return view.render('pages.category-details', {
      post: post
    })
  }

  async add ({ view }) {
    return view.render('posts.add')
  }

  async store ({ request, response, session }) {
    let slug = request.input('title')
    slug = replaceAll(slug, ' ', '-').toLowerCase()
    const data = {
      title: request.input('title'),
      slug: slug,
      body: request.input('body')
    }
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

  async edit ({ view, params }) {
    const post = await Post.findBy('id', params.id)
    return view.render('posts.edit', {
      post: post
    })
  }

  async update ({ params, request, view, response, session }) {
    let slug = request.input('title')
    slug = replaceAll(slug, ' ', '-').toLowerCase()
    const data = {
      id: params.id,
      title: request.input('title'),
      slug: slug,
      body: request.input('body')
    }
    const validation = await validateAll(data, {
      title: 'required|min:3|max:255',
      body: 'required|min:100'
    })
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return view.render('posts.edit', {
        post: data
      })
    }
    const post = await Post.find(params.id)
    post.title = data.title
    post.body = data.body

    await post.save()
    session.flash({ notification: 'Post updated!'})
    return response.redirect('/posts')
  }

  async destroy ({ params, session, response}) {
    const post = await Post.find(params.id)
    await post.delete()

    session.flash({ notification: 'Post deleted!' })
    return response.redirect('/posts')
  }

}

module.exports = PostController
