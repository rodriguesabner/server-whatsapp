import { Message, Whatsapp } from '@wppconnect-team/wppconnect';
import { MessageProps } from '../interface/message';
import { ContainerMessage } from '../interface/container';

class MessageService {
  private whatsapp: Whatsapp;

  constructor(opts: ContainerMessage) {
    this.whatsapp = opts.scope.whatsapp;
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

  async sendVideo(props: MessageProps) {
    try {
      const phones = this.sanitizePhone(props.to);
      const tasks: any = [];

      phones.forEach((phone) => {
        tasks.push(
          this.whatsapp.sendFile(
            phone,
            <string>props.image?.path,
            props.image?.filename,
          ),
        );
      });

      const ret = await Promise.all(tasks);
      return {
        messaging_product: 'whatsapp',
        type: 'video',
        contacts: [...phones],
        messages: ret.map((r: Message) => r.id),
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async sendLocation(props: MessageProps) {
    try {
      const phones = this.sanitizePhone(props.to);
      const tasks: any = [];

      phones.forEach((phone) => {
        tasks.push(
          this.whatsapp.sendLocation(
            phone,
            <string>props.location?.latitude,
            <string>props.location?.longitude,
            <string>props.location?.name,
          ),
        );
      });

      const ret = await Promise.all(tasks);
      return {
        messaging_product: 'whatsapp',
        type: 'location',
        contacts: [...phones],
        messages: ret.map((r: Message) => r.id),
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async sendReaction(props: MessageProps) {
    try {
      const ret = await this.whatsapp.sendReactionToMessage(
            <string>props.reaction?.message_id,
            // @ts-ignore
            props.reaction?.emoji,
      );

      return {
        messaging_product: 'whatsapp',
        type: 'reaction',
        contacts: [props.to],
        messages: ret.sendMsgResult,
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async sendInteractiveMessage(props: MessageProps) {
    try {
      const phones = this.sanitizePhone(props.to);
      const tasks: any = [];

      phones.forEach((phone) => {
        tasks.push(
          this.whatsapp.sendText(
            phone,
            // @ts-ignore
            props.interactive.body,
            props.interactive?.buttons,
            // @ts-ignore
            props.interactive?.title,
            props.interactive?.footer,
          ),
        );
      });

      const ret = await Promise.all(tasks);
      return {
        messaging_product: 'whatsapp',
        type: 'interactive',
        contacts: [props.to],
        messages: ret.map((r: Message) => r.id),
      };
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default MessageService;
