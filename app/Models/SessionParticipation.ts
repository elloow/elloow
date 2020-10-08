import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SessionParticipation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public sessionId: number

  @column()
  public sessionParticipantId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
