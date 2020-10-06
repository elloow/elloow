import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Affiliations extends BaseSchema {
  protected tableName = 'affiliations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('rights', 'longtext')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('organisation_id').unsigned().references('id').inTable('organisations').onDelete('CASCADE')
      table.unique(['user_id', 'organisation_id'])
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
