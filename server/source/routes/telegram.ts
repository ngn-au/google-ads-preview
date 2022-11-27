/** source/routes/tunnels.ts */
import express from 'express';
import controller from '../controllers/telegram';
const router = express.Router();

router.post('/telegram', controller.sendPhoto);
router.get('/image/:uuid', controller.getPhoto);

export = router;