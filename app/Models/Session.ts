import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Group from './Group'
import SessionParticipant from './SessionParticipant'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.date()
  public date: DateTime

  @column()
  public groupId: number

  @belongsTo(() => Group)
  public group: BelongsTo<typeof Group>

  @manyToMany(() => SessionParticipant, { pivotTable: 'session_participations' })
  public participants: ManyToMany<typeof SessionParticipant>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
