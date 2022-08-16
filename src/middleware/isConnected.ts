import { Request, Response, NextFunction } from 'express';

async function isConnected(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  const whatsapp = req.container.resolve('whatsapp');
  try {
    if (whatsapp) {
      await whatsapp.isConnected();
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
