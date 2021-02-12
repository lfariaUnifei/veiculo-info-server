import { Router } from '../../../shared/utils/router';
import { ListVehicleController } from '../controllers/list-vehicle.controller';
import { CreateVehicleController } from '../controllers/create-vehicle.controller';
import { VehicleRepository } from '../repositories/vehicle.repository';

export default function registerRoutes(): void {
  const router = Router.getInstance();
  const vehicleRepository = new VehicleRepository();
  router.get({
    path: '/vehicle',
    handler: new ListVehicleController(vehicleRepository),
  });

  router.post({
    path: '/vehicle',
    handler: new CreateVehicleController(vehicleRepository),
  });
}
