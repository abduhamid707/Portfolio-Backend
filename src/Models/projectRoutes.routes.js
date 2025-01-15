import express from 'express'
const router = express.Router();
import ProjectsController from './ProjectsController.js'

// Barcha loyihalarni olish
router.get('/', ProjectsController.getAllProjects)
// Texnologiyalarni olish
router.get('/techs', ProjectsController.getAllTechs);

// Loyihani ID bo'yicha olish
router.get('/:id', ProjectsController.getProjectById)

// Yangi loyiha qo'shish
router.post('/', ProjectsController.createProject)

// Loyihani yangilash
router.put('/:id', ProjectsController.updateProject)

// Loyihani o'chirish 
router.delete('/:id', ProjectsController.deleteProject)

export default router
