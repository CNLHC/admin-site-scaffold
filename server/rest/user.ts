import schema from './_schema/user';
import { TPlugin } from '@jacinthjs/jacinth-dev/src/server/types/plugin';

const foo: TPlugin<{}> = async (app, _opt) => {
  app.post('/_auth/register', { schema: schema.register }, async req => {
    const payload = req.body;
    const User = app.mongo.db.collection('user');
    const userObj = await User.findOne({
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
  });

  app.post('/_auth/getToken', { schema: schema.getToken }, async req => {
    const User = app.mongo.db.collection('user');
    const { username, password } = req.body;
    const userObj = await User.findOne({
      username,
      password,
    });
    if (userObj) {
    } else {
      const err = new Error() as any;
      err.statusCode = 400;
      err.message = 'wrong credentials';
      throw err;
    }
  });

  app.post(
    '/_auth/check',
    {
      preHandler: [],
    },
    async (req, res) => {
      try {
        await app.jwt.verify(req.headers.auth);
      } catch {
        res.code(403).send({ auth: false });
      }
      res.code(200).send({ auth: true });
      res.sent = true;
    }
  );
};

export default foo;
