import express  from 'express';
const router = express.Router();

// Individual route fayllarini import qilish
import projectRoutes  from './projectRoutes.routes.js';

// Boshqa route'lar ham shu yerda qo'shilishi mumkin

// /api/projects uchun routing'ni qo'shish
router.use('/projects', projectRoutes);

// Qo'shimcha route'lar shu yerga qo'shilishi mumkin

export default router;
