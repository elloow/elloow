import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Helpers/Answer'

export default class ApiV1ResponseConvention {
  public async handle ({ response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()

    return response.send(
      Answer.success(response.lazyBody[0])
    )
  }
}
