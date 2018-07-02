'use strict'
const Post = use('App/Models/Post')
const Faq = use('App/Models/Faq')
const Database = use('Database')
const Helpers = use('Helpers')
const { validateAll } = use('Validator')

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

class PostController {
  /**
  * Show all posts - routed from /posts
  **/
  async index ({ view }) {
    const posts = await Post.all()
    return view.render('posts.index', {
      title: 'Latest Posts',
      posts: posts.toJSON()
    })
  }
  /**
  **  Compiled post/page - shows customer facing content || Pulls navigation links for sidebar and main
  **/
  async details ({ params, view, request }) {
    const post = await Post.findBy('slug', params.slug)
    let url = request.url()
    url = url.split('/').splice(1)
    console.log(url)
    let sidebarNav = await Database.from('posts').where('directory', url[0]).orderBy('slug', 'asc')
    const posts = await Database.select('*').from('posts').orderBy('slug', 'asc')
    const faqs = await Database.from('faqs').where('post_id', post.id).orderBy('faq_title', 'asc')
    return view.render('pages.category-details', {
      post: post,
      posts: posts,
      url: url[1],
      sidebar: sidebarNav,
      faqs: faqs
    })
  }
  /**
  **  Shows the edit post view
  **/
  async add ({ view }) {
    return view.render('posts.add')
  }

  async template ({ view, request, response }) {
    const template = request.input('template')
    console.log(template)
    return view.render('posts.add', {
      template: template
    })
  }
  /**
  **  stores the content created from edit post view
  **/
  async store ({ request, response, session }) {
    let slug = request.input('title')
    slug = replaceAll(slug, ' ', '-').toLowerCase()
    const data = {
      title: request.input('title').toUpperCase(),
      directory: request.input('directory'),
      slug: slug,
      description: request.input('description'),
      body: request.input('body')
    }
    const validation = await validateAll(data, {
      title: 'required|min:3|max:255',
      description: 'required|min:10|max:255',
      body: 'required|min:100'
    })
    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()
      return response.redirect('back')
    }
    // save images
    const heroImg = request.file('hero-image', {
      type: 'image',
      size: '2mb'
    })
    await heroImg.move(Helpers.publicPath('images/' + slug + '/'),  {
      name: slug + '-header' + '.' + heroImg.subtype
    })
    const files = request.file('post-images', {
      type: 'image',
      size: '2mb'
    })
    let count = 0
    files.moveAll(Helpers.publicPath('images/' + slug + '/'), (file) => {
      count++
      return {
        name: slug + '-' + count + '.' + file.subtype
      }
    })
    const newPost = await Post.create(data)
    console.log(newPost.id)
    const faqs = request.collect(['faq_title', 'faq_body'])
    faqs.forEach(function(faq) {
      faq.post_id = newPost.id
    })
    await Faq.createMany(faqs)
    session.flash({ notification: 'Post Added!'})
    return response.redirect('/posts')
  }
  /**
  **  Shows the view to edit a previously created post
  **/
  async edit ({ view, params }) {
    const post = await Post.findBy('id', params.id)
    return view.render('posts.edit', {
      post: post
    })
  }
  /**
  **  Handles the business logic of editing a previously created view
  **/
  async update ({ params, request, view, response, session }) {
    // TODO add edit funcitonality for post images
    let slug = request.input('title')
    slug = replaceAll(slug, ' ', '-').toLowerCase()
    const data = {
      id: params.id,
      title: request.input('title'),
      description: request.input('description'),
      slug: slug,
      body: request.input('body')
    }
    const validation = await validateAll(data, {
      title: 'required|min:3|max:255',
      description: 'required|min:10|max:255',
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
    post.description = data.description
    post.body = data.body

    await post.save()
    session.flash({ notification: 'Post updated!'})
    return response.redirect('/posts')
  }
  /**
  **  Deletes a post
  **/
  async destroy ({ params, session, response}) {
    const post = await Post.find(params.id)
    await post.delete()

    session.flash({ notification: 'Post deleted!' })
    return response.redirect('/posts')
  }

}

module.exports = PostController
