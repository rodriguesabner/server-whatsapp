import MessageService from '../services/message.service';
import { MessageProps } from '../interface/message';

class MessageStrategy {
  private messageService: MessageService;

  constructor(opts: any) {
    this.messageService = opts.messageService;
  }

  strategySendMessage(type: string, props: MessageProps) {
    switch (type) {
      case 'text':
        return this.messageService.sendText(props);
      case 'image':
        return this.messageService.sendImage(props);
      default:
        throw new Error(`Message Type ${type} not found!`);
    }
  }
}

export default MessageStrategy;
