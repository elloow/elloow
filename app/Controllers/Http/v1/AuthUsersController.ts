import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Helpers/Answer'
import User from 'App/Models/User'

export default class AuthUsersController {
  public async login ({ auth, request, response }: HttpContextContract) {
    const userAuth = auth.use('v1_user')
    const userData = request.only(['username', 'password'])

    try {
      await userAuth.attempt(userData.username, userData.password)
    } catch (error) {
      return response.status(401).send(Answer.fail('Bad credentials', 'LOGIN_FAILED'))
    }

    const user = userAuth.user as User

    return response.send(Answer.success({ user: user }))
  }
}
