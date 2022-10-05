import { Router } from 'express'
import passport from 'passport'
import authController from '../controllers/authController'

const authRouter = Router()

authRouter.get('/login', authController.login)
authRouter.post('/register', authController.register)

// authRouter.post('/loginSuccess', authController.loginSuccess)
authRouter.post('/loginFailure', authController.loginFailure)

authRouter.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/api/auth/loginFailure',
        // successRedirect: '/api/auth/loginSuccess',
    }),
    authController.loginSuccess,
)

authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
authRouter.get(
    '/google/callback',
    passport.authenticate('google', {
        successReturnToOrRedirect: '/api/auth/loginSuccess',
        failureRedirect: '/api/auth/loginFailure',
    }),
)

authRouter.get('/facebook', passport.authenticate('facebook'))
authRouter.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/api/auth/loginFailure',
    }),
    authController.loginSuccess,
)

// authRouter.get('/logout', (req: Request, res: Response) => {
//     req.logout()
//     res.redirect('/')
// })

export default authRouter
