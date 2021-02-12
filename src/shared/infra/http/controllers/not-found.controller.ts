import { IncomingMessage, ServerResponse } from 'http';
import { BaseController } from './base.controller';

export class NotFoundController extends BaseController {
  protected doExecute(req: IncomingMessage, res: ServerResponse): Promise<any> {
    return Promise.resolve(this.notFound(res));
  }
}
