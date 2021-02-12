import { IncomingMessage, ServerResponse } from 'http';
import { BaseController, RequestInfo } from '../../../shared/infra/http/controllers/base.controller';
import { CreateVehicleParamsDto } from '../dtos/create-vehicle-params.dto';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { VehicleModel } from '../models/vehicle.model';

export class CreateVehicleController extends BaseController {
  constructor(private repository: VehicleRepository) {
    super();
  }

  protected async doExecute(req: IncomingMessage, res: ServerResponse, info: RequestInfo): Promise<any> {
    const dto = info.body as CreateVehicleParamsDto;
    try {
      const vehicleModel: VehicleModel = {
        ano: dto.ano,
        chassi: dto.chassi,
        marca: dto.marca,
        modelo: dto.modelo,
        placa: dto.placa,
        renavam: dto.renavam,
      };
      await this.repository.create(vehicleModel);
      super.ok<VehicleModel>(res, vehicleModel);
    } catch (e) {
      // TODO error
      super.fail(res, e);
    }
  }
}
