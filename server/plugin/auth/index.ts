import {
  TPlugin,
  TMiddleWare,
} from '@jacinthjs/jacinth-dev/src/server/types/plugin';
import jwt from 'fastify-jwt';
import auth from 'fastify-auth';

type AuthPayload = {
  uid: string;
  expiredAt: string;
};
export type AuthObject<T> = {
  _uid: string;
} & T;

const Test: TPlugin<{}> = async (app, _opt, done) => {
  await app.register(jwt, { secret: 'supersecret' });
  await app.register(auth);

  const authByJWT: TMiddleWare = async function(req, _res, next) {
    const tJWT = this.jwt;

    const authPayload: string | undefined =
      typeof req.req.headers.auth === 'string'
        ? req.req.headers.auth
        : undefined;

    if (authPayload === undefined) {
      return next(new Error('Missing auth header'));
    }

    //TODO: Add json schema validation

    const verifyRes = await tJWT.verify<AuthPayload>(authPayload);
    console.log(verifyRes);
    if (!(req as any).uid) app.decorateRequest('uid', () => verifyRes.uid);

    if (Date.now() > parseInt(verifyRes.expiredAt)) {
      return next(new Error('Session Expired'));
    }

    next();
  };

  app.after(() => {
    app.post(
      '/_auth/register',
      {
        schema: {
          body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: { type: 'string' },
              password: { type: 'string' },
            },
          },
        },
      },
      async req => {
        const payload = req.body;
        const User = app.mongo.db.collection('user');
        const userObj = await User.findOne<{ username: string }>({
          username: payload.username,
        });
        if (userObj) {
          const err = new Error() as any;
          err.statusCode = 400;
          err.message = 'user already exists';
          throw err;
        }
        User.insertOne(payload);
        return { hi: '1' };
      }
    );
    app.post(
      '/_auth/getToken',
      {
        schema: {
          body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: { type: 'string' },
              password: { type: 'string' },
            },
          },
        },
      },
      async req => {
        const User = app.mongo.db.collection('user');
        const { username, password } = req.body;
        const userObj = await User.findOne({
          username,
          password,
        });
        if (userObj) {
          const tJWT = app.jwt;
          const AuthPayload: AuthPayload = {
            uid: userObj._id,
            expiredAt: (Date.now() + 90000000).toString(),
          };
          return { token: tJWT.sign(AuthPayload) };
        } else {
          const err = new Error() as any;
          err.statusCode = 400;
          err.message = 'wrong credentials';
          throw err;
        }
      }
    );
  });
  app.decorate('sayHello', authByJWT);
  done();
};

export default Test;
