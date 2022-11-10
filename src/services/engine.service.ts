import { create, Message } from '@wppconnect-team/wppconnect';
import BaseEngine from '../common/baseEngine';
import { ClientProps, Container } from '../interface/container';
import { CreateSessionProps } from '../interface/engine';

class EngineService extends BaseEngine {
  constructor(opts: Container) {
    super(opts);
    this.sessions = opts.sessions;
  }

  async start(client: ClientProps) {
    try {
      await client.instance.isConnected();
      Object.assign(client, { status: 'Connected', qrcode: null });
      this.sessions = { ...this.sessions, [client.session]: client };

      this.callWebHook(client, 'session-logged', { status: 'CONNECTED' });

      client.instance.onAnyMessage((message: Message) => {
        const evt = message.from ? 'message-send' : 'message-received';
        this.callWebHook(client, evt, { message });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  exportQR(qrCode: string, client: ClientProps, urlCode?: string) {
    Object.assign(client, {
      status: 'QRCODE',
      qrcode: qrCode,
      urlCode,
    });

    this.sessions = { ...this.sessions, [client.session]: client };

    const newQrCode = qrCode.replace('data:image/png;base64,', '');
    this.callWebHook(client, 'qrcode', { qrcode: newQrCode, urlCode });
  }

  async createSession(props: CreateSessionProps) {
    try {
      const client: ClientProps = this.getClient(props.session);

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
                client.instance.close();
                this.sessions = { ...this.sessions, [props.session]: undefined };
              }

              this.callWebHook(client, 'status-find', { status: statusFind });
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

  async stopSession(session: string) {
    try {
      const client: ClientProps = this.getClient(session);

      // @ts-ignore
      await client.instance.close();
      delete this.sessions[session];

      this.callWebHook(client, 'session-logout', { status: 'DISCONNECTED' });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default EngineService;
