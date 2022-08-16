import { AwilixContainer } from 'awilix';
import { formatName } from '../utils';

const registerServices = (container: AwilixContainer) => {
  if (process.env.NODE_ENV !== 'test') console.log('\n', 'Registering Services & Requests...', '\n');

  container.loadModules(
    [
      '../../**/*.service.ts',
    ],
    {
      cwd: __dirname,
      // @ts-ignore
      formatName,
    },
  );
};

export default registerServices;
