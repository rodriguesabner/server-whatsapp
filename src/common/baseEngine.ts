import { Whatsapp } from '@wppconnect-team/wppconnect';

class BaseEngine {
  public sessions: any;

  constructor({ sessions }: {sessions: any}) {
    this.sessions = sessions;
  }

  getClient(session: string): Whatsapp {
    const copySession: any = this.sessions;
    const client: Whatsapp = copySession[session];

    if (!client) {
      copySession[session] = {
        session,
        status: null,
      };

      return copySession[session];
    }

    return client;
  }
}

export default BaseEngine;
