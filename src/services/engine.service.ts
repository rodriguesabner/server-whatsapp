import { create, Whatsapp } from '@wppconnect-team/wppconnect';
import BaseEngine from '../common/baseEngine';

class EngineService extends BaseEngine {
  private sessions: any;

  constructor({ sessions }: {sessions: any}) {
    super();
    this.sessions = sessions;
  }

  async createSession(props: any) {
    try {
      const client: Whatsapp = this.getClient(this.sessions, props.session);

      const wppClient = await create(
        {
          session: props.session,
          deviceName: props.deviceName,
          poweredBy: props.poweredBy || 'WPPConnect-Server',
          catchQR: (base64Qr, asciiQR, attempt, urlCode) => {
            this.exportQR(base64Qr, client, urlCode);
          },
          statusFind: (statusFind) => {
            try {
              if (statusFind === 'autocloseCalled' || statusFind === 'desconnectedMobile') {
                client.close();
                this.sessions[props.session] = undefined;
              }

              // TODO: implement webhook
              // callWebHook(client, req, 'status-find', { status: statusFind });
            } catch (error: any) {
              throw new Error(error);
            }
          },
        },
      );

      Object.assign(client, { instance: wppClient });
      this.sessions = { ...this.sessions, [props.session]: client };
      await this.start(client);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async start(client: any) {
    try {
      await client.instance.isConnected();
      Object.assign(client, { status: 'CONNECTED', qrcode: null });
      this.sessions = { ...this.sessions, [client.session]: client };

      // TODO: implement webhook
      // callWebHook(client, req, 'session-logged', { status: 'CONNECTED'});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  exportQR(qrCode: string, client: Whatsapp, urlCode?: string) {
    Object.assign(client, {
      status: 'QRCODE',
      qrcode: qrCode,
      urlCode,
    });

    this.sessions = { ...this.sessions, [client.session]: client };

    const newQrCode = qrCode.replace('data:image/png;base64,', '');
    const imageBuffer = Buffer.from(qrCode, 'base64');

    // TODO: implement webhook
    // callWebHook(client, req, 'qrcode', { qrcode: newQrCode, urlCode: urlCode });
  }
}

export default EngineService;
