import schema from './_schema/user';
import { TPlugin } from '@jacinthjs/jacinth-dev/src/server/types/plugin';

const foo: TPlugin<{}> = async (app, _opt) => {
  app.post('/register', { schema: schema.register }, async req => {
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
    return { status: 'ok' };
  });
};

export default foo;
