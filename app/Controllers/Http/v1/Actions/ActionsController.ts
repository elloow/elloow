import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ActionToken from 'App/Helpers/ActionToken'
import Answer from 'App/Helpers/Answer'
import Organisation from 'App/Models/Organisation'
import User from 'App/Models/User'
import UserRole from 'App/Models/UserRole'
import ActionsValidator from './ActionsValidator'

export default class ActionsController {
  public async createUserAndOrganisation ({ request, response }: HttpContextContract) {
    const data = request.only(['user_email', 'user_password', 'org_name'])
    data.org_name = data.org_name.replace(' ', '-')
    const token = request.only(['action_token']).action_token as string

    ActionsValidator.validateCreateUserAndOrganisationSchema(data)

    const user = await User.create(
      {
        email: data.user_email,
        password: data.user_password,
        userRoleId: (await UserRole.query().where('name', 'basic').firstOrFail()).id
      })
    const org = await Organisation.create({ name: data.org_name })
    await org.related('userOwner').associate(user) // Set organisation owner
    await user.related('organisations').save(org) // Add organisation affiliation
    await new ActionToken({ action: 'organisation-register', uid: token }).delete()
    return response.send(Answer.success({ organisation: org, user: user }))
  }
}
