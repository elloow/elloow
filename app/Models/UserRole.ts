import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class UserRole extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
