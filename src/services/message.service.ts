import { Message, Whatsapp } from '@wppconnect-team/wppconnect';
import { MessageProps } from '../interface/message';

class MessageService {
  private whatsapp: Whatsapp;

  constructor({ whatsapp }: { whatsapp: Whatsapp }) {
    this.whatsapp = whatsapp;
  }

  sanitizePhone(phone: string): Array<string> {
    return phone.split(',');
  }

  async sendText(props: MessageProps) {
    try {
      const phones = this.sanitizePhone(props.to);
      const tasks: any = [];

      phones.forEach((phone) => {
        tasks.push(this.whatsapp.sendText(
          phone,
          <string> props.text?.body,
        ));
      });

      const ret = await Promise.all(tasks);
      return {
        messaging_product: 'whatsapp',
        type: 'text',
        contacts: [...phones],
        messages: ret.map((r: Message) => r.id),
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async sendImage(props: MessageProps) {
    try {
      const phones = this.sanitizePhone(props.to);
      const tasks: any = [];

      phones.forEach((phone) => {
        tasks.push(
          this.whatsapp.sendImage(
            phone,
            <string>props.image?.path,
            props.image?.filename,
            props.image?.caption,
            props.image?.quotedMessageId,
            props.image?.isViewOnce || false,
          ),
        );
      });

      const ret = await Promise.all(tasks);
      return {
        messaging_product: 'whatsapp',
        type: 'image',
        contacts: [...phones],
        messages: ret.map((r: Message) => r.id),
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default MessageService;
