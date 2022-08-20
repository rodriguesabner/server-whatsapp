import { Request, Response } from 'express';
import { before, POST, route } from 'awilix-express';
import { BaseRoute } from '../common/baseRoute';
import EngineService from '../services/engine.service';
import isConnected from '../middleware/isConnected';

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
    const { FROM_PHONE_NUMBER_ID: session } = req.params;
    const { deviceName, poweredBy } = req.body;

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

  @route('/session/stop')
  @before([isConnected])
  @POST()
  async stop(req: Request, res: Response) {
    const { FROM_PHONE_NUMBER_ID: session } = req.params;

    try {
      const ret = this.engineService.stopSession(session);
      this.ok(res, ret);
    } catch (err: any) {
      this.fail(res, err);
    }
  }
}
