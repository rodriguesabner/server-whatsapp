import { Request, Response, NextFunction } from 'express';
import { asValue } from 'awilix';

async function isConnected(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const { container } = req;
  const { FROM_PHONE_NUMBER_ID: sessionName } = req.params;

  const sessions = container.resolve('sessions');
  try {
    if (sessions && sessions[sessionName].instance) {
      const { instance } = sessions[sessionName];
      await instance.isConnected();

      Object.assign(req, {
        sessionName,
        whatsapp: instance,
      });

      container.register({
        scope: asValue(req),
      });

      next();
      return;
    }

    res.status(404).json({
      response: null,
      status: 'Disconnected',
      message: 'A sessão do WhatsApp não está ativa.',
    });
  } catch (error) {
    res.status(404).json({
      response: null,
      status: 'Disconnected',
      message: 'A sessão do WhatsApp não está ativa.',
    });
  }
}

export default isConnected;
