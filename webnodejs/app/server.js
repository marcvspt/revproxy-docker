const express = require('express')
const path = require('path')
const morgan = require('morgan');

const PORT = process.env.NODEJS_PORT || 3000

const app = express()
app.disable('x-powered-by')

app.use(morgan(':remote-addr - - [:date[clf]] ":method :url HTTP/:http-version" :status -'));

const templatesDir = path.join(__dirname, 'templates')
app.use(express.static(templatesDir))

app.get('/', (req, res) => {
    res.sendFile(path.join(templatesDir, 'index.html'));
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Running in all addresses http://0.0.0.0:${PORT}`)
})