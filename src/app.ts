import 'dotenv';
import 'reflect-metadata';
import { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';

import { TYPES } from './constants';
import { DeserializeMiddleware, SerializeMiddleware } from './controllers';
import {
  loadContainer,
  loadDatabase,
  loadDeserializeMiddleware,
  loadParser,
  loadSerializeMiddleware,
} from './loaders';

export default async function init(): Promise<Application> {
  // await loadDatabase();
  // const container = loadContainer();
  // const server = new InversifyExpressServer(container);
  // server.setConfig((app) => {
  //   loadParser(app);
  //   loadDeserializeMiddleware(
  //     app,
  //     container.get<DeserializeMiddleware>(TYPES.DeserializeMiddleware),
  //   );
  //   loadSerializeMiddleware(
  //     app,
  //     container.get<SerializeMiddleware>(TYPES.SerializeMiddleware),
  //   );
  // });
  // const app = server.build();
  // return app;
  return <Application>null;
}
