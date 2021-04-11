import { CookieOptions, ResponseContract } from '@ioc:Adonis/Core/Response'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthenticationCookieStatus {
  public static get cookiesConfig (): Partial<CookieOptions> {
    return {
      domain: Env.get('COOKIE_ROOT_DOMAIN', '') as string,
      path: '/',
      httpOnly: false,
      sameSite: 'strict',
      secure: Env.get('NODE_ENV') === 'production',
      maxAge: '2h'
    }
  }

  public static get cookiesName (): string {
    return 'api-elloow-auth-status'
  }

  public static set (response: ResponseContract, data: {} = {}) {
    response.plainCookie(this.cookiesName, { auth: true, data: data }, this.cookiesConfig)
  }

  public static remove (response: ResponseContract) {
    response.plainCookie(this.cookiesName, { auth: false, data: null }, this.cookiesConfig)
  }
}
