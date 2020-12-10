import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Helpers/Answer'

export default class UsersController {
  public async showOrganisations ({ auth, response }: HttpContextContract) {
    const userAuth = auth.use('v1_user')
    const orgs = await userAuth.user?.related('organisations').query()
    return response.send(Answer.success(orgs))
  }
}
