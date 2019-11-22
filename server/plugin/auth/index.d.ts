import * as http from 'http';

declare module 'fastify' {
  interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    getJWTToken: (uid: string) => { token: string };
  }
}
