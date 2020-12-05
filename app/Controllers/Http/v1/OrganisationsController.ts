import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Helpers/Answer'
import Organisation from 'App/Models/Organisation'

export default class OrganisationsController {
  public async show ({ params, response }: HttpContextContract) {
    try {
      const org = await Organisation.query().where('name', params.name).firstOrFail()
      return response.send(Answer.success(org))
    } catch (error) {
      return response.status(404).send(Answer.fail('Organisation not found', 'ENTRY_NOT_FOUND'))
    }
  }
}
