import * as http from 'http';
import * as URL from 'url';
import registerVehicleRoutes from './core/infra/vehicle/routes';
import { RouteMethod, Router } from './core/utils/router';
import { NotFoundController } from './core/api/not-found.controller';

const port = 8081;

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
  await handler.execute(req, res);
});

server.listen(port);
console.log('Server listening on port ', port);

registerVehicleRoutes();
