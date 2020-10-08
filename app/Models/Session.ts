import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Group from './Group'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: Date

  @belongsTo(() => Group)
  public group: BelongsTo<typeof Group>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
