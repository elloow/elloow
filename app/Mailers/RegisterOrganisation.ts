import Mail, { MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class RegisterOrganisation {
  private from = 'info@crbast.ch'
  private subject = 'Create your elloow organisation'
  private template = 'emails/register_organisation'

  private templateData = {
    url: this.url,
  }

  private configure (message: MessageContract) {
    message
      .subject(this.subject)
      .from(this.from)
      .to(this.recipient)
      .htmlView(this.template, this.templateData)
  }

  constructor (private url: string, private recipient: string) {}

  public async send () {
    return Mail.sendLater((message) => this.configure(message))
  }
}
