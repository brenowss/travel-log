const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const middlewares = require('./middlewares.js')
const logs = require('./api/logs')

const app = express()

mongoose.connect('mongodb://localhost/travel-log', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.use(morgan('common')) //mantem um log de cada call feita ao servidor
app.use(helmet()) // modifica headers do pedido do navegador para segurança
app.use(cors({
    origin: 'http://localhost:3000'
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

const port = 1337
app.listen(port, () => {
    console.log(`Ouvindo na porta ${port}`)
})