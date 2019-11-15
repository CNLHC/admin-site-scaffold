import { TPlugin } from '@jacinthjs/jacinth-dev/src/server/types/plugin';
import mongo from 'fastify-mongodb';

const JacinthDAL: TPlugin<{}> = async (app, opt, next) => {
  await app.register(mongo, {
    url: 'mongodb://localhost/dev',
  });

  next();
};

export default JacinthDAL;
