import express from 'express'
import db from './config/Database.js'
// import Users from './models/UserModel.js'
import router from './routes/index.js'

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
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
