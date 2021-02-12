import { VehicleModel } from '../models/vehicle.model';
import VehicleMongoModel from '../../../shared/infra/database/mongoose/models/vehicle';
import { VehicleMapper } from '../mappers/vehicle.mapper';

export class VehicleRepository {
  async create(item: VehicleModel): Promise<void> {
    const created = await VehicleMongoModel.create(VehicleMapper.toPersistence(item));
    item._id = created._id.toString();
  }

  async list(max = 10, offset = 0): Promise<VehicleModel[]> {
    const vehicles = await VehicleMongoModel.find().limit(max).skip(offset);
    return vehicles.map((item) => VehicleMapper.toDomain(item));
  }

  count(): Promise<number> {
    return VehicleMongoModel.count().exec();
  }

  async get(_id: string): Promise<VehicleModel | undefined> {
    const vehicle = await VehicleMongoModel.findById(_id).exec();
    return vehicle ? VehicleMapper.toDomain(vehicle) : undefined;
  }
}
