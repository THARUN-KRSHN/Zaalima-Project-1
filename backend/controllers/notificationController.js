import Notification from '../models/Notification.js';
import { AppError } from '../utils/AppError.js';


export const getNotifications = async (req, res, next) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const total = await Notification.countDocuments({ userId: req.user._id });
        const notifications = await Notification.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const unreadCount = await Notification.countDocuments({
            userId: req.user._id,
            isRead: false
        });

        res.json({
            success: true,
            data: notifications,
            notifications,
            unreadCount,
            pagination: {
                page: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total
            }
        });
    } catch (error) {
        next(error);
    }
};


export const markAsRead = async (req, res, next) => {
    const { notificationId } = req.params;

    try {
        if (notificationId === 'all') {
            await Notification.updateMany(
                { userId: req.user._id, isRead: false },
                { $set: { isRead: true } }
            );
            return res.json({
                success: true,
                message: 'All notifications marked as read.'
            });
        }

        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, userId: req.user._id },
            { $set: { isRead: true } },
            { new: true }
        );

        if (!notification) {
            throw new AppError('Notification not found.', 404, 'NOTIFICATION_NOT_FOUND');
        }

        res.json({
            success: true,
            message: 'Notification marked as read.',
            data: notification
        });
    } catch (error) {
        next(error);
    }
};
