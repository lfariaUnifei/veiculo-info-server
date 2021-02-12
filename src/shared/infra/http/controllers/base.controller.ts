import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from 'http';
import { UrlWithParsedQuery } from 'url';
import { ParsedUrlQuery } from 'querystring';

export interface RequestInfo {
  url: UrlWithParsedQuery;
  method?: string;
  pathname: string | null;
  query: ParsedUrlQuery;
  headers: IncomingHttpHeaders;
  body: any
}

export abstract class BaseController {
  protected abstract doExecute(req: IncomingMessage, res: ServerResponse, info: RequestInfo): Promise<void | any>;

  async execute(req: IncomingMessage, res: ServerResponse, info: Omit<RequestInfo, 'body'>): Promise<void> {
    return new Promise((resolve, reject) => {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      req.on('end', () => {
        console.log(data);
        let body = {};
        try {
          body = JSON.parse(data);
        } catch (e) {
          console.log(e);
        }
        this.doExecute(req, res, {
          ...info,
          body: body,
        }).then(() => {
          resolve();
        }).catch((e) => {
          console.log('Exception caught by BaseController');
          console.log(e);
        });
      });
    });
  }

  static jsonResponse(res: ServerResponse, code: number, message: any) {
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
