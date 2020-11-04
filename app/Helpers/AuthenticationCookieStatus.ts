import { CookieOptions } from '@ioc:Adonis/Core/Response'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthenticationCookieStatus {
  public static get cookiesConfig (): Partial<CookieOptions> {
    return {
      domain: Env.get('COOKIE_ROOT_DOMAIN', '') as string,
      path: '/',
      httpOnly: false,
      sameSite: 'strict',
      secure: Env.get('NODE_ENV') === 'production',
      maxAge: '2h',
    }
  }

  public static get cookiesName (): string {
    return 'api-elloow-auth'
  }

  public static set (ctx: HttpContextContract, data: {} = {}) {
    ctx.response.plainCookie(this.cookiesName, {auth:true, data: data}, this.cookiesConfig)
  }

  public static remove (ctx: HttpContextContract) {
    ctx.response.plainCookie(this.cookiesName, {auth: false, data: null}, this.cookiesConfig)
  }
}
