import { TPlugin } from '@jacinthjs/jacinth-dev/src/server/types/plugin';
import { AuthPayload, SessionStatus } from '../../_types/AuthPayload';
import fp from 'fastify-plugin';

const getJWTToken: TPlugin<{ expire: number }> = function(
  app,
  { expire },
  next
) {
  app.decorate('getJWTToken', (uid: string) => {
    const tJWT = app.jwt;
    const AuthPayload: AuthPayload = {
      uid: uid,
      expiredAt: (Date.now() + expire).toString(),
      status: SessionStatus.Login,
    };
    return { token: tJWT.sign(AuthPayload) };
  });



  next();
};
export default fp(getJWTToken);
