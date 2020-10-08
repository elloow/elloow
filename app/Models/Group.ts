import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Organisation from './Organisation'
import Session from './Session'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public publicCode: string

  @column()
  public organisationId: number

  @belongsTo(() => Organisation)
  public organisation: BelongsTo<typeof Organisation>

  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
