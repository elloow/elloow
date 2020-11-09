import Redis from '@ioc:Adonis/Addons/Redis'
import Hash from '@ioc:Adonis/Core/Hash'
import * as crypto from 'crypto'

export default class ActionToken {
  private actionToken: ActionTokenEntity

  public getEntity () : ActionTokenEntity {
    return this.actionToken
  }

  constructor (actionToken: ActionTokenEntity) {
    this.actionToken = actionToken
  }

  public async store () {
    this.actionToken.uid ??= await Hash.make(crypto.randomBytes(6).toString('base64'))
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

  public static async verify (action: string, token: string): Promise<ActionTokenEntity> {
    const actionToken: ActionTokenEntity = { action: action, uid: token }
    const redisTokenId = ActionToken.getRedisId(actionToken)
    const pipeline = await Redis.pipeline().exists(redisTokenId).hget(redisTokenId, 'data').exec()
    console.info(pipeline)
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

abstract class ActionTokenEntity {
  public data?: { }
  public action: string
  public expiration?: number | undefined
  public uid?: string
}
