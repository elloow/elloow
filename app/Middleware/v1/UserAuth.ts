import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Helpers/Answer'
import AuthenticationCookieStatus from 'App/Helpers/AuthenticationCookieStatus'
import User from 'App/Models/User'
import { ExceptionCode } from 'Contracts/exception_code'

export default class UserAuth {
  public async handle ({auth, response}: HttpContextContract, next: () => Promise<void>) {
    const userAuth = auth.use('v1_user')
    try {
      await userAuth.authenticate()

      const user = userAuth.user as User

      await user.preload('role')
      await user.preload('organisations')

      AuthenticationCookieStatus.set(response, user.toJSON())
    } catch (error) {
      AuthenticationCookieStatus.remove(response)
      return response
        .status(401)
        .send(
          Answer.fail(
            'Only register user can access resource',
            ExceptionCode.Unauthorized
          )
        )
    }
    await next()
  }
}
