import { Types } from 'mongoose';
import { BaseController } from '../infra/http/controllers/base.controller';

export interface Route {
  path: string;
  handler: BaseController;
}
export type RouteMethod = 'get' | 'post' | 'put' | 'delete';

export class Router {
  private static instance: Router;

  private routes: Record<RouteMethod, Route[]> = {
    delete: [],
    get: [],
    post: [],
    put: [],
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  /**
   * Método gambi para tratar casos simples de match de roteamento..
   * Uma forma mais complexa não cabe tratar aqui visto também que já existem
   * soluções de prateleira para isso
   *
   * Trata casos de urls do tipo:
   * resource/:id/resource/:outroId
   * Sendo que esse ids devem ser mongos ids...
   * @param routePath
   * @param path
   */

  public match(routePath: string, path: string): boolean {
    const routePathSplit = routePath.split('/');
    const pathSplit = path.split('/');
    if (routePathSplit.length !== pathSplit.length) {
      return false;
    }
    for (let i = 0; i < routePathSplit.length; i++) {
      if (routePathSplit[i] !== pathSplit[i]) {
        if (!routePathSplit[i].startsWith(':') || !Types.ObjectId.isValid(pathSplit[i])) {
          return false;
        }
      }
    }
    return true;
  }

  private findRouteForPath(method: RouteMethod, path: string): Route | undefined {
    return this.routes[method].find((route) => this.match(route.path, path));
  }

  public getHandlerForPath(method: RouteMethod, path: string): BaseController | undefined {
    return this.findRouteForPath(method, path)?.handler;
  }

  public getPathVariables(method: RouteMethod, path: string): string[] {
    const route = this.findRouteForPath(method, path);
    if (!route) {
      return [];
    }
    const variables: string[] = [];
    const splittedPath = path.split('/');
    route.path.split('/').forEach((item, index) => {
      if (item.startsWith(':')) {
        variables.push(splittedPath[index]);
      }
    });
    return variables;
  }

  private registerRoute(method: RouteMethod, route: Route): void {
    this.routes[method].push(route);
  }

  public get(route: Route): void {
    this.registerRoute('get', route);
  }

  public post(route: Route): void {
    this.registerRoute('post', route);
  }

  public put(route: Route): void {
    this.registerRoute('put', route);
  }

  public delete(route: Route): void {
    this.registerRoute('delete', route);
  }
}
