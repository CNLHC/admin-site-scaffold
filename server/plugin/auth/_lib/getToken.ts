import { TPlugin } from '@jacinthjs/jacinth-dev/src/server/types/plugin';
import { AuthPayload } from '../@types/AuthPayload';

const getJWTToken: TPlugin<{ expire: number }> = function(app, { expire }) {
  app.decorate('getJWTToken', (uid: string) => {
    const tJWT = app.jwt;
    const AuthPayload: AuthPayload = {
      uid: uid,
      expiredAt: (Date.now() + expire).toString(),
    };
    return { token: tJWT.sign(AuthPayload) };
  });
};
export default getJWTToken;
