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

// Main Pages
Route.on('/').render('pages.home')
Route.on('/contact').render('pages.contact')

Route.on('/account-home').render('account-home')
Route.on('/quote-request').render('pages.quote-request')
Route.on('/category').render('pages.category-details')

Route.get('/posts', 'PostController.index')
Route.get('/posts/add', 'PostController.add').middleware('auth')
Route.get('/posts/edit/:id', 'PostController.edit').middleware('auth')
Route.get('/posts/:slug', 'PostController.details')
Route.post('/posts', 'PostController.store').middleware('auth')
Route.put('/posts/:id', 'PostController.update').middleware('auth')
Route.delete('/posts/:id', 'PostController.destroy').middleware('auth')
Route.get('/choose-template', 'PostController.template').middleware('auth')

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
Route.get('/login/:tempPass', async ({ params, view }) => {
  return view.render('user.login', {
    tempPass: params.tempPass
  })
})
Route.post('/login', 'UserController.login')
Route.get('/account', 'UserController.account').middleware('auth')
Route.get('/logout', 'Usercontroller.logout')

Route.post('/quote-request', 'CustomerController.store')
Route.get('account/quotes', 'QuoteController.index').middleware('auth')

// External API stuff
Route.group(() => {
  Route.get('ownerid/:email', 'HubSpotController.getOwnerId')
}).prefix('/hubspot')

// Test Stuff
Route.get('/test', 'TestController.test')
Route.get('/builders/:state/:dealer', 'TestController.test')
