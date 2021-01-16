import { BaseCommand, flags } from '@adonisjs/core/build/standalone'

export default class DbCreateUser extends BaseCommand {
  /**
	 * Command Name is used to run the command
	 */
  public static commandName = 'db:create_user'

  /**
	 * Command Name is displayed in the "help" output
	 */
  public static description = 'Create new user.'

  @flags.string({
    description: 'User name',
    alias: 'u',
  })
  public username: string

  @flags.string({
    description: 'User password',
    alias: 'p',
  })
  public password: string

  private checkInput () {
    if (!this.username || !this.password) {
      throw new Error('Please provide : ["username","password"]')
    }
  }

  public async run () {
    try {
      this.checkInput()
      // Todo : user creation
    } catch (error) {
      this.logger.error(error.message)
    }
  }
}
