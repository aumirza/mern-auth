import { NextFunction, Request, Response } from 'express'
import { createUser } from '../services/userCreationService'
import { IUser } from '../types/modelTypes/userModel'

class AuthController {
    async register(req: Request, res: Response) {
        try {
            createUser(req, res)
        } catch (error) {
            res.status(400).json({ message: 'Error registering user' })
        }
    }
    async login(req: Request, res: Response) {
        res.send('login')
    }

    async loginSuccess(req: Request, res: Response, next: NextFunction) {
        req.logIn(req.user as IUser, (err) => {
            if (err) {
                return next(err)
            }
            return res.json({ message: 'success', user: req.user?.toJSON() })
        })
    }

    async loginFailure(err: Error, req: Request, res: Response) {
        res.status(500).json(err.message)
    }
}

export default new AuthController()
