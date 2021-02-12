import { IncomingMessage, ServerResponse } from 'http';
import { BaseController } from '../base.controller';

export class ListVehicleController extends BaseController {
  protected doExecute(req: IncomingMessage, res: ServerResponse): Promise<any> {
    return Promise.resolve(super.ok(res));
  }
}
