import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Session from './Session'

export default class SessionParticipant extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public details: string

  @manyToMany(() => Session, { pivotTable: 'session_participations' })
  public sessions: ManyToMany<typeof Session>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
