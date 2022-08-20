import { asFunction, asValue, AwilixContainer } from 'awilix';
import jwt from 'jsonwebtoken';
import querystring from 'query-string';
import { EventEmitter } from 'events';

const registerLibs = (container: AwilixContainer, config: any) => {
  container.register({
    querystring: asValue(querystring),
    config: asValue(config),
    jwt: asValue(jwt),
    eventEmitter: asFunction(() => EventEmitter),
  });
};

export default registerLibs;
