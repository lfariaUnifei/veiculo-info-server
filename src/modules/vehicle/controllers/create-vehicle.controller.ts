import { IncomingMessage, ServerResponse } from 'http';
import { BaseController } from '../../../../../shared/infra/http/controllers/base.controller';

export class CreateVehicleController extends BaseController {
  protected doExecute(req: IncomingMessage, res: ServerResponse): Promise<any> {
    return Promise.resolve(undefined);
  }
}
