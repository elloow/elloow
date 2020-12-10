import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Helpers/Answer'
import UserRole from 'App/Models/UserRole'
import { ExceptionCode } from 'Contracts/exception_code'

export default class UserRoleAuth {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>, properties: string[]) {
    const userAuth = auth.use('v1_user')

    const role = await userAuth.user?.related('role').query().first() as UserRole

    if (!properties.includes(role.name)) {
      return response.status(403).send(Answer.fail('More privileges are required for this resource',ExceptionCode.NeedPrivileges))
    }

    await next()
  }
}
