import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { success: true, active: true }
  })

  Route.group(() => {
    Route.post('/', 'v1/AuthUsersController.login')
  }).prefix('/auth')
}).prefix('v1')
