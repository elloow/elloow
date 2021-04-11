import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

/**
 * Axios HttpClient for testing purposes.
 */
export default class HttpClient {
  private static config: AxiosRequestConfig
  // private static reqAuthInterceptorId: number | undefined

  public static use (): AxiosInstance {
    this.assignConfigIfUndefined()
    return axios.create(this.config)
  }

  /**
   * Set Axios configuration
   * @param options Axios configuration to be setted
   */
  public static setConfig (options: AxiosRequestConfig) {
    this.config = options
  }

  /**
   * Assign empty configuration if no configurations is set.
   */
  private static assignConfigIfUndefined () {
    if (!this.config) {
      this.config = {}
    }
  }
}
