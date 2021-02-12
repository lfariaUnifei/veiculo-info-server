import { IncomingMessage, ServerResponse } from 'http';
import { BaseController, RequestInfo } from '../../../shared/infra/http/controllers/base.controller';
import { VehicleRepository } from '../repositories/vehicle.repository';

export class DeleteVehicleController extends BaseController {
  constructor(private vehicleRepository: VehicleRepository) {
    super();
  }

  protected async doExecute(req: IncomingMessage, res: ServerResponse, info: RequestInfo): Promise<any> {
    await this.vehicleRepository.delete(info.pathVariables[0]);
    return super.ok(res, { message: 'deleted' });
  }
}
