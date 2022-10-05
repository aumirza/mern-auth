import path from 'path'
import dotenv from 'dotenv'

const dotenvConfig = {
    path: path.resolve(__dirname, '../../.env'),
}
dotenv.config(dotenvConfig)

import { normalizePort } from '../utils/normalizePort'
import { SessionOptions } from 'express-session'
import { MongoDBSessionOptions } from 'connect-mongodb-session'
import { CorsOptions } from 'cors'

export const PORT = normalizePort(process.env.PORT || 5000)
export const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/auth'

export const sessionOptions: SessionOptions = {
    secret: process.env.SECRET || 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // path: '/',
        sameSite: false,
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 4, // 4 days in milliseconds
    },
}

export const mongoDbSessionOptions: MongoDBSessionOptions = {
    uri: mongoUri,
    collection: 'sessions',
}

export const corsOptions: CorsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}

export const jwtSecret = process.env.JWT_SECRET || 'secret'
export const activationTokenSecret = process.env.ACTIVATION_TOKEN_SECRET || 'secret'
export const resetPasswordTokenSecret = process.env.RESET_PASSWORD_TOKEN_SECRET || 'secret'

export const activationTokenExpiresIn = process.env.ACTIVATION_TOKEN_EXPIRES_IN || '1d'
export const resetPasswordTokenExpiresIn = process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN || '1d'

export const googleOAuth2 = {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
}
