import { rules, schema } from '@ioc:Adonis/Core/Validator'
import BaseValidator from 'App/Validators/BaseValidator'
import User from 'App/Models/User'

export default class ActionsValidator extends BaseValidator {
  public static async validateCreateUserAndOrganisationSchema (data: any) {
    const validationSchema = schema.create(
      {
        user_email: schema.string({}, [rules.unique({ table: User.table, column: 'email' })]),
        user_password: schema.string({}, [
          // eslint-disable-next-line max-len
          rules.regex(/^(?=.*[A-Z].*[A-Z])(?=.*[\\+\-*/+?!\][{}=()&%¦°§$].*[\\+\-*/+?!\][{}=()&%¦°§])(?=.*[0-9].*[0-9]).{8,}$/)
        ]),
        org_name: schema.string({},
          [
            rules.unique(
              {
                table: 'organisations',
                column: 'name'
              }),
            rules.minLength(5), rules.regex(/^[a-zA-Z\s]*$/)
          ])
      })
    await this.validateShema(validationSchema, data)
  }
}
