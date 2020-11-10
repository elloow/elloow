import Redis from '@ioc:Adonis/Addons/Redis'
import * as crypto from 'crypto'
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

  public async store () {
    this.actionToken.uid ??= `${DateTime.local().toMillis()}${crypto.randomBytes(42).toString('base64')}`
    const redisTokenId = ActionToken.getRedisId(this.actionToken)
    const pipeline = Redis.pipeline().hset(
      redisTokenId,
      'data',
      JSON.stringify(this.actionToken.data))
    if (this.actionToken.expiration !== undefined) {
      pipeline.expire(redisTokenId, this.actionToken.expiration)
    }
    await pipeline.exec()
  }

  public static getRedisId (tokenEntity: ActionTokenEntity) : string {
    return `${tokenEntity.action}_${tokenEntity.uid}`
  }

  public async verify (): Promise<ActionTokenEntity> {
    const entity = await ActionToken.verify(this.actionToken.action, this.actionToken.uid as string)
    return entity
  }

  public static async verify (action: string, token: string): Promise<ActionTokenEntity> {
    const actionToken: ActionTokenEntity = { action: action, uid: token }
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
