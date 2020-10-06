import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import UserRole from 'App/Models/UserRole'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class CreateDefaultUsers extends BaseSchema {
  public async up () {
    const role = await UserRole.findBy('name', 'admin') as UserRole
    await User.create({
      email: Env.get('BO_USER', 'hello@crbast.ch') as string,
      password: Env.get('BO_PASSWORD', '123') as string,
      userRoleId: role.id,
    })
  }

  public async down () {
    await User.query().where('email', 'hello@crbast.ch').delete()
  }
}
