import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EventParticipation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public eventId: number

  @column()
  public publicCode: string

  @column.dateTime()
  public start: DateTime

  @column.dateTime()
  public end: DateTime

  @column()
  public eventParticipantId: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
