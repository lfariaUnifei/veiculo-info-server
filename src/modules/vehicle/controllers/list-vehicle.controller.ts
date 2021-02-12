import { IncomingMessage, ServerResponse } from 'http';
import { BaseController, RequestInfo } from '../../../shared/infra/http/controllers/base.controller';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { VehicleListDto } from '../dtos/vehicle.dto';

export class ListVehicleController extends BaseController {
  constructor(private vehicleRepository: VehicleRepository) {
    super();
  }

  protected async doExecute(req: IncomingMessage, res: ServerResponse, info: RequestInfo): Promise<any> {
    const {
      max,
      offset,
    } = info.query;
    const vehicleList = await this.vehicleRepository.list(Number(max), Number(offset));
    const totalCount = await this.vehicleRepository.count();

    return Promise.resolve(
      super.ok<VehicleListDto>(res, {
        totalCount: totalCount,
        vehicles: vehicleList,
      }),
    );
  }
}
