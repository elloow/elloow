import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  manyToMany,
  ManyToMany,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import UserRole from './UserRole'
import Organisation from './Organisation'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public userRoleId: number

  @belongsTo(() => UserRole)
  public role: BelongsTo<typeof UserRole>

  @manyToMany(() => Organisation, { pivotTable: 'affiliations' })
  public organisations: ManyToMany<typeof Organisation>

  // @hasMany(() => Affiliation)
  // public affiliations: HasMany<typeof Affiliation>

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
