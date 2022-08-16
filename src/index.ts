import { createServer } from 'http';
import Server from './server';
import config from './config';

// @ts-ignore
global.wppconnect = config;

const http = createServer(Server);

const server = http.listen(config.web.port, () => {
  // @ts-ignore
  const host = server.address()?.address;
  // @ts-ignore
  const port = server.address()?.port;

  console.log(
    'App %s %s listening at http://%s:%s',
    config.name,
    config.version,
    host,
    port,
  );
});

export {
  // eslint-disable-next-line import/prefer-default-export
  server,
};
