import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ActionToken from 'App/Helpers/ActionToken'
import Answer from 'App/Helpers/Answer'

export default class ActionTokensController {
  public async check ({ request, response, params }: HttpContextContract) {
    const token = params.action_token ?? request.only(['action_token']).action_token
    const action = params.action

    try {
      if (!token) {
        throw Error
      }
      await ActionToken.verify(action, token)
    } catch (error) {
      return response.status(401).send(Answer.fail('Bad action token provided', 'BAD_ACTION_TOKEN', null))
    }

    const data = await ActionToken.getData(action, token)

    return response.send(Answer.success(data))
  }
}
