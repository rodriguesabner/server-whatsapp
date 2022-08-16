import { Request, Response } from 'express';
import { before, POST, route } from 'awilix-express';
import { BaseRoute } from '../common/baseRoute';
import MessageService from '../services/message.service';
import isConnected from '../middleware/isConnected';
import numberExists from '../middleware/numberExists';
import MessageStrategy from '../strategy/message.strategy';
import { MessageProps } from '../interface/message';

@route('/:FROM_PHONE_NUMBER_ID')
export default class MessageRoute extends BaseRoute {
  private readonly messageService: MessageService;

  constructor({ messageService }: { messageService: MessageService }) {
    super();
    this.messageService = messageService;
  }

  @route('/messages')
  @before([isConnected, numberExists])
  @POST()
  async sendMessage(req: Request, res: Response) {
    const {
      recipient_type, to, type, text, image, location,
    } = req.body;

    try {
      const props: MessageProps = {
        recipient_type,
        to,
        text,
        type,
        image,
        location,
      };

      const messageStrategy = new MessageStrategy({ messageService: this.messageService });
      const ret = await messageStrategy.strategySendMessage(type, props);

      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }
}
