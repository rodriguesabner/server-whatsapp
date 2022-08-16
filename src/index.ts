import { createServer } from 'http';
import Server from './server';
import config from './config';

const http = createServer(Server);

const server = http.listen(config.web.port, () => {
  const NODE_ENV = config.web.env || 'development';
  console.log(
    `App is running on port ${config.web.port} in ${NODE_ENV} mode`,
  );
});

export {
  // eslint-disable-next-line import/prefer-default-export
  server,
};
