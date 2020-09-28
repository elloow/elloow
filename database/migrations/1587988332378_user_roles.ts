import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserRoles extends BaseSchema {
  protected tableName = 'user_roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 20).notNullable().unique()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
