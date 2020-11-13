import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { success: true, active: true }
  })

  Route.post('/send-organisation-register-link', 'v1/MailersController.organisationRegisterLink')

  Route.post('/check-action-token/:action/:action_token?', 'v1/ActionTokensController.check')
  Route.group(() => {
    Route.post('/create-user-organisation', 'v1/ActionsController.createUserAndOrganisation').middleware(['v1_ActionTokenShield:organisation-register'])
  }).prefix('/actions')

  Route.group(() => {
    Route.post('/user', 'v1/AuthUsersController.login')
    Route.post('/user/logout', 'v1/AuthUsersController.logout')
  }).prefix('/auth')
}).prefix('v1')
