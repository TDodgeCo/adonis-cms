'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.on('/').render('home')
Route.on('/category').render('pages.category-details')

Route.get('/posts', 'PostController.index')
Route.get('/posts/add', 'PostController.add').middleware('auth')
Route.get('/posts/edit/:id', 'PostController.edit').middleware('auth')
Route.get('/posts/:slug', 'PostController.details')
Route.post('/posts', 'PostController.store')
Route.put('/posts/:id', 'PostController.update')
Route.delete('/posts/:id', 'PostController.destroy')
Route.get('/choose-template', 'PostController.template')

Route.post('/metal-buildings', 'PostController.store')
Route.post('/regional', 'PostController.store')
Route.get('/regional/:slug', 'PostController.details')
Route.get('/metal-buildings/:slug', 'PostController.details')

Route.get('/signup', 'UserController.index')
Route.post('/signup', 'UserController.store')
Route.post('/invite', 'UserController.invite').middleware('auth')
Route.on('/set-password').render('user.set-password').middleware('auth')
Route.put('/set-password', 'UserController.resetPassword').middleware('auth')
Route.on('/login').render('user.login')
Route.post('/login', 'UserController.login')
Route.get('/account', 'UserController.account').middleware('auth')
Route.get('/logout', 'Usercontroller.logout')

// Test Stuff
Route.get('/test', 'TestController.index')
Route.post('/test', 'TestController.save')
Route.get('/builders/:state/:dealer', 'TestController.test')
