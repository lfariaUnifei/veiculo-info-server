import { Router } from '../../../../../shared/utils/router';
import { ListVehicleController } from '../controllers/list-vehicle.controller';

export default function registerRoutes(): void {
  const router = Router.getInstance();
  router.get({
    path: '/vehicle',
    handler: new ListVehicleController(),
  });
}
