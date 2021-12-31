import { Router } from 'express';
import { remultExpress } from 'remult/remult-express';
import '../../shared/User';

export function apiRouter() {
  const router = Router();
  router.use(remultExpress());
  //to use a production database, see:
  //https://remult.dev/docs/databases.html
  return router;
}
