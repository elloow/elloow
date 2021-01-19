import { BaseCommand, flags } from '@adonisjs/core/build/standalone'
import User from 'App/Models/User'
import UserRole from 'App/Models/UserRole'
import cryptoRandomString from 'crypto-random-string'

export default class DbCreateUser extends BaseCommand {
  /**
	 * Command Name is used to run the command
	 */
  public static commandName = 'db:create_user'

  /**
	 * Command Name is displayed in the "help" output
	 */
  public static description = 'Create new user.'

  public static needsApplication = true

  public static settings = {
    loadApp: true,
  }

  @flags.string({
    description: 'User email',
    alias: 'e',
  })
  public email: string

  @flags.string({
    description: 'User password. Random password is set if empty.',
    alias: 'p',
    defaultValue: () => {
      return cryptoRandomString({length: (Math.random()*10)+10, type: 'base64'})
    },
  })
  public password: string

  @flags.string({
    description: 'User role (default to "admin"). Example : ["admin","basic"]',
    alias: 'r',
    defaultValue: () => {
      return 'admin'
    },
  })
  public role: string

  private checkInput () {
    if (!this.email || !this.role) {
      throw new Error('Please provide : ["email","role"]')
    }
  }

  public async run () {
    try {
      this.checkInput()

      const role = await UserRole.findByOrFail('name', this.role)
      const user = await User.create({ email: this.email, password: this.password, userRoleId: role.id })

      console.info(user.toJSON())
      console.info(`User password: ${this.password}`)
    } catch (error) {
      this.logger.error(error.message)
    }
  }
}
