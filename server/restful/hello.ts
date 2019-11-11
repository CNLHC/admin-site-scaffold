import { APISets } from '@jacinthjs/jacinth-dev/dist/server/types/plugin';

const foo: APISets = async (app, _opt) => {
  app.get('/hello/', async (_q, _p) => ({ hello: 'world' }));
};

export default foo;
