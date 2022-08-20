import { Whatsapp } from '@wppconnect-team/wppconnect';

function getClient(sessions: [{key: string}], session: string): Whatsapp {
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

export {
  // eslint-disable-next-line import/prefer-default-export
  getClient,
};
