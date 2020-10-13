import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Organisation from './Organisation'
import EventParticipant from './EventParticipant'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public organisationId: number

  @belongsTo(() => Organisation)
  public organisation: BelongsTo<typeof Organisation>

  @manyToMany(() => EventParticipant, { pivotTable: 'session_participations' })
  public participants: ManyToMany<typeof EventParticipant>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
