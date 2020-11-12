import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterOrganisation from 'App/Mailers/RegisterOrganisation'
import ActionToken from 'App/Helpers/ActionToken'
import Answer from 'App/Helpers/Answer'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

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
    const actionToken = new ActionToken({ action: 'organisation-register', expiration: 3600, data: { email: data.email }})
    await new RegisterOrganisation((await actionToken.store()), data.email).send()
    return response.send(Answer.success({email: data.email}))
  }
}
