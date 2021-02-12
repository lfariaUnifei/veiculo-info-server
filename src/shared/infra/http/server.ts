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
      const { headers } = req;
      const method = req.method?.toLowerCase();
      const url = URL.parse(req.url || '', true);
      const { pathname, query } = url;

      const requestInfo = {
        url,
        method,
        pathname,
        query,
        headers,
      };

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
      await handler.execute(req, res, requestInfo);
    });

    server.listen(port);
    console.log('Server listening on port CARIO ', port);

    registerAllRoutes();
  });
}
