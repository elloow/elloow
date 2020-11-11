import Mail, { MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class RegisterOrganisation {
  private from = 'info@crbast.ch'
  private subject = 'Create your elloow organisation'
  private template = 'emails/register_organisation'

  private templateData = {
    actionToken: this.actionToken,
  }

  private configure (message: MessageContract) {
    message
      .subject(this.subject)
      .from(this.from)
      .to(this.recipient)
      .htmlView(this.template, this.templateData)
  }

  constructor (private actionToken: string, private recipient: string) {}

  public async send () {
    return Mail.send((message) => this.configure(message))
  }
}
