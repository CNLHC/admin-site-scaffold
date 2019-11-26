import { TMiddleWare } from '@jacinthjs/jacinth-dev/src/server/types/plugin';
import { AuthPayload, SessionStatus } from '../../_types/AuthPayload';

const authByJWT: TMiddleWare = async function(req, _, next) {
  const tJWT = this.jwt;

  const authPayload: string | undefined = req.headers && req.headers.auth as string;

  if (authPayload === undefined) {
    return next(new Error('no valid jwt token found'));
  }

  const verifyRes = await tJWT.verify<AuthPayload>(authPayload);

  if (Date.now() > parseInt(verifyRes.expiredAt)) {
    return next(new Error('Session Expired'));
  }

  const User = this.mongo.db.collection('user');
  const Session = this.mongo.db.collection('session');

  const uobj = await User.findOne({ _id: new this.mongo.ObjectId(verifyRes.uid) });
  const sess = await Session.findOne({ uid: uobj._id });
  
  if (!sess) {
    return next(new Error('no session'));
  }

  req['user'] =uobj

  next();
};

export default authByJWT;
