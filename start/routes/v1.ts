import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { success: true, active: true }
  })

  Route.group(() => {
    Route.post('/user', 'v1/AuthUsersController.login')
    Route.post('/user/logout', 'v1/AuthUsersController.logout')
  }).prefix('/auth')
}).prefix('v1')
