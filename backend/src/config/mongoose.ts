import mongoose from 'mongoose'
import { mongoUri } from '.'

export const connectMongo = function () {
    // const options = {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    // }

    mongoose.connect(mongoUri)

    const conn = mongoose.connection

    conn.on('open', console.log.bind(console, 'Connected to MongoDB'))
    conn.on('error', console.error.bind(console, 'connection error:'))
}
