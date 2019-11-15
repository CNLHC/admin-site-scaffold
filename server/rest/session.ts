import { APISets } from '@jacinthjs/jacinth-dev/dist/server/types/plugin';
import axios from 'axios';

const foo: APISets = async (app, _opt) => {
  // app.addHook('preHandler', app.auth([app.sayHello]));

  app.get('/login', (req, _p) => {
    req.session.auth = true;
    _p.send({ hello: `hello, ${req.session.auth}` });
  });

  app.get('/logout', (req, _p) => {
    req.session.auth = false;
    _p.send({ hello: `hello, ${req.session.auth}` });
  });

  app.get('/check', (req, _p) => {
    _p.send({ hello: `hello, ${req.session.auth}` });
  });

  app.post('/*', async (req, _p) => {
    const res = await axios.post(
      `http://10.199.0.191${req.raw.originalUrl}`,
      req.body
    );
    return res.data;
  });
  app.get('/*', async (req, _p) => {
    const res = await axios.get(
      `http://10.199.0.191${req.raw.originalUrl}`,
      req.body
    );
    return res.data;
  });
};

export default foo;
