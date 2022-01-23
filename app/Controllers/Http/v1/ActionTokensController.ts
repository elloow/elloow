import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpException from 'App/Exceptions/HttpException'
import ActionToken from 'App/Helpers/ActionToken'

export default class ActionTokensController {
  public async check ({ request, params }: HttpContextContract) {
    const token =
      params.action_token ?? request.only(['action_token']).action_token
    const action = params.action

    try {
      if (!token) {
        throw Error
      }
      await ActionToken.verify(action, token)
    } catch (error) {
      throw new HttpException(
        'Bad action token provided',
        401,
        'BAD_ACTION_TOKEN'
      )
    }

    const data = await ActionToken.getData(action, token)

    return data
  }
}
