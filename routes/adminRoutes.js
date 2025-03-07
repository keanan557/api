// admin routes page

// imports
import express from 'express'
import { adminLogin,fetchAdmin,addAdmin,updateAdmin,deleteAdmin } from "../controller/adminController.js";

const router = express.Router()

router.post('/api/admin/login', adminLogin);
router.get('/api/admin_users', fetchAdmin);
router.post('/api/admin_users', addAdmin);
router.patch('/api/admin_users/:id', updateAdmin );
router.delete('/api/admin_users/:id', deleteAdmin);

export default router