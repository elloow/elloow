import { validator } from '@ioc:Adonis/Core/Validator'
import HttpException from 'App/Exceptions/HttpException'
import { ExceptionCode } from 'Contracts/exception_code'

export default abstract class BaseValidator {
  public static async validateShema (validationSchema, data:any): Promise<Boolean> {
    try {
      await validator.validate({ schema: validationSchema, data: data })
    } catch (error) {
      throw new HttpException(error.messages, 422, ExceptionCode.ValidationFieldsFailed)
    }
    return true
  }
}
