import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Organisation from './Organisation'

export default class Affiliation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rights: string

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @hasOne(() => Organisation)
  public organisation: HasOne<typeof Organisation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
