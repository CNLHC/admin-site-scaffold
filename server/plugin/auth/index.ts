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

  app.register((await import('fastify-cookie')).default);

  app.register((await import('fastify-session')).default, {
    cookieName: 'sessionId',
    secret: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    cookie: {
      secure: false,
      expires: 1800000,
    },
  });

  done();
};

export default Test;
