import mongoose from 'mongoose'

// Project schema definition
const projectSchema = new mongoose.Schema({
  title: {
    uz: { type: String, required: true },
    ru: { type: String, required: true },
    eng: { type: String, required: true },
  },
  description: {
    uz: { type: String, required: true },
    ru: { type: String, required: true },
    eng: { type: String, required: true },
  },
  category: {
    type: String,
    required: true,
  },
  techs: {
    type: Array,
    required: true,
  },
  imgLinks: [
    {
      type: String,
    },
  ],
  githubLink: {
    type: String,
    required: true,
  },
  liveDemo: {
    type: String,
    required: true,
  },
})

// Create model

export default mongoose.model('Project', projectSchema)
