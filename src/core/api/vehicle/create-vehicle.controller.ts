import { IncomingMessage, ServerResponse } from 'http';
import { BaseController } from '../base.controller';

export class CreateVehicleController extends BaseController {
  protected doExecute(req: IncomingMessage, res: ServerResponse): Promise<any> {
    return Promise.resolve(undefined);
  }
}
