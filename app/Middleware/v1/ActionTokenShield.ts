import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ActionToken from 'App/Helpers/ActionToken'
import Answer from 'App/Helpers/Answer'
import { ExceptionCode } from 'Contracts/exception_code'

export default class ActionTokenShield {
  public async handle (
    {
      params,
      response,
      request
    }:
    HttpContextContract,
    next: () => Promise<void>,
    middlewareParams: string[]
  ) {
    const token = params.action_token ?? request.only(['action_token']).action_token

    const action = middlewareParams[0]
    try {
      if (!token) {
        throw ''
      }
      await ActionToken.verify(action, token)
    } catch (error) {
      return response.status(401).send(Answer.fail('Bad action token provided', ExceptionCode.BadActionToken, null))
    }

    await next()
  }
}
