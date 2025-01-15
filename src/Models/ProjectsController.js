import uploadImages from '../utils/uploadImage.js'
import Project from './Projects.js'

class ProjectsController {
  // Barcha loyihalarni olish
  static async getAllTechs(req, res) {
    try {
      // MongoDB agregatsiyasidan foydalanib barcha techslarni unik holatda olish
      const techs = await Project.aggregate([
        { $unwind: '$techs' }, // techs massivini ajratish
        { $group: { _id: '$techs' } }, // Takrorlanmas qiymatlar bo'yicha guruhlash
        { $project: { _id: 0, tech: '$_id' } }, // Natijani formatlash
      ])

      const techList = techs.map((t) => {
        const match = t.tech.match(/^[a-zA-Z]+/) // Texnologiya nomini boshidan olish
        return match ? match[0] : t.tech // Agar moslik topilsa, texnologiya nomini qaytaradi
      })

      console.log('TechList:', techList)
      res.json(techList)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  }

  static async getAllProjects(req, res) {
    try {
      const projects = await Project.find() // Barcha loyihalarni olish
      res.json(projects)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  }

  // Loyihani ID bo'yicha olish
  static async getProjectById(req, res) {
    try {
      const project = await Project.findOne({ _id: req.params.id })
      console.log(req.params.id)
      if (!project) {
        return res.status(404).json({ message: 'Project not found' })
      }
      res.json(project)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  }

  // Yangi loyiha qo'shish
  static async createProject(req, res) {
    let { title, description, category, techs, githubLink, liveDemo } = req.body

    // Stringni to'g'rilab massivga aylantirish
    const techsArray = techs
      .replace(/[\[\]"]/g, '')
      .split(',')
      .map((item) => item.trim())

    title = JSON.parse(title)
    description = JSON.parse(description)
    const baseUrl = `${req.protocol}://${req.get('host')}`
    const fileUrl = await uploadImages(req.files.images, baseUrl)
    if (
      !title ||
      !description ||
      !category ||
      !techs ||
      !githubLink ||
      !liveDemo
    ) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    try {
      const newProject = new Project({
        title,
        description,
        category,
        techs: techsArray,
        imgLinks: fileUrl,
        githubLink,
        liveDemo,
      })
      await newProject.save()
      // console.log('newProject :', newProject)
      res.status(201).json({
        message: 'Project created successfully',
        project: newProject,
      })
    } catch (error) {
      console.error('Error creating project:', error)
      res.status(500).json({ message: 'Server error' })
    }
  }

  static async updateProject(req, res) {
    try {
      console.log('req.body : Update', req.body)
      const updatedProject = await Project.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' })
      }
      res.json({
        message: 'Project updated successfully',
        project: updatedProject,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  }

  // Loyihani o'chirish
  static async deleteProject(req, res) {
    try {
      const deletedProject = await Project.findByIdAndDelete({
        _id: req.params.id,
      })
      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' })
      }
      res.json({ message: 'Project deleted successfully' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  }
}

export default ProjectsController
