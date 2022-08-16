import { asFunction, asValue, AwilixContainer } from 'awilix';
import { create, Whatsapp } from '@wppconnect-team/wppconnect';
import jwt from 'jsonwebtoken';
import querystring from 'query-string';
import { EventEmitter } from 'events';

let wppInstance: Whatsapp;
create({
  session: 'Meu bot',
}).then((wpp: Whatsapp) => {
  wppInstance = wpp;
  console.log('Whatsapp instance created');
});

const registerLibs = (container: AwilixContainer, config: any) => {
  container.register({
    whatsapp: asFunction(() => wppInstance),
    querystring: asValue(querystring),
    config: asValue(config),
    jwt: asValue(jwt),
    eventEmitter: asValue(EventEmitter),
  });
};

export default registerLibs;
