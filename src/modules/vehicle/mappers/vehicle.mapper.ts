import { IVehicleModel } from '../../../shared/infra/database/mongoose/models/vehicle';
import { VehicleModel } from '../models/vehicle.model';
import { VehicleDto } from '../dtos/vehicle.dto';

export class VehicleMapper {
  public static toDto(vehicle: VehicleModel): VehicleDto {
    return vehicle;
  }

  public static toPersistence(vehicle: VehicleModel): IVehicleModel {
    const copy = { ...vehicle } as IVehicleModel;
    delete copy._id;
    return copy;
  }

  public static toDomain(raw: any): VehicleModel {
    return {
      renavam: raw.renavam,
      placa: raw.placa,
      modelo: raw.modelo,
      marca: raw.marca,
      chassi: raw.chassi,
      ano: raw.ano,
      _id: raw._id,
    };
  }
}
