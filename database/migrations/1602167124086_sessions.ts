import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sessions extends BaseSchema {
  protected tableName = 'sessions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('date').notNullable()
      table.integer('group_id').unsigned().references('id').inTable('groups').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
