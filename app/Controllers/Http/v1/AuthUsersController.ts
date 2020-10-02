import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Helpers/Answer'
import User from 'App/Models/User'

export default class AuthUsersController {
  public async login ({ auth, request, response }: HttpContextContract) {
    const userAuth = auth.use('v1_user')
    const userData = request.only(['email', 'password'])

    try {
      await userAuth.attempt(userData.email, userData.password)
    } catch (error) {
      return response.status(401).send(Answer.fail('Bad credentials', 'LOGIN_FAILED'))
    }

    const user = userAuth.user as User
    await user.preload('role')

    return response.send(Answer.success({ user: user }))
  }

  public async logout ({ auth, response }: HttpContextContract) {
    const userAuth = auth.use('v1_user')

    await userAuth.logout()

    return response.send(Answer.success({}))
  }
}
