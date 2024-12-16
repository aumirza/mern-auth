import express from 'express'
import passport from 'passport'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import mongoDbSession from 'connect-mongodb-session'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import { corsOptions, mongoDbSessionOptions, sessionOptions } from './config'
import router from './routes'
import './config/passportLocalStrategy'
import { specs } from './config/swagger'

const mongoDbStore = mongoDbSession(session)

const app = express()
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser(sessionOptions.secret))

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionOptions.cookie ? (sessionOptions.cookie.secure = true) : null // serve secure cookies
    // app.use('/', express.static(path.join(__dirname, '../../frontend')))
}

const sessionStore = new mongoDbStore(mongoDbSessionOptions)
sessionStore.on('error', (error) => console.log(error))
sessionOptions.store = sessionStore

app.use(session(sessionOptions))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
app.use('/api', router)

export default app
