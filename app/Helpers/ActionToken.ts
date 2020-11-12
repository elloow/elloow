import Redis from '@ioc:Adonis/Addons/Redis'
import cryptoRandomString from 'crypto-random-string'
import { DateTime } from 'luxon'

export default class ActionToken {
  private actionToken: ActionTokenEntity

  public getEntity () : ActionTokenEntity {
    return this.actionToken
  }

  constructor (actionToken: ActionTokenEntity) {
    this.actionToken = actionToken
    this.actionToken.expiration ??= 3800
    this.actionToken.data ??= { }
  }

  /**
   * @returns Return token Uid
   */
  public async store () : Promise<string> {
    this.actionToken.uid ??= `${DateTime.local().toMillis()}${cryptoRandomString({length: 42, type: 'alphanumeric'})}`
    const redisTokenId = ActionToken.getRedisId(this.actionToken)
    const pipeline = Redis.pipeline().hset(
      redisTokenId,
      'data',
      JSON.stringify(this.actionToken.data))
    if (this.actionToken.expiration !== undefined) {
      pipeline.expire(redisTokenId, this.actionToken.expiration)
    }
    await pipeline.exec()
    return this.actionToken.uid
  }

  public static async getData (action: string, tokenUid: string): Promise<{}> {
    const redisTokenId = ActionToken.getRedisId({ action: action, uid: tokenUid })
    const data = await Redis.hget(redisTokenId, 'data') ?? ''
    return JSON.parse(data)
  }

  public static async setData (action: string, tokenUid: string, data: {}) {
    const redisTokenId = ActionToken.getRedisId({ action: action, uid: tokenUid })
    await Redis.hset(redisTokenId, 'data', JSON.stringify(data))
  }

  public static getRedisId (tokenEntity: ActionTokenEntity) : string {
    return `${tokenEntity.action}_${tokenEntity.uid}`
  }

  public async verify (): Promise<ActionTokenEntity> {
    const entity = await ActionToken.verify(this.actionToken.action, this.actionToken.uid as string)
    return entity
  }

  public static async verify (action: string, tokenUid: string): Promise<ActionTokenEntity> {
    const actionToken: ActionTokenEntity = { action: action, uid: tokenUid }
    const redisTokenId = ActionToken.getRedisId(actionToken)
    const pipeline = await Redis.pipeline().exists(redisTokenId).hget(redisTokenId, 'data').exec()
    if (pipeline[0][1] === 0) {
      throw new Error('VALIDATION_FAILED')
    }
    actionToken.data = JSON.parse(pipeline[1][1])
    return actionToken
  }

  public async delete () {
    await Redis.del(ActionToken.getRedisId(this.actionToken))
  }
}

interface ActionTokenEntity {
  data?: { }
  action: string
  expiration?: number | undefined
  uid?: string
}
