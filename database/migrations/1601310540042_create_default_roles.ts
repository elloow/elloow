import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import UserRole from 'App/Models/UserRole'

export default class CreateDefaultRoles extends BaseSchema {
  public async up () {
    await UserRole.createMany([
      { name: 'admin' },
      { name: 'basic' },
    ])
  }

  public async down () {
    await UserRole.query().delete()
  }
}
