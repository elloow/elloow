import Redis from '@ioc:Adonis/Addons/Redis'
import Hash from '@ioc:Adonis/Core/Hash'
import * as crypto from 'crypto'

export default class ActionToken {
  private actionToken: ActionTokenEntity

  constructor (actionToken: ActionTokenEntity) {
    this.actionToken = actionToken
  }

  public async create () {
    this.actionToken.id = await Hash.make(crypto.randomBytes(6).toString('base64'))
    const tokenUid = ActionToken.getTokenUID(this.actionToken)
    const pipeline = Redis.pipeline().hset(
      tokenUid,
      'data',
      JSON.stringify(this.actionToken.data))
    if (this.actionToken.expiration !== undefined) {
      pipeline.expire(tokenUid, this.actionToken.expiration)
    }
    await pipeline.exec()
  }

  public static getTokenUID (tokenEntity: ActionTokenEntity) : string {
    return `${tokenEntity.action}_${tokenEntity.id}`
  }

  public static async verify (action: string, token: string) : Promise<ActionTokenEntity> {
    // TODO Test if exist (if yes return entity | if not trown error)
    let temp: ActionTokenEntity = {action: action, id: token}
    return temp
  }

  public static async delete (action: string, token: string): Promise<boolean> {
    // TODO logic
    return true
  }
}

abstract class ActionTokenEntity {
  public data?: { }
  public action: string
  public expiration?: number | undefined
  public id?: string
}
