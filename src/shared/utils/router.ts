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

  public getHandlerForPath(method: RouteMethod, path: string): BaseController | undefined {
    // @ts-ignore
    Object.keys(this.routes).forEach((key: RouteMethod) => {
      this.routes[key].forEach((item) => console.log(item.path));
    });
    return this.routes[method].find((route) => route.path === path)?.handler;
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
}
