import * as http from 'http';
import * as https from 'https';
import * as fastify from 'fastify';
import { TMiddleWare } from './_types/plugin';

declare module 'fastify' {

  interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    getJWTToken: (uid: string) => { token: string };
    authBy: (m: TMiddleWare[]) => TMiddleWare;
    authByJWT: TMiddleWare;
  }
  interface FastifyRequest {
    user?: {
      _id: string;
      username: string;
      password: string;
    };
  }
}
