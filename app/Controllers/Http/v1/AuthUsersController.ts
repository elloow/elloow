import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Helpers/Answer'
import AuthenticationCookieStatus from 'App/Helpers/AuthenticationCookieStatus'
import User from 'App/Models/User'

export default class AuthUsersController {
  /**
   * @swagger
   * /v1/auth/user:
   *   tags:
   *     - Authentication
   *   get:
   *     summary: Get current authenticated user
   *     responses:
   *       200:
   *         description: User entity
   */
  public async show ({ auth }: HttpContextContract) {
    const userAuth = auth.use('v1_user')
    const user = userAuth.user as User

    await user.load('role')
    await user.load('organisations')

    return { user: user }
  }

  public async login ({ auth, request, response }: HttpContextContract) {
    const userAuth = auth.use('v1_user')
    const userData = request.only(['email', 'password'])

    try {
      await userAuth.attempt(userData.email, userData.password)
    } catch (error) {
      return response
        .status(401)
        .send(Answer.fail('Bad credentials', 'LOGIN_FAILED'))
    }

    const user = userAuth.user as User

    await user.load('role')
    await user.load('organisations')

    AuthenticationCookieStatus.set(response, user.toJSON())

    return { user: user }
  }

  public async logout ({ auth, response }: HttpContextContract) {
    const userAuth = auth.use('v1_user')

    await userAuth.logout()

    AuthenticationCookieStatus.remove(response)

    return response.send({})
  }
}
