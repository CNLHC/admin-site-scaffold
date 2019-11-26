import {
  TMiddleWare,
  TPlugin,
} from '@jacinthjs/jacinth-dev/src/server/types/plugin';
import fp from 'fastify-plugin';
import { Logger } from 'mongodb';

const AuthBuilderFP: TPlugin<{}> = async function(app, opt, next) {
  const AuthBuilder = (AuthMiddleware: TMiddleWare[]) => {
    const _auth: TMiddleWare = async function(req, res, next) {
      let lastErr: any = false;
      const onAuth = (err?: any) => {

        lastErr = err;
      };
      for (let i = 0; i < AuthMiddleware.length; i++) {
        const f = AuthMiddleware[i].bind(app);
        await f(req, res, onAuth);

        if (!!lastErr) {
          continue;
        } else {
          next()
          return 
        }
      }
      
      next(lastErr);
    };
    return _auth;
  };
  app.decorate('authBy', AuthBuilder);
};
export default fp(AuthBuilderFP);
