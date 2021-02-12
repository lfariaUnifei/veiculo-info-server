import { Router } from '../../../shared/utils/router';
import { ListVehicleController } from '../controllers/list-vehicle.controller';
import { CreateVehicleController } from '../controllers/create-vehicle.controller';
import { VehicleRepository } from '../repositories/vehicle.repository';
import { GetVehichleController } from '../controllers/get-vehichle.controller';

export default function registerRoutes(): void {
  const router = Router.getInstance();
  const vehicleRepository = new VehicleRepository();

  router.get({
    path: '/vehicle',
    handler: new ListVehicleController(vehicleRepository),
  });

  router.get({
    path: '/vehicle/:id',
    handler: new GetVehichleController(vehicleRepository),
  });

  router.post({
    path: '/vehicle',
    handler: new CreateVehicleController(vehicleRepository),
  });
}
