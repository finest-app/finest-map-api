import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/sign_up', 'UsersController.signUp')
  Route.post('/login', 'UsersController.login')
  Route.post('/logout', 'UsersController.logout').middleware('auth')
})
  .prefix('/user')
  .middleware('transformBody')
