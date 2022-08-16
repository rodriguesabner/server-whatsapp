import express from 'express';
import cors from 'cors';
import { AwilixContainer, createContainer } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-express';
import loadContainer from './container';
import config from './config';

class Server {
  public app: express.Application;

  private container: AwilixContainer;

  constructor() {
    this.app = express();
    this.container = createContainer();

    this.containerSetup();
    this.configExpress();
  }

  configExpress() {
    this.app.use(express.json({ limit: '25mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(`${__dirname}/files`));
    this.app.use(cors({ origin: '*' }));
  }

  async containerSetup() {
    await loadContainer(this.container, config);
    this.app.use(scopePerRequest(this.container));
    this.app.use(loadControllers('./routes/*.route.ts', { cwd: __dirname }));
  }
}

export default new Server().app;
