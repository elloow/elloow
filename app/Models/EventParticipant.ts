import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Event from './Event'

export default class EventParticipant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column()
  public adress: string

  @column()
  public phone: string

  @manyToMany(() => Event, { pivotTable: 'event_participations' })
  public sessions: ManyToMany<typeof Event>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
