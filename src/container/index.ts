import { AwilixContainer } from 'awilix';
import { registerLibs, registerServices, registerEngine } from './registrations';

async function loadContainer(container: AwilixContainer, config: any) {
  registerLibs(container, config);
  registerServices(container);
  registerEngine(container);

  return container;
}

export default loadContainer;
