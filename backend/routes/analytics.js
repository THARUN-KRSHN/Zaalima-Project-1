import express from 'express';
import {
    getAnalyticsOverview,
    getTimeSeriesTrends,
    getTopProductsLedger,
    getFulfillmentRatios
} from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('vendor', 'superadmin')); 

router.get('/overview-summary', getAnalyticsOverview);


router.get('/time-series-trends', getTimeSeriesTrends);
router.get('/revenue-trends', getTimeSeriesTrends);

router.get('/top-products-ledger', getTopProductsLedger);


router.get('/fulfillment-ratios', getFulfillmentRatios);
router.get('/fulfillment-trends', getFulfillmentRatios);

export default router;
