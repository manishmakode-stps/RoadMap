const express = require('express')
const app = express()
const loggerMiddlware = require('./middleware/loggerMiddleware')
const router = require('./routes/user.route')
const db = require('./db/connection')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000


db();
app.use(loggerMiddlware);

app.get('/', (req, res) => {
    res.send('this is home page')
})

app.use('/api/users',router);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})