import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventParticipations extends BaseSchema {
  protected tableName = 'event_participations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('event_id').unsigned().references('id').inTable('events').onDelete('CASCADE')
      table
        .integer('event_participant_id')
        .unsigned()
        .references('id')
        .inTable('event_participants')
        .onDelete('CASCADE')
      table.string('public_code').nullable()
      table.dateTime('start').nullable()
      table.dateTime('end').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
