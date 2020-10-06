import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Organisations extends BaseSchema {
  protected tableName = 'organisations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
