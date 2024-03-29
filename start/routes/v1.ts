import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { active: true, description: 'Elloow API v1' }
  })

  Route.post('/send-organisation-register-link', 'MailersController.organisationRegisterLink')

  Route.group(() => {
    Route.get('/:name', 'Organisations/OrganisationsController.show')
  }).prefix('/organisations')

  //  Resource only for logged user
  Route.group(() => {
    Route.get('organisations', 'LoggedUsersController.showOrganisations')
  }).prefix('user').middleware(['v1_UserAuth'])

  Route.post('/check-action-token/:action/:action_token?', 'ActionTokensController.check')
  Route.group(() => {
    Route.post(
      '/create-user-organisation',
      'Actions/ActionsController.createUserAndOrganisation'
    ).middleware([
      'v1_ActionTokenShield:organisation-register'
    ])
  }).prefix('/actions')

  Route.group(() => {
    Route.get('/user', 'AuthUsersController.show').middleware(['v1_UserAuth'])
    Route.post('/user', 'AuthUsersController.login')
    Route.post('/user/logout', 'AuthUsersController.logout')
  }).prefix('/auth')
}).prefix('v1').namespace('App/Controllers/Http/v1').middleware(['v1_ApiResponseConvention'])
