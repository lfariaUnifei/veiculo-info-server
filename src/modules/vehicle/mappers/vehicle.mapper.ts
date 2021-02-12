import { IVehicleModel } from '../../../shared/infra/database/mongoose/models/vehicle';
import { VehicleModel } from '../models/vehicle.model';

export class VehicleMapper {
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
