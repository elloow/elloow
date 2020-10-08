import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SessionParticipations extends BaseSchema {
  protected tableName = 'session_participations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('session_id').unsigned().references('id').inTable('sessions').onDelete('CASCADE')
      table
        .integer('session_participant_id')
        .unsigned()
        .references('id')
        .inTable('session_participants')
        .onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
