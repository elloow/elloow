import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterOrganisation from 'App/Mailers/RegisterOrganisation'
import ActionToken from 'App/Helpers/ActionToken'
import Answer from 'App/Helpers/Answer'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Env from '@ioc:Adonis/Core/Env'

export default class MailersController {
  public async organisationRegisterLink ({ request, response }: HttpContextContract) {
    const validationSchema = schema.create(
      {
        email: schema.string({}, [rules.email()]),
      })

    try {
      await request.validate({ schema: validationSchema })
    } catch (error) {
      return response.status(422).send(Answer.fail(error.messages, 'VALIDATION_FIELDS_FAILED'))
    }

    const data = request.only(['email'])
    const actionToken = new ActionToken({ action: 'organisation-register', expiration: 1800, data: { email: data.email } })
    const frontUrl = `${Env.get('FRONT_HOST')}/actions/create_organisation?action_token=${(await actionToken.store())}`
    await new RegisterOrganisation(frontUrl, data.email).send()
    return response.send(Answer.success({email: data.email}))
  }
}
