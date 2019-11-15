import * as http from 'http';
import { AuthObject } from './server/plugin/auth/index';

declare module 'fastify' {
  interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    signUp: <T>(id: string) => Promise<AuthObject<T> | null>;
    getJWTToken: <T>(id: string) => Promise<AuthObject<T> | null>;
  }
}
