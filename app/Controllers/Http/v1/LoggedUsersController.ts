import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async showOrganisations ({ auth }: HttpContextContract) {
    const userAuth = auth.use('v1_user')
    const orgs = await userAuth.user?.related('organisations').query()
    return orgs
  }
}
