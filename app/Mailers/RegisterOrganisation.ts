import Mail, { MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class RegisterOrganisation {
  private from = 'info@crbast.ch'
  private subject = 'Create your elloow organisation'
  private template = 'emails/register-organisation'
  // TODO create html template

  private templateData = {
    actionToken: this.actionToken,
  }

  private configure (message: MessageContract) {
    message
      .subject(this.subject)
      .from(this.from)
      .to(this.recipient)
      .text(`your token : ${JSON.stringify(this.templateData)}. Layout : ${this.template}`) // TODO use .htmlView(this.template, this.templateData)
  }

  constructor (private actionToken: string, private recipient: string) {}

  public async send () {
    return Mail.sendLater((message) => this.configure(message))
  }
}
