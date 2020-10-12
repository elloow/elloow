import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventParticipants extends BaseSchema {
  protected tableName = 'event_participants'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name', 50).notNullable()
      table.string('last_name', 50).notNullable()
      table.string('email').nullable()
      table.string('adress').nullable()
      table.string('phone').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
