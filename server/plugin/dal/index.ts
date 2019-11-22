import { TPlugin } from '@jacinthjs/jacinth-dev/src/server/types/plugin';
import mongo from 'fastify-mongodb';
import conf from '../../../conf';

const JacinthDAL: TPlugin<{}> = async (app, opt, next) => {
  await app.register(mongo, {
    url: conf.mongo.url,
  });

  next();
};

export default JacinthDAL;
