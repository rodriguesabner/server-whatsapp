import { asValue, AwilixContainer } from 'awilix';

const registerEngine = (container: AwilixContainer) => {
  container.register({
    sessions: asValue([]),
  });
};

export default registerEngine;
