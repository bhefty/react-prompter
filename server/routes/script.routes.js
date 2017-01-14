import { Router } from 'express'
import * as ScriptController from '../controllers/script.controller'
import * as UserController from '../controllers/user.controller'

const router = new Router()

// Get all Scripts
router.route('/all').get(ScriptController.getScripts)

// Get all Users' info
router.route('/users').get(UserController.showUser)

export default router
