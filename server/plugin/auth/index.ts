import {
  TPlugin,
  TMiddleWare,
} from '@jacinthjs/jacinth-dev/src/server/types/plugin';

export type AuthObject<T> = {
  _uid: string;
} & T;

const Test: TPlugin<{}> = async (app, _opt, done) => {
  await app.register((await import('fastify-jwt')).default, {
    secret: 'supersecret',
  });

  delete require.cache[require.resolve('./_lib/_auth')]
  delete require.cache[require.resolve('./_lib/jwt/_sessionControl')]
  delete require.cache[require.resolve('./_lib/jwt/_authByJWT')]
  app.register((await import('./_lib/_auth')).default);
  app.register((await import('./_lib/jwt/_sessionControl')).default, { expire: 18000 });
  app.decorate('authByJWT', (await import('./_lib/jwt/_authByJWT')).default);

  done();
};

export default Test;
