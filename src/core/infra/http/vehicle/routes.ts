import { Router } from '../../../utils/router';
import { ListVehicleController } from '../../../api/vehicle/list-vehicle.controller';

export default function registerRoutes(): void {
  const router = Router.getInstance();
  router.get({
    path: '/vehicle',
    handler: new ListVehicleController(),
  });
}
