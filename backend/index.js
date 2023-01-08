import express from 'express'
import db from './config/Database.js'
// import Users from './models/UserModel.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.js'

dotenv.config()
const app = express()
const port = 5000

try {
    await db.authenticate()
    console.log('DB Connected..')
    // await Users.sync()
} catch (error) {
    console.log(error)
}

//middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
