import { create, Whatsapp } from '@wppconnect-team/wppconnect';
import { EventEmitter } from 'events';

class EngineStrategy {
  private sessions: any;

  private eventEmitter: EventEmitter;

  constructor({ sessions, eventEmitter }: {
    sessions: any,
    eventEmitter: EventEmitter
  }) {
    this.sessions = sessions;
    this.eventEmitter = eventEmitter;
  }

  getClient(session: string): Whatsapp {
    const client: Whatsapp = this.sessions[session];

    if (!client) {
      this.sessions[session] = {
        session,
        status: null,
      };
    }

    return client;
  }

  async createSession(session: string, props: any) {
    try {
      const client: Whatsapp = this.getClient(session);

      const wppClient = await create(
        {
          session,
          deviceName: props.deviceName,
          poweredBy: props.poweredBy || 'WPPConnect-Server',
          catchQR: (base64Qr, asciiQR, attempt, urlCode) => {
            this.exportQR(base64Qr, client, urlCode);
          },
          statusFind: (statusFind) => {
            try {
              this.eventEmitter.emit(`status-${client.session}`, client, statusFind);

              if (statusFind === 'autocloseCalled' || statusFind === 'desconnectedMobile') {
                client.close();
                this.sessions[session] = undefined;
              }

              // TODO: implement webhook
              // callWebHook(client, req, 'status-find', { status: statusFind });
            } catch (error: any) {
              throw new Error(error);
            }
          },
        },
      );

      this.sessions[session] = Object.assign(wppClient, client);
      await this.start(client);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async start(client: Whatsapp) {
    try {
      await client.isConnected();
      Object.assign(client, { status: 'CONNECTED', qrcode: null });

      // callWebHook(client, req, 'session-logged', { status: 'CONNECTED'});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  exportQR(qrCode: string, client: Whatsapp, urlCode?: string) {
    this.eventEmitter.emit(`qrcode-${client.session}`, qrCode, urlCode, client);
    Object.assign(client, {
      status: 'QRCODE',
      qrcode: qrCode,
      urlCode,
    });

    const newQrCode = qrCode.replace('data:image/png;base64,', '');
    const imageBuffer = Buffer.from(qrCode, 'base64');

    // TODO: implement webhook
    // callWebHook(client, req, 'qrcode', { qrcode: newQrCode, urlCode: urlCode });
  }
}

export default EngineStrategy;
