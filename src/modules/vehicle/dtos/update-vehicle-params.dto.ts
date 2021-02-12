import { CreateVehicleParamsDto } from './create-vehicle-params.dto';

export interface UpdateVehicleParamsDto {
  id: string;
  vehicle: Partial<CreateVehicleParamsDto>;
}
