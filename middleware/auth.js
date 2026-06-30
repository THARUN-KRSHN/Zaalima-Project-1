import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            
            token = req.headers.authorization.split(' ')[1];

            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    errorCode: 'UNAUTHORIZED',
                    message: 'User associated with this token no longer exists.',
                    timestamp: new Date().toISOString()
                });
            }

            next();
        } catch (error) {
            console.error('JWT verification error:', error.message);
            return res.status(401).json({
                success: false,
                errorCode: 'INVALID_TOKEN',
                message: 'Not authorized, token signature validation failed.',
                timestamp: new Date().toISOString()
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            errorCode: 'MISSING_TOKEN',
            message: 'Not authorized, access token credentials not provided.',
            timestamp: new Date().toISOString()
        });
    }
};


export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                errorCode: 'FORBIDDEN',
                message: `User privilege role '${req.user?.role || 'none'}' is not authorized to access this route.`,
                timestamp: new Date().toISOString()
            });
        }
        next();
    };
};
