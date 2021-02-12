import http from 'http';
import URL from 'url';
import connectMongoDB from '../database/mongoose/config/config';
import { RouteMethod, Router } from '../../utils/router';
import { NotFoundController } from './controllers/not-found.controller';
import registerAllRoutes from './routes/all-routes';

const port = 4000;

export default function createServer(): Promise<void> {
  return connectMongoDB().then(() => {
    const server: http.Server = http.createServer(async (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Request-Method', '*');
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
      res.setHeader('Access-Control-Allow-Headers', '*');
      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }
      const { headers } = req;
      const method = req.method?.toLowerCase();
      const url = URL.parse(req.url || '', true);
      const { pathname, query } = url;

      if (!method) {
        res.statusCode = 500;
        return res.end('Error');
      }

      let handler = Router
        .getInstance()
        .getHandlerForPath(method as RouteMethod, pathname || '');

      if (!handler) {
        handler = new NotFoundController();
      }
      await handler.execute(req, res, {
        url,
        method,
        pathname,
        query,
        headers,
        pathVariables: Router.getInstance().getPathVariables(method as RouteMethod, pathname || ''),
      });
    });

    server.listen(port);
    console.log('Server listening on port CARIO ', port);

    registerAllRoutes();
  });
}
