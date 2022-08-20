import { Request, Response } from 'express';
import { POST, route } from 'awilix-express';
import { BaseRoute } from '../common/baseRoute';
import EngineService from '../services/engine.service';

@route('/:FROM_PHONE_NUMBER_ID')
export default class MessageRoute extends BaseRoute {
  private readonly engineService: EngineService;

  constructor({ engineService }: { engineService: EngineService }) {
    super();
    this.engineService = engineService;
  }

  @route('/session/start')
  @POST()
  async start(req: Request, res: Response) {
    const { session, deviceName, poweredBy } = req.body;

    try {
      const props = {
        session,
        deviceName,
        poweredBy,
      };

      const ret = this.engineService.createSession(props);
      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }
}
