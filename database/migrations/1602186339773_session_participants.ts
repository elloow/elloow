import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SessionParticipants extends BaseSchema {
  protected tableName = 'session_participants'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.text('details', 'longtext').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
