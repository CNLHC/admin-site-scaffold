import { APISets } from '@jacinthjs/jacinth-dev/dist/server/types/plugin';

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
};

export default foo;
