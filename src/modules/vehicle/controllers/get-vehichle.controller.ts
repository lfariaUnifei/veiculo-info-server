import { IncomingMessage, ServerResponse } from 'http';
import { BaseController, RequestInfo } from '../../../shared/infra/http/controllers/base.controller';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { VehicleDto } from '../dtos/vehicle.dto';
import { VehicleMapper } from '../mappers/vehicle.mapper';

export class GetVehichleController extends BaseController {
  constructor(private vehicleRepository: VehicleRepository) {
    super();
  }

  protected async doExecute(req: IncomingMessage, res: ServerResponse, info: RequestInfo): Promise<any> {
    console.log(info.pathVariables);
    const vehicle = await this.vehicleRepository.get(info.pathVariables[0]);
    if (!vehicle) {
      return this.notFound(res);
    }
    return this.ok<VehicleDto>(res, VehicleMapper.toDto(vehicle));
  }
}
