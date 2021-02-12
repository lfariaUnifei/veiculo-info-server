import { IncomingMessage, ServerResponse } from 'http';

export abstract class BaseController {
  protected abstract doExecute(req: IncomingMessage, res: ServerResponse): Promise<void | any>;

  async execute(req: IncomingMessage, res: ServerResponse): Promise<void> {
    try {
      await this.doExecute(req, res);
    } catch (e) {
      console.log('Exception caught by BaseController');
      console.log(e);
    }
  }

  public static jsonResponse(res: ServerResponse, code: number, message: any) {
    res.writeHead(
      code,
      {
        'Content-Type': 'application/json',
      },
    );
    res.end(JSON.stringify(message));
  }

  ok<T>(res: ServerResponse, dto?: T): void {
    const response = dto || { message: 'ok' };
    return BaseController.jsonResponse(res, 200, response);
  }

  fail(res: ServerResponse, error: Error | string): void {
    BaseController.jsonResponse(res, 500, error.toString());
  }

  notFound(res: ServerResponse, message?: any) {
    return BaseController.jsonResponse(res, 404, message || 'Not found');
  }
}
