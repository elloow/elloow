import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import UserRole from 'App/Models/UserRole'

export default class CreateDefaultRoles extends BaseSchema {
  public async up () {
    await UserRole.createMany([
      { name: 'admin' },
      { name: 'manager' },
      { name: 'basic' },
    ])
  }

  public async down () {
    await UserRole.query().whereIn('name', ['admin', 'manager', 'basic']).delete()
  }
}
