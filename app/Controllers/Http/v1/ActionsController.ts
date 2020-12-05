import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema, validator } from '@ioc:Adonis/Core/Validator'
import ActionToken from 'App/Helpers/ActionToken'
import Answer from 'App/Helpers/Answer'
import Organisation from 'App/Models/Organisation'
import User from 'App/Models/User'
import UserRole from 'App/Models/UserRole'

export default class ActionsController {
  public async createUserAndOrganisation ({request, response} : HttpContextContract) {
    const data = request.only(['user_email', 'user_password', 'org_name'])
    const token = request.only(['action_token']).action_token as string
    const validationSchema = schema.create(
      {
        'user_email': schema.string({}, [rules.unique({table: User.table, column: 'email'})]),
        'user_password': schema.string({}, [rules.regex(/^(?=.*[A-Z].*[A-Z])(?=.*[\\\+\-\*\/\+\?\!\]\[\{\}\=\(\)\&\%\¦\°\§\$].*[\\\+\-\*\/\+\?\!\]\[\{\}\=\(\)\&\%\¦\°\§])(?=.*[0-9].*[0-9]).{8,}$/)]),
        'org_name': schema.string({}, [rules.unique({table: 'organisations', column: 'name'})]),
      })
    try {
      await validator.validate({schema: validationSchema, data: data})
    } catch (error) {
      return response.status(422).send(Answer.fail(error.messages, 'VALIDATION_FIELDS_FAILED'))
    }
    const user = await User.create({ email: data.user_email, password: data.user_password, userRoleId: (await UserRole.query().where('name', 'basic').firstOrFail()).id })
    const org = await Organisation.create({ name: data.org_name })
    await org.related('userOwner').associate(user) // Set organisation owner
    await user.related('organisations').save(org) // Add organisation affiliation
    await new ActionToken({action: 'organisation-register', uid: token}).delete()
    return response.send(Answer.success({organisation: org, user: user}))
  }
}
