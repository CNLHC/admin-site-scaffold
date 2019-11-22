import { TMiddleWare } from '@jacinthjs/jacinth-dev/src/server/types/plugin';
import { AuthPayload } from '../@types/AuthPayload';


const authByJWT: TMiddleWare = async function(req, _res, next) {
  const tJWT = this.jwt;

  const authPayload: string | undefined =
    typeof req.req.headers.auth === 'string' ? req.req.headers.auth : undefined;

  if (authPayload === undefined) {
    return next(new Error('Missing auth header'));
  }

  const verifyRes = await tJWT.verify<AuthPayload>(authPayload);

  if (!(req as any).uid) this.decorateRequest('uid', () => verifyRes.uid);

  if (Date.now() > parseInt(verifyRes.expiredAt)) {
    return next(new Error('Session Expired'));
  }

  next();
};

export default authByJWT;
