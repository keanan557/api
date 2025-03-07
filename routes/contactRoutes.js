// contact routes

// imports
import express from 'express'
import { addContact,fetchContact,deleteContact } from '../controller/ContactController.js'

const router = express.Router()

router.get('/api/contact', fetchContact)
router.post('/api/contact', addContact)
router.delete('/api/contact/:id', deleteContact)

export default router
