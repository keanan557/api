// orders routes

import { addToOrders,getOrders,deleteOrders,getUserOrders,cancelOrder } from '../controller/ordersController.js';
import { authenticateToken } from '../middleware/authToken.js';
import express from 'express'

const router = express.Router()

// router.get('/api/test', (req, res) => {
//     res.send('Test route works!');
// });

router.post('/api/orders', addToOrders);
router.get('/api/orders', getOrders)
router.delete('/api/orders/:id', deleteOrders)
router.get("/api/orders/user", authenticateToken,getUserOrders);
router.delete("/api/orders/:id", authenticateToken, cancelOrder);

export default router