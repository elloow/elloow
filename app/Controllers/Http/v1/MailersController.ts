import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterOrganisation from 'App/Mailers/RegisterOrganisation'
import ActionToken from 'App/Helpers/ActionToken'
import Answer from 'App/Helpers/Answer'

export default class MailersController {
  public async organisationRegisterLink ({ request, response } : HttpContextContract) {
    const data = request.only(['email'])
    const actionToken = new ActionToken({ action: 'organisation-register', expiration: 3600, data: { email: data.email }})
    await new RegisterOrganisation((await actionToken.store()), data.email).send()
    return response.send(Answer.success({email: data.email}))
  }
}
