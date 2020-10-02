/**
 * @summary API answer convention
 */
export default class Answer {
  /**
   * Success answer
   * @param {any} data
   * @returns {JSON} JSON answer
   */
  public static success (data: any): SuccessMessage {
    return { success: true, data: data }
  }

  /**
   * Return custom message
   * @param message
   */
  public static successMessage (base: any, data: any): any {
    try {
      const result: any = {}
      Object.assign(result, { success: true }, base, { data: data })
      return result
    } catch (error) {
      return error.message
    }
  }

  /**
   * Fail answer
   * @param {string} errorMessage
   * @param {string} errorCode
   * @param {any} errorData
   * @returns {JSON} JSON answer
   */
  public static fail (errorMessage: string, errorCode: string = '', data: any = undefined): FailMessage {
    return {
      success: false,
      data: data,
      message: errorMessage || '',
      codeError: errorCode || undefined,
    }
  }
}

interface BaseMessage {
  success: boolean,
  data?: any,
}

interface FailMessage extends BaseMessage {
  message: string;
  codeError?: string;
}

interface SuccessMessage extends BaseMessage { }
