import { IncomingMessage, ServerResponse } from 'http';
import { BaseController, RequestInfo } from '../../../shared/infra/http/controllers/base.controller';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { UpdateVehicleParamsDto } from '../dtos/update-vehicle-params.dto';
import { CreateVehicleParamsDto } from '../dtos/create-vehicle-params.dto';

export class UpdateVehicleController extends BaseController {
  constructor(private vehicleRepository: VehicleRepository) {
    super();
  }

  protected async doExecute(req: IncomingMessage, res: ServerResponse, info: RequestInfo): Promise<any> {
    const vehicle = info.body as Partial<CreateVehicleParamsDto>;
    const updateVehicle: UpdateVehicleParamsDto = {
      vehicle,
      id: info.pathVariables[0],
    };
    await this.vehicleRepository.update(updateVehicle.id, vehicle);
    return super.ok(res);
  }
}
