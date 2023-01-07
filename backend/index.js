import express from 'express'
import db from './config/Database.js'

const app = express()
const port = 5000

try {
    await db.authenticate()
    console.log('DB Connected..')
} catch (error) {
    console.log(error)
}

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
