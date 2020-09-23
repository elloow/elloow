import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { success: true, active: true }
  })
}).prefix('v1')
