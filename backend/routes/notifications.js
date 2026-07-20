import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getNotifications);
router.put('/read', (req, res, next) => {
    req.params.notificationId = 'all';
    markAsRead(req, res, next);
});
router.put('/:notificationId/read', markAsRead);

export default router;
