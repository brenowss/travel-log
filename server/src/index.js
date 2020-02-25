const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const middlewares = require('./middlewares.js')
const logs = require('./api/logs')

const app = express()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.use(morgan('common')) //mantem um log de cada call feita ao servidor
app.use(helmet()) // modifica headers do pedido do navegador para segurança
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    })
})

app.use('/api/logs', logs)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const port = process.env.PORT || 1337
app.listen(port, () => {
    console.log(`Ouvindo na porta ${port}`)
})