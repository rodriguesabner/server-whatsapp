import { config } from 'dotenv';
import path from 'path';
// @ts-ignore
import { version } from '../../package.json';

config();

const ENV = process.env.NODE_ENV || 'development';

// eslint-disable-next-line import/no-dynamic-require,@typescript-eslint/no-var-requires
const envConfig = require(path.join(__dirname, 'environments', ENV));

const configEnv = {
  [ENV]: true,
  env: ENV,
  name: 'server-wppconnect',
  secretKey: process.env.SECRET_KEY || 'change',
  version,
  ...envConfig,
};

export default configEnv.default || configEnv;
