import { Whatsapp } from '@wppconnect-team/wppconnect';

class BaseEngine {
  getClient(sessions: [{key: string}], session: string): Whatsapp {
    const copySession: any = sessions;
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
