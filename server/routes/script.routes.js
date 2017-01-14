import { Router } from 'express'
import * as ScriptController from '../controllers/script.controller'
const router = new Router()

// Get all Scripts
router.route('/all').get(ScriptController.getScripts)

export default router
