import express from 'express'
import passport from 'passport'
import { checkAuthenticated } from '../middlewares/authMiddleware'
import authRouter from './authRoutes'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/dash', checkAuthenticated, (req, res) => {
    res.send('Hello World!')
})

router.use('/auth', authRouter)

export default router
