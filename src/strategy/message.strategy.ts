import MessageService from '../services/message.service';
import { MessageProps } from '../interface/message';

class MessageStrategy {
  private messageService: MessageService;

  private sessionName: string;

  constructor(opts: any) {
    this.messageService = opts.messageService;
    this.sessionName = opts.sessionName;
  }

  strategySendMessage(type: string, props: MessageProps) {
    switch (type) {
      case 'text':
        return this.messageService.sendText(props);
      case 'image':
        return this.messageService.sendImage(props);
      case 'video':
        return this.messageService.sendVideo(props);
      case 'location':
        return this.messageService.sendLocation(props);
      case 'reaction':
        return this.messageService.sendReaction(props);
      case 'interactive':
        return this.messageService.sendInteractiveMessage(props);
      default:
        throw new Error(`Message Type ${type} not found!`);
    }
  }
}

export default MessageStrategy;
