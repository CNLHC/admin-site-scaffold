import axios from 'axios';
import schema from './_schema/session';
import session from './_schema/session';
import { TPlugin } from '../plugin/auth/_types/plugin';

const foo: TPlugin<{}> = async (app, _opt) => {
  // app.addHook('preHandler', app.auth([app.sayHello]));

  app.post(
    '/login',
    {
      schema: schema.login,
    },
    async (req, _p) => {
      const payload = req.body;
      const User = app.mongo.db.collection('user');
      const Session = app.mongo.db.collection('session');
      const userObj = await User.findOne({
        username: { $eq: payload.username },
        password: { $eq: payload.password },
      });
      if (userObj) {
        await Session.insertOne({ uid: userObj._id });
        return { token: app.jwt.sign({ uid: userObj._id }) };
      }
      const err: any = new Error();
      err.statusCode = 401;
      err.message = '登陆信息错误';
      throw err;
    }
  );

  app.post(
    '/logout',
    {
      preHandler: [app.authBy([app.authByJWT])],
    },
    async (req, _p) => {
      const Session = app.mongo.db.collection('session');
      await Session.deleteOne({ uid: req.user._id });
      return { status: 'ok' };
    }
  );

  app.post(
    '/check',
    {
      preHandler:  [app.authBy([app.authByJWT])],
    },
    async (req, _p) => ({ login: true })
  );

  app.post('/*', async (req, _p) => {
    const res = await axios.post(`http://10.199.0.191${req.raw.url}`, req.body);
    return res.data;
  });

  app.get('/*', async (req, _p) => {
    const res = await axios.get(`http://10.199.0.191${req.raw.url}`, req.body);
    return res.data;
  });
};

export default foo;
